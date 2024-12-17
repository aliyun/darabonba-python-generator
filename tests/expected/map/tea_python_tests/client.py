# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from Source.source_client import SourceClient 
from Source import models as source_models 
from darabonba.core import DaraCore 




class Client(SourceClient):

    def __init__(
        self,
        config: source_models.Config,
    ):
        super().__init__(config)
        a = {
            'test': 'test'
        }
        c = {
            'test': 'test'
        }
        self._endpoint_rule = 'central'
        self._endpoint_map = DaraCore.merge({
            'ap-northeast-1': 'cusanalytic.aliyuncs.com',
            'ap-south-1': 'cusanalytic.aliyuncs.com',
            'ap-south-2-test': SourceClient.hello()
        }, a, c)
        b = {
            'ap-northeast-1': {
                'ap-south-1': 'cusanalytic.aliyuncs.com'
            },
            'ap-south-2': SourceClient.hello()
        }
        self._endpoint_map.get('ap-northeast-1')
        self._endpoint_map['ap-northeast-1'] = ''
        self._endpoint_map[config.str_value] = 'str'
        self._endpoint_map.get(config.str_value)
