# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from typing import Dict, Any

from requests import Request, Response
from Source.source_client import SourceClient
from tea_python_tests import models as main_models
from Tea.model import TeaModel

class Client:
    _vid: Request = None
    _model: TeaModel = None

    def __init__(
        self,
        request: Request,
        model: TeaModel,
    ):
        self._vid = request
        self._model = model

    def main(
        self,
        test_1: Request,
        test_2: TeaModel,
    ) -> None:
        oss = SourceClient(test_1)
        m = main_models.M(
            a = test_1,
            b = test_2
        )
        self._vid = test_1
        self._model = test_2

    async def main_async(
        self,
        test_1: Request,
        test_2: TeaModel,
    ) -> None:
        oss = SourceClient(test_1)
        m = main_models.M(
            a = test_1,
            b = test_2
        )
        self._vid = test_1
        self._model = test_2

    def test_http_request(
        self,
        req: Request,
    ) -> Response:
        return self.test_http_request_with('test', req)

    async def test_http_request_async(
        self,
        req: Request,
    ) -> Response:
        return self.test_http_request_with('test', req)

    @staticmethod
    def test_http_request_with(
        method: str,
        req: Request,
    ) -> Response:
        raise Exception('Un-implemented')

    @staticmethod
    def test_http_header(
        method: str,
        headers: Dict[str, Any],
    ) -> Response:
        raise Exception('Un-implemented')
