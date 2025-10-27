from pydantic import BaseModel
from typing import Optional

class News(BaseModel):
    id: Optional[int]
    title: str
    url: str
    image: Optional[str]
    source: Optional[str]
    lat: Optional[float]
    lon: Optional[float]
    published_at: Optional[str]
    created_at: Optional[str]
