# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
try:
    from typing import List, Dict, Any, BinaryIO
except ImportError:
    pass


class M(TeaModel):
    def __init__(self):
        pass

    def validate(self):
        pass

    def to_map(self):
        result = {}
        return result

    def from_map(self, map={}):
        return self


class MyModel(TeaModel):
    def __init__(self, stringfield=None, bytesfield=None, stringarrayfield=None, mapfield=None, name=None,
                 submodel=None, subarray=None, maparray=None, object=None, numberfield=None, readable=None, exist_model=None,
                 class_end_time=None, max_length=None, min_length=None, maximum=None, minimum=None, test_3=None,
                 array_array_model=None, array_map_model=None, map_model=None, submodel_map=None):
        self.stringfield = stringfield  # type: str
        self.bytesfield = bytesfield    # type: bytes
        self.stringarrayfield = stringarrayfield  # type: List[str]
        self.mapfield = mapfield        # type: Dict[str, str]
        self.name = name                # type: str
        self.submodel = submodel        # type: MyModelSubmodel
        self.subarray = subarray        # type: List[M]
        self.maparray = maparray        # type: List[Dict[str, Any]]
        self.object = object            # type: dict
        self.numberfield = numberfield  # type: int
        self.readable = readable        # type: BinaryIO
        self.exist_model = exist_model  # type: M
        # 结束时间
        self.class_end_time = class_end_time  # type: str
        # 最大长度
        self.max_length = max_length    # type: str
        # 最小长度
        self.min_length = min_length    # type: str
        # 校验最大值
        self.maximum = maximum          # type: int
        # 校验最小值
        self.minimum = minimum          # type: int
        # test3 desc
        self.test_3 = test_3            # type: List[List[str]]
        self.array_array_model = array_array_model  # type: List[List[M]]
        self.array_map_model = array_map_model  # type: List[Dict[str, M]]
        self.map_model = map_model      # type: Dict[str, M]
        self.submodel_map = submodel_map  # type: Dict[str, MyModelSubmodel]

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
        if self.array_map_model:
            for k in self.array_map_model:
                for v1 in k.values():
                    if v1:
                        v1.validate()
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
        result = {}
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

    def from_map(self, map={}):
        if map.get('stringfield') is not None:
            self.stringfield = map.get('stringfield')
        if map.get('bytesfield') is not None:
            self.bytesfield = map.get('bytesfield')
        if map.get('stringarrayfield') is not None:
            self.stringarrayfield = map.get('stringarrayfield')
        if map.get('mapfield') is not None:
            self.mapfield = map.get('mapfield')
        if map.get('realName') is not None:
            self.name = map.get('realName')
        if map.get('submodel') is not None:
            temp_model = MyModelSubmodel()
            self.submodel = temp_model.from_map(map['submodel'])
        self.subarray = []
        if map.get('subarray') is not None:
            for k in map.get('subarray'):
                temp_model = M()
                self.subarray.append(temp_model.from_map(k))
        if map.get('maparray') is not None:
            self.maparray = map.get('maparray')
        if map.get('object') is not None:
            self.object = map.get('object')
        if map.get('numberfield') is not None:
            self.numberfield = map.get('numberfield')
        if map.get('readable') is not None:
            self.readable = map.get('readable')
        if map.get('existModel') is not None:
            temp_model = M()
            self.exist_model = temp_model.from_map(map['existModel'])
        if map.get('class_end_time') is not None:
            self.class_end_time = map.get('class_end_time')
        if map.get('max-length') is not None:
            self.max_length = map.get('max-length')
        if map.get('min-length') is not None:
            self.min_length = map.get('min-length')
        if map.get('maximum') is not None:
            self.maximum = map.get('maximum')
        if map.get('minimum') is not None:
            self.minimum = map.get('minimum')
        if map.get('test3') is not None:
            self.test_3 = map.get('test3')
        self.array_array_model = []
        if map.get('arrayArrayModel') is not None:
            for k in map.get('arrayArrayModel'):
                l1 = []
                for k1 in k:
                    temp_model = M()
                    l1.append(temp_model.from_map(k1))
                self.array_array_model.append(l1)
        self.array_map_model = []
        if map.get('arrayMapModel') is not None:
            for k in map.get('arrayMapModel'):
                d1 = {}
                for k1 ,v1 in k.items():
                    temp_model = M()
                    d1[k1] = temp_model.from_map(v1)
                self.array_map_model.append(d1)
        self.map_model = {}
        if map.get('mapModel') is not None:
            for k, v in map.get('mapModel').items():
                temp_model = M()
                self.map_model[k] = temp_model.from_map(v)
        self.submodel_map = {}
        if map.get('submodelMap') is not None:
            for k, v in map.get('submodelMap').items():
                temp_model = MyModelSubmodel()
                self.submodel_map[k] = temp_model.from_map(v)
        return self


class MyModelSubmodel(TeaModel):
    def __init__(self, stringfield=None):
        self.stringfield = stringfield  # type: str

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')

    def to_map(self):
        result = {}
        if self.stringfield is not None:
            result['stringfield'] = self.stringfield
        return result

    def from_map(self, map={}):
        if map.get('stringfield') is not None:
            self.stringfield = map.get('stringfield')
        return self


