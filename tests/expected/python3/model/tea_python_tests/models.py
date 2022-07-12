# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
from typing import List, Dict, Any, BinaryIO


class M(TeaModel):
    def __init__(
        self,
        oneself: 'M' = None,
        self_array: List['M'] = None,
        self_map: Dict[str, 'M'] = None,
        self_array_map: List[Dict[str, 'M']] = None,
        self_array_array: List[List['M']] = None,
    ):
        self.oneself = oneself
        self.self_array = self_array
        self.self_map = self_map
        self.self_array_map = self_array_map
        self.self_array_array = self_array_array

    def validate(self):
        self.validate_required(self.oneself, 'oneself')
        if self.oneself:
            self.oneself.validate()
        self.validate_required(self.self_array, 'self_array')
        if self.self_array:
            for k in self.self_array:
                if k:
                    k.validate()
        self.validate_required(self.self_map, 'self_map')
        if self.self_map:
            for v in self.self_map.values():
                if v:
                    v.validate()
        self.validate_required(self.self_array_map, 'self_array_map')
        self.validate_required(self.self_array_array, 'self_array_array')
        if self.self_array_array:
            for k in self.self_array_array:
                for k1 in k:
                    if k1:
                        k1.validate()

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.oneself is not None:
            result['oneself'] = self.oneself.to_map()
        if self.self_array is not None:
            result['selfArray'] = []
            for k in self.self_array:
                result['selfArray'].append(k.to_map() if k else None)
        if self.self_map is not None:
            result['selfMap'] = {}
            for k, v in self.self_map.items():
                result['selfMap'][k] = v.to_map()
        if self.self_array_map is not None:
            result['selfArrayMap'] = []
            for k in self.self_array_map:
                d1 = {}
                for k1 ,v1 in k.items():
                    d1[k1] = v1.to_map()
                result['selfArrayMap'].append(d1)
        if self.self_array_array is not None:
            result['selfArrayArray'] = []
            for k in self.self_array_array:
                l1 = []
                for k1 in k:
                    l1.append(k1.to_map() if k1 else None)
                result['selfArrayArray'].append(l1)
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('oneself') is not None:
            temp_model = M()
            self.oneself = temp_model.from_map(m['oneself'])
        self.self_array = []
        if m.get('selfArray') is not None:
            for k in m.get('selfArray'):
                temp_model = M()
                self.self_array.append(temp_model.from_map(k))
        self.self_map = {}
        if m.get('selfMap') is not None:
            for k, v in m.get('selfMap').items():
                temp_model = M()
                self.self_map[k] = temp_model.from_map(v)
        self.self_array_map = []
        if m.get('selfArrayMap') is not None:
            for k in m.get('selfArrayMap'):
                d1 = {}
                for k1, v1 in k.items():
                    temp_model = M()
                    d1[k1] = temp_model.from_map(v1)
                self.self_array_map.append(d1)
        self.self_array_array = []
        if m.get('selfArrayArray') is not None:
            for k in m.get('selfArrayArray'):
                l1 = []
                for k1 in k:
                    temp_model = M()
                    l1.append(temp_model.from_map(k1))
                self.self_array_array.append(l1)
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
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.stringfield is not None:
            result['stringfield'] = self.stringfield
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('stringfield') is not None:
            self.stringfield = m.get('stringfield')
        return self


class MyModelSubModelModel(TeaModel):
    def __init__(
        self,
        sub_model: List[M] = None,
    ):
        self.sub_model = sub_model

    def validate(self):
        self.validate_required(self.sub_model, 'sub_model')
        if self.sub_model:
            for k in self.sub_model:
                if k:
                    k.validate()

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.sub_model is not None:
            result['subModel'] = []
            for k in self.sub_model:
                result['subModel'].append(k.to_map() if k else None)
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        self.sub_model = []
        if m.get('subModel') is not None:
            for k in m.get('subModel'):
                temp_model = M()
                self.sub_model.append(temp_model.from_map(k))
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
        sub_model_model: MyModelSubModelModel = None,
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
        self.sub_model_model = sub_model_model

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
        self.validate_required(self.sub_model_model, 'sub_model_model')
        if self.sub_model_model:
            self.sub_model_model.validate()

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

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
        if self.subarray is not None:
            result['subarray'] = []
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
        if self.array_array_model is not None:
            result['arrayArrayModel'] = []
            for k in self.array_array_model:
                l1 = []
                for k1 in k:
                    l1.append(k1.to_map() if k1 else None)
                result['arrayArrayModel'].append(l1)
        if self.array_map_model is not None:
            result['arrayMapModel'] = []
            for k in self.array_map_model:
                d1 = {}
                for k1 ,v1 in k.items():
                    d1[k1] = v1.to_map()
                result['arrayMapModel'].append(d1)
        if self.map_model is not None:
            result['mapModel'] = {}
            for k, v in self.map_model.items():
                result['mapModel'][k] = v.to_map()
        if self.submodel_map is not None:
            result['submodelMap'] = {}
            for k, v in self.submodel_map.items():
                result['submodelMap'][k] = v.to_map()
        if self.sub_model_model is not None:
            result['subModelModel'] = self.sub_model_model.to_map()
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
                for k1, v1 in k.items():
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
        if m.get('subModelModel') is not None:
            temp_model = MyModelSubModelModel()
            self.sub_model_model = temp_model.from_map(m['subModelModel'])
        return self


class UseBeforeDefineModelOnSubModel(TeaModel):
    def __init__(
        self,
        m: MyModel = None,
    ):
        self.m = m

    def validate(self):
        self.validate_required(self.m, 'm')
        if self.m:
            self.m.validate()

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.m is not None:
            result['m'] = self.m.to_map()
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('m') is not None:
            temp_model = MyModel()
            self.m = temp_model.from_map(m['m'])
        return self


class UseBeforeDefineModelSubModel(TeaModel):
    def __init__(
        self,
        use_before_define_model: UseBeforeDefineModelOnSubModel = None,
    ):
        self.use_before_define_model = use_before_define_model

    def validate(self):
        self.validate_required(self.use_before_define_model, 'use_before_define_model')
        if self.use_before_define_model:
            self.use_before_define_model.validate()

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.use_before_define_model is not None:
            result['useBeforeDefineModel'] = self.use_before_define_model.to_map()
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('useBeforeDefineModel') is not None:
            temp_model = UseBeforeDefineModelOnSubModel()
            self.use_before_define_model = temp_model.from_map(m['useBeforeDefineModel'])
        return self


class UseBeforeDefineModel(TeaModel):
    def __init__(
        self,
        sub_model: UseBeforeDefineModelSubModel = None,
    ):
        self.sub_model = sub_model

    def validate(self):
        self.validate_required(self.sub_model, 'sub_model')
        if self.sub_model:
            self.sub_model.validate()

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.sub_model is not None:
            result['subModel'] = self.sub_model.to_map()
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('subModel') is not None:
            temp_model = UseBeforeDefineModelSubModel()
            self.sub_model = temp_model.from_map(m['subModel'])
        return self


