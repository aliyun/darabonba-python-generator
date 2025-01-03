# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import unicode_literals

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
            'key': 'value',
            'key-1': 'value-1',
            'key-2': 'value-2',
            '\"\"': 'value-3'
        }, m)

    @staticmethod
    def hello_array_map():
        return [
            {
                'key': 'value'
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
        raise Exception('Un-implemented')

    def a_params(self):
        self.hello_params('a', 'b')
