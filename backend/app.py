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

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).resize((224, 224))
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    image_bytes = image_file.read()
    processed = preprocess_image(image_bytes)

    prediction = model.predict(processed)
    result = float(prediction[0][0])
    return jsonify({"probability": result})
    
if __name__ == "__main__":
    app.run(debug=True)
