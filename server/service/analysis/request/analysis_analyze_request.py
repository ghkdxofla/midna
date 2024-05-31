from pydantic import BaseModel


class AnalysisAnalyzeRequest(BaseModel):
    user_id: str
    rare_disease_subsequences: list[list[str]]
