# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from alibabacloud_tea_util import models as darautil_models 




class BaseInfo(darautil_models.RuntimeOptions):
    def __init__(
        self, *,
        autoretry: bool = None,
        ignore_ssl: bool = None,
        key: str = None,
        cert: str = None,
        ca: str = None,
        max_attempts: int = None,
        backoff_policy: str = None,
        backoff_period: int = None,
        read_timeout: int = None,
        connect_timeout: int = None,
        http_proxy: str = None,
        https_proxy: str = None,
        no_proxy: str = None,
        max_idle_conns: int = None,
        local_addr: str = None,
        socks_5proxy: str = None,
        socks_5net_work: str = None,
        keep_alive: bool = None,
        max_attemp: int = None,
    ):
        super().__init__(
            autoretry = autoretry,
            ignore_ssl = ignore_ssl,
            key = key,
            cert = cert,
            ca = ca,
            max_attempts = max_attempts,
            backoff_policy = backoff_policy,
            backoff_period = backoff_period,
            read_timeout = read_timeout,
            connect_timeout = connect_timeout,
            http_proxy = http_proxy,
            https_proxy = https_proxy,
            no_proxy = no_proxy,
            max_idle_conns = max_idle_conns,
            local_addr = local_addr,
            socks_5proxy = socks_5proxy,
            socks_5net_work = socks_5net_work,
            keep_alive = keep_alive,
        )
        self.max_attemp = max_attemp

    def validate(self):
        self.validate_required(self.max_attemp, 'max_attemp')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.max_attemp is not None:
            result['maxAttemp'] = self.max_attemp

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('maxAttemp') is not None:
            self.max_attemp = m.get('maxAttemp')

        return self

