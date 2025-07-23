# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from darabonba.core import DaraCore
from darabonba.exceptions import DaraException
from darabonba.request import DaraRequest

class Client:
    def __init__(self):
        pass

    def hello(self) -> None:
        _request = DaraRequest()
        _request.method = 'GET'
        _request.pathname = '/'
        _request.headers = {
            'host': 'www.test.com'
        }
        if True:
            _request.headers["host"] = 'www.test2.com'
        _last_request = _request
        _response = DaraCore.do_action(_request)
        if True:
            raise DaraException(_request, _response)
        else:
            True

        self.hello_if()
                not False
        a = None
        a = 'string'
        return

    async def hello_async(self) -> None:
        _request = DaraRequest()
        _request.method = 'GET'
        _request.pathname = '/'
        _request.headers = {
            'host': 'www.test.com'
        }
        if True:
            _request.headers["host"] = 'www.test2.com'
        _last_request = _request
        _response = await DaraCore.async_do_action(_request)
        if True:
            raise DaraException(_request, _response)
        else:
            True

        self.hello_if()
                not False
        a = None
        a = 'string'
        return

    @staticmethod
    def hello_if() -> None:
        if True:
            pass
        if True:
            pass
        elif True:
            pass
        else:
            pass

    @staticmethod
    def hello_throw() -> None:
        raise DaraException({})

    @staticmethod
    def hello_for_break() -> None:
        for item in [ ]:
            break

    @staticmethod
    def hello_while() -> None:
        while True:
            break

    @staticmethod
    def hello_declare() -> None:
        hello = 'world'
        hello_null = None
        hello = 'hehe'
