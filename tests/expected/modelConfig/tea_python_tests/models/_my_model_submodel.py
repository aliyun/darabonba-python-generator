# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 
from tea_python_tests import models as main_models 


class MyModelSubmodel(DaraModel):
    def __init__(
        self, *,
        stringfield: str = None,
        model: main_models.MyModelSubmodelModel = None,
    ):
        self.stringfield = stringfield
        self.model = model

    def validate(self):
        self.validate_required(self.stringfield, 'stringfield')
        self.validate_required(self.model, 'model')
        if self.model:
            self.model.validate()

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.stringfield is not None:
            result['stringfield'] = self.stringfield

        if self.model is not None:
            result['model'] = self.model.to_map()

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('stringfield') is not None:
            self.stringfield = m.get('stringfield')

        if m.get('model') is not None:
            temp_model = main_models.MyModelSubmodelModel()
            self.model = temp_model.from_map(m.get('model'))

        return self

