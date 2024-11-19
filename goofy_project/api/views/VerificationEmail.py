import requests
import os
from django.conf import settings


def send_verification_email(email, code):
    """
    Sends a formal email with the verification code to the user's email address.

    Args:
        email (str): The recipient's email address.
        code (str): The verification code to be included in the email.
    """
    # Email content
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Verification Code</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }}
            .header {{
                text-align: center;
                margin-bottom: 20px;
            }}
            .header img {{
                max-width: 100px;
                border-radius: 50%;
            }}
            .title {{
                font-size: 24px;
                color: #333333;
                text-align: center;
                margin-bottom: 10px;
            }}
            .content {{
                color: #555555;
                font-size: 16px;
                line-height: 1.5;
            }}
            .code {{
                display: block;
                background-color: #f9f9f9;
                padding: 10px;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                border-radius: 5px;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #888888;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://d3q0umke1d5kdc.cloudfront.net/icon.png" alt="Logo">
            </div>
            <div class="title">Password Reset Verification</div>
            <div class="content">
                <p>Dear User,</p>
                <p>You have requested to reset your password. Please use the verification code below to proceed:</p>
                <div class="code">{code}</div>
                <p>If you did not request this, please ignore this email or contact support immediately.</p>
                <p>Thank you for using GoofCoin.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 GoofCoin. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """

    # Send email via SendGrid
    headers = {
        "Authorization": f"Bearer {settings.CONFIG.SENDGRID_API_KEY}",
        "Content-Type": "application/json",
    }

    json_data = {
        "personalizations": [{"to": [{"email": email}]}],
        "from": {
            "email": settings.CONFIG.FROM_EMAIL,
            "name": "GoofCoin Support",
        },
        "subject": "Password Reset Verification Code",
        "content": [{"type": "text/html", "value": html_content}],
    }

    # Send the request
    response = requests.post(
        "https://api.sendgrid.com/v3/mail/send", headers=headers, json=json_data
    )

    return response.status_code
