# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.core import DaraCore 
from darabonba.request import DaraRequest 
from darabonba.exceptions import UnretryableException 
from darabonba.policy.retry import RetryPolicyContext 


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
        _last_request = _request
        _response = DaraCore.do_action(_request)
        return

    async def hello_async(self) -> None:
        _request = DaraRequest()
        _request.method = 'GET'
        _request.pathname = '/'
        _request.headers = {
            'host': 'www.test.com'
        }
        _last_request = _request
        _response = await DaraCore.async_do_action(_request)
        return

    def hello_runtime(self) -> None:
        _runtime = {
        }
        _last_request = None
        _last_response = None
        _retries_attempted = 0
        _context = RetryPolicyContext(
            retries_attempted= _retries_attempted
        )
        while DaraCore.should_retry(_runtime.get('retryOptions'), _context):
            if _retries_attempted > 0:
                _backoff_time = DaraCore.get_backoff_time(_runtime.get('retryOptions'), _context)
                if _backoff_time > 0:
                    DaraCore.sleep(_backoff_time)
            _retries_attempted = _retries_attempted + 1
            try:
                _request = DaraRequest()
                _request.method = 'GET'
                _request.pathname = '/'
                _request.headers = {
                    'host': 'www.test.com'
                }
                _last_request = _request
                _response = DaraCore.do_action(_request, _runtime)
                _last_response = _response
                return
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)

    async def hello_runtime_async(self) -> None:
        _runtime = {
        }
        _last_request = None
        _last_response = None
        _retries_attempted = 0
        _context = RetryPolicyContext(
            retries_attempted= _retries_attempted
        )
        while DaraCore.should_retry(_runtime.get('retryOptions'), _context):
            if _retries_attempted > 0:
                _backoff_time = DaraCore.get_backoff_time(_runtime.get('retryOptions'), _context)
                if _backoff_time > 0:
                    DaraCore.sleep(_backoff_time)
            _retries_attempted = _retries_attempted + 1
            try:
                _request = DaraRequest()
                _request.method = 'GET'
                _request.pathname = '/'
                _request.headers = {
                    'host': 'www.test.com'
                }
                _last_request = _request
                _response = await DaraCore.async_do_action(_request, _runtime)
                _last_response = _response
                return
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)
