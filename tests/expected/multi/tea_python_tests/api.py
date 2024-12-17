# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.core import DaraCore 
from darabonba.exceptions import UnretryableException 
from darabonba.policy.retry import RetryPolicyContext 
from darabonba.request import DaraRequest 
from tea_python_tests.lib.util import Util 




class Client:
    def __init__(self):
        pass

    def test_3(self) -> int:
        _runtime = {
            'timeouted': 'retry',
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
                _request.protocol = 'https'
                _request.method = 'DELETE'
                _request.pathname = '/'
                _request.headers = {
                    'host': 'test.aliyun.com',
                    'accept': 'application/json'
                }
                _request.query = Util.get_query()
                _last_request = _request
                _response = DaraCore.do_action(_request, _runtime)
                _last_response = _response
                return _response.status_code
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)

    async def test_3_async(self) -> int:
        _runtime = {
            'timeouted': 'retry',
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
                _request.protocol = 'https'
                _request.method = 'DELETE'
                _request.pathname = '/'
                _request.headers = {
                    'host': 'test.aliyun.com',
                    'accept': 'application/json'
                }
                _request.query = Util.get_query()
                _last_request = _request
                _response = await DaraCore.async_do_action(_request, _runtime)
                _last_response = _response
                return _response.status_code
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)
