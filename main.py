from flask import Flask, render_template
import requests
import json
app = Flask(__name__)


@app.route("/")
def render_index():
    return render_template('index.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
