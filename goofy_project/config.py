from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_TITLE: str = "GOOFCOIN API"
    API_DESCRIPTION: str = (
        "A simple API to interact with the GoofCoin prototype cryptocurrency"
    )
    API_VERSION: str = "1.0.0"

    SECRET_KEY: str
    DEBUG: bool
    DATABASE_URL: str
    GUEST_PWD: str

    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_STORAGE_BUCKET_NAME: str
    CLOUDFRONT_DOMAIN: str

    SYSTEM_PRIVATE_KEY: str
    SYSTEM_PUBLIC_KEY: str = """-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz1r5Mzx949cbhHFJQX4L
fGBmgbEny1MiVaYen+o3qmebdwwERt5VyAVgeqxk37+yvDA1XEiAC1D6EMwsoGQ/
AW52NX2kOcjg9gE8r3CGjXqDIzHpiQQ/v+mPkRerL2E21b7+N3dZFyHKOuCpReCa
8oowiUfwtplSOvmC+k3lCdnblLgFaw2HPUZN4X3KanRI0/A4C+ZWuMYqubcBKp1y
mAwopJJtQH8032ZKRYdoiV7HJO11v+7lEFUrVzoeAeZ2hb9B8zBbVbuapnLbfk9L
JcmNwGuiCLt/5gRsMRu/5SW2hSHYr8gLMjxAs8ek6gKXCgWuAlTZe23K6rXJhwTz
lQIDAQAB
-----END PUBLIC KEY-----
"""
    ALLOWED_HOSTS: list = [
        "*.vercel.app",
        "localhost",
        "127.0.0.1",
        "goofcoin.vercel.app",
    ]

    class Config:
        env_file = ".env"


config = Settings()
