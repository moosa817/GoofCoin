from goofy_app.models import Transaction, User
from .crypto_utils import sign_data, verify_signature
from django.shortcuts import redirect
from django.db import models
from decimal import Decimal
from django.db.models import Q

from .blockchain import Blockchain

blockchain = Blockchain()


def get_balance(user):  # send as request.user or User object
    sent_amount = Transaction.objects.filter(sender=user).aggregate(
        total=models.Sum("amount")
    )["total"] or Decimal("0.00")

    received_amount = Transaction.objects.filter(recipient=user).aggregate(
        total=models.Sum("amount")
    )["total"] or Decimal("0.00")

    return received_amount - sent_amount


def has_sufficient_balance(amount, user):
    current_balance = get_balance(user)
    return current_balance >= amount


def make_transaction(sender: object, receiver: object, amount: int, private_key: str):
    private_key = private_key.strip().replace("\\n", "\n")

    unique_id = Transaction.objects.count() + 1
    msg = f"{sender.username}->{receiver.username}:{amount}:{unique_id}"

    if sender == receiver:
        return "Cannot Send to Yourself"

    if receiver.username in ["system", "admin"]:
        return "Cannot Send to System or Admin"

    try:
        signature = sign_data(msg.encode(), private_key)
    except ValueError as e:
        return "INVALID PRIVATE KEY FILE"

    if not has_sufficient_balance(amount, sender):
        return "Insufficient Balance"
    if not verify_signature(msg.encode(), signature, sender.public_key.strip()):
        return "Invalid Signature / Invalid Private Key"

    transaction = Transaction.objects.create(
        sender=sender, recipient=receiver, amount=amount, signature=signature
    )

    # Blockchain logic

    blockchain.add_transaction(transaction)

    # blockchain.unconfirmed_transactions:
    return "Transaction Successful"
