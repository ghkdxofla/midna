import os

import dotenv
import uvicorn

dotenv_file = dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)


def run():
    environment = os.environ.get("ENV", "development")
    workers = os.environ.get("WORKERS", 1)

    uvicorn.run(
        app_dir="./core/",
        app="server:app",
        host="0.0.0.0",
        port=8080,
        reload=environment == "development",
        workers=workers,
    )


if __name__ == "__main__":
    run()
