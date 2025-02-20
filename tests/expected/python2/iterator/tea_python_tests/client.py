# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import unicode_literals

from Tea.converter import TeaConverter


class Client(object):
    def __init__(self):
        pass

    def test_1(self):
        raise Exception('Un-implemented')

    def test_2(self):
        it = self.test_1()
        for test in it:
            yield test

    def test_3(self, iter):
        it = iter
        str = ''
        for i in it:
            str = '%s, %s' % (TeaConverter.to_unicode(str), TeaConverter.to_unicode(i))
        return str

    def test_4(self, test):
        pass

    def test_5(self, iter):
        # test3(iter);
        self.test_4(iter)
