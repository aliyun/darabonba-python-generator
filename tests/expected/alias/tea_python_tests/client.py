# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Alias.alias_client import AliasClient

from Import.client import Client as ImportClient
from Source.client import (
    AioClient as AioSourceClient,
    Client as SourceClient,
)
from alias_source.source_client import SourceClient as AliasSourceSourceClient
from alias_symbol.client import Client as AliasSymbolClient
from alias_symbol import models as alias_symbol_models


class Client:
    def __init__(self):
        pass

    @staticmethod
    def empty_model():
        ImportClient.test()
        SourceClient.test()
        AliasClient.test()
        AliasSourceSourceClient.test()
        AliasSymbolClient.test()
        model = alias_symbol_models.TestModel()


class AioClient(Client):
    def __init__(self):
        pass

    @staticmethod
    async def empty_model():
        ImportClient.test()
        await AioSourceClient.test()
        AliasClient.test()
        AliasSourceSourceClient.test()
        AliasSymbolClient.test()
        model = alias_symbol_models.TestModel()
