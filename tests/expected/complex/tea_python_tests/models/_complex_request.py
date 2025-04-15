# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 
from tea_python_tests import models as main_models 
from darabonba.request import DaraRequest 
from darabonba.response import DaraResponse 
from Source import models as source_models 
from Source.source_client import SourceClient 
from typing import BinaryIO, List, Dict, Any


class ComplexRequest(DaraModel):
    def __init__(
        self, *,
        access_key: str = None,
        body: BinaryIO = None,
        strs: List[str] = None,
        map_list: List[Dict[str, Any]] = None,
        header: main_models.ComplexRequestHeader = None,
        configs: main_models.ComplexRequestConfigs = None,
        num: int = None,
        i_64: int = None,
        f_64: float = None,
        b: bool = None,
        f_32: float = None,
        f_64list: List[float] = None,
        float_list: List[float] = None,
        booleant_list: List[bool] = None,
        i_32: int = None,
        string_list: List[str] = None,
        int_list: List[int] = None,
        int_32list: List[int] = None,
        int_16list: List[int] = None,
        int_64list: List[int] = None,
        long_list: List[int] = None,
        uint_64list: List[int] = None,
        uint_32list: List[int] = None,
        uint_16list: List[int] = None,
        u_64: int = None,
        u_32: int = None,
        u_16: int = None,
        obj: dict = None,
        any: Any = None,
        byt: bytes = None,
        req: DaraRequest = None,
        resp: DaraResponse = None,
        map: Dict[str, str] = None,
        num_map: Dict[str, int] = None,
        model_map: Dict[str, source_models.Request] = None,
        request: source_models.Request = None,
        client: SourceClient = None,
        instance: source_models.RequestInstance = None,
        from_: str = None,
        self_: str = None,
        print: str = None,
        exec: str = None,
        str: str = None,
        part: List[main_models.ComplexRequestPart] = None,
    ):
        self.access_key = access_key
        # Body
        self.body = body
        # Strs
        self.strs = strs
        # mapList
        self.map_list = map_list
        # header
        self.header = header
        self.configs = configs
        self.num = num
        self.i_64 = i_64
        self.f_64 = f_64
        self.b = b
        self.f_32 = f_32
        self.f_64list = f_64list
        self.float_list = float_list
        self.booleant_list = booleant_list
        self.i_32 = i_32
        self.string_list = string_list
        self.int_list = int_list
        self.int_32list = int_32list
        self.int_16list = int_16list
        self.int_64list = int_64list
        self.long_list = long_list
        self.uint_64list = uint_64list
        self.uint_32list = uint_32list
        self.uint_16list = uint_16list
        self.u_64 = u_64
        self.u_32 = u_32
        self.u_16 = u_16
        self.obj = obj
        self.any = any
        self.byt = byt
        self.req = req
        self.resp = resp
        self.map = map
        self.num_map = num_map
        self.model_map = model_map
        self.request = request
        self.client = client
        self.instance = instance
        # test keywords
        self.from_ = from_
        # test keywords
        self.self_ = self_
        # test keywords
        self.print = print
        # test keywords
        self.exec = exec
        # test keywords
        self.str = str
        # Part
        self.part = part

    def validate(self):
        self.validate_required(self.access_key, 'access_key')
        self.validate_required(self.body, 'body')
        self.validate_required(self.strs, 'strs')
        self.validate_required(self.map_list, 'map_list')
        self.validate_required(self.header, 'header')
        if self.header:
            self.header.validate()
        self.validate_required(self.configs, 'configs')
        if self.configs:
            self.configs.validate()
        self.validate_required(self.num, 'num')
        self.validate_required(self.i_64, 'i_64')
        self.validate_required(self.f_64, 'f_64')
        self.validate_required(self.b, 'b')
        self.validate_required(self.f_32, 'f_32')
        self.validate_required(self.f_64list, 'f_64list')
        if self.f_64list:
            for k in self.f_64list:
                if k:
                    k.validate()
        self.validate_required(self.float_list, 'float_list')
        if self.float_list:
            for k in self.float_list:
                if k:
                    k.validate()
        self.validate_required(self.booleant_list, 'booleant_list')
        if self.booleant_list:
            for k in self.booleant_list:
                if k:
                    k.validate()
        self.validate_required(self.i_32, 'i_32')
        self.validate_required(self.string_list, 'string_list')
        self.validate_required(self.int_list, 'int_list')
        if self.int_list:
            for k in self.int_list:
                if k:
                    k.validate()
        self.validate_required(self.int_32list, 'int_32list')
        if self.int_32list:
            for k in self.int_32list:
                if k:
                    k.validate()
        self.validate_required(self.int_16list, 'int_16list')
        if self.int_16list:
            for k in self.int_16list:
                if k:
                    k.validate()
        self.validate_required(self.int_64list, 'int_64list')
        if self.int_64list:
            for k in self.int_64list:
                if k:
                    k.validate()
        self.validate_required(self.long_list, 'long_list')
        if self.long_list:
            for k in self.long_list:
                if k:
                    k.validate()
        self.validate_required(self.uint_64list, 'uint_64list')
        if self.uint_64list:
            for k in self.uint_64list:
                if k:
                    k.validate()
        self.validate_required(self.uint_32list, 'uint_32list')
        if self.uint_32list:
            for k in self.uint_32list:
                if k:
                    k.validate()
        self.validate_required(self.uint_16list, 'uint_16list')
        if self.uint_16list:
            for k in self.uint_16list:
                if k:
                    k.validate()
        self.validate_required(self.u_64, 'u_64')
        self.validate_required(self.u_32, 'u_32')
        self.validate_required(self.u_16, 'u_16')
        self.validate_required(self.obj, 'obj')
        self.validate_required(self.any, 'any')
        self.validate_required(self.byt, 'byt')
        self.validate_required(self.req, 'req')
        self.validate_required(self.resp, 'resp')
        self.validate_required(self.map, 'map')
        self.validate_required(self.num_map, 'num_map')
        if self.num_map:
            for v in self.num_map.values():
                if v:
                    v.validate()
        self.validate_required(self.model_map, 'model_map')
        if self.model_map:
            for v in self.model_map.values():
                if v:
                    v.validate()
        self.validate_required(self.request, 'request')
        self.validate_required(self.client, 'client')
        self.validate_required(self.instance, 'instance')
        self.validate_required(self.from_, 'from_')
        self.validate_required(self.self_, 'self_')
        self.validate_required(self.print, 'print')
        self.validate_required(self.exec, 'exec')
        self.validate_required(self.str, 'str')
        if self.part:
            for k in self.part:
                if k:
                    k.validate()

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.access_key is not None:
            result['accessKey'] = self.access_key
        if self.body is not None:
            result['Body'] = self.body
        if self.strs is not None:
            result['Strs'] = self.strs
        if self.map_list is not None:
            result['mapList'] = self.map_list
        if self.header is not None:
            result['header'] = self.header.to_map()

        if self.configs is not None:
            result['configs'] = self.configs.to_map()

        if self.num is not None:
            result['num'] = self.num
        if self.i_64 is not None:
            result['i64'] = self.i_64
        if self.f_64 is not None:
            result['f64'] = self.f_64
        if self.b is not None:
            result['b'] = self.b
        if self.f_32 is not None:
            result['f32'] = self.f_32
        if self.f_64list is not None:
            result['f64List'] = self.f_64list
        if self.float_list is not None:
            result['floatList'] = self.float_list
        if self.booleant_list is not None:
            result['booleantList'] = self.booleant_list
        if self.i_32 is not None:
            result['i32'] = self.i_32
        if self.string_list is not None:
            result['stringList'] = self.string_list
        if self.int_list is not None:
            result['intList'] = self.int_list
        if self.int_32list is not None:
            result['int32List'] = self.int_32list
        if self.int_16list is not None:
            result['int16List'] = self.int_16list
        if self.int_64list is not None:
            result['int64List'] = self.int_64list
        if self.long_list is not None:
            result['longList'] = self.long_list
        if self.uint_64list is not None:
            result['uint64List'] = self.uint_64list
        if self.uint_32list is not None:
            result['uint32List'] = self.uint_32list
        if self.uint_16list is not None:
            result['uint16List'] = self.uint_16list
        if self.u_64 is not None:
            result['u64'] = self.u_64
        if self.u_32 is not None:
            result['u32'] = self.u_32
        if self.u_16 is not None:
            result['u16'] = self.u_16
        if self.obj is not None:
            result['obj'] = self.obj
        if self.any is not None:
            result['any'] = self.any
        if self.byt is not None:
            result['byt'] = self.byt
        if self.req is not None:
            result['req'] = self.req.to_map()

        if self.resp is not None:
            result['resp'] = self.resp.to_map()

        if self.map is not None:
            result['map'] = self.map
        if self.num_map is not None:
            result['numMap'] = self.num_map
        if self.model_map is not None:
            result['modelMap'] = {}
            for k1, v1 in self.model_map.items():
                result['modelMap'][k1] = v1.to_map() if v1 else None

        if self.request is not None:
            result['request'] = self.request.to_map()

        if self.client is not None:
            result['client'] = self.client
        if self.instance is not None:
            result['instance'] = self.instance.to_map()

        if self.from_ is not None:
            result['from'] = self.from_
        if self.self_ is not None:
            result['self'] = self.self_
        if self.print is not None:
            result['print'] = self.print
        if self.exec is not None:
            result['exec'] = self.exec
        if self.str is not None:
            result['srt'] = self.str
        if self.part is not None:
            result['Part'] = []
            for k1 in self.part:
                result['Part'].append(k1.to_map() if k1 else None)

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('accessKey') is not None:
            self.access_key = m.get('accessKey')
        if m.get('Body') is not None:
            self.body = m.get('Body')
        if m.get('Strs') is not None:
            self.strs = m.get('Strs')
        if m.get('mapList') is not None:
            self.map_list = m.get('mapList')
        if m.get('header') is not None:
            temp_model = main_models.ComplexRequestHeader()
            self.header = temp_model.from_map(m.get('header'))

        if m.get('configs') is not None:
            temp_model = main_models.ComplexRequestConfigs()
            self.configs = temp_model.from_map(m.get('configs'))

        if m.get('num') is not None:
            self.num = m.get('num')
        if m.get('i64') is not None:
            self.i_64 = m.get('i64')
        if m.get('f64') is not None:
            self.f_64 = m.get('f64')
        if m.get('b') is not None:
            self.b = m.get('b')
        if m.get('f32') is not None:
            self.f_32 = m.get('f32')
        if m.get('f64List') is not None:
            self.f_64list = m.get('f64List')
        if m.get('floatList') is not None:
            self.float_list = m.get('floatList')
        if m.get('booleantList') is not None:
            self.booleant_list = m.get('booleantList')
        if m.get('i32') is not None:
            self.i_32 = m.get('i32')
        if m.get('stringList') is not None:
            self.string_list = m.get('stringList')
        if m.get('intList') is not None:
            self.int_list = m.get('intList')
        if m.get('int32List') is not None:
            self.int_32list = m.get('int32List')
        if m.get('int16List') is not None:
            self.int_16list = m.get('int16List')
        if m.get('int64List') is not None:
            self.int_64list = m.get('int64List')
        if m.get('longList') is not None:
            self.long_list = m.get('longList')
        if m.get('uint64List') is not None:
            self.uint_64list = m.get('uint64List')
        if m.get('uint32List') is not None:
            self.uint_32list = m.get('uint32List')
        if m.get('uint16List') is not None:
            self.uint_16list = m.get('uint16List')
        if m.get('u64') is not None:
            self.u_64 = m.get('u64')
        if m.get('u32') is not None:
            self.u_32 = m.get('u32')
        if m.get('u16') is not None:
            self.u_16 = m.get('u16')
        if m.get('obj') is not None:
            self.obj = m.get('obj')
        if m.get('any') is not None:
            self.any = m.get('any')
        if m.get('byt') is not None:
            self.byt = m.get('byt')
        if m.get('req') is not None:
            temp_model = DaraRequest()
            self.req = temp_model.from_map(m.get('req'))

        if m.get('resp') is not None:
            temp_model = DaraResponse()
            self.resp = temp_model.from_map(m.get('resp'))

        if m.get('map') is not None:
            self.map = m.get('map')
        if m.get('numMap') is not None:
            self.num_map = m.get('numMap')
        if m.get('modelMap') is not None:
            self.model_map = {}
            for k1, v1 in m.get('modelMap').items():
                temp_model = source_models.Request()
                self.model_map[k1] = temp_model.from_map(v1)

        if m.get('request') is not None:
            temp_model = source_models.Request()
            self.request = temp_model.from_map(m.get('request'))

        if m.get('client') is not None:
            self.client = m.get('client')
        if m.get('instance') is not None:
            temp_model = source_models.RequestInstance()
            self.instance = temp_model.from_map(m.get('instance'))

        if m.get('from') is not None:
            self.from_ = m.get('from')
        if m.get('self') is not None:
            self.self_ = m.get('self')
        if m.get('print') is not None:
            self.print = m.get('print')
        if m.get('exec') is not None:
            self.exec = m.get('exec')
        if m.get('srt') is not None:
            self.str = m.get('srt')
        if m.get('Part') is not None:
            l1 = 0
            self.part = []
            for k1 in m.get('Part'):
                temp_model = main_models.ComplexRequestPart()
                self.part.append(temp_model.from_map(k1))

        return self

