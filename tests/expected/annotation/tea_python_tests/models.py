# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 


"""
 * @remarks
 * TestModel
"""
class Test(DaraModel):
    def __init__(
        self, 
        test: str = None,
    ):
        # Alichange app id
        self.test = test

    def validate(self):
        self.validate_required(self.test, 'test')

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.test is not None:
            result['test'] = self.test
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')
        return self

