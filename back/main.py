from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
from db import db

app = Flask(__name__)
CORS(app)


@app.route("/add_brand", methods=["POST"])
def add_brand():
    try:
        brand = request.json["brand"]
        print(brand)
        result = db().addBrand(brand=brand)
        print(result)
        return jsonify(result)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({"error": "Error on back-end: " + str(e)})


@app.route("/add_model", methods=["POST"])
def add_model():
    try:
        brand = request.json["brand"]
        model = request.json["model"]
        result = db().addModel(brand=brand, model=model)
        return jsonify(result)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})


@app.route("/get_brands", methods=["GET"])
def get_brands():
    try:
        result = db().getBrands()
        print(result)
        return jsonify(result)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})


@app.route("/get_models", methods=["POST"])
def get_models():
    try:
        brand = request.json["brand"]
        result = db().getModels(brand)
        print(result)
        return jsonify(result)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})



if __name__ == "__main__":
    app.run(port=5000, debug=True)