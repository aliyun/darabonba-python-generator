# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from Source import models as source_models
from Source.source_client import SourceClient



class Client(SourceClient):

    def __init__(
        self,
        config: source_models.Config,
    ):
        super().__init__(config)
