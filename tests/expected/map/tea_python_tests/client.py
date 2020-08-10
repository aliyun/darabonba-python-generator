# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Source.SourceClient import SourceClient as SourceSourceClient


class Client(SourceSourceClient):
    def __init__(self, config):
        super(Client, self).__init__(config)
        self._endpoint_rule = "central"
        self._endpoint_map = {
            "ap-northeast-1": "cusanalytic.aliyuncs.com",
            "ap-south-1": "cusanalytic.aliyuncs.com"
        }
        self._endpoint_map.get('ap-northeast-1')
        self._endpoint_map["ap-northeast-1"] = ""
