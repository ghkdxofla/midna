from fastapi import APIRouter

from server.repository.gene_repository import GeneRepository
from server.repository.user_repository import UserRepository
from server.service.analysis.response.analysis_response import AnalysisResponse
from server.service.analysis.request.analysis_fetch_request import AnalysisFetchRequest
from server.service.analysis.request.analysis_modify_request import AnalysisModifyRequest
from server.service.analysis.request.analysis_analyze_request import AnalysisAnalyzeRequest

from server.service.analysis.utils import calculate_similarity_score, extract_sequences_from_fastq, format_chart_data

analysis_router = APIRouter(prefix="/api/analysis")


@analysis_router.post("/")
def create(request_body: AnalysisModifyRequest):
    user = UserRepository().find_by_id(request_body.user_id)
    gene_repository = GeneRepository()
    gene = gene_repository.create(
        user_id=user.id,
        data=request_body.data,
    )
    
    return AnalysisResponse(
        message="Data stored successfully",
        data=gene.id,
        status="success",
    )
    
@analysis_router.get("/")
def get_all(request_body: AnalysisFetchRequest):
    gene_repository = GeneRepository()
    genes = gene_repository.find_all_by_user_id(
        user_id=request_body.user_id,
    )
    
    return AnalysisResponse(
        message="Data retrieved successfully",
        data=genes,
        status="success",
    )

@analysis_router.get("/{id}/analyze")
def analyze(id: int, request_body: AnalysisAnalyzeRequest):
    fastq_data = GeneRepository().find_by_id_and_user_id(
        id=id,
        user_id=request_body.user_id,
    ).data
    analysis_result = __analyze_sequences(
        fastq_data=fastq_data,
        rare_disease_subsequences=request_body.rare_disease_subsequences,
    )
    formatted_data = format_chart_data(analysis_result)
    
    return AnalysisResponse(
        message="Data retrieved successfully",
        data=formatted_data,
        status="success",
    )

def __analyze_sequences(fastq_data: str, rare_disease_subsequences: list[list[str]]) -> Dict[str, List[Dict[str, int]]]:
    sequences = extract_sequences_from_fastq(fastq_data)
    chart_data = {}
    for disease, subsequence in rare_disease_subsequences:
        chart_data[disease] = []
        for sequence in sequences:
            similarity_score = calculate_similarity_score(sequence, subsequence, len(subsequence) * 0.7)
            chart_data[disease].append({'name': sequence, 'total': similarity_score})
    return chart_data
