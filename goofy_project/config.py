from pydantic_settings import BaseSettings
import os


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
    SENDGRID_API_KEY: str
    FROM_EMAIL: str = "muhammadmoosa.7782@gmail.com"
    SYSTEM_PUBLIC_KEY: str = """-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/AA6+FI7l4hi+l537hNFkyRPVM3dTZTXmRPOuN0P7BB9e9fbdDBiQ96EAGKKtlU165J8TvItvmchaaRDGt8TVlF6tXKwS+6j3AsHiz04Ht00PYMDGKZGIy8TMONpcjwhIqpwWKLLXegJRk12ppiINsyXbI/JLSE15a26vJWauacWajYkKddCAfAOkuZv9KBJCgDOHKX4amr1zjcQhr1/MWNHyh+OhSVJqwgkJ/EoWWp8YkkztCHbbmfotreloSdokfkFGfJb2UASlPRiitPuldwTGgRcF+4GbGJOZGoMD+9xdebpDARXVX5XbvOdon+BvnWS8u6voQL+hiXscsefwIDAQAB
-----END PUBLIC KEY-----
"""
    ALLOWED_HOSTS: list = [
        "*.vercel.app",
        "localhost",
        "127.0.0.1",
        "goofcoin.vercel.app",
        "192.168.18.123",
    ]

    class Config:
        ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
        env_file = ENV_PATH


config = Settings()
