# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


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
                 class_end_time=None, max_length=None, test_3=None, array_array_model=None, array_map_model=None, map_model=None,
                 submodel_map=None):
        self.stringfield = stringfield  # type: str
        self.bytesfield = bytesfield  # type: bytes
        self.stringarrayfield = stringarrayfield  # type: list
        self.mapfield = mapfield  # type: dict
        self.name = name  # type: str
        self.submodel = submodel  # type: MyModelSubmodel
        self.subarray = subarray  # type: list
        self.maparray = maparray  # type: list
        self.object = object  # type: dict
        self.numberfield = numberfield  # type: int
        self.readable = readable
        self.exist_model = exist_model  # type: M
        # 结束时间
        self.class_end_time = class_end_time  # type: str
        # 最大长度
        self.max_length = max_length  # type: str
        # test3 desc
        self.test_3 = test_3  # type: list
        self.array_array_model = array_array_model  # type: list
        self.array_map_model = array_map_model  # type: list
        self.map_model = map_model  # type: dict
        self.submodel_map = submodel_map  # type: dict

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
        if self.class_end_time:
            self.validate_pattern(self.class_end_time, 'class_end_time', '\\d{4}[-]\\d{1,2}[-]\\d{1,2}(\\s\\d{2}:\\d{2}(:\\d{2})?)?')
        if self.max_length:
            self.validate_max_length(self.max_length, 'max_length', 10)
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
        result['stringfield'] = self.stringfield
        result['bytesfield'] = self.bytesfield
        result['stringarrayfield'] = self.stringarrayfield
        result['mapfield'] = self.mapfield
        result['realName'] = self.name
        if self.submodel is not None:
            result['submodel'] = self.submodel.to_map()
        else:
            result['submodel'] = None
        result['subarray'] = []
        if self.subarray is not None:
            for k in self.subarray:
                result['subarray'].append(k.to_map() if k else None)
        else:
            result['subarray'] = None
        result['maparray'] = self.maparray
        result['object'] = self.object
        result['numberfield'] = self.numberfield
        result['readable'] = self.readable
        if self.exist_model is not None:
            result['existModel'] = self.exist_model.to_map()
        else:
            result['existModel'] = None
        result['class_end_time'] = self.class_end_time
        result['max-length'] = self.max_length
        result['test3'] = self.test_3
        result['arrayArrayModel'] = []
        if self.array_array_model is not None:
            for k in self.array_array_model:
                l1 = []
                for k1 in k:
                    l1.append(k1.to_map() if k1 else None)
                result['arrayArrayModel'].append(l1)
        else:
            result['arrayArrayModel'] = None
        result['arrayMapModel'] = []
        if self.array_map_model is not None:
            for k in self.array_map_model:
                d1 = {}
                for k1 ,v1 in k.items():
                    d1[k1] = v1.to_map()
                result['arrayMapModel'].append(d1)
        else:
            result['arrayMapModel'] = None
        result['mapModel'] = {}
        if self.map_model is not None:
            for k, v in self.map_model.items():
                result['mapModel'][k] = v.to_map()
        else:
            result['mapModel'] = None
        result['submodelMap'] = {}
        if self.submodel_map is not None:
            for k, v in self.submodel_map.items():
                result['submodelMap'][k] = v.to_map()
        else:
            result['submodelMap'] = None
        return result

    def from_map(self, map={}):
        self.stringfield = map.get('stringfield')
        self.bytesfield = map.get('bytesfield')
        self.stringarrayfield = map.get('stringarrayfield')
        self.mapfield = map.get('mapfield')
        self.name = map.get('realName')
        if map.get('submodel') is not None:
            temp_model = MyModelSubmodel()
            self.submodel = temp_model.from_map(map['submodel'])
        else:
            self.submodel = None
        self.subarray = []
        if map.get('subarray') is not None:
            for k in map.get('subarray'):
                temp_model = M()
                self.subarray.append(temp_model.from_map(k))
        else:
            self.subarray = None
        self.maparray = map.get('maparray')
        self.object = map.get('object')
        self.numberfield = map.get('numberfield')
        self.readable = map.get('readable')
        if map.get('existModel') is not None:
            temp_model = M()
            self.exist_model = temp_model.from_map(map['existModel'])
        else:
            self.exist_model = None
        self.class_end_time = map.get('class_end_time')
        self.max_length = map.get('max-length')
        self.test_3 = map.get('test3')
        self.array_array_model = []
        if map.get('arrayArrayModel') is not None:
            for k in map.get('arrayArrayModel'):
                l1 = []
                for k1 in k:
                    temp_model = M()
                    l1.append(temp_model.from_map(k1))
                self.array_array_model.append(l1)
        else:
            self.array_array_model = None
        self.array_map_model = []
        if map.get('arrayMapModel') is not None:
            for k in map.get('arrayMapModel'):
                d1 = {}
                for k1 ,v1 in k.items():
                    temp_model = M()
                    d1[k1] = temp_model.from_map(v1)
                self.array_map_model.append(d1)
        else:
            self.array_map_model = None
        self.map_model = {}
        if map.get('mapModel') is not None:
            for k, v in map.get('mapModel').items():
                temp_model = M()
                self.map_model[k] = temp_model.from_map(v)
        else:
            self.map_model = None
        self.submodel_map = {}
        if map.get('submodelMap') is not None:
            for k, v in map.get('submodelMap').items():
                temp_model = MyModelSubmodel()
                self.submodel_map[k] = temp_model.from_map(v)
        else:
            self.submodel_map = None
        return self


class MyModelSubmodel(TeaModel):
    def __init__(self, stringfield=None):
        self.stringfield = stringfield  # type: str

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')

    def to_map(self):
        result = {}
        result['stringfield'] = self.stringfield
        return result

    def from_map(self, map={}):
        self.stringfield = map.get('stringfield')
        return self


