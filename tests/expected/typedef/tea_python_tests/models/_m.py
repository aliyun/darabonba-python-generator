# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 
from requests import Request 
from Tea.model import TeaModel 




class M(DaraModel):
    def __init__(
        self,
        a: Request = None,
        b: TeaModel = None,
    ):
        self.a = a
        self.b = b

    def validate(self):
        pass

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.a is not None:
            result['a'] = self.a

        if self.b is not None:
            result['b'] = self.b

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('a') is not None:
            self.a = m.get('a')

        if m.get('b') is not None:
            self.b = m.get('b')

        return self

