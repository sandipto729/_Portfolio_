import requests
import json

# Load the blog post
with open('test_blog.json', 'r') as f:
    blog_post = json.load(f)

# Send POST request
url = "http://localhost:8000/blog/embedding"
response = requests.post(url, json=blog_post)

# Print response
print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}")
