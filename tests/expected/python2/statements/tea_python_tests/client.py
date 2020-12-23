# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import unicode_literals

from Tea.request import TeaRequest
from Tea.exceptions import TeaException
from Tea.core import TeaCore


class Client(object):
    def __init__(self):
        pass

    def hello(self):
        _request = TeaRequest()
        _request.method = 'GET'
        _request.pathname = '/'
        _request.headers = {
            'host': 'www.test.com'
        }
        if True:
            _request.headers['host'] = 'www.test2.com'
        _last_request = _request
        _response = TeaCore.do_action(_request)
        if True:
            raise TeaException(_request, _response)
        else:
            True
        self.hello_if()
        not False
        a = None
        a = 'string'
        return

    @staticmethod
    def hello_if():
        if True:
            pass
        if True:
            pass
        elif True:
            pass
        else:
            pass

    @staticmethod
    def hello_throw():
        raise TeaException({})

    @staticmethod
    def hello_for_break():
        for item in {}:
            break

    @staticmethod
    def hello_while():
        while True:
            break

    @staticmethod
    def hello_declare():
        hello = 'world'
        hello_null = None
        hello = 'hehe'
