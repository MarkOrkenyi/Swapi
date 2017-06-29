from flask import Flask, render_template, redirect, request
import sql_queries
app = Flask(__name__)


@app.route("/")
def render_index():
    return render_template('index.html')


@app.route("/login")
def render_login():
    return render_template('login.html')


@app.route("/login_user", methods=['POST'])
def login_user():
    username = request.form['username_login']
    password = request.form['password_login']
    sql_queries.login(username, password)
    return redirect("/")


@app.route("/register")
def render_register():
    return render_template('register.html')


@app.route("/register_user", methods=['POST'])
def register_user():
    username = request.form['username_register']
    password = request.form['password_register']
    sql_queries.register(username, password)
    return redirect("/")


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
