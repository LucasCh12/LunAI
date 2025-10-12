# Codigo que carga el modelo y hace predicciones
import tensorflow as tf

def load_model():
    model = tf.keras.models.load_model("models/cnn_model.h5")
    return model

def predict(image):
    model=load_model()
    prediction= model.predict(image)
    return prediction