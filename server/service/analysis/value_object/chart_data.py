from pydantic import BaseModel


class ChartData(BaseModel):
    disease: str
    sequence1: int
    sequence2: int
    sequence3: int
    sequence4: int
