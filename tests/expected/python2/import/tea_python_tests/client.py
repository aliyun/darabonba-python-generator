# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import unicode_literals

from Source import models as source_models


class Client(object):
    _id = None  # type: list[unicode]
    _str = None  # type: unicode

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
