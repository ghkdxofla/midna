from pydantic import BaseModel


class AnalysisModifyRequest(BaseModel):
    user_id: int
    data: dict
