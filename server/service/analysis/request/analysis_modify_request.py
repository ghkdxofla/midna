from pydantic import BaseModel


class AnalysisModifyRequest(BaseModel):
    user_id: str
    data: dict
