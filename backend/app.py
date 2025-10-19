from flask import Flask, request, jsonify
from flask_cors import CORS
from model.melanoma_model import load_model
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import os

app = Flask(__name__)
CORS(app)  # Permite conexión desde React

# Ruta del modelo
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "cnn_model.h5")

# Cargar el modelo
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Modelo cargado correctamente")
except Exception as e:
    print(f"Error al cargar el modelo: {e}")
    model = None
   
# Ruta home
@app.route("/")
def home():
    return jsonify({"message": "Backend funcionando correctamente"})

# Ruta de predicción
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No se envió ninguna imagen"}), 400

    image_file = request.files["image"]
    
    # Guardar imagen temporalmente
    image_path = os.path.join("uploads", image_file.filename)
    os.makedirs("uploads", exist_ok=True)
    image_file.save(image_path)

    # Procesar la imagen
    try:
        img = Image.open(image_path).convert("RGB")
        img = img.resize((128, 128)) 
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predicción
        prediction = model.predict(img_array)[0][0]
        result = "Maligno" if prediction > 0.5 else "Benigno"

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
    
if __name__ == "__main__":
    app.run(port = 5000, debug=True)
