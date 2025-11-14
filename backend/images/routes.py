# backend/images/routes.py
import os
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
from database import db, User, Patient, Image

images_bp = Blueprint("images", __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXT = {"png", "jpg", "jpeg", "bmp", "gif"}

def allowed(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXT

def predict_with_model(app, image_path):
    """Intenta usar el modelo cargado en app.config['MODEL'] o app.model. Devuelve (result, confidence)."""
    model = app.config.get("MODEL") or getattr(app, "model", None)
    if not model:
        return ("Sin modelo", 0.0)
    try:
        # Aquí asumimos que el modelo recibe imagen 224x224 RGB y devuelve probabilidad [0..1]
        from PIL import Image as PILImage
        import numpy as np
        img = PILImage.open(image_path).convert("RGB").resize((224,224))
        arr = np.array(img) / 255.0
        arr = arr.reshape((1,)+arr.shape)
        pred = model.predict(arr)
        # adaptar según salida real del modelo:
        prob = float(pred[0][0]) if hasattr(pred[0], "__len__") else float(pred[0])
        label = "Maligno" if prob > 0.5 else "Benigno"
        return (label, prob)
    except Exception as e:
        current_app.logger.exception("Error en predicción:")
        return (f"Error predicción: {str(e)}", 0.0)

@images_bp.route("/upload_image", methods=["POST"])
@cross_origin()
def upload_image():
    """
    Espera multipart/form-data:
    - image: archivo
    - user_id: id del usuario que sube
    - opcional (si user es profesional):
       patient_id OR (patient_name, patient_age, patient_gender)
    """
    if "image" not in request.files:
        return jsonify({"error": "No se envió imagen"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Nombre de archivo vacío"}), 400
    if not allowed(file.filename):
        return jsonify({"error": "Extensión no permitida"}), 400

    user_id = request.form.get("user_id", type=int)
    if not user_id:
        return jsonify({"error": "Se requiere user_id"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Guardar archivo físicamente
    filename = secure_filename(file.filename)
    import time
    unique_name = f"{int(time.time())}_{user_id}_{filename}"
    dest_path = os.path.join(UPLOAD_FOLDER, unique_name)
    file.save(dest_path)

    # Crear paciente si aplica
    patient_id = request.form.get("patient_id", type=int)
    if user.role == "professional" and not patient_id:
        patient_name = request.form.get("patient_name")
        patient_age = request.form.get("patient_age", type=int)
        patient_dni = request.form.get("patient_dni")
        patient_gender = request.form.get("patient_gender")
        if patient_name and patient_dni:
            patient = Patient.query.filter_by(dni=patient_dni, doctor_id=user.id).first()
            if not patient:
                patient = Patient(name=patient_name, age=patient_age, dni=patient_dni, gender=patient_gender, doctor_id=user.id)
                db.session.add(patient)
                db.session.commit()
            patient_id = patient.id

    if patient_id:
        patient = Patient.query.get(patient_id)
        if patient:
            pass

    # Ejecutar predicción con IA (si hay modelo cargado)
    result, confidence = predict_with_model(current_app, dest_path)

    # Crear registro en la base de datos
    img = Image(
        name=unique_name,
        result=result,
        confidence=confidence,
        user_id=user.id,
        patient_id=patient_id
    )

    db.session.add(img)
    db.session.commit()

    return jsonify({
        "result": img.result,
        "confidence": img.confidence,
        "image": img.to_dict()
    }), 200



@images_bp.route("/get_images", methods=["GET"])
@cross_origin()
def get_images():
    """
    Query params:
      - user_id (opcional)
      - patient_id (opcional)
    """
    user_id = request.args.get("user_id", type=int)
    patient_id = request.args.get("patient_id", type=int)

    if patient_id:
        imgs = Image.query.filter_by(patient_id=patient_id).order_by(Image.uploaded_at.desc()).all()
    elif user_id:
        imgs = Image.query.filter_by(user_id=user_id).order_by(Image.uploaded_at.desc()).all()
    else:
        # admin-ish: return all (limited)
        imgs = Image.query.order_by(Image.uploaded_at.desc()).limit(200).all()

    result = []
    for i in imgs:
        img_dict = i.to_dict()
        if i.patient:
            img_dict["patient_name"] = i.patient.name
            img_dict["patient_age"] = i.patient.age
            img_dict["patient_gender"] = i.patient.gender
            img_dict["patient_dni"] = i.patient.dni
            img_dict["patient_id"] = i.patient.id
        else:
            img_dict["patient_name"] = None
            img_dict["patient_age"] = None
            img_dict["patient_gender"] = None
            img_dict["patient_dni"] = None
            img_dict["patient_id"] = None
        result.append(img_dict)

    return jsonify(result), 200


@images_bp.route("/get_patients", methods=["GET"])
@cross_origin()
def get_patients():
    """
    Query params:
      - doctor_id required
    """
    doctor_id = request.args.get("doctor_id", type=int)
    if not doctor_id:
        return jsonify({"error": "doctor_id requerido"}), 400

    patients = Patient.query.filter_by(doctor_id=doctor_id).all()
    return jsonify({"patients": [p.to_dict() for p in patients]}), 200

@images_bp.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
