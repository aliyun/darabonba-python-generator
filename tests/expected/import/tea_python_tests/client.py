# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Source.source_client import SourceClient
from typing import List

from Source import models as source_models


class Client:
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


class AioClient(Client):
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
