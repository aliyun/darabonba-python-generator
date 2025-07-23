# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from typing import Generator, AsyncGenerator

from tea_python_tests.api import Client as APIClient
from tea_python_tests.lib.util import Util
from tea_python_tests.model import user_models as user_models

class Client:
    _user: user_models.Info = None
    def __init__(self):
        self._user = user_models.Info(
            name = 'test',
            age = 124,
            max_attemp = 3,
            autoretry = True
        )

    def test_3(self) -> Generator[str, None, None]:
        it = Util.test_1()
        for test in it:
            yield  test

    async def test_3_async(self) -> AsyncGenerator[str, None, None]:
        it = Util.test_1()
        for test in it:
            yield  test

    def test_4(self) -> int:
        api = APIClient()
        status = api.test_3()
        return status

    async def test_4_async(self) -> int:
        api = APIClient()
        status = await api.test_3_async()
        return status
