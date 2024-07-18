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
        self._endpoint_rule = 'central'
        self._endpoint_map = {
            'ap-northeast-1': 'cusanalytic.aliyuncs.com',
            'ap-south-1': 'cusanalytic.aliyuncs.com'
        }
        self._endpoint_map.get('ap-northeast-1')
        self._endpoint_map['ap-northeast-1'] = ''
        self._endpoint_map[config.str_value] = 'str'
        self._endpoint_map.get(config.str_value)
