from database.postgre.connector import PostgreConnector
from model.gene import Gene


class GeneRepository:
    def __init__(self):
        connector = PostgreConnector.get_connector()
        self.session = connector.get_session()

    def create(self, user_id: int, data: str):
        gene = Gene(user_id=user_id, data=data)
        self.session.add(gene)
        self.session.commit()
        
        return gene.id

    def find_all(self):
        return self.session.query(Gene).all()

    def update(self, id: int, user_id: int, data: str):
        gene = self.session.query(Gene).filter_by(id=id).first()
        if gene:
            gene.user_id = user_id
            gene.data = data
            self.session.commit()
            
            return True
        return False

    def delete(self, id: int):
        gene = self.session.query(Gene).filter_by(id=id).first()
        if gene:
            self.session.delete(gene)
            self.session.commit()
            
            return True
        return False
