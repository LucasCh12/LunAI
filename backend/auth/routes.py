from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt
from database import db, User

auth_bp = Blueprint("auth", __name__)
# Create bcrypt instance; it will be initialized when app initializes extensions
bcrypt = Bcrypt()


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "email", "password")):
        return jsonify({"error": "Faltan campos"}), 400

    # Check if name or email already exists
    if User.query.filter_by(name=data["name"]).first():
        return jsonify({"error": "El usuario ya está registrado"}), 400
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "El email ya está registrado"}), 400

    pw_hash = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = User(name=data["name"], email=data["email"], password=pw_hash)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado correctamente"}), 200


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ("email", "password")):
        return jsonify({"error": "Faltan campos"}), 400
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Credenciales incorrectas"}), 401
    return jsonify({
        "message": "Login exitoso",
        "user": user.to_dict() if hasattr(user, 'to_dict') else {"id": user.id, "name": user.name, "email": user.email}
    }), 200