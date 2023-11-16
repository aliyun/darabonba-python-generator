# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from typing import Any


class Client:
    def __init__(self):
        pass

    def test_1(self) -> Iterator:
        raise Exception('Un-implemented')

    async def test_1_async(self) -> Iterator:
        raise Exception('Un-implemented')

    def test_2(self) -> Iterator:
        it = self.test_1()
        for test in it:
            yield test

    async def test_2_async(self) -> Iterator:
        it = await self.test_1_async()
        for test in it:
            yield test

    def test_3(
        self,
        iter: Iterator,
    ) -> str:
        it = iter
        str = ''
        for i in it:
            str = f'{str}, {i}'
        return str

    async def test_3_async(
        self,
        iter: Iterator,
    ) -> str:
        it = iter
        str = ''
        for i in it:
            str = f'{str}, {i}'
        return str

    def test_4(
        self,
        test: Any,
    ) -> None:
        pass

    async def test_4_async(
        self,
        test: Any,
    ) -> None:
        pass

    def test_5(
        self,
        iter: Iterator,
    ) -> None:
        # test3(iter);
        self.test_4(iter)

    async def test_5_async(
        self,
        iter: Iterator,
    ) -> None:
        # test3(iter);
        await self.test_4_async(iter)
