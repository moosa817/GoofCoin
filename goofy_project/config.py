from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_TITLE: str = "GOOFCOIN API"
    API_DESCRIPTION: str = (
        "A simple API to interact with the GoofCoin prototype cryptocurrency"
    )
    API_VERSION: str = "1.0.0"

    SECRET_KEY: str
    DEBUG: bool = True
    DATABASE_URL: str
    ALLOWED_HOSTS: list = ["*.vercel.app", "localhost", "127.0.0.1"]

    class Config:
        env_file = ".env"


config = Settings()
