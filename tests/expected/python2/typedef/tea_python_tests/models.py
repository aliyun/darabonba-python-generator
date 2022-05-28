# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
from requests import Request


class M(TeaModel):
    def __init__(self, a=None, b=None):
        self.a = a  # type: Request
        self.b = b  # type: TeaModel

    def validate(self):
        pass

    def to_map(self):
        _map = super(M, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.a is not None:
            result['a'] = self.a
        if self.b is not None:
            result['b'] = self.b
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('a') is not None:
            self.a = m.get('a')
        if m.get('b') is not None:
            self.b = m.get('b')
        return self


