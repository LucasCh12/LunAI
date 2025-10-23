from database.models import db, User
from app import app

with app.app_context():
    users = User.query.all()
    for u in users:
        print(u.to_dict())
