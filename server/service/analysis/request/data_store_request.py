from pydantic import BaseModel


class DataStoreRequest(BaseModel):
    user_id: str
    data: dict
