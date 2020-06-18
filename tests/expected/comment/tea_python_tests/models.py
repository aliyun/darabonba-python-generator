# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel

"""
TestModel
"""


class Test(TeaModel):
    def __init__(self, test=None):
        self.test = test

    def validate(self):
        self.validate_required(self.test, 'test')

    def to_map(self):
        result = {}
        result['test'] = self.test
        return result

    def from_map(self, map={}):
        self.test = map.get('test')
        return self

"""
TestModel
"""


class Test1(TeaModel):
    # model的test back comment
    # model的test2 back comment
    def __init__(self, test=None, test_2=None):
        self.test = test
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

"""
TestModel2
"""


class Test2(TeaModel):
    # model的test front comment
    # model的test front comment
    def __init__(self, test=None, test_2=None):
        self.test = test
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

"""
TestModel3
"""


class Test3(TeaModel):
    # model的test front comment
    # empty comment1
    # empy comment2
    # model的test back comment
    def __init__(self, test=None, test_1=None):
        self.test = test
        self.test_1 = test_1

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
