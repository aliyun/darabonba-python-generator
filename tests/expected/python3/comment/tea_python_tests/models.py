# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel
from typing import List


class Test1(TeaModel):
    """
    TestModel
    """
    def __init__(
        self,
        test: str = None,
        test_2: str = None,
        test_3: List[List[str]] = None,
        test_5: str = None,
        sts: str = None,
        a_sts: str = None,
    ):
        # test desc
        self.test = test
        # model的test back comment
        # test2 desc
        self.test_2 = test_2
        # model的test2 back comment
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
        self.validate_required(self.test_2, 'test_2')
        self.validate_required(self.test_3, 'test_3')
        self.validate_required(self.test_5, 'test_5')
        self.validate_required(self.sts, 'sts')
        self.validate_required(self.a_sts, 'a_sts')

    def to_map(self):
        result = dict()
        if self.test is not None:
            result['test'] = self.test
        if self.test_2 is not None:
            result['test2'] = self.test_2
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
        if m.get('test2') is not None:
            self.test_2 = m.get('test2')
        if m.get('test3') is not None:
            self.test_3 = m.get('test3')
        if m.get('test5') is not None:
            self.test_5 = m.get('test5')
        if m.get('sts') is not None:
            self.sts = m.get('sts')
        if m.get('asts') is not None:
            self.a_sts = m.get('asts')
        return self


class Test2(TeaModel):
    """
    TestModel2
    """
    def __init__(
        self,
        test: str = None,
        test_2: str = None,
    ):
        # model的test front comment
        # test desc
        self.test = test
        # model的test front comment
        # test2 desc
        self.test_2 = test_2

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_2, 'test_2')

    def to_map(self):
        result = dict()
        if self.test is not None:
            result['test'] = self.test
        if self.test_2 is not None:
            result['test2'] = self.test_2
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')
        if m.get('test2') is not None:
            self.test_2 = m.get('test2')
        return self


class Test3(TeaModel):
    """
    TestModel3
    """
    def __init__(
        self,
        test: str = None,
        test_1: str = None,
    ):
        # model的test front comment
        # test desc
        self.test = test
        # empty comment1
        # empy comment2
        # test desc
        self.test_1 = test_1
        # model的test back comment

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_1, 'test_1')

    def to_map(self):
        result = dict()
        if self.test is not None:
            result['test'] = self.test
        if self.test_1 is not None:
            result['test1'] = self.test_1
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')
        if m.get('test1') is not None:
            self.test_1 = m.get('test1')
        return self


