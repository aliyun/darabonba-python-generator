# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class Test(TeaModel):
    """
    TestModel
    """
    def __init__(self, test=None):
        # Alichange app id 
        self.test = test                # type: str

    def validate(self):
        self.validate_required(self.test, 'test')

    def to_map(self):
        result = {}
        if self.test is not None:
            result['test'] = self.test
        return result

    def from_map(self, map={}):
        if map.get('test') is not None:
            self.test = map.get('test')
        return self
