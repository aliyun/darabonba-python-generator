# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations

from typing import Any

from alibabacloud_tea_openapi import websocket_utils_models as web_socket_utils_models
from alibabacloud_tea_openapi.websocket_utils import Client as WebSocketUtilsClient



class Client:
    def __init__(self):
        pass

    @staticmethod
    def wrap_web_socket_client(
        client: Any,
    ) -> web_socket_utils_models.WebSocketClient:
        return WebSocketUtilsClient.create_web_socket_client(client)
