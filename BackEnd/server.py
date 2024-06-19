from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)

URL: str = "https://api.themoviedb.org/3"
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDZlYWYyZGRmOWMzNDEzYzhhN2Q0NWE1NGJkM2VkNCIsInN1YiI6IjYxODgwZTFhY2I2ZGI1MDA2MjM5YWQzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uKeat8qN8xGgC240ckP-7DN79SnsBrzPm9wegYIkKew"
}

@app.route("/api/filmes/top", methods=["GET"])
def get_movies_by_popularity():
    local_url = "/movie/top_rated?language=pt-BR&page=1"
    url = f"{URL}{local_url}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            data = response.json()
            print(data)
            return jsonify(data)
        except ValueError as e:
            return jsonify({"error": "Failed to decode JSON response"}), 500
    else:
        return jsonify({"error": "Request failed with status code {}".format(response.status_code)}), 500
    
@app.route("/api/filmes", methods=["GET"])
def get_movies():
    page = request.args.get("page", 1)
    local_url = f"/movie/popular?language=pt-BR&page={page}"
    url = f"{URL}{local_url}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            data = response.json()
            print(data)
            return jsonify(data)
        except ValueError as e:
            return jsonify({"error": "Failed to decode JSON response"}), 500
    else:
        return jsonify({"error": "Request failed with status code {}".format(response.status_code)}), 500
    
@app.route("/api/tv-shows/top", methods=["GET"])
def get_tv_shows():
    local_url = "/tv/popular?language=pt-BR&page=1"
    url = f"{URL}/{local_url}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            data = response.json()
            print(data)
            return jsonify(data)
        except ValueError as e:
            return jsonify({"error": "Failed to decode JSON response"}), 500
    else:
        return jsonify({"error": "Request failed with status code {}".format(response.status_code)}), 500
    
@app.route("/api/tv-shows", methods=["GET"])
def get_tv_shows_by_popularity():
    page = request.args.get("page", 1)
    local_url = f"/tv/top_rated?language=pt-BR&page={page}"
    url = f"{URL}/{local_url}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            data = response.json()
            print(data)
            return jsonify(data)
        except ValueError as e:
            return jsonify({"error": "Failed to decode JSON response"}), 500
    else:
        return jsonify({"error": "Request failed with status code {}".format(response.status_code)}), 500

@app.route("/api/show/search", methods=["GET"])
def get_show_by_keyword():
    value = request.args.get("value")
    local_url = f"/search/multi?query={value}&include_adult=false&language=pt-BR&page=1"
    url = f"{URL}{local_url}"

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        try:
            data = response.json()
            print(data)
            return jsonify(data)
        except ValueError as e:
            return jsonify({"error": "Failed to decode JSON response"}), 500
    else:
        return jsonify({"error": "Request failed with status code {}".format(response.status_code)}), 500


def get_films_by_id():
    pass

if __name__=="__main__":
    app.run(debug=True)