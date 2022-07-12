# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class ComplexRequestHeader(TeaModel):
    def __init__(self, content=None):
        # Body
        self.content = content  # type: str

    def validate(self):
        self.validate_required(self.content, 'content')

    def to_map(self):
        _map = super(ComplexRequestHeader, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.content is not None:
            result['Content'] = self.content
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('Content') is not None:
            self.content = m.get('Content')
        return self


class ComplexRequestConfigs(TeaModel):
    def __init__(self, key=None, value=None, extra=None):
        self.key = key  # type: str
        self.value = value  # type: list[str]
        self.extra = extra  # type: dict[str, str]

    def validate(self):
        self.validate_required(self.key, 'key')
        self.validate_required(self.value, 'value')
        self.validate_required(self.extra, 'extra')

    def to_map(self):
        _map = super(ComplexRequestConfigs, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.key is not None:
            result['key'] = self.key
        if self.value is not None:
            result['value'] = self.value
        if self.extra is not None:
            result['extra'] = self.extra
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('key') is not None:
            self.key = m.get('key')
        if m.get('value') is not None:
            self.value = m.get('value')
        if m.get('extra') is not None:
            self.extra = m.get('extra')
        return self


class ComplexRequestPart(TeaModel):
    def __init__(self, part_number=None):
        # PartNumber
        self.part_number = part_number  # type: str

    def validate(self):
        pass

    def to_map(self):
        _map = super(ComplexRequestPart, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.part_number is not None:
            result['PartNumber'] = self.part_number
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('PartNumber') is not None:
            self.part_number = m.get('PartNumber')
        return self


class ComplexRequestComplexList(TeaModel):
    def __init__(self, name=None, code=None):
        self.name = name  # type: str
        self.code = code  # type: int

    def validate(self):
        pass

    def to_map(self):
        _map = super(ComplexRequestComplexList, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.name is not None:
            result['Name'] = self.name
        if self.code is not None:
            result['Code'] = self.code
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('Name') is not None:
            self.name = m.get('Name')
        if m.get('Code') is not None:
            self.code = m.get('Code')
        return self


class ComplexRequest(TeaModel):
    def __init__(self, access_key=None, body=None, strs=None, header=None, num=None, configs=None, part=None,
                 complex_list=None, complex_list_1=None):
        self.access_key = access_key  # type: str
        # Body
        self.body = body  # type: READABLE
        # Strs
        self.strs = strs  # type: list[str]
        # header
        self.header = header  # type: ComplexRequestHeader
        self.num = num  # type: int
        self.configs = configs  # type: ComplexRequestConfigs
        # Part
        self.part = part  # type: list[ComplexRequestPart]
        self.complex_list = complex_list  # type: list[list[list[ComplexRequestComplexList]]]
        self.complex_list_1 = complex_list_1  # type: list[list[dict[str, str]]]

    def validate(self):
        self.validate_required(self.access_key, 'access_key')
        self.validate_required(self.body, 'body')
        self.validate_required(self.strs, 'strs')
        self.validate_required(self.header, 'header')
        if self.header:
            self.header.validate()
        self.validate_required(self.num, 'num')
        self.validate_required(self.configs, 'configs')
        if self.configs:
            self.configs.validate()
        if self.part:
            for k in self.part:
                if k:
                    k.validate()
        self.validate_required(self.complex_list, 'complex_list')
        if self.complex_list:
            for k in self.complex_list:
                for k1 in k:
                    for k2 in k1:
                        if k2:
                            k2.validate()
        self.validate_required(self.complex_list_1, 'complex_list_1')

    def to_map(self):
        _map = super(ComplexRequest, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.access_key is not None:
            result['accessKey'] = self.access_key
        if self.body is not None:
            result['Body'] = self.body
        if self.strs is not None:
            result['Strs'] = self.strs
        if self.header is not None:
            result['header'] = self.header.to_map()
        if self.num is not None:
            result['Num'] = self.num
        if self.configs is not None:
            result['configs'] = self.configs.to_map()
        if self.part is not None:
            result['Part'] = []
            for k in self.part:
                result['Part'].append(k.to_map() if k else None)
        if self.complex_list is not None:
            result['complexList'] = []
            for k in self.complex_list:
                l1 = []
                for k1 in k:
                    l2 = []
                    for k2 in k1:
                        l2.append(k2.to_map() if k2 else None)
                    l1.append(l2)
                result['complexList'].append(l1)
        if self.complex_list_1 is not None:
            result['complexList1'] = self.complex_list_1
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('accessKey') is not None:
            self.access_key = m.get('accessKey')
        if m.get('Body') is not None:
            self.body = m.get('Body')
        if m.get('Strs') is not None:
            self.strs = m.get('Strs')
        if m.get('header') is not None:
            temp_model = ComplexRequestHeader()
            self.header = temp_model.from_map(m['header'])
        if m.get('Num') is not None:
            self.num = m.get('Num')
        if m.get('configs') is not None:
            temp_model = ComplexRequestConfigs()
            self.configs = temp_model.from_map(m['configs'])
        self.part = []
        if m.get('Part') is not None:
            for k in m.get('Part'):
                temp_model = ComplexRequestPart()
                self.part.append(temp_model.from_map(k))
        self.complex_list = []
        if m.get('complexList') is not None:
            for k in m.get('complexList'):
                l1 = []
                for k1 in k:
                    l2 = []
                    for k2 in k1:
                        temp_model = ComplexRequestComplexList()
                        l2.append(temp_model.from_map(k2))
                    l1.append(l2)
                self.complex_list.append(l1)
        if m.get('complexList1') is not None:
            self.complex_list_1 = m.get('complexList1')
        return self


