# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from Source.source_client import SourceClient
from typing import List

from local import models as local_models
from Source import models as source_models


class Client:
    _id: List[str] = None
    _str: str = None
    _model: local_models.Local = None

    def __init__(self):
        pass

    @staticmethod
    def sample(
        client: SourceClient,
    ) -> None:
        runtime = source_models.RuntimeObject()
        request = source_models.Request(
            accesskey='accesskey',
            region='region'
        )
        client.print(runtime)
