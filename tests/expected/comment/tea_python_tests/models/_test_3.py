# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 


"""
 * @remarks
 * TestModel3
"""
class Test3(DaraModel):
    def __init__(
        self,
    # model的test front comment
        test: str = None,
    # empty comment1
    # empy comment2
        test_1: str = None,
    ):
    # model的test front comment
        # test desc
        self.test = test
    # empty comment1
    # empy comment2
        # test desc
        self.test_1 = test_1

    def validate(self):
    # model的test front comment
        self.validate_required(self.test, 'test')
    # empty comment1
    # empy comment2
        self.validate_required(self.test_1, 'test_1')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
    # model的test front comment
        if self.test is not None:
            result['test'] = self.test

    # empty comment1
    # empy comment2
        if self.test_1 is not None:
            result['test1'] = self.test_1

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
    # model的test front comment
        if m.get('test') is not None:
            self.test = m.get('test')

    # empty comment1
    # empy comment2
        if m.get('test1') is not None:
            self.test_1 = m.get('test1')

        return self

    # odel的test back comment
