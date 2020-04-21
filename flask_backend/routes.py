
from flask_backend import app
from flask import render_template, request


@app.route("/backend/enter", methods=["POST"])
def backend_enter_form_data():
    pass


@app.route("/backend/verify/<token>", methods=["GET"])
def backend_verify_form_data(token):
    pass

@app.errorhandler(404)
def page_not_found(e):
    # All the remaining routes are routed to the frontend production build
    return render_template("index.html")
