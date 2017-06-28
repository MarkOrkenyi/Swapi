from flask import Flask, render_template
import requests
import json
app = Flask(__name__)


@app.route("/")
def render_index():
    response = requests.get('http://swapi.co/api/planets/').json()
    planets = response['results']
    next_href = response['next']
    return render_template('index.html', planets=planets, next_href=next_href)


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
