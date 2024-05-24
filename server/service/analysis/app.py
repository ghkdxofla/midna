from fastapi import APIRouter

from service.analysis.request import DataStoreRequest
from service.analysis.response import EmbedContentResponse
from repository.gene_repository import GeneRepository

analysis_router = APIRouter(prefix="/api/analysis")


@analysis_router.post("/store")
def store(request_body: DataStoreRequest):
    repository = GeneRepository()
    repository.create(
        id=request_body.id,
        user_id=request_body.user_id,
        data=request_body.data,
    )
    
    return EmbedContentResponse(
        message="Data stored successfully",
        data=request_body.data,
        status="success",
    )
