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


def make_transaction(sender: str, receiver: str, amount: float, private_key: str):
    private_key = private_key.strip().replace("\\n", "\n")
    sender_user = User.objects.get(username=sender)
    receiver = receiver.strip().replace("\r\n", "\n")

    if not sender_user.is_new_user_setup_completed:
        return "User Setup Incomplete"
    try:
        receiver_user = User.objects.get(Q(username=receiver) | Q(public_key=receiver))
    except:
        return "Invalid Receiver"

    if not receiver_user.is_new_user_setup_completed:
        return "Receiver Setup Incomplete"

    amount = float(amount)
    unique_id = Transaction.objects.count() + 1
    msg = f"{sender_user.username}->{receiver_user.username}:{amount:.2f}:{unique_id}"

    if sender_user == receiver_user:
        return "Cannot Send to Yourself"

    if receiver_user.username in ["system", "admin"]:
        return "Cannot Send to System or Admin"

    try:
        signature = sign_data(msg.encode(), private_key)
    except ValueError:
        return "INVALID PRIVATE KEY FILE"

    if not has_sufficient_balance(amount, sender_user):
        return "Insufficient Balance"

    if not verify_signature(msg.encode(), signature, sender_user.public_key.strip()):
        return "Invalid Signature"

    transaction = Transaction.objects.create(
        sender=sender_user, recipient=receiver_user, amount=amount, signature=signature
    )

    # Blockchain logic

    blockchain.add_transaction(transaction)

    # blockchain.unconfirmed_transactions:
    return "Transaction Successful"
