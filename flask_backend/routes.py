
from flask_backend import app
from flask_backend.database import submit, verify
from flask import render_template, request


@app.route("/backend/submit", methods=["POST"])
def backend_submit_form_data():
    result = submit(request.get_json(force=True))
    print(result)
    return {"status": "ok"}, 200


@app.route("/backend/verify/<token>", methods=["GET"])
def backend_verify_form_data(token):
    pass

@app.errorhandler(404)
def page_not_found(e):
    # All the remaining routes are routed to the frontend production build
    return render_template("index.html")
