# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Source.source_client import SourceClient
from Source import models as source_models


class Client(object):
    def __init__(self, _id=None, _str=None):
        self._id = _id  # type: list
        self._str = _str  # type: str

    @staticmethod
    def sample(client):
        runtime = source_models.RuntimeObject(

        )
        request = source_models.Request(
            accesskey="accesskey",
            region="region"
        )
        client.print(runtime)
