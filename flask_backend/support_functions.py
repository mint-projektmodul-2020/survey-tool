
from flask_backend import SENDGRID_API_KEY, BACKEND_URL

import random
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *


def status(text, **kwargs):
    status_dict = {'status': text}
    status_dict.update(kwargs)
    return status_dict


def generate_random_key(length=32, numeric=False, existing_tokens=()):
    possible_characters = []

    # Characters '0' through '9'
    possible_characters += [chr(x) for x in range(48, 58)]

    if not numeric:
        # Characters 'A' through 'Z'
        possible_characters += [chr(x) for x in range(65, 91)]

        # Characters 'a' through 'z'
        possible_characters += [chr(x) for x in range(97, 123)]

    random_key = ''
    for i in range(length):
        random_key += random.choice(possible_characters)

    # Brute force generate random keys as long as key is not unique
    while random_key in existing_tokens:
        random_key = random_key[1:] + random.choice(possible_characters)

    return random_key


def send_email(entry):

    adress_data = ""

    if not entry["remote"]:
        adress_data = f'{entry["name"]} <em>(Ich wohne in München)</em>'
    else:
        adress_data = f'{entry["name"]} <em>(Ich wohne nicht in München)</em>:<br/>"' +\
                      f'{entry["street"]}<br/>{entry["zip_code"]} {entry["city"]}<br/>{entry["country"]}'

    verification_url = f'{BACKEND_URL}/backend/verify/{entry["verification_token"]}'
    change_url = f'{BACKEND_URL}/form'
    message = Mail(
        from_email='mint-projektmodul-2020@tum.de',
        to_emails=entry["email"],
        subject='MINT Projektmodul: Bestätige deine Email Adresse',
        html_content=f'<h2>Willkommen beim MINT Projektmodul</h2>' +
                     f'<p>Wir haben folgende Daten von dir erhalten:</p>' +
                     f'<p>{adress_data}</p>' +
                     f'<p>Diese Daten <strong>bestätigen</strong>: <a href=\'{verification_url}\'>Bestätigungs-Link</a></p>' +
                     f'<p>Diese Daten <strong>ändern</strong>: <a href=\'{change_url}\'>Änderungs-Link</a></p>' +
                     f'<p>Falls du diese Mail nicht erwartet hast, dann kannst du sie einfach ignorieren</p>' +
                     f'<p>Beste Grüße,<br/>Dein MINT-Team</p>'
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        return True
    except Exception as e:
        print(e)
        return False
