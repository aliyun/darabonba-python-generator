# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel

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
