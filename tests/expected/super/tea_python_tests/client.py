# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Source.source_client import AioSourceClient, SourceClient


class Client(SourceClient):
    def __init__(self, config):
        super().__init__(config)


class AioClient(Client, AioSourceClient):
    def __init__(self, config):
        super().__init__(config)
