# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.exceptions import DaraException 
from tea_python_tests import models as main_models 
from typing import Dict


class MainFileException(DaraException):
    def __init__(
        self, *,
        message: str = None,
        code: str = None,
        stack: str = None,
        size: int = None,
        data: Dict[str, main_models.Model] = None,
        model: main_models.MainFileModel = None,
    ):
        super().__init__({
            'message': message,
            'code': code,
            'stack': stack,
        })
        self.name = 'MainFileException'
        self.size = size
        self.data = data
        self.model = model

