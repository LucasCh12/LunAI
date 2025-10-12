from app import db
#modelos de usuarios e imagenes
class User(db.Model):
    __tablename__ = "users"
    id=db.Column(db.Integer, primary_key=True)
    username= db.Column(db.String(90),unique=True,nullable=False)
    email= db.Column(db.String(90),unique=True,nullable=False)
    password= db.Column(db.String(90),nullable=False)

class Image(db.Model):
    __tablename__ = 'imagenes'
    id=db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(90),nullable=False)
    result= db.Column(db.Integer,nullable=False)