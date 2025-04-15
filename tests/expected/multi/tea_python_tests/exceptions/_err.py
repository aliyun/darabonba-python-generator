# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.exceptions import DaraException 


class ERRException(DaraException):
    def __init__(
        self, *,
        message: str = None,
        code: str = None,
        stack: str = None,
        test: int = None,
    ):
        super().__init__({
            'message': message,
            'code': code,
            'stack': stack,
        })
        self.name = 'ERRException'
        self.test = test

class ErrException(DaraException):
    def __init__(
        self, *,
        message: str = None,
        code: str = None,
        stack: str = None,
        test: str = None,
    ):
        super().__init__({
            'message': message,
            'code': code,
            'stack': stack,
        })
        self.name = 'ErrException'
        self.test = test

