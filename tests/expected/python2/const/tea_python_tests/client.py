# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import unicode_literals

from Tea.converter import TeaConverter


class Client(object):
    def __init__(self):
        pass

    @staticmethod
    def hello():
        return "'Hello' %s" % TeaConverter.to_unicode('World!')
