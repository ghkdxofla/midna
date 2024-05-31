from sqlalchemy import Column, Integer, ForeignKey, Text, TIMESTAMP, text
from database.base import Base


class Gene(Base):
    __tablename__ = "gene"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    data = Column(Text)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("Now()")
    )
