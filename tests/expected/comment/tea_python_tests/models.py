# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class Test1(TeaModel):
    """
    TestModel
    """
    def __init__(self, test=None, test_2=None, test_3=None, test_5=None, sts=None, a_sts=None):
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
        result = {}
        result['test'] = self.test
        result['test2'] = self.test_2
        result['test3'] = self.test_3
        result['test5'] = self.test_5
        result['sts'] = self.sts
        result['asts'] = self.a_sts
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        self.test_2 = map.get('test2')
        self.test_3 = map.get('test3')
        self.test_5 = map.get('test5')
        self.sts = map.get('sts')
        self.a_sts = map.get('asts')
        return self


class Test2(TeaModel):
    """
    TestModel2
    """
    def __init__(self, test=None, test_2=None):
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
        result = {}
        result['test'] = self.test
        result['test2'] = self.test_2
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        self.test_2 = map.get('test2')
        return self


class Test3(TeaModel):
    """
    TestModel3
    """
    def __init__(self, test=None, test_1=None):
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
        result = {}
        result['test'] = self.test
        result['test1'] = self.test_1
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        self.test_1 = map.get('test1')
        return self
