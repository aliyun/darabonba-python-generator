# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class Test1(TeaModel):
    """
    TestModel
    """
    def __init__(self, test=None, test_2=None, test_3=None, test_5=None, sts=None, a_sts=None):
        # test desc
        self.test = test  # type: str
        # model的test back comment
        # test2 desc
        self.test_2 = test_2  # type: str
        # model的test2 back comment
        # test3 desc
        self.test_3 = test_3  # type: list[list[str]]
        # test desc
        self.test_5 = test_5  # type: str
        # sts desc
        self.sts = sts  # type: str
        # asts desc
        self.a_sts = a_sts  # type: str

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_2, 'test_2')
        self.validate_required(self.test_3, 'test_3')
        self.validate_required(self.test_5, 'test_5')
        self.validate_required(self.sts, 'sts')
        self.validate_required(self.a_sts, 'a_sts')

    def to_map(self):
        _map = super(Test1, self).to_map()
        if _map is not None:
            return _map

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

    def from_map(self, m=None):
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
    def __init__(self, test=None, test_2=None):
        # model的test front comment
        # test desc
        self.test = test  # type: str
        # model的test front comment
        # test2 desc
        self.test_2 = test_2  # type: str

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_2, 'test_2')

    def to_map(self):
        _map = super(Test2, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.test is not None:
            result['test'] = self.test
        if self.test_2 is not None:
            result['test2'] = self.test_2
        return result

    def from_map(self, m=None):
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
    def __init__(self, test=None, test_1=None):
        # model的test front comment
        # test desc
        self.test = test  # type: str
        # empty comment1
        # empy comment2
        # test desc
        self.test_1 = test_1  # type: str
        # model的test back comment

    def validate(self):
        self.validate_required(self.test, 'test')
        self.validate_required(self.test_1, 'test_1')

    def to_map(self):
        _map = super(Test3, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.test is not None:
            result['test'] = self.test
        if self.test_1 is not None:
            result['test1'] = self.test_1
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')
        if m.get('test1') is not None:
            self.test_1 = m.get('test1')
        return self


