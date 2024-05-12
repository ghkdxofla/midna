from pydantic import BaseModel


class DataStoreResponse(BaseModel):
    data: dict
    message: str
    status: str
