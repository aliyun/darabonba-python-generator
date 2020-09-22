# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
try:
    from typing import BinaryIO, List, Dict
except ImportError:
    pass


class ComplexRequest(TeaModel):
    def __init__(self, access_key=None, body=None, strs=None, header=None, num=None, configs=None, part=None):
        self.access_key = access_key    # type: str
        # Body
        self.body = body                # type: BinaryIO
        # Strs
        self.strs = strs                # type: List[str]
        # header
        self.header = header            # type: ComplexRequestHeader
        self.num = num                  # type: int
        self.configs = configs          # type: ComplexRequestConfigs
        # Part
        self.part = part                # type: List[ComplexRequestPart]

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
        result['Strs'] = self.strs
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
        self.strs = map.get('Strs')
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
                self.part.append(temp_model.from_map(k))
        else:
            self.part = None
        return self


class ComplexRequestHeader(TeaModel):
    def __init__(self, content=None):
        # Body
        self.content = content          # type: str

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
        self.key = key                  # type: str
        self.value = value              # type: List[str]
        self.extra = extra              # type: Dict[str, str]

    def validate(self):
        self.validate_required(self.key, 'key')
        self.validate_required(self.value, 'value')
        self.validate_required(self.extra, 'extra')

    def to_map(self):
        result = {}
        result['key'] = self.key
        result['value'] = self.value
        result['extra'] = self.extra
        return result

    def from_map(self, map={}):
        self.key = map.get('key')
        self.value = map.get('value')
        self.extra = map.get('extra')
        return self


class ComplexRequestPart(TeaModel):
    def __init__(self, part_number=None):
        # PartNumber
        self.part_number = part_number  # type: str

    def validate(self):
        pass

    def to_map(self):
        result = {}
        result['PartNumber'] = self.part_number
        return result

    def from_map(self, map={}):
        self.part_number = map.get('PartNumber')
        return self


