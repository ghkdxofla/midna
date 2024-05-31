from database.connector import PostgreConnector
from model.user import User


class UserRepository:
    def __init__(self):
        connector = PostgreConnector.get_connector()
        self.session = connector.get_session()

    def create(self):
        user = User()
        self.session.add(user)
        self.session.commit()
        
        return user.id

    def find_all(self):
        return self.session.query(User).all()
    
    def find_by_id(self, id: int):
        return self.session.query(User).filter_by(id=id).first()

    def delete(self, id: int):
        user = self.session.query(User).filter_by(id=id).first()
        if user:
            self.session.delete(user)
            self.session.commit()
            
            return True
        return False
