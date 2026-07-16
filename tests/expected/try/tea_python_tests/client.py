# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from darabonba.exceptions import DaraException

class Client:

    def __init__(self):
        pass

    @staticmethod
    def wrap_error() -> None:
        try :
            raise DaraException({
                'message': 'boom'
            })
        except Exception as error :
            raise DaraException({
                'message': getattr(error, 'message', str(error))
            })
        

    @staticmethod
    def typed_error(
        e: DaraException,
    ) -> str:
        return getattr(e, 'message', str(e))
