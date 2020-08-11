# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from Tea.core import TeaCore


class Client(object):
    def __init__(self):
        pass

    @staticmethod
    def hello():
        return

    @staticmethod
    def hello_map():
        m = {}
        return TeaCore.merge({
            "key": "value",
            "key-1": "value-1"
        }, m)

    @staticmethod
    def hello_array_map():
        return [
            {
                "key": "value"
            }
        ]

    @staticmethod
    def hello_params(a, b):
        Client.hello_interface()
        Client.hello_array_map()

    @staticmethod
    def hello_interface():
        """
        interface mode
        """
        raise Tea.exceptions.TeaException('Un-implemented')

    def a_params(self):
        self.hello_params("a", "b")
