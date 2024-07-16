from flask import Flask, request # type: ignore
import os
import requests # type: ignore

API_URL="https://api.unsplash.com"
CLIENT_ID = os.getenv('UNSPLASH_ACCESS_KEY')

app = Flask(__name__)

@app.route("/new-image")
def new_image():
  word = request.args.get("query")
  headers = {"Authorization": f"Client-ID {CLIENT_ID}"}
  url = f"{API_URL}/photos/random"

  r = requests.get(url=url, headers=headers, params={"query": word})
  data = r.json()
  return {"word": data}




if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5050)
