# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Source.SourceClient import SourceClient as SourceSourceClient
from Source import models as source_models


class Client(object):
    def __init__(self, id, str, _id=None, _str=None):
        self._id = []
        self._str = _str
        self._id = id
        self._str = str

    @staticmethod
    def sample(client):
        runtime = source_models.RuntimeObject(

        )
        request = source_models.Request(
            accesskey="accesskey",
            region="region"
        )
        client.print(runtime)
