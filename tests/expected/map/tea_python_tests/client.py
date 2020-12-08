# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Source.source_client import AioSourceClient, SourceClient


class Client(SourceClient):
    def __init__(self, config):
        super().__init__(config)
        self._endpoint_rule = 'central'
        self._endpoint_map = {
            'ap-northeast-1': 'cusanalytic.aliyuncs.com',
            'ap-south-1': 'cusanalytic.aliyuncs.com'
        }
        self._endpoint_map.get('ap-northeast-1')
        self._endpoint_map['ap-northeast-1'] = ''


class AioClient(Client, AioSourceClient):
    def __init__(self, config):
        super().__init__(config)
        self._endpoint_rule = 'central'
        self._endpoint_map = {
            'ap-northeast-1': 'cusanalytic.aliyuncs.com',
            'ap-south-1': 'cusanalytic.aliyuncs.com'
        }
        self._endpoint_map.get('ap-northeast-1')
        self._endpoint_map['ap-northeast-1'] = ''
