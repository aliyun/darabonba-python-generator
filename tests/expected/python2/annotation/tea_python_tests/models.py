# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.model import TeaModel


class Test(TeaModel):
    """
    TestModel
    """
    def __init__(self, test=None):
        # Alichange app id 
        self.test = test  # type: str

    def validate(self):
        self.validate_required(self.test, 'test')

    def to_map(self):
        _map = super(Test, self).to_map()
        if _map is not None:
            return _map

        result = dict()
        if self.test is not None:
            result['test'] = self.test
        return result

    def from_map(self, m=None):
        m = m or dict()
        if m.get('test') is not None:
            self.test = m.get('test')
        return self


