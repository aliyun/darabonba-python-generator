# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class Test(TeaModel):
    """
    TestModel
    """
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
