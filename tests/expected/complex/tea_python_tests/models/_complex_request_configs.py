# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 
from typing import List, Dict


class ComplexRequestConfigs(DaraModel):
    def __init__(
        self, *,
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
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
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

