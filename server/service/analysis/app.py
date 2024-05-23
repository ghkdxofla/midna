from fastapi import APIRouter

from service.analysis.request import DataStoreRequest
from service.analysis.response import EmbedContentResponse

analysis_router = APIRouter(prefix="/api/analysis")


@analysis_router.post("/store")
def store(request_body: DataStoreRequest):
    
    return EmbedContentResponse(
        message="Data stored successfully",
        data=request_body.data,
        status="success",
    )
