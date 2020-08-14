# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class ComplexRequest(TeaModel):
    def __init__(self, access_key=None, body=None, strs=None, header=None, num=None, configs=None, part=None):
        self.access_key = access_key
        # Body
        self.body = body
        # Strs
        self.strs = strs
        # header
        self.header = header
        self.num = num
        self.configs = configs
        # Part
        self.part = part

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
        if self.configs is not None:
            result['configs'] = self.configs.to_map()
        else:
            result['configs'] = None
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
        if map.get('configs') is not None:
            temp_model = ComplexRequestConfigs()
            self.configs = temp_model.from_map(map['configs'])
        else:
            self.configs = None
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
        # Body
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


class ComplexRequestConfigs(TeaModel):
    def __init__(self, key=None, value=None, extra=None):
        self.key = key
        self.value = value
        self.extra = extra

    def validate(self):
        self.validate_required(self.key, 'key')
        self.validate_required(self.value, 'value')
        self.validate_required(self.extra, 'extra')

    def to_map(self):
        result = {}
        result['key'] = self.key
        result['value'] = []
        if self.value is not None:
            for k in self.value:
                result['value'].append(k)
        else:
            result['value'] = None
        result['extra'] = self.extra
        return result

    def from_map(self, map={}):
        self.key = map.get('key')
        self.value = []
        if map.get('value') is not None:
            for k in map.get('value'):
                self.value.append(k)
        else:
            self.value = None
        self.extra = map.get('extra')
        return self


class ComplexRequestPart(TeaModel):
    def __init__(self, part_number=None):
        # PartNumber
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


