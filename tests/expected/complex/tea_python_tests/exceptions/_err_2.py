# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from darabonba.exceptions import DaraException

class Err2Exception(DaraException):
    def __init__(
        self,
        message: str = None,
        code: str = None,
        stack: str = None,
        access_err_message: str = None,
    ):
        super().__init__({
            'message': message,
            'code': code,
            'stack': stack,
        })
        self.name = 'Err2Exception'
        self.access_err_message = access_err_message

