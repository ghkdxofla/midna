from fastapi import APIRouter

from service.analysis.request import AnalysisModifyRequest, AnalysisFetchRequest
from service.analysis.response import DataStoreResponse
from repository.gene_repository import GeneRepository
from repository.user_repository import UserRepository

analysis_router = APIRouter(prefix="/api/analysis")


@analysis_router.post("/")
def store(request_body: AnalysisModifyRequest):
    user = UserRepository().find_by_id(request_body.user_id)
    gene_repository = GeneRepository()
    gene_repository.create(
        id=request_body.id,
        user_id=user.id,
        data=request_body.data,
    )
    
    return DataStoreResponse(
        message="Data stored successfully",
        data=request_body.data,
        status="success",
    )
    
@analysis_router.get("/{id}")
def get_all(request_body: AnalysisFetchRequest):
    gene_repository = GeneRepository()
    genes = gene_repository.find_all()
    
    return DataStoreResponse(
        message="Data retrieved successfully",
        data=genes,
        status="success",
    )
