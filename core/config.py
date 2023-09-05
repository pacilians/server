import os

from pydantic import BaseSettings


class Config(BaseSettings):
    ENV: str = "development"
    DEBUG: bool = True
    APP_HOST: str = "127.0.0.1"
    APP_PORT: int = 8000
    JWT_SECRET_KEY: str = "fastapi"
    JWT_ALGORITHM: str = "HS256"

class LocalConfig(Config):
    DB_HOST = ""
    DB_DATABASE = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_PORT = ""

class DevelopmentConfig(Config):
    DB_HOST = ""
    DB_DATABASE = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_PORT = ""

class ProductionConfig(Config):
    DB_HOST = ""
    DB_DATABASE = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_PORT = ""


def get_config():
    env = os.getenv("ENV", "local")
    config_type = {
        "local": LocalConfig(),
        "dev": DevelopmentConfig(),
        "prod": ProductionConfig(),
    }
    return config_type[env]


config: Config = get_config()
