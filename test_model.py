import tensorflow as tf
from PIL import Image
import numpy as np
import os

def load_and_preprocess_image(image_path):
    # Cargar y preprocesar la imagen
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))  # El modelo espera imágenes de 224x224
    img_array = np.array(img) / 255.0  # Normalización
    return np.expand_dims(img_array, axis=0)

def test_model(image_path):
    # Cargar el modelo
    model_path = os.path.join('engine', 'models', 'modelo_benigno_maligno_v1.keras')
    try:
        model = tf.keras.models.load_model(model_path)
        print("Modelo cargado correctamente")
    except Exception as e:
        print(f"Error al cargar el modelo: {e}")
        return

    # Procesar la imagen
    try:
        img_array = load_and_preprocess_image(image_path)
        
        # Realizar la predicción
        prediction = model.predict(img_array)[0][0]
        
        # Mostrar resultados
        print("\nResultados de la predicción:")
        print(f"Valor de predicción: {prediction:.4f}")
        print(f"Diagnóstico: {'Maligno' if prediction > 0.5 else 'Benigno'}")
        print(f"Confianza: {max(prediction, 1-prediction)*100:.2f}%")
        
    except Exception as e:
        print(f"Error al procesar la imagen: {e}")

if __name__ == "__main__":
    # Solicitar la ruta de la imagen al usuario
    image_path = input("Ingresa la ruta de la imagen a analizar: ")
    
    if os.path.exists(image_path):
        test_model(image_path)
    else:
        print("La imagen no existe en la ruta especificada.")