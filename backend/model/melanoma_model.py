# backend/model/melanoma_model.py
import tensorflow as tf

def load_model():
    model = tf.keras.models.load_model("backend/model/cnn_model.h5")
    return model
