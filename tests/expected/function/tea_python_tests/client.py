# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.core import DaraCore 
from typing import Dict, List


class Client:
    def __init__(self):
        pass

    @staticmethod
    def hello() -> None:
        return

    @staticmethod
    def hello_map() -> Dict[str, str]:
        m = {}
        return DaraCore.merge({
            'key': 'value',
            'key-1': 'value-1',
            'key-2': 'value-2',
            '': 'value-3',
        }, m)

    @staticmethod
    def hello_array_map() -> List[Dict[str, str]]:
        return [
            {
                'key': 'value'
            }
        ]

    @staticmethod
    def hello_params(
        a: str,
        b: str,
    ) -> None:
        Client.hello_interface()
        Client.hello_array_map()

    @staticmethod
    async def hello_params_async(
        a: str,
        b: str,
    ) -> None:
        await Client.hello_interface_async()
        Client.hello_array_map()

    @staticmethod
    def hello_interface() -> None:
        # interface mode
        raise Exception('Un-implemented')

    @staticmethod
    async def hello_interface_async() -> None:
        # interface mode
        raise Exception('Un-implemented')

    def a_params(self) -> None:
        self.hello_params('a', 'b')

    async def a_params_async(self) -> None:
        await self.hello_params_async('a', 'b')
