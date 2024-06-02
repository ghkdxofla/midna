from fastapi import FastAPI

from service.analysis.app import analysis_router


def init_routers(app: FastAPI) -> None:
    app.include_router(analysis_router)
