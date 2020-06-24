# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel

"""
TestModel
"""


class Test(TeaModel):
    def __init__(self, test=None):
        self.test = test

    def validate(self):
        self.validate_required(self.test, 'test')

    def to_map(self):
        result = {}
        result['test'] = self.test
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        return self

"""
TestModel
"""


class Test1(TeaModel):
    # model的test back comment
    # model的test2 back comment
    def __init__(self, test=None, test_2=None):
        self.test = test
        self.test_2 = test_2

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_2, 'test_2')

    def to_map(self):
        result = {}
        result['test'] = self.test
        result['test2'] = self.test_2
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        self.test_2 = map.get('test2')
        return self

"""
TestModel2
"""


class Test2(TeaModel):
    # model的test front comment
    # model的test front comment
    def __init__(self, test=None, test_2=None):
        self.test = test
        self.test_2 = test_2

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_2, 'test_2')

    def to_map(self):
        result = {}
        result['test'] = self.test
        result['test2'] = self.test_2
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        self.test_2 = map.get('test2')
        return self

"""
TestModel3
"""


class Test3(TeaModel):
    # model的test front comment
    # empty comment1
    # empy comment2
    # model的test back comment
    def __init__(self, test=None, test_1=None):
        self.test = test
        self.test_1 = test_1

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_1, 'test_1')

    def to_map(self):
        result = {}
        result['test'] = self.test
        result['test1'] = self.test_1
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        self.test_1 = map.get('test1')
        return self


class ComplexRequest(TeaModel):
    def __init__(self, access_key=None, body=None, strs=None, header=None, num=None, part=None):
        self.access_key = access_key
        self.body = body
        self.strs = []
        self.header = header
        self.num = num
        self.part = []

    def validate(self):
        self.validate_required(self.access_key, 'access_key')
        self.validate_required(self.body, 'body')
        self.validate_required(self.strs, 'strs')
        self.validate_required(self.header, 'header')
        if self.header:
            self.header.validate()
        self.validate_required(self.num, 'num')
        if self.part:
            for k in self.part:
                if k :
                    k.validate()

    def to_map(self):
        result = {}
        result['accessKey'] = self.access_key
        result['Body'] = self.body
        result['Strs'] = []
        if self.strs is not None:
            for k in self.strs:
                result['Strs'].append(k)
        else:
            result['Strs'] = None
        if self.header is not None:
            result['header'] = self.header.to_map()
        else:
            result['header'] = None
        result['Num'] = self.num
        result['Part'] = []
        if self.part is not None:
            for k in self.part:
                result['Part'].append(k.to_map() if k else None)
        else:
            result['Part'] = None
        return result

    def from_map(self, map={}):
        self.access_key = map.get('accessKey')
        self.body = map.get('Body')
        self.strs = []
        if map.get('Strs') is not None:
            for k in map.get('Strs'):
                self.strs.append(k)
        else:
            self.strs = None
        if map.get('header') is not None:
            temp_model = ComplexRequestHeader()
            self.header = temp_model.from_map(map['header'])
        else:
            self.header = None
        self.num = map.get('Num')
        self.part = []
        if map.get('Part') is not None:
            for k in map.get('Part'):
                temp_model = ComplexRequestPart()
                temp_model = temp_model.from_map(k)
                self.part.append(temp_model)
        else:
            self.part = None
        return self


class ComplexRequestHeader(TeaModel):
    def __init__(self, content=None):
        self.content = content

    def validate(self):
        self.validate_required(self.content, 'content')

    def to_map(self):
        result = {}
        result['Content'] = self.content
        return result

    def from_map(self, map={}):
        self.content = map.get('Content')
        return self


class ComplexRequestPart(TeaModel):
    def __init__(self, part_number=None):
        self.part_number = part_number

    def validate(self):
        pass

    def to_map(self):
        result = {}
        result['PartNumber'] = self.part_number
        return result

    def from_map(self, map={}):
        self.part_number = map.get('PartNumber')
        return self


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
    def __init__(self, stringfield=None, bytesfield=None, stringarrayfield=None, mapfield=None, name=None, submodel=None, subarraymodel=None, subarray=None, maparray=None, object=None, numberfield=None, readable=None, exist_model=None, class_end_time=None, max_length=None):
        self.stringfield = stringfield
        self.bytesfield = bytesfield
        self.stringarrayfield = []
        self.mapfield = {}
        self.name = name
        self.submodel = submodel
        self.subarraymodel = []
        self.subarray = []
        self.maparray = []
        self.object = object
        self.numberfield = numberfield
        self.readable = readable
        self.exist_model = exist_model
        self.class_end_time = class_end_time
        self.max_length = max_length

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')
        self.validate_required(self.bytesfield, 'bytesfield')
        self.validate_required(self.stringarrayfield, 'stringarrayfield')
        self.validate_required(self.mapfield, 'mapfield')
        self.validate_required(self.name, 'name')
        self.validate_required(self.submodel, 'submodel')
        if self.submodel:
            self.submodel.validate()
        self.validate_required(self.subarraymodel, 'subarraymodel')
        if self.subarraymodel:
            for k in self.subarraymodel:
                if k :
                    k.validate()
        self.validate_required(self.subarray, 'subarray')
        if self.subarray:
            for k in self.subarray:
                if k :
                    k.validate()
        self.validate_required(self.maparray, 'maparray')
        if self.maparray:
            for k in self.maparray:
                if k :
                    k.validate()
        self.validate_required(self.object, 'object')
        self.validate_required(self.numberfield, 'numberfield')
        self.validate_required(self.readable, 'readable')
        self.validate_required(self.exist_model, 'exist_model')
        if self.exist_model:
            self.exist_model.validate()
        if self.class_end_time:
            self.validate_pattern(class_end_time, 'class_end_time', '\\d{4}[-]\\d{1,2}[-]\\d{1,2}(\\s\\d{2}:\\d{2}(:\\d{2})?)?')
        if self.max_length:
            self.validate_max_length(max_length, 'max_length', 10)

    def to_map(self):
        result = {}
        result['stringfield'] = self.stringfield
        result['bytesfield'] = self.bytesfield
        result['stringarrayfield'] = []
        if self.stringarrayfield is not None:
            for k in self.stringarrayfield:
                result['stringarrayfield'].append(k)
        else:
            result['stringarrayfield'] = None
        result['mapfield'] = self.mapfield
        result['realName'] = self.name
        if self.submodel is not None:
            result['submodel'] = self.submodel.to_map()
        else:
            result['submodel'] = None
        result['subarraymodel'] = []
        if self.subarraymodel is not None:
            for k in self.subarraymodel:
                result['subarraymodel'].append(k.to_map() if k else None)
        else:
            result['subarraymodel'] = None
        result['subarray'] = []
        if self.subarray is not None:
            for k in self.subarray:
                result['subarray'].append(k.to_map() if k else None)
        else:
            result['subarray'] = None
        result['maparray'] = []
        if self.maparray is not None:
            for k in self.maparray:
                result['maparray'].append(k.to_map() if k else None)
        else:
            result['maparray'] = None
        result['object'] = self.object
        result['numberfield'] = self.numberfield
        result['readable'] = self.readable
        if self.exist_model is not None:
            result['existModel'] = self.exist_model.to_map()
        else:
            result['existModel'] = None
        result['class_end_time'] = self.class_end_time
        result['max_length'] = self.max_length
        return result

    def from_map(self, map={}):
        self.stringfield = map.get('stringfield')
        self.bytesfield = map.get('bytesfield')
        self.stringarrayfield = []
        if map.get('stringarrayfield') is not None:
            for k in map.get('stringarrayfield'):
                self.stringarrayfield.append(k)
        else:
            self.stringarrayfield = None
        self.mapfield = map.get('mapfield')
        self.name = map.get('realName')
        if map.get('submodel') is not None:
            temp_model = MyModelSubmodel()
            self.submodel = temp_model.from_map(map['submodel'])
        else:
            self.submodel = None
        self.subarraymodel = []
        if map.get('subarraymodel') is not None:
            for k in map.get('subarraymodel'):
                temp_model = MyModelSubarraymodel()
                temp_model = temp_model.from_map(k)
                self.subarraymodel.append(temp_model)
        else:
            self.subarraymodel = None
        self.subarray = []
        if map.get('subarray') is not None:
            for k in map.get('subarray'):
                temp_model = M()
                temp_model = temp_model.from_map(k)
                self.subarray.append(temp_model)
        else:
            self.subarray = None
        self.maparray = []
        if map.get('maparray') is not None:
            for k in map.get('maparray'):
                temp_model = map[string,any]()
                temp_model = temp_model.from_map(k)
                self.maparray.append(temp_model)
        else:
            self.maparray = None
        self.object = map.get('object')
        self.numberfield = map.get('numberfield')
        self.readable = map.get('readable')
        if map.get('existModel') is not None:
            temp_model = M()
            self.exist_model = temp_model.from_map(map['existModel'])
        else:
            self.exist_model = None
        self.class_end_time = map.get('class_end_time')
        self.max_length = map.get('max_length')
        return self


class MyModelSubmodel(TeaModel):
    def __init__(self, stringfield=None):
        self.stringfield = stringfield

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')

    def to_map(self):
        result = {}
        result['stringfield'] = self.stringfield
        return result

    def from_map(self, map={}):
        self.stringfield = map.get('stringfield')
        return self


class MyModelSubarraymodel(TeaModel):
    def __init__(self):
        pass

    def validate(self):
        pass

    def to_map(self):
        result = {}
        return result

    def from_map(self, map={}):
        return self
