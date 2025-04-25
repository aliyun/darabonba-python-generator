# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 


"""
 * @remarks
 * TestModel2
"""
class Test2(DaraModel):
    def __init__(
        self,
    # model的test front comment
        test: str = None,
    # model的test front comment
        test_2: str = None,
    ):
    # model的test front comment
        # test desc
        self.test = test
    # model的test front comment
        # test2 desc
        self.test_2 = test_2

    def validate(self):
    # model的test front comment
        self.validate_required(self.test, 'test')
    # model的test front comment
        self.validate_required(self.test_2, 'test_2')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
    # model的test front comment
        if self.test is not None:
            result['test'] = self.test

    # model的test front comment
        if self.test_2 is not None:
            result['test2'] = self.test_2

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
    # model的test front comment
        if m.get('test') is not None:
            self.test = m.get('test')

    # model的test front comment
        if m.get('test2') is not None:
            self.test_2 = m.get('test2')

        return self

