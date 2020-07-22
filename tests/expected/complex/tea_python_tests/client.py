# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
import time

from Source.SourceClient import SourceClient as SourceSourceClient
from tea_python_tests import models as main_models
from Source import models as source_models
from Tea.request import TeaRequest
from Tea.exceptions import TeaException
from Tea.core import TeaCore
from Tea.response import TeaResponse
from Tea.exceptions import UnretryableException


class Client(SourceSourceClient):

    def complex_1(self, request, client):
        request.validate()
        _runtime = {
            "timeouted": "retry"
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
                name = "complex"
                map_val = {
                    "test": "ok"
                }
                version = "/" + "2019-01-08" + "" + str(self._pathname) + ""
                _request.protocol = self._protocol
                _request.port = 80
                _request.method = "GET"
                _request.pathname = "/" + str(self._pathname) + ""
                _request.query = SourceSourceClient.query(TeaCore.merge({
                    "date": "2019"
                }, request.header,
                    map_val))
                _request.body = SourceSourceClient.body()
                _last_request = _request
                _response = TeaCore.do_action(_request, _runtime)
                if True and True:
                    return
                elif True or False:
                    return source_models.RuntimeObject(

                    )
                client.print(request.to_map(), "1")
                client.print_async(request.to_map(), "1")
                self.hello(request.to_map(), [
                    "1",
                    "2"
                ])
                self.hello(None, None)
                return main_models.RuntimeObject().from_map({})

                self.complex_3(None)
            except Exception as e:
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)

    def complex_2(self, request, str, val):
        request.validate()
        _request = TeaRequest()
        name = "complex"
        config = source_models.Config(

        )
        client = SourceSourceClient(config)
        _request.protocol = "HTTP"
        _request.port = 80
        _request.method = "GET"
        _request.pathname = "/"
        _request.query = SourceSourceClient.query({
            "date": "2019",
            "version": "2019-01-08",
            "protocol": _request.protocol
        })
        _request.body = SourceSourceClient.body()
        _last_request = _request
        _response = TeaCore.do_action(_request)

    def complex_3(self, request):
        request.validate()
        _request = TeaRequest()
        name = "complex"
        _request.protocol = self.template_string()
        _request.port = 80
        _request.method = "GET"
        _request.pathname = "/"
        _request.query = SourceSourceClient.query({
            "date": "2019"
        })
        _request.body = SourceSourceClient.body()
        _request.headers["host"] = "hello"
        _last_request = _request
        _response = TeaCore.do_action(_request)
        resp = _response
        req = source_models.Request(
            accesskey=request.access_key,
            region=resp.status_message
        )
        self.array_0(request.to_map())
        req.accesskey = "accesskey"
        req.accesskey = request.access_key
        SourceSourceClient.parse(main_models.ComplexRequest())
        SourceSourceClient.array(request.to_map(), "1")
        SourceSourceClient.async_func()
        return main_models.ComplexRequest().from_map(TeaCore.merge(_request.query))


    def hello(self, request, strs):
        return self.array_1()

    @staticmethod
    def print(reqeust, reqs, response, val):
        pass

    @staticmethod
    def array_0(req):
        return {}

    @staticmethod
    def array_1():
        return [
            "1"
        ]

    def template_string(self):
        return "/" + str(self._protocol) + ""

    def empty_model(self):
        main_models.ComplexRequest()
        main_models.ComplexRequestHeader()
        status = ""
        try:
            status = "failed"
        except Exception as e:
            status = "catch exception"
        finally:
            status = "ok"
    def __init__(self):
        pass
