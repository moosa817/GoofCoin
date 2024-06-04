from os import getenv

API_TITLE = "GOOFCOIN API"
API_DESCRIPTION = "A simple API to interact with the GoofCoin prototype cryptocurrency "
API_VERSION = "1.0.0"

SECRETY_KEY = getenv("SECRET_KEY", "supersecret")
DEBUG = bool(getenv("DEBUG", False))
ALLOWED_HOSTS = ["*.vercel.app", "localhost", "127.0.0.1"]
