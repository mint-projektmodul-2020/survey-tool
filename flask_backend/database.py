
from flask_backend import pending_entries_collection, verified_entries_collection
from flask_backend.support_functions import status, send_email, generate_random_key

from pymongo import DeleteMany, InsertOne

def submit(form_dict):

    if any([(key not in form_dict) for key in ['name', 'email', 'remote', 'street', 'zip_code', 'city', 'country']]):
        return status('server error: key missing', status_code=500)

    if '' in (form_dict[key] for key in ('name', 'email')):
        return status('validation error: name/email missing', status_code=400)



    if (form_dict['email'][-7:] != '@tum.de') and (form_dict['email'][-9:] != '@mytum.de'):
        return status('validation error: only "...@mytum.de" or "...@tum.de" email addresses allowed', status_code=400)

    if (form_dict['email'][-7:] == '@tum.de') and (len(form_dict['email']) == 7):
        return status('validation error: email addresses invalid', status_code=400)

    if (form_dict['email'][-9:] == '@mytum.de') and (len(form_dict['email']) == 9):
        return status('validation error: email addresses invalid', status_code=400)



    if form_dict['remote']:
        if form_dict['country'] != 'Deutschland':
            return status('validation error: country invalid', status_code=400)

        if '' in (form_dict[key] for key in ('street', 'zip_code', 'city')):
            return status('validation error: street/zip_code/city missing', status_code=400)



    verification_token = generate_random_key()
    pending_entry = {
        "name": form_dict["name"],
        "email": form_dict["email"],
        "remote": form_dict["remote"],
        "street": form_dict["street"],
        "zip_code": form_dict["zip_code"],
        "city": form_dict["city"],
        "country": form_dict["country"],
        "verification_token": verification_token
    }

    if send_email(pending_entry):
        try:
            operations = [
                DeleteMany({"email": form_dict["email"]}),
                InsertOne(pending_entry)
            ]
            pending_entries_collection.bulk_write(operations, ordered=True)
            return status("ok", status_code=200)

        except Exception as e:
            return status("server error: communicating with database", status_code=500)
    else:
        return status("server error: sending the email", status_code=500)


def verify(verification_token):
    pending_entry = pending_entries_collection.find_one_and_delete({"verification_token": verification_token})

    if pending_entry is not None:
        operations = [
            DeleteMany({"email": pending_entry["email"]}),
            InsertOne(pending_entry)
        ]
        verified_entries_collection.bulk_write(operations)
