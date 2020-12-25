# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
from typing import List, Dict, Any, BinaryIO


class M(TeaModel):
    def __init__(self):
        pass

    def validate(self):
        pass

    def to_map(self):
        result = dict()
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        return self


class MyModelSubmodel(TeaModel):
    def __init__(
        self,
        stringfield: str = None,
    ):
        self.stringfield = stringfield

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')

    def to_map(self):
        result = dict()
        if self.stringfield is not None:
            result['stringfield'] = self.stringfield
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('stringfield') is not None:
            self.stringfield = m.get('stringfield')
        return self


class MyModel(TeaModel):
    def __init__(
        self,
        stringfield: str = None,
        bytesfield: bytes = None,
        stringarrayfield: List[str] = None,
        mapfield: Dict[str, str] = None,
        name: str = None,
        submodel: MyModelSubmodel = None,
        subarray: List[M] = None,
        maparray: List[Dict[str, Any]] = None,
        object: dict = None,
        numberfield: int = None,
        readable: BinaryIO = None,
        exist_model: M = None,
        class_end_time: str = None,
        max_length: str = None,
        min_length: str = None,
        maximum: int = None,
        minimum: int = None,
        test_3: List[List[str]] = None,
        array_array_model: List[List[M]] = None,
        array_map_model: List[Dict[str, M]] = None,
        map_model: Dict[str, M] = None,
        submodel_map: Dict[str, MyModelSubmodel] = None,
    ):
        self.stringfield = stringfield
        self.bytesfield = bytesfield
        self.stringarrayfield = stringarrayfield
        self.mapfield = mapfield
        self.name = name
        self.submodel = submodel
        self.subarray = subarray
        self.maparray = maparray
        self.object = object
        self.numberfield = numberfield
        self.readable = readable
        self.exist_model = exist_model
        # 结束时间
        self.class_end_time = class_end_time
        # 最大长度
        self.max_length = max_length
        # 最小长度
        self.min_length = min_length
        # 校验最大值
        self.maximum = maximum
        # 校验最小值
        self.minimum = minimum
        # test3 desc
        self.test_3 = test_3
        self.array_array_model = array_array_model
        self.array_map_model = array_map_model
        self.map_model = map_model
        self.submodel_map = submodel_map

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')
        self.validate_required(self.bytesfield, 'bytesfield')
        self.validate_required(self.stringarrayfield, 'stringarrayfield')
        self.validate_required(self.mapfield, 'mapfield')
        self.validate_required(self.name, 'name')
        self.validate_required(self.submodel, 'submodel')
        if self.submodel:
            self.submodel.validate()
        self.validate_required(self.subarray, 'subarray')
        if self.subarray:
            for k in self.subarray:
                if k:
                    k.validate()
        self.validate_required(self.maparray, 'maparray')
        self.validate_required(self.object, 'object')
        self.validate_required(self.numberfield, 'numberfield')
        self.validate_required(self.readable, 'readable')
        self.validate_required(self.exist_model, 'exist_model')
        if self.exist_model:
            self.exist_model.validate()
        if self.class_end_time is not None:
            self.validate_pattern(self.class_end_time, 'class_end_time', '\\d{4}[-]\\d{1,2}[-]\\d{1,2}(\\s\\d{2}:\\d{2}(:\\d{2})?)?')
        if self.max_length is not None:
            self.validate_max_length(self.max_length, 'max_length', 10)
        if self.maximum is not None:
            self.validate_maximum(self.maximum, 'maximum', 99000000)
        if self.minimum is not None:
            self.validate_minimum(self.minimum, 'minimum', 0)
        self.validate_required(self.test_3, 'test_3')
        self.validate_required(self.array_array_model, 'array_array_model')
        if self.array_array_model:
            for k in self.array_array_model:
                for k1 in k:
                    if k1:
                        k1.validate()
        self.validate_required(self.array_map_model, 'array_map_model')
        self.validate_required(self.map_model, 'map_model')
        if self.map_model:
            for v in self.map_model.values():
                if v:
                    v.validate()
        self.validate_required(self.submodel_map, 'submodel_map')
        if self.submodel_map:
            for v in self.submodel_map.values():
                if v:
                    v.validate()

    def to_map(self):
        result = dict()
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
        result['subarray'] = []
        if self.subarray is not None:
            for k in self.subarray:
                result['subarray'].append(k.to_map() if k else None)
        if self.maparray is not None:
            result['maparray'] = self.maparray
        if self.object is not None:
            result['object'] = self.object
        if self.numberfield is not None:
            result['numberfield'] = self.numberfield
        if self.readable is not None:
            result['readable'] = self.readable
        if self.exist_model is not None:
            result['existModel'] = self.exist_model.to_map()
        if self.class_end_time is not None:
            result['class_end_time'] = self.class_end_time
        if self.max_length is not None:
            result['max-length'] = self.max_length
        if self.min_length is not None:
            result['min-length'] = self.min_length
        if self.maximum is not None:
            result['maximum'] = self.maximum
        if self.minimum is not None:
            result['minimum'] = self.minimum
        if self.test_3 is not None:
            result['test3'] = self.test_3
        result['arrayArrayModel'] = []
        if self.array_array_model is not None:
            for k in self.array_array_model:
                l1 = []
                for k1 in k:
                    l1.append(k1.to_map() if k1 else None)
                result['arrayArrayModel'].append(l1)
        result['arrayMapModel'] = []
        if self.array_map_model is not None:
            for k in self.array_map_model:
                d1 = {}
                for k1 ,v1 in k.items():
                    d1[k1] = v1.to_map()
                result['arrayMapModel'].append(d1)
        result['mapModel'] = {}
        if self.map_model is not None:
            for k, v in self.map_model.items():
                result['mapModel'][k] = v.to_map()
        result['submodelMap'] = {}
        if self.submodel_map is not None:
            for k, v in self.submodel_map.items():
                result['submodelMap'][k] = v.to_map()
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
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
            temp_model = MyModelSubmodel()
            self.submodel = temp_model.from_map(m['submodel'])
        self.subarray = []
        if m.get('subarray') is not None:
            for k in m.get('subarray'):
                temp_model = M()
                self.subarray.append(temp_model.from_map(k))
        if m.get('maparray') is not None:
            self.maparray = m.get('maparray')
        if m.get('object') is not None:
            self.object = m.get('object')
        if m.get('numberfield') is not None:
            self.numberfield = m.get('numberfield')
        if m.get('readable') is not None:
            self.readable = m.get('readable')
        if m.get('existModel') is not None:
            temp_model = M()
            self.exist_model = temp_model.from_map(m['existModel'])
        if m.get('class_end_time') is not None:
            self.class_end_time = m.get('class_end_time')
        if m.get('max-length') is not None:
            self.max_length = m.get('max-length')
        if m.get('min-length') is not None:
            self.min_length = m.get('min-length')
        if m.get('maximum') is not None:
            self.maximum = m.get('maximum')
        if m.get('minimum') is not None:
            self.minimum = m.get('minimum')
        if m.get('test3') is not None:
            self.test_3 = m.get('test3')
        self.array_array_model = []
        if m.get('arrayArrayModel') is not None:
            for k in m.get('arrayArrayModel'):
                l1 = []
                for k1 in k:
                    temp_model = M()
                    l1.append(temp_model.from_map(k1))
                self.array_array_model.append(l1)
        self.array_map_model = []
        if m.get('arrayMapModel') is not None:
            for k in m.get('arrayMapModel'):
                d1 = {}
                for k1 ,v1 in k.items():
                    temp_model = M()
                    d1[k1] = temp_model.from_map(v1)
                self.array_map_model.append(d1)
        self.map_model = {}
        if m.get('mapModel') is not None:
            for k, v in m.get('mapModel').items():
                temp_model = M()
                self.map_model[k] = temp_model.from_map(v)
        self.submodel_map = {}
        if m.get('submodelMap') is not None:
            for k, v in m.get('submodelMap').items():
                temp_model = MyModelSubmodel()
                self.submodel_map[k] = temp_model.from_map(v)
        return self

