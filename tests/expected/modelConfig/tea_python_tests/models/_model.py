# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from darabonba.model import DaraModel

class Model(DaraModel):
    def __init__(
        self, *,
        str: str = None,
    ):
        self.str = str

    def validate(self):
        self.validate_required(self.str, 'str')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.str is not None:
            result['str'] = self.str

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('str') is not None:
            self.str = m.get('str')

        return self

