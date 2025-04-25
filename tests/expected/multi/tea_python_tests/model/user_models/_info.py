# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from tea_python_tests import user_models as main_models 


class Info(main_models.BaseInfo):
    def __init__(
        self,
        max_attemp: int = None,
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
        name: str = None,
        age: int = None,
    ):
        super().__init__(
            max_attemp = max_attemp,
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
        self.name = name
        self.age = age

    def validate(self):
        self.validate_required(self.name, 'name')
        self.validate_required(self.age, 'age')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.name is not None:
            result['name'] = self.name

        if self.age is not None:
            result['age'] = self.age

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('name') is not None:
            self.name = m.get('name')

        if m.get('age') is not None:
            self.age = m.get('age')

        return self

