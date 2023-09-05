import os

import click
import uvicorn

from core.config import config

def main():     
    uvicorn.run(
        app="server:app",
        host=config.APP_HOST,
        port=config.APP_PORT,
        workers=1,
    )


if __name__ == "__main__":
    main()