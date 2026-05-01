from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import re
from bs4 import BeautifulSoup
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from langchain.schema import Document
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue

router = APIRouter()


def get_qdrant_client() -> QdrantClient:
    import os

    url = os.getenv("QDRANT_URL")
    if not url:
        raise HTTPException(status_code=500, detail="QDRANT_URL is not configured")

    return QdrantClient(url=url)


def delete_blog_points(blog_id: str):
    client = get_qdrant_client()
    client.delete(
        collection_name="jojo_portfolio",
        points_selector=Filter(
            must=[
                FieldCondition(
                    key="metadata.id",
                    match=MatchValue(value=blog_id),
                )
            ]
        ),
    )


# Request model for blog post
class BlogPost(BaseModel):
    id: str
    title: str
    excerpt: str
    date: str
    readTime: str
    tags: List[str]
    content: str
    imageUrl: Optional[str] = None


def extract_text_from_html(html_content: str) -> str:
    """Extract plain text from HTML content and remove URLs"""
    # Parse HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove script and style elements
    for script in soup(["script", "style"]):
        script.decompose()
    
    # Get text
    text = soup.get_text()
    
    # Remove URLs
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    
    # Clean up whitespace
    lines = (line.strip() for line in text.splitlines())
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    text = ' '.join(chunk for chunk in chunks if chunk)
    
    return text


@router.post("/embedding")
async def create_blog_embedding(blog_post: BlogPost):
    """
    Create embeddings for a blog post and store in Qdrant
    """
    try:
        # Remove any existing vectors for this blog so updates stay in sync
        delete_blog_points(blog_post.id)

        # Extract text from HTML content
        clean_text = extract_text_from_html(blog_post.content)
        
        # Combine title, excerpt, and content
        full_text = f"Title: {blog_post.title}\n\n{blog_post.excerpt}\n\n{clean_text}"
        
        # Create document with metadata
        doc = Document(
            page_content=full_text,
            metadata={
                "id": blog_post.id,
                "title": blog_post.title,
                "date": blog_post.date,
                "readTime": blog_post.readTime,
                "tags": ", ".join(blog_post.tags),
                "excerpt": blog_post.excerpt
            }
        )
        
        # Split into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100
        )
        chunks = text_splitter.split_documents([doc])
        
        # Initialize embeddings
        embedding = OpenAIEmbeddings(
            model="text-embedding-3-large",
        )
        
        # Store in Qdrant
        import os
        url = os.getenv("QDRANT_URL")
        qdrant = QdrantVectorStore.from_documents(
            chunks,
            embedding,
            url=url,
            collection_name="jojo_portfolio",
        )
        
        return {
            "status": "success",
            "message": f"Blog post '{blog_post.title}' embedded successfully",
            "chunks_created": len(chunks),
            "blog_id": blog_post.id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/embedding/{blog_id}")
async def delete_blog_embedding(blog_id: str):
    """Delete all vector chunks associated with a blog post."""
    try:
        delete_blog_points(blog_id)

        return {
            "status": "success",
            "message": f"Blog post '{blog_id}' deleted from embeddings successfully",
            "blog_id": blog_id,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))