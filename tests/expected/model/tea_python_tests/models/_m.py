# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 
from tea_python_tests import models as main_models 


class M(DaraModel):
    def __init__(
        self,
        sub_m: main_models.MSubM = None,
    ):
        self.sub_m = sub_m

    def validate(self):
        self.validate_required(self.sub_m, 'sub_m')
        if self.sub_m:
            self.sub_m.validate()

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.sub_m is not None:
            result['subM'] = self.sub_m.to_map()

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('subM') is not None:
            temp_model = main_models.MSubM()
            self.sub_m = temp_model.from_map(m.get('subM'))

        return self



class MSubM(DaraModel):
    def __init__(self):
        pass
    def validate(self):
        pass

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        return self

