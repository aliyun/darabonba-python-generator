# -*- coding: utf-8 -*-
# top comment
# This file is auto-generated, don't edit it. Thanks.
import time

from Tea.request import TeaRequest
from Tea.core import TeaCore
from Tea.exceptions import UnretryableException
from typing import List, Dict, BinaryIO, Any

from tea_python_tests import models as main_models


class Client:
    """
    top annotation
    """
    # type's comment
    _a = None  # type: List[str]
    _comple_list = None  # type: List[List[str]]
    _endpoint_map = None  # type: Dict[str, str]

    def __init__(self):
        """
        Init Func
        """
        # string declate comment
        str = 'sss'
        # new model instance comment
        model_instance = main_models.Test1(
            test='test',
            test_2='test2'
        )
        array = [
            # array string comment
            'string',
            # array number comment
            300
        ]

    def test_api(self):
        """
        testAPI
        testAPI comment one
        testAPI comment two
        """
        _runtime = [
            # empty runtime comment
            # another runtime comment
        ]
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
                # new model instance comment
                model_instance = main_models.Test1(
                    test='test',
                    test_2='test2'
                )
                # number declare comment
                num = 123
                # static function call comment
                self.static_func()
                _last_request = _request
                _response = TeaCore.do_action(_request, _runtime)
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
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)

    def test_api2(self):
        """
        testAPI2 comment
        """
        _runtime = {
            # runtime retry comment
            'retry': True,
            # runtime back comment one
            # runtime back comment two
        }
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
                # new model instance comment
                model_instance = main_models.Test3(

                )
                # boolean declare comment
                bool = True
                if bool:
                    # empty if
                    pass
                else:
                    # empty else
                    pass
                # api function call comment
                self.test_api()
                _last_request = _request
                _response = TeaCore.do_action(_request, _runtime)
                # empty return comment
                # back comment
            except Exception as e:
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)

    @staticmethod
    def static_func():
        a = [
            # empty annotation comment
        ]

    @staticmethod
    def test_func(str, val, comple_list):
        """
        testFunc

        @type str: str
        @param str: description: string parameter

        @type val: bool
        @param val: description: boolean parameter

        @rtype: str
        @return: `test` for return
        """
        # empty comment1
        # empty comment2
        s = 'test'
        return s

    @staticmethod
    def test_func_params(comple_list, map_test, read, any_test, test_1):
        """
        testFuncComment

        @type comple_list: List[List[str]]
        @param comple_list: list parameter

        @type map_test: Dict[str, str]
        @param map_test: dict parameter

        @type read: BinaryIO
        @param read: readable parameter

        @type any_test: Any
        @param any_test: any parameter

        @type test_1: main_models.Test1
        @param test_1: Model parameter

        @return: void description for return
        """
        pass


class AioClient(Client):
    """
    top annotation
    """
    # type's comment
    _a = None  # type: List[str]
    _comple_list = None  # type: List[List[str]]
    _endpoint_map = None  # type: Dict[str, str]

    def __init__(self):
        """
        Init Func
        """
        # string declate comment
        str = 'sss'
        # new model instance comment
        model_instance = main_models.Test1(
            test='test',
            test_2='test2'
        )
        array = [
            # array string comment
            'string',
            # array number comment
            300
        ]

    async def test_api(self):
        """
        testAPI
        testAPI comment one
        testAPI comment two
        """
        _runtime = [
            # empty runtime comment
            # another runtime comment
        ]
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
                # new model instance comment
                model_instance = main_models.Test1(
                    test='test',
                    test_2='test2'
                )
                # number declare comment
                num = 123
                # static function call comment
                self.static_func()
                _last_request = _request
                _response = await TeaCore.async_do_action(_request, _runtime)
                # static async function call
                await self.test_func('test', True, [
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
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)

    async def test_api2(self):
        """
        testAPI2 comment
        """
        _runtime = {
            # runtime retry comment
            'retry': True,
            # runtime back comment one
            # runtime back comment two
        }
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
                # new model instance comment
                model_instance = main_models.Test3(

                )
                # boolean declare comment
                bool = True
                if bool:
                    # empty if
                    pass
                else:
                    # empty else
                    pass
                # api function call comment
                await self.test_api()
                _last_request = _request
                _response = await TeaCore.async_do_action(_request, _runtime)
                # empty return comment
                # back comment
            except Exception as e:
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)

    @staticmethod
    def static_func():
        a = [
            # empty annotation comment
        ]

    @staticmethod
    async def test_func(str, val, comple_list):
        """
        testFunc

        @type str: str
        @param str: description: string parameter

        @type val: bool
        @param val: description: boolean parameter

        @rtype: str
        @return: `test` for return
        """
        # empty comment1
        # empty comment2
        s = 'test'
        return s

    @staticmethod
    async def test_func_params(comple_list, map_test, read, any_test, test_1):
        """
        testFuncComment

        @type comple_list: List[List[str]]
        @param comple_list: list parameter

        @type map_test: Dict[str, str]
        @param map_test: dict parameter

        @type read: BinaryIO
        @param read: readable parameter

        @type any_test: Any
        @param any_test: any parameter

        @type test_1: main_models.Test1
        @param test_1: Model parameter

        @return: void description for return
        """
        pass
