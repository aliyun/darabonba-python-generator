# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from typing import Any

from darabonba.model import DaraModel
from tea_python_tests.model import user_models as user_models

class TestModelDIR(DaraModel):
    def __init__(
        self,
        test: str = None,
        a: Any = None,
    ):
        self.test = test
        self.a = a

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.a, 'a')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.test is not None:
            result['test'] = self.test

        if self.a is not None:
            result['a'] = self.a

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')

        if m.get('a') is not None:
            self.a = m.get('a')

        return self



class TestModelDir(DaraModel):
    def __init__(
        self,
        test: int = None,
        m: user_models.Info = None,
    ):
        self.test = test
        self.m = m

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.m, 'm')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.test is not None:
            result['test'] = self.test

        if self.m is not None:
            result['m'] = self.m.to_map()

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')

        if m.get('m') is not None:
            temp_model = user_models.Info()
            self.m = temp_model.from_map(m.get('m'))

        return self

