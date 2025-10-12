# Endpoints REST
from flask import Blueprint, request, jsonify
from app import db
from models import User, Image

main_bp= Blueprint("main",__name__)
