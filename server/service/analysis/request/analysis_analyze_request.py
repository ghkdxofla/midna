from pydantic import BaseModel


class AnalysisAnalyzeRequest(BaseModel):
    user_id: int
    rare_disease_subsequences: list[list[str]]
