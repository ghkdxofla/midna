from sqlalchemy.orm import declarative_base

# This is a singleton class that creates a connection to the PostgresQL database.
Base = declarative_base()
