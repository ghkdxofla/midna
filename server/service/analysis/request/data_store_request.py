from pydantic import BaseModel


class DataStoreRequest(BaseModel):
    data: dict
