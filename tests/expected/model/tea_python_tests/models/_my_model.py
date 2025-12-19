# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from typing import List, Dict, Any, BinaryIO

from darabonba.model import DaraModel
from darabonba.request import DaraRequest
from Source import models as source_models
from Source.client import Client as SourceClient
from tea_python_tests import models as main_models

class MyModel(DaraModel):
    def __init__(
        self,
        model: main_models.MyModelModel = None,
        cors_rules: str = None,
        cors_rules_cors_r: str = None,
        xml_parser_http_message: str = None,
        test_oauth2_name: str = None,
        stringfield: str = None,
        bytesfield: bytes = None,
        stringarrayfield: List[str] = None,
        mapfield: Dict[str, str] = None,
        name: str = None,
        submodel: main_models.MyModelSubmodel = None,
        submodel_map: Dict[str, main_models.MyModelSubmodel] = None,
        map_model: Dict[str, main_models.M] = None,
        subarraymodel: List[main_models.MyModelSubarraymodel] = None,
        subarray: List[main_models.M] = None,
        ssubarray: List[List[main_models.M]] = None,
        ssubmarray: List[List[SourceClient]] = None,
        sssubmarray: List[List[SourceClient]] = None,
        ssubmmarray: List[List[source_models.Request]] = None,
        sssubmmarray: List[List[List[source_models.Request]]] = None,
        maparray: List[Dict[str, Any]] = None,
        mapsubmarray: List[Dict[str, SourceClient]] = None,
        module_model_map: Dict[str, source_models.Request] = None,
        arr_module_model_map: List[Dict[str, source_models.Request]] = None,
        arrs_module_model_map: List[List[Dict[str, source_models.Request]]] = None,
        sub_model_map: Dict[str, main_models.MSubM] = None,
        model_map: Dict[str, main_models.M] = None,
        module_map: Dict[str, SourceClient] = None,
        object: dict = None,
        readable: BinaryIO = None,
        writable: BinaryIO = None,
        exist_model: main_models.M = None,
        request: DaraRequest = None,
        complex_list: List[List[str]] = None,
        numberfield: int = None,
        integer_field: int = None,
        float_field: float = None,
        double_field: float = None,
        long_field: int = None,
        ulong_field: int = None,
        int_8field: int = None,
        int_16field: int = None,
        int_32field: int = None,
        int_64field: int = None,
        uint_8field: int = None,
        uint_16field: int = None,
        uint_32field: int = None,
        uint_64field: int = None,
        link: str = None,
    ):
        self.model = model
        self.cors_rules = cors_rules
        self.cors_rules_cors_r = cors_rules_cors_r
        self.xml_parser_http_message = xml_parser_http_message
        self.test_oauth2_name = test_oauth2_name
        self.stringfield = stringfield
        self.bytesfield = bytesfield
        self.stringarrayfield = stringarrayfield
        self.mapfield = mapfield
        self.name = name
        self.submodel = submodel
        self.submodel_map = submodel_map
        self.map_model = map_model
        self.subarraymodel = subarraymodel
        self.subarray = subarray
        self.ssubarray = ssubarray
        self.ssubmarray = ssubmarray
        self.sssubmarray = sssubmarray
        self.ssubmmarray = ssubmmarray
        self.sssubmmarray = sssubmmarray
        self.maparray = maparray
        self.mapsubmarray = mapsubmarray
        self.module_model_map = module_model_map
        self.arr_module_model_map = arr_module_model_map
        self.arrs_module_model_map = arrs_module_model_map
        self.sub_model_map = sub_model_map
        self.model_map = model_map
        self.module_map = module_map
        self.object = object
        self.readable = readable
        self.writable = writable
        self.exist_model = exist_model
        self.request = request
        self.complex_list = complex_list
        self.numberfield = numberfield
        self.integer_field = integer_field
        self.float_field = float_field
        self.double_field = double_field
        self.long_field = long_field
        self.ulong_field = ulong_field
        self.int_8field = int_8field
        self.int_16field = int_16field
        self.int_32field = int_32field
        self.int_64field = int_64field
        self.uint_8field = uint_8field
        self.uint_16field = uint_16field
        self.uint_32field = uint_32field
        self.uint_64field = uint_64field
        self.link = link

    def validate(self):
        self.validate_required(self.model, 'model')
        if self.model:
            self.model.validate()
        self.validate_required(self.cors_rules, 'cors_rules')
        self.validate_required(self.cors_rules_cors_r, 'cors_rules_cors_r')
        self.validate_required(self.xml_parser_http_message, 'xml_parser_http_message')
        self.validate_required(self.test_oauth2_name, 'test_oauth2_name')
        self.validate_required(self.stringfield, 'stringfield')
        self.validate_required(self.bytesfield, 'bytesfield')
        self.validate_required(self.stringarrayfield, 'stringarrayfield')
        self.validate_required(self.mapfield, 'mapfield')
        self.validate_required(self.name, 'name')
        self.validate_required(self.submodel, 'submodel')
        if self.submodel:
            self.submodel.validate()
        self.validate_required(self.submodel_map, 'submodel_map')
        if self.submodel_map:
            for v1 in self.submodel_map.values():
                 if v1:
                    v1.validate()
        self.validate_required(self.map_model, 'map_model')
        if self.map_model:
            for v1 in self.map_model.values():
                 if v1:
                    v1.validate()
        self.validate_required(self.subarraymodel, 'subarraymodel')
        if self.subarraymodel:
            for v1 in self.subarraymodel:
                 if v1:
                    v1.validate()
        self.validate_required(self.subarray, 'subarray')
        if self.subarray:
            for v1 in self.subarray:
                 if v1:
                    v1.validate()
        self.validate_required(self.ssubarray, 'ssubarray')
        if self.ssubarray:
            for v1 in self.ssubarray:
                for v2 in v1:
                     if v2:
                        v2.validate()
        self.validate_required(self.ssubmarray, 'ssubmarray')
        self.validate_required(self.sssubmarray, 'sssubmarray')
        self.validate_required(self.ssubmmarray, 'ssubmmarray')
        if self.ssubmmarray:
            for v1 in self.ssubmmarray:
                for v2 in v1:
                     if v2:
                        v2.validate()
        self.validate_required(self.sssubmmarray, 'sssubmmarray')
        if self.sssubmmarray:
            for v1 in self.sssubmmarray:
                for v2 in v1:
                    for v2 in v2:
                         if v2:
                            v2.validate()
        self.validate_required(self.maparray, 'maparray')
        self.validate_required(self.mapsubmarray, 'mapsubmarray')
        self.validate_required(self.module_model_map, 'module_model_map')
        if self.module_model_map:
            for v1 in self.module_model_map.values():
                 if v1:
                    v1.validate()
        self.validate_required(self.arr_module_model_map, 'arr_module_model_map')
        if self.arr_module_model_map:
            for v1 in self.arr_module_model_map:
                for v2 in self.arr_module_model_map.values():
                     if v2:
                        v2.validate()
        self.validate_required(self.arrs_module_model_map, 'arrs_module_model_map')
        if self.arrs_module_model_map:
            for v1 in self.arrs_module_model_map:
                for v2 in v1:
                    for v2 in self.arrs_module_model_map.values():
                         if v2:
                            v2.validate()
        self.validate_required(self.sub_model_map, 'sub_model_map')
        if self.sub_model_map:
            for v1 in self.sub_model_map.values():
                 if v1:
                    v1.validate()
        self.validate_required(self.model_map, 'model_map')
        if self.model_map:
            for v1 in self.model_map.values():
                 if v1:
                    v1.validate()
        self.validate_required(self.module_map, 'module_map')
        self.validate_required(self.object, 'object')
        self.validate_required(self.readable, 'readable')
        self.validate_required(self.writable, 'writable')
        self.validate_required(self.exist_model, 'exist_model')
        if self.exist_model:
            self.exist_model.validate()
        self.validate_required(self.request, 'request')
        self.validate_required(self.complex_list, 'complex_list')
        self.validate_required(self.numberfield, 'numberfield')
        self.validate_required(self.integer_field, 'integer_field')
        self.validate_required(self.float_field, 'float_field')
        self.validate_required(self.double_field, 'double_field')
        self.validate_required(self.long_field, 'long_field')
        self.validate_required(self.ulong_field, 'ulong_field')
        self.validate_required(self.int_8field, 'int_8field')
        self.validate_required(self.int_16field, 'int_16field')
        self.validate_required(self.int_32field, 'int_32field')
        self.validate_required(self.int_64field, 'int_64field')
        self.validate_required(self.uint_8field, 'uint_8field')
        self.validate_required(self.uint_16field, 'uint_16field')
        self.validate_required(self.uint_32field, 'uint_32field')
        self.validate_required(self.uint_64field, 'uint_64field')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.model is not None:
            result['model'] = self.model.to_map()

        if self.cors_rules is not None:
            result['CORSRules'] = self.cors_rules

        if self.cors_rules_cors_r is not None:
            result['CORSRulesCORSR'] = self.cors_rules_cors_r

        if self.xml_parser_http_message is not None:
            result['XMLParserHTTPMessage'] = self.xml_parser_http_message

        if self.test_oauth2_name is not None:
            result['TestOAuth2Name'] = self.test_oauth2_name

        if self.stringfield is not None:
            result['stringfield'] = self.stringfield

        if self.bytesfield is not None:
            result['bytesfield'] = self.bytesfield

        if self.stringarrayfield is not None:
            result['stringarrayfield'] = self.stringarrayfield

        if self.mapfield is not None:
            result['mapfield'] = self.mapfield

        if self.name is not None:
            result['realName'] = self.name

        if self.submodel is not None:
            result['submodel'] = self.submodel.to_map()

        result['submodelMap'] = {}
        if self.submodel_map is not None:
            for k1, v1 in self.submodel_map.items():
                result['submodelMap'][k1] = v1.to_map() if v1 else None

        result['mapModel'] = {}
        if self.map_model is not None:
            for k1, v1 in self.map_model.items():
                result['mapModel'][k1] = v1.to_map() if v1 else None

        result['subarraymodel'] = []
        if self.subarraymodel is not None:
            for k1 in self.subarraymodel:
                result['subarraymodel'].append(k1.to_map() if k1 else None)

        result['subarray'] = []
        if self.subarray is not None:
            for k1 in self.subarray:
                result['subarray'].append(k1.to_map() if k1 else None)

        result['ssubarray'] = []
        if self.ssubarray is not None:
            for k1 in self.ssubarray:
                l1 = []
                for k2 in k1:
                    l1.append(k2.to_map() if k2 else None)
                result['ssubarray'].append(l1)

        if self.ssubmarray is not None:
            result['ssubmarray'] = self.ssubmarray

        if self.sssubmarray is not None:
            result['sssubmarray'] = self.sssubmarray

        result['ssubmmarray'] = []
        if self.ssubmmarray is not None:
            for k1 in self.ssubmmarray:
                l1 = []
                for k2 in k1:
                    l1.append(k2.to_map() if k2 else None)
                result['ssubmmarray'].append(l1)

        result['sssubmmarray'] = []
        if self.sssubmmarray is not None:
            for k1 in self.sssubmmarray:
                l1 = []
                for k2 in k1:
                    l2 = []
                    for k3 in k2:
                        l2.append(k3.to_map() if k3 else None)
                    l1.append(l2)
                result['sssubmmarray'].append(l1)

        if self.maparray is not None:
            result['maparray'] = self.maparray

        if self.mapsubmarray is not None:
            result['mapsubmarray'] = self.mapsubmarray

        result['moduleModelMap'] = {}
        if self.module_model_map is not None:
            for k1, v1 in self.module_model_map.items():
                result['moduleModelMap'][k1] = v1.to_map() if v1 else None

        result['arrModuleModelMap'] = []
        if self.arr_module_model_map is not None:
            for k1 in self.arr_module_model_map:
                d1 = {}
                for k2, v2 in self.arr_module_model_map.items():
                    d1[k2] = v2.to_map() if v2 else None
                result['arrModuleModelMap'].append(d1)

        result['arrsModuleModelMap'] = []
        if self.arrs_module_model_map is not None:
            for k1 in self.arrs_module_model_map:
                l1 = []
                for k2 in k1:
                    d2 = {}
                    for k3, v3 in self.arrs_module_model_map.items():
                        d2[k3] = v3.to_map() if v3 else None
                    l1.append(d2)
                result['arrsModuleModelMap'].append(l1)

        result['subModelMap'] = {}
        if self.sub_model_map is not None:
            for k1, v1 in self.sub_model_map.items():
                result['subModelMap'][k1] = v1.to_map() if v1 else None

        result['modelMap'] = {}
        if self.model_map is not None:
            for k1, v1 in self.model_map.items():
                result['modelMap'][k1] = v1.to_map() if v1 else None

        if self.module_map is not None:
            result['moduleMap'] = self.module_map

        if self.object is not None:
            result['object'] = self.object

        if self.readable is not None:
            result['readable'] = self.readable

        if self.writable is not None:
            result['writable'] = self.writable

        if self.exist_model is not None:
            result['existModel'] = self.exist_model.to_map()

        if self.request is not None:
            result['request'] = self.request.to_map()

        if self.complex_list is not None:
            result['complexList'] = self.complex_list

        if self.numberfield is not None:
            result['numberfield'] = self.numberfield

        if self.integer_field is not None:
            result['integerField'] = self.integer_field

        if self.float_field is not None:
            result['floatField'] = self.float_field

        if self.double_field is not None:
            result['doubleField'] = self.double_field

        if self.long_field is not None:
            result['longField'] = self.long_field

        if self.ulong_field is not None:
            result['ulongField'] = self.ulong_field

        if self.int_8field is not None:
            result['int8Field'] = self.int_8field

        if self.int_16field is not None:
            result['int16Field'] = self.int_16field

        if self.int_32field is not None:
            result['int32Field'] = self.int_32field

        if self.int_64field is not None:
            result['int64Field'] = self.int_64field

        if self.uint_8field is not None:
            result['uint8Field'] = self.uint_8field

        if self.uint_16field is not None:
            result['uint16Field'] = self.uint_16field

        if self.uint_32field is not None:
            result['uint32Field'] = self.uint_32field

        if self.uint_64field is not None:
            result['uint64Field'] = self.uint_64field

        if self.link is not None:
            result['link'] = self.link

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('model') is not None:
            temp_model = main_models.MyModelModel()
            self.model = temp_model.from_map(m.get('model'))

        if m.get('CORSRules') is not None:
            self.cors_rules = m.get('CORSRules')

        if m.get('CORSRulesCORSR') is not None:
            self.cors_rules_cors_r = m.get('CORSRulesCORSR')

        if m.get('XMLParserHTTPMessage') is not None:
            self.xml_parser_http_message = m.get('XMLParserHTTPMessage')

        if m.get('TestOAuth2Name') is not None:
            self.test_oauth2_name = m.get('TestOAuth2Name')

        if m.get('stringfield') is not None:
            self.stringfield = m.get('stringfield')

        if m.get('bytesfield') is not None:
            self.bytesfield = m.get('bytesfield')

        if m.get('stringarrayfield') is not None:
            self.stringarrayfield = m.get('stringarrayfield')

        if m.get('mapfield') is not None:
            self.mapfield = m.get('mapfield')

        if m.get('realName') is not None:
            self.name = m.get('realName')

        if m.get('submodel') is not None:
            temp_model = main_models.MyModelSubmodel()
            self.submodel = temp_model.from_map(m.get('submodel'))

        self.submodel_map = {}
        if m.get('submodelMap') is not None:
            for k1, v1 in m.get('submodelMap').items():
                temp_model = main_models.MyModelSubmodel()
                self.submodel_map[k1] = temp_model.from_map(v1)

        self.map_model = {}
        if m.get('mapModel') is not None:
            for k1, v1 in m.get('mapModel').items():
                temp_model = main_models.M()
                self.map_model[k1] = temp_model.from_map(v1)

        self.subarraymodel = []
        if m.get('subarraymodel') is not None:
            for k1 in m.get('subarraymodel'):
                temp_model = main_models.MyModelSubarraymodel()
                self.subarraymodel.append(temp_model.from_map(k1))

        self.subarray = []
        if m.get('subarray') is not None:
            for k1 in m.get('subarray'):
                temp_model = main_models.M()
                self.subarray.append(temp_model.from_map(k1))

        self.ssubarray = []
        if m.get('ssubarray') is not None:
            for k1 in m.get('ssubarray'):
                l1 = []
                for k2 in k1:
                    temp_model = main_models.M()
                    l1.append(temp_model.from_map(k2))
                self.ssubarray.append(l1)

        if m.get('ssubmarray') is not None:
            self.ssubmarray = m.get('ssubmarray')

        if m.get('sssubmarray') is not None:
            self.sssubmarray = m.get('sssubmarray')

        self.ssubmmarray = []
        if m.get('ssubmmarray') is not None:
            for k1 in m.get('ssubmmarray'):
                l1 = []
                for k2 in k1:
                    temp_model = source_models.Request()
                    l1.append(temp_model.from_map(k2))
                self.ssubmmarray.append(l1)

        self.sssubmmarray = []
        if m.get('sssubmmarray') is not None:
            for k1 in m.get('sssubmmarray'):
                l1 = []
                for k2 in k1:
                    l2 = []
                    for k3 in k2:
                        temp_model = source_models.Request()
                        l2.append(temp_model.from_map(k3))
                    l1.append(l2)
                self.sssubmmarray.append(l1)

        if m.get('maparray') is not None:
            self.maparray = m.get('maparray')

        if m.get('mapsubmarray') is not None:
            self.mapsubmarray = m.get('mapsubmarray')

        self.module_model_map = {}
        if m.get('moduleModelMap') is not None:
            for k1, v1 in m.get('moduleModelMap').items():
                temp_model = source_models.Request()
                self.module_model_map[k1] = temp_model.from_map(v1)

        self.arr_module_model_map = []
        if m.get('arrModuleModelMap') is not None:
            for k1 in m.get('arrModuleModelMap'):
                d1 = {}
                for k2, v2 in k1.items():
                    temp_model = source_models.Request()
                    d1[k2] = temp_model.from_map(v2)
                self.arr_module_model_map.append(d1)

        self.arrs_module_model_map = []
        if m.get('arrsModuleModelMap') is not None:
            for k1 in m.get('arrsModuleModelMap'):
                l1 = []
                for k2 in k1:
                    d2 = {}
                    for k3, v3 in k2.items():
                        temp_model = source_models.Request()
                        d2[k3] = temp_model.from_map(v3)
                    l1.append(d2)
                self.arrs_module_model_map.append(l1)

        self.sub_model_map = {}
        if m.get('subModelMap') is not None:
            for k1, v1 in m.get('subModelMap').items():
                temp_model = main_models.MSubM()
                self.sub_model_map[k1] = temp_model.from_map(v1)

        self.model_map = {}
        if m.get('modelMap') is not None:
            for k1, v1 in m.get('modelMap').items():
                temp_model = main_models.M()
                self.model_map[k1] = temp_model.from_map(v1)

        if m.get('moduleMap') is not None:
            self.module_map = m.get('moduleMap')

        if m.get('object') is not None:
            self.object = m.get('object')

        if m.get('readable') is not None:
            self.readable = m.get('readable')

        if m.get('writable') is not None:
            self.writable = m.get('writable')

        if m.get('existModel') is not None:
            temp_model = main_models.M()
            self.exist_model = temp_model.from_map(m.get('existModel'))

        if m.get('request') is not None:
            temp_model = DaraRequest()
            self.request = temp_model.from_map(m.get('request'))

        if m.get('complexList') is not None:
            self.complex_list = m.get('complexList')

        if m.get('numberfield') is not None:
            self.numberfield = m.get('numberfield')

        if m.get('integerField') is not None:
            self.integer_field = m.get('integerField')

        if m.get('floatField') is not None:
            self.float_field = m.get('floatField')

        if m.get('doubleField') is not None:
            self.double_field = m.get('doubleField')

        if m.get('longField') is not None:
            self.long_field = m.get('longField')

        if m.get('ulongField') is not None:
            self.ulong_field = m.get('ulongField')

        if m.get('int8Field') is not None:
            self.int_8field = m.get('int8Field')

        if m.get('int16Field') is not None:
            self.int_16field = m.get('int16Field')

        if m.get('int32Field') is not None:
            self.int_32field = m.get('int32Field')

        if m.get('int64Field') is not None:
            self.int_64field = m.get('int64Field')

        if m.get('uint8Field') is not None:
            self.uint_8field = m.get('uint8Field')

        if m.get('uint16Field') is not None:
            self.uint_16field = m.get('uint16Field')

        if m.get('uint32Field') is not None:
            self.uint_32field = m.get('uint32Field')

        if m.get('uint64Field') is not None:
            self.uint_64field = m.get('uint64Field')

        if m.get('link') is not None:
            self.link = m.get('link')

        return self

class MyModelSubarraymodel(DaraModel):
    def __init__(self):
        pass
    def validate(self):
        pass

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        return self

class MyModelSubmodel(DaraModel):
    def __init__(
        self,
        stringfield: str = None,
        model: main_models.MyModelSubmodelModel = None,
    ):
        self.stringfield = stringfield
        self.model = model

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')
        self.validate_required(self.model, 'model')
        if self.model:
            self.model.validate()

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.stringfield is not None:
            result['stringfield'] = self.stringfield

        if self.model is not None:
            result['model'] = self.model.to_map()

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('stringfield') is not None:
            self.stringfield = m.get('stringfield')

        if m.get('model') is not None:
            temp_model = main_models.MyModelSubmodelModel()
            self.model = temp_model.from_map(m.get('model'))

        return self

class MyModelSubmodelModel(DaraModel):
    def __init__(
        self,
        str: str = None,
    ):
        self.str = str

    def validate(self):
        self.validate_required(self.str, 'str')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.str is not None:
            result['str'] = self.str

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('str') is not None:
            self.str = m.get('str')

        return self

class MyModelModel(DaraModel):
    def __init__(
        self,
        str: str = None,
        model: main_models.MyModelModelModel = None,
    ):
        self.str = str
        self.model = model

    def validate(self):
        self.validate_required(self.str, 'str')
        self.validate_required(self.model, 'model')
        if self.model:
            self.model.validate()

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.str is not None:
            result['str'] = self.str

        if self.model is not None:
            result['model'] = self.model.to_map()

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('str') is not None:
            self.str = m.get('str')

        if m.get('model') is not None:
            temp_model = main_models.MyModelModelModel()
            self.model = temp_model.from_map(m.get('model'))

        return self

class MyModelModelModel(DaraModel):
    def __init__(
        self,
        str: str = None,
    ):
        self.str = str

    def validate(self):
        self.validate_required(self.str, 'str')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.str is not None:
            result['str'] = self.str

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('str') is not None:
            self.str = m.get('str')

        return self

