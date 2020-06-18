# top comment
# This file is auto-generated, don't edit it. Thanks.
import time

from tea_python_tests import models as main_models
from Tea.request import TeaRequest
from Tea.exceptions import TeaException
from Tea.core import TeaCore
from Tea.response import TeaResponse
from Tea.exceptions import UnretryableException

"""
top annotation
"""


class Client:
    # type's comment
    def __init__(self, _a=None):
        """
        Init Func
        """
        self._a = []
        # string declate comment
        str = "sss"
        # new model instance comment
        model_instance = main_models.Test1(
            test="test",
            test_2="test2"
        )
        array = [
            # array string comment
            "string",
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
                    test="test",
                    test_2="test2"
                )
                # number declare comment
                num = 123
                # static function call comment
                self.static_func()
                _last_request = _request
                _response = TeaCore.do_action(_request, _runtime)
                # static async function call
                self.test_func("test", True)
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
        _runtime = [
            # runtime retry comment
            "retry": True,
            # runtime back comment one
            # runtime back comment two
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
    def test_func(str, val):
        """
        testFunc
          * @param str: description: string parameter
          * @param val: description: boolean parameter
          * @return void description for return
        """
        # empty comment1
        # empty comment2
        pass
