import os

import dotenv

dotenv_file = dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)

POSTGRE_DB_HOST = os.getenv("POSTGRE_DB_HOST")
POSTGRE_DB_PORT = os.getenv("POSTGRE_DB_PORT")
POSTGRE_DB_NAME = os.getenv("POSTGRE_DB_NAME")
POSTGRE_DB_USER = os.getenv("POSTGRE_DB_USER")
POSTGRE_DB_PASSWORD = os.getenv("POSTGRE_DB_PASSWORD")
