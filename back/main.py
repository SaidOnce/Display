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
        response = db().addBrand(brand=brand)
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({"error": "Error on back-end: " + str(e)})


@app.route("/add_model", methods=["POST"])
def add_model():
    try:
        brand = request.json["brand"]
        model = request.json["model"]
        response = db().addModel(brand=brand, model=model)
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})


@app.route("/get_brands", methods=["GET"])
def get_brands():
    try:
        response = db().getBrands()
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})


@app.route("/get_models", methods=["POST"])
def get_models():
    try:
        print(request.json)
        brand = request.json["brand"]
        response = db().getModels(brand)
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})


@app.route("/rem_brand", methods=["POST"])
def rem_brand():
    try:
        brand = request.json["brand"]
        response = db().removeBrand(brand)
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})


@app.route("/rem_model", methods=["POST"])
def rem_model():
    try:
        brand = request.json["brand"]
        model = request.json["model"]

        response = db().removeModel(brand=brand, model=model)
        
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})
    

@app.route("/get_spare_part_types", methods=["POST"])
def get_spare_part_types():
    try:
        brand = request.json["brand"]
        model = request.json["model"]
        print(brand, model)
        response = db().getSparePartTypes(brand, model)
        print(response)
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})
    

@app.route("/add_spare_part_type", methods=["POST"])
def add_spare_part_type():
    try:
        brand = request.json["brand"]
        model = request.json["model"]
        sparePartType = request.json["sparePartType"]
        response = db().addSparePartType(brand, model, sparePartType)
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})
    

@app.route("/rem_spare_part_type", methods=["POST"])
def rem_spare_part_type():
    try:
        brand = request.json["brand"]
        model = request.json["model"]
        sparePartType = request.json["sparePartType"]
        print(brand, model, sparePartType)
        response = db().removeSparePartType(brand=brand, model=model, sparePartType=sparePartType)
        
        return jsonify(response)
    except Exception as e:
        print("error coursed " + str(e))
        return jsonify({0: "Error on back-end: " + str(e)})


if __name__ == "__main__":
    app.run(port=5000, debug=True)