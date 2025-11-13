from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from database.models import db
from auth.routes import auth_bp, bcrypt as auth_bcrypt
from images.routes import images_bp
from flask_bcrypt import Bcrypt
import os

#  Intentar importar TensorFlow, pero no hacerlo obligatorio
try:
    import tensorflow as tf
    from PIL import Image
    import numpy as np
    TF_AVAILABLE = True
except ImportError:
    print("TensorFlow no está instalado. Las rutas de predicción estarán desactivadas.")
    TF_AVAILABLE = False

app = Flask(__name__)
CORS(app)  # Permite conexión desde React

# Configuración BD
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///backend.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# Inicializa Bcrypt y adjunta las rutas de autenticación
bcrypt = Bcrypt()
bcrypt.init_app(app)
# Si auth_bcrypt es una instancia diferente, inicialízala también
try:
    auth_bcrypt.init_app(app)
except Exception:
    # Si ya está inicializada, simplemente ignora
    pass

with app.app_context():
    db.create_all()
    


# Cargar modelo si está disponible
if TF_AVAILABLE:
    MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', "engine", "models", "modelo_benigno_maligno_v1.keras")
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        app.config["MODEL"] = model
        print("✅ Modelo cargado correctamente.")
    except Exception as e:
        print(f"⚠️ Error al cargar el modelo: {e}")
        app.config["MODEL"] = None
        model = None
else:
    model = None
    app.config["MODEL"] = None

# Registrar blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(images_bp, url_prefix="/images")

# Ruta home
@app.route("/")
def home():
    return jsonify({"message": "Backend funcionando correctamente"})

# Ruta de predicción
@app.route("/predict", methods=["POST"])
def predict():

    model= app.config.get("MODEL")
    
    if not TF_AVAILABLE or model is None:
        return jsonify({"error": "TensorFlow no está disponible en este entorno"}), 501

    if "image" not in request.files:
        return jsonify({"error": "No se envió ninguna imagen"}), 400

    image_file = request.files["image"]
    user_id = request.form.get("user_id")
    
    # Guardar imagen temporalmente
    image_path = os.path.join("uploads", image_file.filename)
    os.makedirs("uploads", exist_ok=True)
    image_file.save(image_path)

    # Procesar la imagen
    try:
        img = Image.open(image_path).convert("RGB")
        img = img.resize((224, 224))  # El modelo espera imágenes de 224x224
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predicción
        prediction = model.predict(img_array)[0][0]
        result = "Maligno" if prediction > 0.5 else "Benigno"

        # Guardar en BD
        new_image = Image(
            name=image_file.filename,
            result=result,
            confidence=float(prediction),
            user_id=user_id,
            patient_id=request.form.get("patient_id", None)
        )
        db.session.add(new_image)
        db.session.commit()

        return jsonify({
            "resultado": result,
            "confianza": float(prediction)
        })

    except Exception as e:
        return jsonify({"error": f"Error al procesar la imagen: {e}"}), 500

    # Limpieza de la imagen temporal
    finally:
        if os.path.exists(image_path):
            os.remove(image_path)

@app.route("/get_images/<int:user_id>", methods=["GET"])
def get_images(user_id):
    images = Image.query.filter_by(user_id=user_id).order_by(Image.upload_date.desc()).all()
    return jsonify([img.to_dict() for img in images])

if __name__ == "__main__":
    app.run(port = 5000, debug=True)
