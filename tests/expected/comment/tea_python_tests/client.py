# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from tea_python_tests import models as main_models 
from darabonba.core import DaraCore 
from darabonba.exceptions import UnretryableException 
from darabonba.policy.retry import RetryPolicyContext 
from darabonba.request import DaraRequest 
from typing import List, Dict, BinaryIO, Any


# top comment
"""
 * @remarks
 * top annotation
"""
class Client:
    # type's comment
    _a: List[str] = None
    _comple_list: List[List[str]] = None
    _endpoint_map: Dict[str, str] = None
    def __init__(self):
        # string declate comment
        str = 'sss'
        # new model instance comment
        model_instance = main_models.Test1(
            test = 'test',
        # est declare back comment
            test_2 = 'test2'
        )
        array = [
        # array string comment
            'string',
        # array number comment
            300
        # array back comment
        ]

    """
     * @remarks
     * testAPI
    """
    # estAPI comment one
    # estAPI comment two
    def test_api(self) -> None:
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
                # new model instance comment
                model_instance = main_models.Test1(
                # test declare front comment
                    test = 'test',
                # test2 declare front comment
                    test_2 = 'test2'
                )
                # number declare comment
                num = 123
                # static function call comment
                self.static_func()
                _last_request = _request
                _response = DaraCore.do_action(_request, _runtime)
                _last_response = _response
                # static async function call
                self.test_func('test', True, [
                    [
                        'str'
                    ],
                    [
                        'str1'
                    ]
                ])
                # return comment
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

    async def test_api_async(self) -> None:
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
                # new model instance comment
                model_instance = main_models.Test1(
                # test declare front comment
                    test = 'test',
                # test2 declare front comment
                    test_2 = 'test2'
                )
                # number declare comment
                num = 123
                # static function call comment
                self.static_func()
                _last_request = _request
                _response = await DaraCore.async_do_action(_request, _runtime)
                _last_response = _response
                # static async function call
                await self.test_func_async('test', True, [
                    [
                        'str'
                    ],
                    [
                        'str1'
                    ]
                ])
                # return comment
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

    # testAPI2 comment
    def test_api2(self) -> None:
        _runtime = {
            'retry': True,
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
                # new model instance comment
                model_instance = main_models.Test3()
                # boolean declare comment
                bool = True
                if bool:
                    # mpty if
                    pass
                else:
                  # mpty else
                    pass
                # api function call comment
                self.test_api()
                # back comment
                _last_request = _request
                _response = DaraCore.do_action(_request, _runtime)
                _last_response = _response
                # empty return comment
                pass
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)

    async def test_api2_async(self) -> None:
        _runtime = {
            'retry': True,
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
                # new model instance comment
                model_instance = main_models.Test3()
                # boolean declare comment
                bool = True
                if bool:
                    # mpty if
                    pass
                else:
                  # mpty else
                    pass
                # api function call comment
                await self.test_api_async()
                # back comment
                _last_request = _request
                _response = await DaraCore.async_do_action(_request, _runtime)
                _last_response = _response
                # empty return comment
                pass
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)

    @staticmethod
    def static_func() -> None:
        a = [ 
        # empty annotation comment
        ]

    @staticmethod
    def test_func(
        str: str,
        val: bool,
        comple_list: List[List[str]],
    ) -> str:
        # empty comment1
        # empty comment2
        s = 'test'
        return s

    @staticmethod
    async def test_func_async(
        str: str,
        val: bool,
        comple_list: List[List[str]],
    ) -> str:
        # empty comment1
        # empty comment2
        s = 'test'
        return s

    @staticmethod
    def test_func_params(
        comple_list: List[List[str]],
        map_test: Dict[str, str],
        read: BinaryIO,
        any_test: Any,
        test_1: main_models.Test1,
    ) -> None:
        pass

    @staticmethod
    async def test_func_params_async(
        comple_list: List[List[str]],
        map_test: Dict[str, str],
        read: BinaryIO,
        any_test: Any,
        test_1: main_models.Test1,
    ) -> None:
        pass
