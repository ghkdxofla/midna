from database.postgre.connector import PostgreConnector
from model.chat_history import ChatHistory


class ChatHistoryRepository:
    def __init__(self):
        connector = PostgreConnector.get_connector()
        self.session = connector.get_session()

    def create(self, id: int, user_id: str, input: str, output: str):
        chat_history = ChatHistory(id=id, user_id=user_id, input=input, output=output)
        self.session.add(chat_history)
        self.session.commit()
        return chat_history.id

    def find_all(self):
        return self.session.query(ChatHistory).all()
