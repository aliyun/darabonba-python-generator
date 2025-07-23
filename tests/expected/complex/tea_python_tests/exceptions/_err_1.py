# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from typing import Dict

from darabonba.exceptions import DaraException

class Err1Exception(DaraException):
    def __init__(
        self,
        message: str = None,
        code: str = None,
        stack: str = None,
        data: Dict[str, str] = None,
    ):
        super().__init__({
            'message': message,
            'code': code,
            'stack': stack,
        })
        self.name = 'Err1Exception'
        self.data = data

