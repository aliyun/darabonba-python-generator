# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
from typing import List, Dict, BinaryIO


class ComplexRequestHeader(TeaModel):
    def __init__(
        self,
        content: str = None,
    ):
        # Body
        self.content = content

    def validate(self):
        self.validate_required(self.content, 'content')

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.content is not None:
            result['Content'] = self.content
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('Content') is not None:
            self.content = m.get('Content')
        return self


class ComplexRequestConfigs(TeaModel):
    def __init__(
        self,
        key: str = None,
        value: List[str] = None,
        extra: Dict[str, str] = None,
    ):
        self.key = key
        self.value = value
        self.extra = extra

    def validate(self):
        self.validate_required(self.key, 'key')
        self.validate_required(self.value, 'value')
        self.validate_required(self.extra, 'extra')

    def to_map(self):
        _map = super().to_map()
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

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('key') is not None:
            self.key = m.get('key')
        if m.get('value') is not None:
            self.value = m.get('value')
        if m.get('extra') is not None:
            self.extra = m.get('extra')
        return self


class ComplexRequestPart(TeaModel):
    def __init__(
        self,
        part_number: str = None,
    ):
        # PartNumber
        self.part_number = part_number

    def validate(self):
        pass

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.part_number is not None:
            result['PartNumber'] = self.part_number
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('PartNumber') is not None:
            self.part_number = m.get('PartNumber')
        return self


class ComplexRequest(TeaModel):
    def __init__(
        self,
        access_key: str = None,
        body: BinaryIO = None,
        strs: List[str] = None,
        header: ComplexRequestHeader = None,
        num: int = None,
        configs: ComplexRequestConfigs = None,
        part: List[ComplexRequestPart] = None,
    ):
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
        _map = super().to_map()
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
        result['Part'] = []
        if self.part is not None:
            for k in self.part:
                result['Part'].append(k.to_map() if k else None)
        return result

    def from_map(self, m: dict = None):
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
        return self


