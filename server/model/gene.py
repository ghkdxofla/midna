from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, text
from server.database.base import Base


class Gene(Base):
    __tablename__ = "gene"

    id = Column(Integer, primary_key=True, index=True, , autoincrement=True)
    user_id = Column(String)
    data = Column(Text)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("Now()")
    )
