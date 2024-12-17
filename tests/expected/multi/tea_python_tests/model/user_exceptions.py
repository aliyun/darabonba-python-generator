# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.exceptions import DaraException 
import user_models 


class ErrException(DaraException):
    def __init__(
        self, 
        message: str = None,
        code: str = None,
        stack: str = None,
        msg: str = None,
    ):
        super().__init__({
            'message': message,
            'code': code,
            'stack': stack,
        })
        self.name = 'ErrException'
        self.msg = msg

class Err1Exception(user_models.BaseInfo, DaraException):
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
        msg: str = None,
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
        self.name = 'Err1Exception'
        self.msg = msg

class Err2Exception(ErrException):
    def __init__(
        self, 
        msg: str = None,
        msg_2: str = None,
    ):
        super().__init__(
            msg = msg,
        )
        self.name = 'Err2Exception'
        self.msg_2 = msg_2

