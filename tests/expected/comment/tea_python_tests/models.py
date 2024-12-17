# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 
from typing import List


# import comment


"""
 * @remarks
 * TestModel
"""
class Test1(DaraModel):
    def __init__(
        self, 
        test: str = None,
    # odel的test back comment
        test_2: str = None,
    # odel的test2 back comment
        test_3: List[List[str]] = None,
        test_5: str = None,
        sts: str = None,
        a_sts: str = None,
    ):
        # test desc
        self.test = test
    # odel的test back comment
        # test2 desc
        self.test_2 = test_2
    # odel的test2 back comment
        # test3 desc
        self.test_3 = test_3
        # test desc
        self.test_5 = test_5
        # sts desc
        self.sts = sts
        # asts desc
        self.a_sts = a_sts

    def validate(self):
        self.validate_required(self.test, 'test')
    # odel的test back comment
        self.validate_required(self.test_2, 'test_2')
    # odel的test2 back comment
        self.validate_required(self.test_3, 'test_3')
        self.validate_required(self.test_5, 'test_5')
        self.validate_required(self.sts, 'sts')
        self.validate_required(self.a_sts, 'a_sts')

    def to_map(self):
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.test is not None:
            result['test'] = self.test
    # odel的test back comment
        if self.test_2 is not None:
            result['test2'] = self.test_2
    # odel的test2 back comment
        if self.test_3 is not None:
            result['test3'] = self.test_3
        if self.test_5 is not None:
            result['test5'] = self.test_5
        if self.sts is not None:
            result['sts'] = self.sts
        if self.a_sts is not None:
            result['asts'] = self.a_sts
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')
    # odel的test back comment
        if m.get('test2') is not None:
            self.test_2 = m.get('test2')
    # odel的test2 back comment
        if m.get('test3') is not None:
            self.test_3 = m.get('test3')
        if m.get('test5') is not None:
            self.test_5 = m.get('test5')
        if m.get('sts') is not None:
            self.sts = m.get('sts')
        if m.get('asts') is not None:
            self.a_sts = m.get('asts')
        return self

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
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
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
        _map = super().to_map()
        if _map is not None:
            return _map

        result = dict()
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
