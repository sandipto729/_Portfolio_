from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from collections import defaultdict

router = APIRouter()


# Request model
class BlogIdRequest(BaseModel):
    blog_id: str


# Response model
class SimilarBlog(BaseModel):
    id: str
    percentage_similarity: float


@router.post("/fetch")
async def fetch_similar_blogs(request: BlogIdRequest) -> List[SimilarBlog]:
    """
    Fetch top 3 most similar blogs based on blog_id
    Uses max similarity per blog aggregation
    """
    try:
        # Initialize Qdrant client and embeddings
        import os
        url = os.getenv("QDRANT_URL")
        client = QdrantClient(url=url)
        
        embedding = OpenAIEmbeddings(
            model="text-embedding-3-large",
        )
        
        # Create vector store
        vector_store = QdrantVectorStore(
            client=client,
            collection_name="jojo_portfolio",
            embedding=embedding,
        )
        
        # Get all chunks for the input blog_id to create a query
        # We'll use the first chunk as our query vector
        scroll_result = client.scroll(
            collection_name="jojo_portfolio",
            scroll_filter={
                "must": [
                    {
                        "key": "metadata.id",
                        "match": {"value": request.blog_id}
                    }
                ]
            },
            limit=1,
            with_vectors=True
        )
        
        if not scroll_result[0]:
            raise HTTPException(status_code=404, detail=f"Blog with id '{request.blog_id}' not found")
        
        # Get the vector from the first chunk
        query_vector = scroll_result[0][0].vector
        
        # Search for similar chunks (get more results to ensure we have enough different blogs)
        from qdrant_client.models import PointStruct
        
        search_results = client.query_points(
            collection_name="jojo_portfolio",
            query=query_vector,
            limit=50,  # Get more to ensure we have enough different blogs
            with_payload=True
        ).points
        
        # Aggregate by blog_id using max similarity
        blog_similarities = defaultdict(float)
        
        for result in search_results:
            blog_id = result.payload.get('metadata', {}).get('id')
            
            # Skip the same blog
            if blog_id == request.blog_id:
                continue
            
            # Keep the max similarity for each blog
            similarity_score = result.score
            if similarity_score > blog_similarities[blog_id]:
                blog_similarities[blog_id] = similarity_score
        
        # Sort by similarity and get top 3
        sorted_blogs = sorted(
            blog_similarities.items(),
            key=lambda x: x[1],
            reverse=True
        )[:3]
        
        # Convert to response format (score to percentage)
        similar_blogs = [
            SimilarBlog(
                id=blog_id,
                percentage_similarity=round(score * 100, 2)
            )
            for blog_id, score in sorted_blogs
        ]
        
        return similar_blogs
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
