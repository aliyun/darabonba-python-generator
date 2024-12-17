# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.exceptions import DaraException 
from typing import Dict


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

