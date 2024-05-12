import os

import dotenv
from fastapi import FastAPI
from starlette.responses import JSONResponse

from core.exception import MidnaException
from router import init_routers


dotenv_file = dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)


def init_listeners(app: FastAPI) -> None:
    @app.exception_handler(MidnaException)
    async def handle_invalid_usage(request, exc: MidnaException):
        return JSONResponse(
            status_code=exc.code,
            content={"error_code": exc.error_code, "message": exc.message},
        )


def create_app() -> FastAPI:
    app = FastAPI(
        debug=True,
        title="Midna Server",
        version="0.0.1",
        description="A simple api server",
    )

    init_routers(app)
    init_listeners(app)

    return app


app = create_app()
