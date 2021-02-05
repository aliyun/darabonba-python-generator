# -*- coding: utf-8 -*-
# top comment
# This file is auto-generated, don't edit it. Thanks.
from __future__ import unicode_literals

import time

from Tea.request import TeaRequest
from Tea.core import TeaCore
from Tea.exceptions import UnretryableException

from tea_python_tests import models as main_models


class Client(object):
    """
    top annotation
    """
    # type's comment
    _a = None  # type: list[unicode]
    _comple_list = None  # type: list[list[unicode]]
    _endpoint_map = None  # type: dict[unicode, unicode]

    def __init__(self):
        """
        Init Func
        """
        # string declate comment
        str = 'sss'
        # new model instance comment
        model_instance = main_models.Test1(
            test='test',
            # test declare back comment,
            test_2='test2',
            # test2 declare back comment
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
                    # test declare front comment,
                    test='test',
                    # test2 declare front comment,
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
                    # empty model
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

        @type str: unicode
        @param str: description: string parameter

        @type val: bool
        @param val: description: boolean parameter

        @rtype: unicode
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

        @type comple_list: list
        @param comple_list: list parameter

        @type map_test: dict
        @param map_test: dict parameter

        @param read: readable parameter

        @param any_test: any parameter

        @param test_1: Model parameter

        @return: void description for return
        """
        pass
