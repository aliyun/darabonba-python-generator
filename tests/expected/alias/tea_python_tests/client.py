# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Alias.alias_client import AliasClient

from Import.client import Client as ImportClient
from Source.client import Client as SourceClient
from alias_source.source_client import SourceClient as AliasSourceSourceClient


class Client(object):
    def __init__(self):
        pass

    @staticmethod
    def empty_model():
        ImportClient.test()
        SourceClient.test()
        AliasClient.test()
        AliasSourceSourceClient.test()
