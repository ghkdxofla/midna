from sqlalchemy import Column, Integer, TIMESTAMP, text
from database.base import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("Now()")
    )
