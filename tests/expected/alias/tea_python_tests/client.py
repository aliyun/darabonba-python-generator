# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from Import.client import Client as ImportClient 
from Source.client import Client as SourceClient 
from Alias.alias_client import AliasClient 
from alias_source.source_client import SourceClient as AliasSourceSourceClient 
from alias_symbol.client import Client as AliasSymbolClient 
from alias_symbol import models as alias_symbol_models 




class Client:

    def __init__(self):
        pass

    @staticmethod
    def empty_model() -> None:
        ImportClient.test()
        SourceClient.test()
        AliasClient.test()
        AliasSourceSourceClient.test()
        AliasSymbolClient.test()
        model = alias_symbol_models.TestModel()

    @staticmethod
    async def empty_model_async() -> None:
        ImportClient.test()
        await SourceClient.test_async()
        AliasClient.test()
        AliasSourceSourceClient.test()
        AliasSymbolClient.test()
        model = alias_symbol_models.TestModel()
