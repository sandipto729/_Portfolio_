from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
from blog.embedding import router as embedding_router
from blog.fetch_blog import router as fetch_router

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include blog routers
app.include_router(embedding_router, prefix="/blog", tags=["blog"])
app.include_router(fetch_router, prefix="/blog", tags=["blog"])


@app.get("/")
async def root():
    return {"message": "Portfolio AI Backend API", "status": "running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
