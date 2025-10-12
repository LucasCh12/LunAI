# Inicializacion de la app Flask
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app.config import Config
db= SQLAlchemy()
def create_app():
    app=Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    db.init_app(app)
    from app.routes import main_bp
    app.register_blueprint(main_bp)
    return app