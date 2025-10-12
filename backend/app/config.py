# Configuracion general (rutas, db, etc)
import os
#Para la database
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "clave_secreta_dev")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL","sqlite:///backend.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
