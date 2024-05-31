from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    data: dict
    message: str
    status: str
