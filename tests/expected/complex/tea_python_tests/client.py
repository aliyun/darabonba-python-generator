# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

import logging

from typing import List, Dict, Any

from darabonba.core import DaraCore
from darabonba.exceptions import DaraException, UnretryableException
from darabonba.policy.retry import RetryPolicyContext
from darabonba.request import DaraRequest
from darabonba.response import DaraResponse
from Source import exceptions as source_exceptions
from Source import models as source_models
from Source.source_client import SourceClient
from tea_python_tests import exceptions as main_exceptions
from tea_python_tests import models as main_models

class Client(SourceClient):
    _protocol: str = None
    _pathname: str = None
    __strs: List[str] = None
    _comple_list: List[List[str]] = None
    _endpoint_map: Dict[str, str] = None
    _configs: List[source_models.Config] = None

    def __init__(
        self,
        source_config: source_models.Config,
    ):
        super().__init__(source_config)
        self._configs[0] = source_config
        test = SourceClient(source_config)
        self.print_data(DaraCore.to_map(source_config), 'test')

    def complex_1(
        self,
        request: main_models.ComplexRequest,
        source_client: SourceClient,
    ) -> source_models.RuntimeObject:
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
                name = 'complex'
                read = None
                byt = None
                module_model_map_val = {}
                module_map_val = {}
                model_map_val = {}
                sub_model_map_val = {}
                req_map = None
                map_string = {
                    'str': request.access_key
                }
                inte = 1
                a = 1
                b = None
                b = a
                c = a
                self.int_to_int_32(a)
                map_val = {
                    'read': read,
                    'test': '{"test":"ok"}',
                    'b': request.b,
                    'num': request.num,
                    'u16': request.u_16,
                    'u32': request.u_32,
                    'u64': request.u_64,
                    'u16List': request.uint_16list,
                    'u32List': request.uint_32list,
                    'u64List': request.uint_64list,
                    'i64List': request.int_64list,
                    'i16List': request.int_16list,
                    'i32List': request.int_32list,
                    'intList': request.int_list,
                    'stringList': request.string_list,
                    'i32': request.i_32,
                    'booleantList': request.booleant_list,
                    'floatList': request.float_list,
                    'float64List': request.f_64list,
                    'f32': request.f_32,
                    'f64': request.f_64,
                    'i64': request.i_64
                }
                abool = True
                req = main_models.ComplexRequest(
                    b = False,
                    num = 10,
                    i_32 = a,
                    int_list = [
                        10,
                        11
                    ],
                    int_16list = [
                        10,
                        11
                    ],
                    int_32list = [
                        10,
                        11
                    ],
                    int_64list = [
                        10,
                        11
                    ],
                    long_list = [
                        10,
                        11
                    ],
                    float_list = [
                        0.1,
                        0.2
                    ],
                    string_list = [
                        '10',
                        '11'
                    ],
                    booleant_list = [
                        True,
                        False
                    ]
                )
                long_list = [
                    432435
                ]
                any_list = [
                    432435,
                    'str',
                    True,
                    10,
                    0.1
                ]
                float_map = {
                    'key1': 0.1,
                    'key2': 0.2
                }
                double_map = {
                    'key1': 0.1,
                    'key2': 0.2
                }
                int_map = {
                    'key1': 1,
                    'key2': 2
                }
                long_map = {
                    'key1': 1,
                    'key2': 2
                }
                int_16map = {
                    'key1': 1,
                    'key2': 2
                }
                int_32map = {
                    'key1': 1,
                    'key2': 2
                }
                int_64map = {
                    'key1': 1,
                    'key2': 2
                }
                any_map = {
                    'key1': 0.1,
                    'key2': 1,
                    'key3': 'test',
                    'key4': True,
                    'key5': [
                        'test',
                        1,
                        True,
                        [
                            'test'
                        ]
                    ],
                    'key6': [
                        {
                            'a': 'test',
                            'b': 1,
                            'c': True,
                            'd': [
                                'test'
                            ]
                        }
                    ]
                }
                for item_tmp in any_list:
                    logging.log(logging.INFO, f'{item_tmp}')
                for item in [
                    '1',
                    '2'
                ]:
                    any_map = {}
                    any_map[item] = 'test'
                    break
                self.__strs = request.strs
                self._protocol = 'test'
                self._endpoint_map.get(self._protocol)
                self._endpoint_map['test'] = 'ok'
                request.strs = self.__strs
                _request.protocol = self._protocol
                _request.port = request.num
                _request.method = 'GET'
                _request.pathname = f'/{self._pathname}'
                _request.query = {
                    'date': '2019',
                    'name': _request.method
                }
                tmp = DaraCore.merge({}, _request.query, _request.headers, _request)
                _last_request = _request
                _response = DaraCore.do_action(_request, _runtime)
                _last_response = _response
                if True and True:
                    return
                elif SourceClient.judge_str('test') or False:
                    return source_models.RuntimeObject()
                source_client.print_data_async(DaraCore.to_map(request), '1')
                self.hello(DaraCore.to_map(request), [
                    '1',
                    '2'
                ], None)
                self.hello(None, None, None)
                return DaraCore.from_map(
                    source_models.RuntimeObject(),
                    {}
                )
                self.complex_3(None, 'test')
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

    async def complex_1_async(
        self,
        request: main_models.ComplexRequest,
        source_client: SourceClient,
    ) -> source_models.RuntimeObject:
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
                name = 'complex'
                read = None
                byt = None
                module_model_map_val = {}
                module_map_val = {}
                model_map_val = {}
                sub_model_map_val = {}
                req_map = None
                map_string = {
                    'str': request.access_key
                }
                inte = 1
                a = 1
                b = None
                b = a
                c = a
                self.int_to_int_32(a)
                map_val = {
                    'read': read,
                    'test': '{"test":"ok"}',
                    'b': request.b,
                    'num': request.num,
                    'u16': request.u_16,
                    'u32': request.u_32,
                    'u64': request.u_64,
                    'u16List': request.uint_16list,
                    'u32List': request.uint_32list,
                    'u64List': request.uint_64list,
                    'i64List': request.int_64list,
                    'i16List': request.int_16list,
                    'i32List': request.int_32list,
                    'intList': request.int_list,
                    'stringList': request.string_list,
                    'i32': request.i_32,
                    'booleantList': request.booleant_list,
                    'floatList': request.float_list,
                    'float64List': request.f_64list,
                    'f32': request.f_32,
                    'f64': request.f_64,
                    'i64': request.i_64
                }
                abool = True
                req = main_models.ComplexRequest(
                    b = False,
                    num = 10,
                    i_32 = a,
                    int_list = [
                        10,
                        11
                    ],
                    int_16list = [
                        10,
                        11
                    ],
                    int_32list = [
                        10,
                        11
                    ],
                    int_64list = [
                        10,
                        11
                    ],
                    long_list = [
                        10,
                        11
                    ],
                    float_list = [
                        0.1,
                        0.2
                    ],
                    string_list = [
                        '10',
                        '11'
                    ],
                    booleant_list = [
                        True,
                        False
                    ]
                )
                long_list = [
                    432435
                ]
                any_list = [
                    432435,
                    'str',
                    True,
                    10,
                    0.1
                ]
                float_map = {
                    'key1': 0.1,
                    'key2': 0.2
                }
                double_map = {
                    'key1': 0.1,
                    'key2': 0.2
                }
                int_map = {
                    'key1': 1,
                    'key2': 2
                }
                long_map = {
                    'key1': 1,
                    'key2': 2
                }
                int_16map = {
                    'key1': 1,
                    'key2': 2
                }
                int_32map = {
                    'key1': 1,
                    'key2': 2
                }
                int_64map = {
                    'key1': 1,
                    'key2': 2
                }
                any_map = {
                    'key1': 0.1,
                    'key2': 1,
                    'key3': 'test',
                    'key4': True,
                    'key5': [
                        'test',
                        1,
                        True,
                        [
                            'test'
                        ]
                    ],
                    'key6': [
                        {
                            'a': 'test',
                            'b': 1,
                            'c': True,
                            'd': [
                                'test'
                            ]
                        }
                    ]
                }
                for item_tmp in any_list:
                    logging.log(logging.INFO, f'{item_tmp}')
                for item in [
                    '1',
                    '2'
                ]:
                    any_map = {}
                    any_map[item] = 'test'
                    break
                self.__strs = request.strs
                self._protocol = 'test'
                self._endpoint_map.get(self._protocol)
                self._endpoint_map['test'] = 'ok'
                request.strs = self.__strs
                _request.protocol = self._protocol
                _request.port = request.num
                _request.method = 'GET'
                _request.pathname = f'/{self._pathname}'
                _request.query = {
                    'date': '2019',
                    'name': _request.method
                }
                tmp = DaraCore.merge({}, _request.query, _request.headers, _request)
                _last_request = _request
                _response = await DaraCore.async_do_action(_request, _runtime)
                _last_response = _response
                if True and True:
                    return
                elif SourceClient.judge_str('test') or False:
                    return source_models.RuntimeObject()
                await source_client.print_data_async_async(DaraCore.to_map(request), '1')
                await self.hello_async(DaraCore.to_map(request), [
                    '1',
                    '2'
                ], None)
                await self.hello_async(None, None, None)
                return DaraCore.from_map(
                    source_models.RuntimeObject(),
                    {}
                )
                await self.complex_3_async(None, 'test')
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

    def complex_2(
        self,
        request: main_models.ComplexRequest,
        str: List[str],
        val: Dict[str, str],
    ) -> dict:
        _request = DaraRequest()
        name = 'complex'
        config = source_models.Config()
        source_client = SourceClient(config)
        config_array = [
            config
        ]
        source_client.print_data_sse(DaraCore.to_map(request), '1')
        _request.protocol = 'HTTP'
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.query = {
            'date': '2019',
            'protocol': _request.protocol
        }
        _last_request = _request
        _response = DaraCore.do_action(_request)

        return {}

    async def complex_2_async(
        self,
        request: main_models.ComplexRequest,
        str: List[str],
        val: Dict[str, str],
    ) -> dict:
        _request = DaraRequest()
        name = 'complex'
        config = source_models.Config()
        source_client = SourceClient(config)
        config_array = [
            config
        ]
        source_client.print_data_sse_async(DaraCore.to_map(request), '1')
        _request.protocol = 'HTTP'
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.query = {
            'date': '2019',
            'protocol': _request.protocol
        }
        _last_request = _request
        _response = await DaraCore.async_do_action(_request)

        return {}

    def complex_map(self) -> Dict[str, Any]:
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
                pass
                _last_request = _request
                _response = DaraCore.do_action(_request, _runtime)
                _last_response = _response

                return {}
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)

    async def complex_map_async(self) -> Dict[str, Any]:
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
                pass
                _last_request = _request
                _response = await DaraCore.async_do_action(_request, _runtime)
                _last_response = _response

                return {}
            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)

    def complex_3(
        self,
        request: main_models.ComplexRequest,
        name: str,
    ) -> main_models.ComplexRequest:
        _request = DaraRequest()
        name = 'complex'
        _request.protocol = self.template_string()
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.body = 'body'
        _request.query = {
            'date': '2019'
        }
        tmp = None
        tmp = self.return_model()
        name = self._protocol
        _last_request = _request
        _response = DaraCore.do_action(_request)
        x = False
        y = True
        z = False
        if x and y or not z:
            x = y
        resp = _response
        req = source_models.Request(
            accesskey = request.access_key,
            region = resp.status_message
        )
        self.array_0(DaraCore.to_map(request))
        req.accesskey = 'accesskey'
        req.accesskey = request.access_key
        self.print_null()
        self.throws_func()
        _response.status_code
        SourceClient.array(DaraCore.to_map(request), '1')
        return DaraCore.from_map(
            main_models.ComplexRequest(),
            DaraCore.merge({}, _request.query)
        )

    async def complex_3_async(
        self,
        request: main_models.ComplexRequest,
        name: str,
    ) -> main_models.ComplexRequest:
        _request = DaraRequest()
        name = 'complex'
        _request.protocol = await self.template_string_async()
        _request.port = 80
        _request.method = 'GET'
        _request.pathname = '/'
        _request.body = 'body'
        _request.query = {
            'date': '2019'
        }
        tmp = None
        tmp = self.return_model()
        name = self._protocol
        _last_request = _request
        _response = await DaraCore.async_do_action(_request)
        x = False
        y = True
        z = False
        if x and y or not z:
            x = y
        resp = _response
        req = source_models.Request(
            accesskey = request.access_key,
            region = resp.status_message
        )
        self.array_0(DaraCore.to_map(request))
        req.accesskey = 'accesskey'
        req.accesskey = request.access_key
        await self.print_null_async()
        self.throws_func()
        _response.status_code
        SourceClient.array(DaraCore.to_map(request), '1')
        return DaraCore.from_map(
            main_models.ComplexRequest(),
            DaraCore.merge({}, _request.query)
        )

    def no_return(self) -> None:
        _request = DaraRequest()
        pass
        _last_request = _request
        _response = DaraCore.do_action(_request)

        return {}

    async def no_return_async(self) -> None:
        _request = DaraRequest()
        pass
        _last_request = _request
        _response = await DaraCore.async_do_action(_request)

        return {}

    def hello(
        self,
        request: dict,
        strs: List[str],
        complex_list: List[List[str]],
    ) -> List[str]:
        a = None
        return self.array_1()

    async def hello_async(
        self,
        request: dict,
        strs: List[str],
        complex_list: List[List[str]],
    ) -> List[str]:
        a = None
        return self.array_1()

    @staticmethod
    def print(
        reqeust: DaraRequest,
        reqs: List[main_models.ComplexRequest],
        response: DaraResponse,
        val: Dict[str, str],
    ) -> source_models.Request:
        raise Exception('Un-implemented')

    @staticmethod
    async def print_async(
        reqeust: DaraRequest,
        reqs: List[main_models.ComplexRequest],
        response: DaraResponse,
        val: Dict[str, str],
    ) -> source_models.Request:
        raise Exception('Un-implemented')

    @staticmethod
    def int_to_int_32(
        a: int,
    ) -> None:
        raise Exception('Un-implemented')

    @staticmethod
    def assign_with_array() -> None:
        list = None
        list = [
            'test'
        ]
        str = None
        str = Client.throws_func()

    def map_acess(self) -> Any:
        tmp = {
            'protocol': self._endpoint_map.get(self._protocol)
        }
        return

    def expr_func(self) -> List[str]:
        if not True:
            pass
        num = 10
        req = main_models.ComplexRequest()
        map_val = {
            'num': 10,
            'client': SourceClient,
            'strs': self.array_1(),
            'str': f'string{num}',
            'str1': f'string{req.access_key}'
        }
        return

    async def expr_func_async(self) -> List[str]:
        if not True:
            pass
        num = 10
        req = main_models.ComplexRequest()
        map_val = {
            'num': 10,
            'client': SourceClient,
            'strs': self.array_1(),
            'str': f'string{num}',
            'str1': f'string{req.access_key}'
        }
        return

    @staticmethod
    def print_null() -> None:
        try :
            str = Client.template_string()
        except Exception as e :
            pass
        finally:
            final = 'ok'
        

    @staticmethod
    async def print_null_async() -> None:
        try :
            str = await Client.template_string_async()
        except Exception as e :
            pass
        finally:
            final = 'ok'
        

    @staticmethod
    def test_try_with_complex_return_type() -> source_models.Request:
        try :
            str = Client.template_string()
        except Exception as e :
            pass
        finally:
            final = 'ok'
        
        return

    @staticmethod
    async def test_try_with_complex_return_type_async() -> source_models.Request:
        try :
            str = await Client.template_string_async()
        except Exception as e :
            pass
        finally:
            final = 'ok'
        
        return

    @staticmethod
    def test_try_with_complex_return_type_with_out_cat() -> source_models.Request:
        try :
            str = Client.template_string()
        except Exception as e :
            sim = 'a'
        finally:
            final = 'ok'
        
        return

    @staticmethod
    async def test_try_with_complex_return_type_with_out_cat_async() -> source_models.Request:
        try :
            str = await Client.template_string_async()
        except Exception as e :
            sim = 'a'
        finally:
            final = 'ok'
        
        return

    @staticmethod
    def array_0(
        req: dict,
    ) -> List[Any]:
        return [ ]

    @staticmethod
    def array_1() -> List[str]:
        return [
            '1'
        ]

    def template_string(self) -> str:
        return f'/{self._protocol}'

    async def template_string_async(self) -> str:
        return f'/{self._protocol}'

    def int_op(
        self,
        a: int,
    ) -> None:
        b = a
        tmp = {
            'first': a
        }
        b+= 1
        b+= 1
        b-= 1
        b-= 1
        tmp["a"]+= 1
        tmp["a"]+= 1
        tmp["a"]-= 1
        tmp["a"]-= 1

    def throws_func(self) -> str:
        return f'/{self._protocol}'

    def throws_func_1(self) -> str:
        return ''

    def throws_func_2(self) -> None:
        raise DaraException({
            'code': ''
        })

    def throws_func_3(self) -> str:
        raise DaraException({
            'code': ''
        })

    def get_int(
        self,
        num: int,
    ) -> int:
        return num

    def return_func(self) -> str:
        index = 0
        i = self.get_int(index)
        return

    def return_func_1(
        self,
        cfg: source_models.Config,
    ) -> SourceClient:
        config = source_models.Config()
        return SourceClient(config)

    def return_func_2(self) -> Dict[str, Any]:
        tmp = {
            'subMap': 'ok'
        }
        map_val = {
            'test': tmp
        }
        if SourceClient.judge_str('test'):
            return map_val.get('test')
        else:
            body = None
            return DaraCore.merge({
                'body': body,
            }, tmp)


    def return_model(self) -> main_models.ComplexRequest:
        return main_models.ComplexRequest()

    def empty_func(self) -> None:
        raise Exception('Un-implemented')

    def error(
        self,
        e: DaraException,
    ) -> DaraException:
        tmp = None
        c = None
        return e

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
        config = data["configs"][0]
        return config

    @staticmethod
    def array_access_3(
        request: main_models.ComplexRequest,
    ) -> str:
        req = source_models.Request()
        Client.array_access_4([
            req
        ])
        config_val = request.configs.value[0]
        return config_val

    @staticmethod
    def array_access_4(
        requests: List[source_models.Request],
    ) -> str:
        return ''

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
        data["configs"][3] = config
        return data.get("configs")

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
    ) -> str:
        config_info = request.configs.extra.get('name')
        return config_info

    @staticmethod
    def map_access_3() -> str:
        data = {
            'configs': {
                'value': 'string'
            }
        }
        return data.get("configs").get('value')

    @staticmethod
    def map_access_4(
        request: main_models.ComplexRequest,
    ) -> str:
        key = 'name'
        model = request.model_map.get(key)
        config_info = request.configs.extra.get(key)
        return config_info

    @staticmethod
    def map_assign(
        request: main_models.ComplexRequest,
        name: str,
    ) -> None:
        request.configs.extra['name'] = name
        key = 'name'
        name = key
        request.configs.extra[key] = name
        name = request.configs.extra.get('name')
        request.map[key] = name
        request.num_map[key] = 1

    @staticmethod
    def arrayimport_2(
        request: List[source_models.Request],
    ) -> str:
        return ''

    @staticmethod
    def default_return() -> None:
        if True:
            pass
        else:
            pass

    @staticmethod
    async def default_return_async() -> None:
        if True:
            pass
        else:
            pass

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

    def multi_try_catch(
        self,
        a: int,
    ) -> None:
        try :
            if a > 0:
                raise main_exceptions.Err1Exception(
                    name = 'str',
                    code = 'str',
                    data = {
                        'key1': 'str'
                    }
                )
            elif a == 0:
                raise main_exceptions.Err2Exception(
                    name = 'str',
                    code = 'str',
                    access_err_message = 'str2'
                )
            elif a == -10:
                raise source_exceptions.Err3Exception(
                    name = 'str',
                    code = 'str'
                )
            else:
                raise DaraException(
                    name = 'str',
                    code = 'str'
                )

        except main_exceptions.Err1Exception as err :
            logging.log(logging.NOTSET, err.name)
        except main_exceptions.Err2Exception as err :
            logging.log(logging.NOTSET, err.name)
        except source_exceptions.Err3Exception as err :
            logging.log(logging.NOTSET, err.name)
        except Exception as err :
            logging.log(logging.NOTSET, err.name)
        finally:
            final = 'ok'
        

    async def multi_try_catch_async(
        self,
        a: int,
    ) -> None:
        try :
            if a > 0:
                raise main_exceptions.Err1Exception(
                    name = 'str',
                    code = 'str',
                    data = {
                        'key1': 'str'
                    }
                )
            elif a == 0:
                raise main_exceptions.Err2Exception(
                    name = 'str',
                    code = 'str',
                    access_err_message = 'str2'
                )
            elif a == -10:
                raise source_exceptions.Err3Exception(
                    name = 'str',
                    code = 'str'
                )
            else:
                raise DaraException(
                    name = 'str',
                    code = 'str'
                )

        except main_exceptions.Err1Exception as err :
            logging.log(logging.NOTSET, err.name)
        except main_exceptions.Err2Exception as err :
            logging.log(logging.NOTSET, err.name)
        except source_exceptions.Err3Exception as err :
            logging.log(logging.NOTSET, err.name)
        except Exception as err :
            logging.log(logging.NOTSET, err.name)
        finally:
            final = 'ok'
        
