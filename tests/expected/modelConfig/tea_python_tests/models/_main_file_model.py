# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 
from tea_python_tests import models as main_models 


class MainFileModel(DaraModel):
    def __init__(
        self, *,
        str: str = None,
        model: main_models.MainFileModelModel = None,
    ):
        self.str = str
        self.model = model

    def validate(self):
        self.validate_required(self.str, 'str')
        self.validate_required(self.model, 'model')
        if self.model:
            self.model.validate()

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.str is not None:
            result['str'] = self.str

        if self.model is not None:
            result['model'] = self.model.to_map()

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('str') is not None:
            self.str = m.get('str')

        if m.get('model') is not None:
            temp_model = main_models.MainFileModelModel()
            self.model = temp_model.from_map(m.get('model'))

        return self

