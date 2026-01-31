# Portfolio AI Backend

FastAPI server for embedding blog posts into Qdrant vector database.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

3. Make sure Qdrant is running (using Docker Compose):
```bash
docker compose up -d
```

## Running the Server

```bash
python index.py
```

Or with uvicorn directly:
```bash
uvicorn index:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### POST `/blog/embedding`
Create embeddings for a blog post and store in Qdrant.

**Request Body:**
```json
{
  "id": "1",
  "title": "Blog Title",
  "excerpt": "Short excerpt",
  "date": "January 1, 2024",
  "readTime": "5 min read",
  "tags": ["tag1", "tag2"],
  "content": "<p>HTML content here...</p>"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Blog post 'Blog Title' embedded successfully",
  "chunks_created": 5,
  "blog_id": "1"
}
```

### GET `/`
Root endpoint - returns API status

### GET `/health`
Health check endpoint
