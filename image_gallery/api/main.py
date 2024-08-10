import os
from flask import Flask, request, jsonify  # type: ignore
import requests  # type: ignore
from dotenv import load_dotenv  # type: ignore
from flask_cors import CORS  # type: ignore
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")
# Env vars
CLIENT_ID = os.getenv("UNSPLASH_ACCESS_KEY")
API_URL = os.getenv("API_URL")
DEBUG = bool(os.environ.get("DEBUG", True))

if None in [CLIENT_ID, API_URL]:
    raise EnvironmentError(
        "Please create .env.local file and provide all necessary env variables"
    )

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    """Get image from API"""
    word = request.args.get("query")
    headers = {"Authorization": f"Client-ID {CLIENT_ID}"}
    url = f"{API_URL}/photos/random"

    r = requests.get(url=url, timeout=5, headers=headers, params={"query": word})
    data = r.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    """Read images from db and Save image to db"""
    if request.method == "GET":
        # read images from db
        images = images_collection.find({})
        return jsonify([img for img in images])

    if request.method == "POST":
        # save image in the db
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        return {"inserted_id": result.inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    """Delete image from db"""
    if request.method == "DELETE":
        result = images_collection.delete_one({"_id": image_id})
        if not result:
            return {"error": "Image wasn't deleted, try again"}, 500
        if result and not result.deleted_count:
            return {"error": "Image not found"}, 404
        return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
