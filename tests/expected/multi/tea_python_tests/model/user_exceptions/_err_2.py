# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from tea_python_tests import user_exceptions as main_exceptions 


class Err2Exception(main_exceptions.ErrException):
    def __init__(
        self, *,
        msg: str = None,
        msg_2: str = None,
    ):
        super().__init__(
            msg = msg,
        )
        self.name = 'Err2Exception'
        self.msg_2 = msg_2

