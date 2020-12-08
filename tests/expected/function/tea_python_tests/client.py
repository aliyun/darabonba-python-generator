# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.core import TeaCore


class Client:
    def __init__(self):
        pass

    @staticmethod
    def hello():
        return

    @staticmethod
    def hello_map():
        m = {}
        return TeaCore.merge({
            'key': 'value',
            'key-1': 'value-1'
        }, m)

    @staticmethod
    def hello_array_map():
        return [
            {
                'key': 'value'
            }
        ]

    @staticmethod
    def hello_params(a, b):
        Client.hello_interface()
        Client.hello_array_map()

    @staticmethod
    def hello_interface():
        """
        interface mode
        """
        raise Exception('Un-implemented')

    def a_params(self):
        self.hello_params('a', 'b')


class AioClient(Client):
    def __init__(self):
        pass

    @staticmethod
    def hello():
        return

    @staticmethod
    def hello_map():
        m = {}
        return TeaCore.merge({
            'key': 'value',
            'key-1': 'value-1'
        }, m)

    @staticmethod
    def hello_array_map():
        return [
            {
                'key': 'value'
            }
        ]

    @staticmethod
    async def hello_params(a, b):
        await Client.hello_interface()
        Client.hello_array_map()

    @staticmethod
    async def hello_interface():
        """
        interface mode
        """
        raise Exception('Un-implemented')

    async def a_params(self):
        await self.hello_params('a', 'b')
