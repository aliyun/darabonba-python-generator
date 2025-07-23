# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from typing import Generator, AsyncGenerator

from alibabacloud_tea_util.util import Utils
from tea_python_tests.lib.util import Util

class Client:

    def __init__(self):
        pass

    @staticmethod
    def test() -> Generator[str, None, None]:
        Utils.test()
        it = Util.test_1()
        for test in it:
            yield  test

    @staticmethod
    async def test_async() -> AsyncGenerator[str, None, None]:
        Utils.test()
        it = Util.test_1()
        for test in it:
            yield  test
