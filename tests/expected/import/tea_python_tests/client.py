# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
try:
    from typing import List
except ImportError:
    pass

from Source import models as source_models


class Client(object):
    _id = None  # type: List[str]
    _str = None  # type: str

    def __init__(self):
        pass

    @staticmethod
    def sample(client):
        runtime = source_models.RuntimeObject()
        request = source_models.Request(
            accesskey='accesskey',
            region='region'
        )
        client.print(runtime)
