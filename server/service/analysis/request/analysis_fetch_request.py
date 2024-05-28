from pydantic import BaseModel


class AnalysisFetchRequest(BaseModel):
    user_id: str
