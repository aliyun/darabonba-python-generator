# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class UseBeforeDefineModelSubModel(TeaModel):
    def __init__(self, use_before_define_model=None):
        self.use_before_define_model = use_before_define_model  # type: UseBeforeDefineModelOnSubModel

    def validate(self):
        self.validate_required(self.use_before_define_model, 'use_before_define_model')
        if self.use_before_define_model:
            self.use_before_define_model.validate()

    def to_map(self):
        _map = super(UseBeforeDefineModelSubModel, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.use_before_define_model is not None:
            result['useBeforeDefineModel'] = self.use_before_define_model.to_map()
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('useBeforeDefineModel') is not None:
            temp_model = UseBeforeDefineModelOnSubModel()
            self.use_before_define_model = temp_model.from_map(m['useBeforeDefineModel'])
        return self


class UseBeforeDefineModel(TeaModel):
    def __init__(self, sub_model=None):
        self.sub_model = sub_model  # type: UseBeforeDefineModelSubModel

    def validate(self):
        self.validate_required(self.sub_model, 'sub_model')
        if self.sub_model:
            self.sub_model.validate()

    def to_map(self):
        _map = super(UseBeforeDefineModel, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.sub_model is not None:
            result['subModel'] = self.sub_model.to_map()
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('subModel') is not None:
            temp_model = UseBeforeDefineModelSubModel()
            self.sub_model = temp_model.from_map(m['subModel'])
        return self


class UseBeforeDefineModelOnSubModel(TeaModel):
    def __init__(self, m=None):
        self.m = m  # type: MyModel

    def validate(self):
        self.validate_required(self.m, 'm')
        if self.m:
            self.m.validate()

    def to_map(self):
        _map = super(UseBeforeDefineModelOnSubModel, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.m is not None:
            result['m'] = self.m.to_map()
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('m') is not None:
            temp_model = MyModel()
            self.m = temp_model.from_map(m['m'])
        return self


class MyModelSubmodel(TeaModel):
    def __init__(self, stringfield=None):
        self.stringfield = stringfield  # type: str

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')

    def to_map(self):
        _map = super(MyModelSubmodel, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.stringfield is not None:
            result['stringfield'] = self.stringfield
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('stringfield') is not None:
            self.stringfield = m.get('stringfield')
        return self


class MyModelSubModelModel(TeaModel):
    def __init__(self, sub_model=None):
        self.sub_model = sub_model  # type: list[M]

    def validate(self):
        self.validate_required(self.sub_model, 'sub_model')
        if self.sub_model:
            for k in self.sub_model:
                if k:
                    k.validate()

    def to_map(self):
        _map = super(MyModelSubModelModel, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        result['subModel'] = []
        if self.sub_model is not None:
            for k in self.sub_model:
                result['subModel'].append(k.to_map() if k else None)
        return result

    def from_map(self, m=None):
        m = m or dict()
        self.sub_model = []
        if m.get('subModel') is not None:
            for k in m.get('subModel'):
                temp_model = M()
                self.sub_model.append(temp_model.from_map(k))
        return self


class MyModel(TeaModel):
    def __init__(self, stringfield=None, bytesfield=None, stringarrayfield=None, mapfield=None, name=None,
                 submodel=None, subarray=None, maparray=None, object=None, numberfield=None, readable=None, exist_model=None,
                 class_end_time=None, max_length=None, min_length=None, maximum=None, minimum=None, test_3=None,
                 array_array_model=None, array_map_model=None, map_model=None, submodel_map=None, sub_model_model=None,
                 map_array_map=None, map_array_model=None):
        self.stringfield = stringfield  # type: str
        self.bytesfield = bytesfield  # type: bytes
        self.stringarrayfield = stringarrayfield  # type: list[str]
        self.mapfield = mapfield  # type: dict[str, str]
        self.name = name  # type: str
        self.submodel = submodel  # type: MyModelSubmodel
        self.subarray = subarray  # type: list[M]
        self.maparray = maparray  # type: list[dict[str, any]]
        self.object = object  # type: dict
        self.numberfield = numberfield  # type: int
        self.readable = readable  # type: READABLE
        self.exist_model = exist_model  # type: M
        # 结束时间
        self.class_end_time = class_end_time  # type: str
        # 最大长度
        self.max_length = max_length  # type: str
        # 最小长度
        self.min_length = min_length  # type: str
        # 校验最大值
        self.maximum = maximum  # type: long
        # 校验最小值
        self.minimum = minimum  # type: long
        # test3 desc
        self.test_3 = test_3  # type: list[list[str]]
        self.array_array_model = array_array_model  # type: list[list[M]]
        self.array_map_model = array_map_model  # type: list[dict[str, M]]
        self.map_model = map_model  # type: dict[str, M]
        self.submodel_map = submodel_map  # type: dict[str, MyModelSubmodel]
        self.sub_model_model = sub_model_model  # type: MyModelSubModelModel
        self.map_array_map = map_array_map  # type: dict[str, list[dict[str, str]]]
        self.map_array_model = map_array_model  # type: dict[str, list[M]]

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
        if self.map_array_model:
            for v in self.map_array_model.values():
                for k1 in v:
                    if k1:
                        k1.validate()

    def to_map(self):
        _map = super(MyModel, self).to_map()
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
            result['SubModel'] = self.submodel.to_map()
        result['SubArray'] = []
        if self.subarray is not None:
            for k in self.subarray:
                result['SubArray'].append(k.to_map() if k else None)
        if self.maparray is not None:
            result['MapArray'] = self.maparray
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
        result['ArrayArrayModel'] = []
        if self.array_array_model is not None:
            for k in self.array_array_model:
                l1 = []
                for k1 in k:
                    l1.append(k1.to_map() if k1 else None)
                result['ArrayArrayModel'].append(l1)
        result['ArrayMapModel'] = []
        if self.array_map_model is not None:
            for k in self.array_map_model:
                d1 = {}
                for k1 ,v1 in k.items():
                    d1[k1] = v1.to_map()
                result['ArrayMapModel'].append(d1)
        result['MapModel'] = {}
        if self.map_model is not None:
            for k, v in self.map_model.items():
                result['MapModel'][k] = v.to_map()
        result['SubmodelMap'] = {}
        if self.submodel_map is not None:
            for k, v in self.submodel_map.items():
                result['SubmodelMap'][k] = v.to_map()
        if self.sub_model_model is not None:
            result['SubModelModel'] = self.sub_model_model.to_map()
        if self.map_array_map is not None:
            result['MapArrayMap'] = self.map_array_map
        result['MapArrayModel'] = {}
        if self.map_array_model is not None:
            for k, v in self.map_array_model.items():
                l1 = []
                for k1 in v:
                    l1.append(k1.to_map() if k1 else None)
                result['MapArrayModel'][k] = l1
        return result

    def from_map(self, m=None):
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
        if m.get('SubModel') is not None:
            temp_model = MyModelSubmodel()
            self.submodel = temp_model.from_map(m['SubModel'])
        self.subarray = []
        if m.get('SubArray') is not None:
            for k in m.get('SubArray'):
                temp_model = M()
                self.subarray.append(temp_model.from_map(k))
        if m.get('MapArray') is not None:
            self.maparray = m.get('MapArray')
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
        if m.get('ArrayArrayModel') is not None:
            for k in m.get('ArrayArrayModel'):
                l1 = []
                for k1 in k:
                    temp_model = M()
                    l1.append(temp_model.from_map(k1))
                self.array_array_model.append(l1)
        self.array_map_model = []
        if m.get('ArrayMapModel') is not None:
            for k in m.get('ArrayMapModel'):
                d1 = {}
                for k1 ,v1 in k.items():
                    temp_model = M()
                    d1[k1] = temp_model.from_map(v1)
                self.array_map_model.append(d1)
        self.map_model = {}
        if m.get('MapModel') is not None:
            for k, v in m.get('MapModel').items():
                temp_model = M()
                self.map_model[k] = temp_model.from_map(v)
        self.submodel_map = {}
        if m.get('SubmodelMap') is not None:
            for k, v in m.get('SubmodelMap').items():
                temp_model = MyModelSubmodel()
                self.submodel_map[k] = temp_model.from_map(v)
        if m.get('SubModelModel') is not None:
            temp_model = MyModelSubModelModel()
            self.sub_model_model = temp_model.from_map(m['SubModelModel'])
        if m.get('MapArrayMap') is not None:
            self.map_array_map = m.get('MapArrayMap')
        self.map_array_model = {}
        if m.get('MapArrayModel') is not None:
            for k, v in m.get('MapArrayModel').items():
                l1 = []
                for k1 in v:
                    temp_model = M()
                    l1.append(temp_model.from_map(k1))
                self.map_array_model['k'] = l1
        return self


class M(TeaModel):
    def __init__(self, oneself=None, self_array=None, self_map=None, self_array_map=None, self_array_array=None):
        self.oneself = oneself  # type: M
        self.self_array = self_array  # type: list[M]
        self.self_map = self_map  # type: dict[str, M]
        self.self_array_map = self_array_map  # type: list[dict[str, M]]
        self.self_array_array = self_array_array  # type: list[list[M]]

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
        _map = super(M, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.oneself is not None:
            result['oneself'] = self.oneself.to_map()
        result['selfArray'] = []
        if self.self_array is not None:
            for k in self.self_array:
                result['selfArray'].append(k.to_map() if k else None)
        result['selfMap'] = {}
        if self.self_map is not None:
            for k, v in self.self_map.items():
                result['selfMap'][k] = v.to_map()
        result['selfArrayMap'] = []
        if self.self_array_map is not None:
            for k in self.self_array_map:
                d1 = {}
                for k1 ,v1 in k.items():
                    d1[k1] = v1.to_map()
                result['selfArrayMap'].append(d1)
        result['selfArrayArray'] = []
        if self.self_array_array is not None:
            for k in self.self_array_array:
                l1 = []
                for k1 in k:
                    l1.append(k1.to_map() if k1 else None)
                result['selfArrayArray'].append(l1)
        return result

    def from_map(self, m=None):
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
                for k1 ,v1 in k.items():
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


class NodeChildSubChild(TeaModel):
    def __init__(self, child_node=None):
        self.child_node = child_node  # type: Node

    def validate(self):
        if self.child_node:
            self.child_node.validate()

    def to_map(self):
        _map = super(NodeChildSubChild, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.child_node is not None:
            result['childNode'] = self.child_node.to_map()
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('childNode') is not None:
            temp_model = Node()
            self.child_node = temp_model.from_map(m['childNode'])
        return self


class NodeChild(TeaModel):
    def __init__(self, sub_child=None):
        self.sub_child = sub_child  # type: NodeChildSubChild

    def validate(self):
        if self.sub_child:
            self.sub_child.validate()

    def to_map(self):
        _map = super(NodeChild, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.sub_child is not None:
            result['subChild'] = self.sub_child.to_map()
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('subChild') is not None:
            temp_model = NodeChildSubChild()
            self.sub_child = temp_model.from_map(m['subChild'])
        return self


class Node(TeaModel):
    def __init__(self, child=None):
        self.child = child  # type: NodeChild

    def validate(self):
        if self.child:
            self.child.validate()

    def to_map(self):
        _map = super(Node, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.child is not None:
            result['child'] = self.child.to_map()
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('child') is not None:
            temp_model = NodeChild()
            self.child = temp_model.from_map(m['child'])
        return self


