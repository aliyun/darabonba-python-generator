# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
import time

from Tea.request import TeaRequest
from Tea.response import TeaResponse
from Tea.exceptions import TeaException
from Tea.core import TeaCore
from Tea.exceptions import UnretryableException


class Client(object):
    def __init__(self):
        pass

    def hello(self):
        _request = TeaRequest()
        _request.method = "GET"
        _request.pathname = "/"
        _request.headers = {
            "host": "www.test.com"
        }
        _last_request = _request
        _response = TeaCore.do_action(_request)
        return

    def hello_runtime(self):
        _runtime = {}
        _last_request = None
        _last_exception = None
        _now = time.time()
        _retry_times = 0
        while TeaCore.allow_retry(_runtime.get('retry'), _retry_times, _now):
            if _retry_times > 0:
                _backoff_time = TeaCore.get_backoff_time(_runtime.get('backoff'), _retry_times)
                if _backoff_time > 0:
                    TeaCore.sleep(_backoff_time)
            _retry_times = _retry_times + 1
            try:
                _request = TeaRequest()
                _request.method = "GET"
                _request.pathname = "/"
                _request.headers = {
                    "host": "www.test.com"
                }
                _last_request = _request
                _response = TeaCore.do_action(_request, _runtime)
                return
            except Exception as e:
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)
