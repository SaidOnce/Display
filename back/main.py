from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api", methods=["POST"])
def api():

    data = request.json
    text = data["text"]

    return jsonify({
        "answer": f"Сервер получил: {text}"
    })

if __name__ == "__main__":
    app.run(port=5000)