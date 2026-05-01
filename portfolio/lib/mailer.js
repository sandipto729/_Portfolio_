import nodemailer from 'nodemailer';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function getMailFrom() {
  return process.env.MAIL_FROM || process.env.SMTP_USER || 'Sandipto Journal <no-reply@sandiptojournal.com>';
}

export async function sendWelcomeEmail(email) {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn('SMTP configuration missing, skipping welcome email');
    return { skipped: true };
  }

  await transporter.sendMail({
    from: getMailFrom(),
    to: email,
    subject: 'Welcome to Sandipto Journal',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>Successfully registered</h2>
        <p>You have successfully registered for Sandipto Journal site.</p>
        <p>Thanks for subscribing. You will now receive updates on new blogs and project posts.</p>
      </div>
    `,
  });

  return { skipped: false };
}

export async function sendNewBlogEmail(emails, blog) {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn('SMTP configuration missing, skipping blog announcement emails');
    return { skipped: true };
  }

  if (!Array.isArray(emails) || emails.length === 0) {
    return { skipped: true };
  }

  const blogUrl = blog?.url || `${process.env.NEXTAUTH_URL || ''}/blog/${blog?.id || ''}`;

  await Promise.allSettled(
    emails.map((email) =>
      transporter.sendMail({
        from: getMailFrom(),
        to: email,
        subject: `New blog post on Sandipto Journal: ${blog.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
            <h2>${blog.title}</h2>
            <p>${blog.excerpt || ''}</p>
            <p>A new post has been shared on Sandipto Journal.</p>
            <p><a href="${blogUrl}">Read the full post</a></p>
          </div>
        `,
      })
    )
  );

  return { skipped: false };
}
