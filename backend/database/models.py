from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='personal')

    patients = db.relationship('Patient', backref='doctor', lazy=True)
    images = db.relationship('Image', backref='user', lazy=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email, "role": self.role}


class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer)
    gender= db.Column(db.String(10))
    doctor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    images = db.relationship('Image', backref='patient', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "doctor_id": self.doctor_id
        }
    
class Image(db.Model):
    __tablename__ = 'imagenes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(90), nullable=False)
    result = db.Column(db.String(100))
    confidence = db.Column(db.Float)
    uploaded_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "result": self.result,
            "confidence": self.confidence,
            "uploaded_at": self.uploaded_at,
            "user_id": self.user_id,
            "patient_id": self.patient_id
        }