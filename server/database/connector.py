from sqlalchemy import URL, create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from server import setting
from server.database.base import Base


class PostgreConnector:
    __instance = None

    def __init__(self):
        if PostgreConnector.__instance is not None:
            raise Exception(
                "PostgreConnector is a singleton class. Use get_instance() instead."
            )

        url = URL.create(
            drivername="postgresql",
            username=setting.POSTGRE_DB_USER,
            password=setting.POSTGRE_DB_PASSWORD,
            host=setting.POSTGRE_DB_HOST,
            port=setting.POSTGRE_DB_PORT,
            database=setting.POSTGRE_DB_NAME,
        )
        engine = create_engine(url)
        Base.metadata.create_all(bind=engine)  # for development only
        session_factory = sessionmaker(bind=engine)
        self.Session = scoped_session(session_factory)
        PostgreConnector.__instance = self

    @staticmethod
    def get_connector():
        if PostgreConnector.__instance is None:
            PostgreConnector()
        return PostgreConnector.__instance

    def get_session(self):
        return self.Session()
