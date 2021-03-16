# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
import time

from Source.source_client import SourceClient
from Tea.request import TeaRequest
from Tea.core import TeaCore
from Tea.exceptions import UnretryableException
from Tea.response import TeaResponse
from typing import List, Dict, Any

from Source import models as source_models
from tea_python_tests import models as main_models


class Client(SourceClient):
    _configs: List[source_models.Config] = None

    def __init__(
        self, 
        config: source_models.Config,
    ):
        super().__init__(config)
        self._configs[0] = config

    def complex_1(
        self,
        request: main_models.ComplexRequest,
        client: SourceClient,
    ) -> source_models.RuntimeObject:
        request.validate()
        _runtime = {
            'timeouted': 'retry'
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
                x = False
                y = True
                z = False
                if x and y or not z:
                    x = y
                # to map test.
                req = source_models.Request()
                m = self.call_to_map(TeaCore.to_map(req))
                name = 'complex'
                map_val = {
                    'test': 'ok'
                }
                version = f"/{'2019-01-08'}{self._pathname}"
                module_model_map_val = {}
                module_map_val = {}
                model_map_val = {}
                sub_model_map_val = {}
                _request.protocol = self._protocol
                _request.port = 80
                _request.method = 'GET'
                _request.pathname = f'/{self._pathname}'
                _request.query = SourceClient.query(TeaCore.merge({
                    'date': '2019'
                }, request.header,
                    map_val))
                _request.body = SourceClient.body()
                _last_request = _request
                _response = TeaCore.do_action(_request, _runtime)
                if True and True:
                    return
                elif True or False:
                    return source_models.RuntimeObject()
                client.print(TeaCore.to_map(request), '1')
                client.print_async(TeaCore.to_map(request), '1')
                self.hello(TeaCore.to_map(request), [
                    '1',
                    '2'
                ])
                self.hello(None, None)
                self.complex_3(None)
                return TeaCore.from_map(
                    source_models.RuntimeObject(),
                    {}
                )
            except Exception as e:
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)

    async def complex_1_async(
        self,
        request: main_models.ComplexRequest,
        client: SourceClient,
    ) -> source_models.RuntimeObject:
        request.validate()
        _runtime = {
            'timeouted': 'retry'
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
                x = False
                y = True
                z = False
                if x and y or not z:
                    x = y
                # to map test.
                req = source_models.Request()
                m = self.call_to_map(TeaCore.to_map(req))
                name = 'complex'
                map_val = {
                    'test': 'ok'
                }
                version = f"/{'2019-01-08'}{self._pathname}"
                module_model_map_val = {}
                module_map_val = {}
                model_map_val = {}
                sub_model_map_val = {}
                _request.protocol = self._protocol
                _request.port = 80
                _request.method = 'GET'
                _request.pathname = f'/{self._pathname}'
                _request.query = SourceClient.query(TeaCore.merge({
                    'date': '2019'
                }, request.header,
                    map_val))
                _request.body = SourceClient.body()
                _last_request = _request
                _response = await TeaCore.async_do_action(_request, _runtime)
                if True and True:
                    return
                elif True or False:
                    return source_models.RuntimeObject()
                client.print(TeaCore.to_map(request), '1')
                await client.print_async_async(TeaCore.to_map(request), '1')
                await self.hello_async(TeaCore.to_map(request), [
                    '1',
                    '2'
                ])
                await self.hello_async(None, None)
                await self.complex_3_async(None)
                return TeaCore.from_map(
                    source_models.RuntimeObject(),
                    {}
                )
            except Exception as e:
                if TeaCore.is_retryable(e):
                    _last_exception = e
                    continue
                raise e
        raise UnretryableException(_last_request, _last_exception)

    def complex_2(
        self,
        request: main_models.ComplexRequest,
        str: List[str],
        val: Dict[str, str],
    ) -> dict:
        request.validate()
        _request = TeaRequest()
        name = 'complex'
        config = source_models.Config()
        client = SourceClient(config)
        _request.protocol = 'HTTP'
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.query = SourceClient.query({
            'date': '2019',
            'version': '2019-01-08',
            'protocol': _request.protocol
        })
        _request.body = SourceClient.body()
        _last_request = _request
        _response = TeaCore.do_action(_request)

    async def complex_2_async(
        self,
        request: main_models.ComplexRequest,
        str: List[str],
        val: Dict[str, str],
    ) -> dict:
        request.validate()
        _request = TeaRequest()
        name = 'complex'
        config = source_models.Config()
        client = SourceClient(config)
        _request.protocol = 'HTTP'
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.query = SourceClient.query({
            'date': '2019',
            'version': '2019-01-08',
            'protocol': _request.protocol
        })
        _request.body = SourceClient.body()
        _last_request = _request
        _response = await TeaCore.async_do_action(_request)

    def complex_3(
        self,
        request: main_models.ComplexRequest,
    ) -> main_models.ComplexRequest:
        request.validate()
        _request = TeaRequest()
        name = 'complex'
        _request.protocol = self.template_string()
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.query = SourceClient.query({
            'date': '2019'
        })
        _request.body = SourceClient.body()
        _request.headers['host'] = 'hello'
        _last_request = _request
        _response = TeaCore.do_action(_request)
        resp = _response
        req = source_models.Request(
            accesskey=request.access_key,
            region=resp.status_message
        )
        self.array_0(TeaCore.to_map(request))
        req.accesskey = 'accesskey'
        req.accesskey = request.access_key
        SourceClient.parse(main_models.ComplexRequest())
        SourceClient.array(TeaCore.to_map(request), '1')
        SourceClient.async_func()
        return TeaCore.from_map(
            main_models.ComplexRequest(),
            TeaCore.merge(_request.query)
        )

    async def complex_3_async(
        self,
        request: main_models.ComplexRequest,
    ) -> main_models.ComplexRequest:
        request.validate()
        _request = TeaRequest()
        name = 'complex'
        _request.protocol = await self.template_string_async()
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.query = SourceClient.query({
            'date': '2019'
        })
        _request.body = SourceClient.body()
        _request.headers['host'] = 'hello'
        _last_request = _request
        _response = await TeaCore.async_do_action(_request)
        resp = _response
        req = source_models.Request(
            accesskey=request.access_key,
            region=resp.status_message
        )
        self.array_0(TeaCore.to_map(request))
        req.accesskey = 'accesskey'
        req.accesskey = request.access_key
        SourceClient.parse(main_models.ComplexRequest())
        SourceClient.array(TeaCore.to_map(request), '1')
        await SourceClient.async_func_async()
        return TeaCore.from_map(
            main_models.ComplexRequest(),
            TeaCore.merge(_request.query)
        )

    def hello(
        self,
        request: dict,
        strs: List[str],
    ) -> List[str]:
        return self.array_1()

    async def hello_async(
        self,
        request: dict,
        strs: List[str],
    ) -> List[str]:
        return self.array_1()

    @staticmethod
    def print(
        reqeust: TeaRequest,
        reqs: List[main_models.ComplexRequest],
        response: TeaResponse,
        val: Dict[str, str],
    ) -> source_models.Request:
        return TeaCore.from_map(
            source_models.Request(),
            {}
        )

    @staticmethod
    async def print_async(
        reqeust: TeaRequest,
        reqs: List[main_models.ComplexRequest],
        response: TeaResponse,
        val: Dict[str, str],
    ) -> source_models.Request:
        return TeaCore.from_map(
            source_models.Request(),
            {}
        )

    @staticmethod
    def array_0(
        req: dict,
    ) -> List[Any]:
        temp = source_models.Config()
        any_arr = [
            temp
        ]
        return {}

    @staticmethod
    def array_1() -> List[str]:
        return [
            '1'
        ]

    def template_string(self) -> str:
        return f'/{self._protocol}'

    async def template_string_async(self) -> str:
        return f'/{self._protocol}'

    def empty_model(self) -> None:
        main_models.ComplexRequest()
        main_models.ComplexRequestHeader()
        status = ''
        try:
            status = 'failed'
        except Exception as e:
            status = 'catch exception'
        finally:
            status = 'ok'

    async def empty_model_async(self) -> None:
        main_models.ComplexRequest()
        main_models.ComplexRequestHeader()
        status = ''
        try:
            status = 'failed'
        except Exception as e:
            status = 'catch exception'
        finally:
            status = 'ok'

    @staticmethod
    def array_access() -> str:
        configs = [
            'a',
            'b',
            'c'
        ]
        config = configs[0]
        return config

    @staticmethod
    def array_access_2() -> str:
        data = {
            'configs': [
                'a',
                'b',
                'c'
            ]
        }
        config = data['configs'][0]
        return config

    @staticmethod
    def array_access_3(
        request: main_models.ComplexRequest,
        index: int,
    ) -> str:
        config_val = request.configs.value[0]
        val = request.configs.value[index]
        return config_val

    @staticmethod
    def array_assign(
        config: str,
    ) -> List[str]:
        configs = [
            'a',
            'b',
            'c'
        ]
        configs[3] = config
        return configs

    @staticmethod
    def array_assign_2(
        config: str,
    ) -> List[str]:
        data = {
            'configs': [
                'a',
                'b',
                'c'
            ]
        }
        data['configs'][3] = config
        return data.get('configs')

    @staticmethod
    def array_assign_3(
        request: main_models.ComplexRequest,
        config: str,
    ) -> None:
        request.configs.value[0] = config

    @staticmethod
    def map_access(
        request: main_models.ComplexRequest,
    ) -> str:
        config_info = request.configs.extra.get('name')
        return config_info

    @staticmethod
    def map_access_2(
        request: source_models.Request,
        key: str,
    ) -> str:
        config_info = request.configs.extra.get('name')
        config_value = request.configs.extra.get(key)
        return config_info

    @staticmethod
    def map_access_3() -> str:
        data = {
            'configs': {
                'value': 'string'
            }
        }
        return data['configs'].get('value')

    @staticmethod
    def map_assign(
        request: main_models.ComplexRequest,
        name: str,
    ) -> None:
        request.configs.extra['name'] = name

    @staticmethod
    def str_fmt() -> None:
        s = 'strtest'
        s_1 = f' % 1{s}'
        s_2 = f''' "hello" 'world' {s}'''
        s_3 = f'hello world'
        s_4 = f'''{{
    "json": "json val",
    "key": "value"
  }}'''
        s_5 = f' %s str:{s}'
        s_6 = f' %%s str'
        fs_1 = f'{{"key": "{s}"}}'
        fs_2 = f'{{{{"key": "{s}"}}}}'
        fs_3 = f' {s}'

    @staticmethod
    def call_to_map(
        m: Dict[str, Any],
    ) -> Dict[str, Any]:
        return m
