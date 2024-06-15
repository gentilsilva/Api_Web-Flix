from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])

URL: str = "https://api.themoviedb.org/3"
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZlYWYyZGRmOWMzNDEzYzhhN2Q0NWE1NGJkM2VkNCIsInN1YiI6IjYxODgwZTFhY2I2ZGI1MDA2MjM5YWQzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uKeat8qN8xGgC240ckP-7DN79SnsBrzPm9wegYIkKew"
}

@app.route("/api/filmes/top", methods=["GET"])
def get_films_by_popularity():
    local_url = "/movie/top_rated?language=pt-BR&page=1"
    url = f"{URL}{local_url}"
    response = requests.get(url, headers=headers)
    
    data = response.json()
    return jsonify(data)

@app.route("/api/tv-shows/top", methods=["GET"])
def get_tv_shows_by_popularity():
    local_url = "/tv/top_rated?language=pt-BR&page=1"
    url = f"{URL}/{local_url}"
    response = requests.get(url, headers=headers)

    data = response.json()
    return jsonify(data)

def get_films_by_id():
    pass

if __name__=="__main__":
    app.run(debug=True)