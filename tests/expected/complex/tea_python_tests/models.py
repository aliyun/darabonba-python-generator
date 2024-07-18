# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
from typing import List, Dict, Any, BinaryIO


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


class ComplexRequestComplexList(TeaModel):
    def __init__(
        self,
        name: str = None,
        code: int = None,
    ):
        self.name = name
        self.code = code

    def validate(self):
        pass

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.name is not None:
            result['Name'] = self.name
        if self.code is not None:
            result['Code'] = self.code
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('Name') is not None:
            self.name = m.get('Name')
        if m.get('Code') is not None:
            self.code = m.get('Code')
        return self


class ComplexRequestComplexList2(TeaModel):
    def __init__(
        self,
        any: Any = None,
    ):
        self.any = any

    def validate(self):
        pass

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.any is not None:
            result['Name'] = self.any
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('Name') is not None:
            self.any = m.get('Name')
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
        complex_list: List[List[List[ComplexRequestComplexList]]] = None,
        complex_list_1: List[List[Dict[str, str]]] = None,
        complex_list_2: List[List[List[ComplexRequestComplexList2]]] = None,
        from_: str = None,
        self_: str = None,
        print: str = None,
        exec: str = None,
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
        self.complex_list = complex_list
        self.complex_list_1 = complex_list_1
        self.complex_list_2 = complex_list_2
        # test keywords
        self.from_ = from_
        # test keywords
        self.self_ = self_
        # test keywords
        self.print = print
        # test keywords
        self.exec = exec

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
        self.validate_required(self.complex_list_2, 'complex_list_2')
        if self.complex_list_2:
            for k in self.complex_list_2:
                for k1 in k:
                    for k2 in k1:
                        if k2:
                            k2.validate()
        self.validate_required(self.from_, 'from_')
        self.validate_required(self.self_, 'self_')
        self.validate_required(self.print, 'print')
        self.validate_required(self.exec, 'exec')

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
        result['complexList'] = []
        if self.complex_list is not None:
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
        result['ComplexList2'] = []
        if self.complex_list_2 is not None:
            for k in self.complex_list_2:
                l1 = []
                for k1 in k:
                    l2 = []
                    for k2 in k1:
                        l2.append(k2.to_map() if k2 else None)
                    l1.append(l2)
                result['ComplexList2'].append(l1)
        if self.from_ is not None:
            result['from'] = self.from_
        if self.self_ is not None:
            result['self'] = self.self_
        if self.print is not None:
            result['print'] = self.print
        if self.exec is not None:
            result['exec'] = self.exec
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
        self.complex_list_2 = []
        if m.get('ComplexList2') is not None:
            for k in m.get('ComplexList2'):
                l1 = []
                for k1 in k:
                    l2 = []
                    for k2 in k1:
                        temp_model = ComplexRequestComplexList2()
                        l2.append(temp_model.from_map(k2))
                    l1.append(l2)
                self.complex_list_2.append(l1)
        if m.get('from') is not None:
            self.from_ = m.get('from')
        if m.get('self') is not None:
            self.self_ = m.get('self')
        if m.get('print') is not None:
            self.print = m.get('print')
        if m.get('exec') is not None:
            self.exec = m.get('exec')
        return self


