from flask import Flask, render_template, redirect, url_for, jsonify
from flask.helpers import make_response

app = Flask(__name__)

@app.route("/")
def application_home():
    return render_template("application_home.html")


if __name__ == "__main__":
    app.run(debug=True)


