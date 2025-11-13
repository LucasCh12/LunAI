from database.models import db, User, Image
from app import app

with app.app_context():
    users = User.query.all()
    for u in users:
        print(u.to_dict())
    images = Image.query.all()
    for img in images:
        print(img.to_dict())