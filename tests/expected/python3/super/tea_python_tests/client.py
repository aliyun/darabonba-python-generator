# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Source.source_client import SourceClient

from Source import models as source_models


class Client(SourceClient):
    def __init__(
        self, 
        config: source_models.Config,
    ):
        super().__init__(config)
