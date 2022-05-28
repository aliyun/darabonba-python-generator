# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import unicode_literals

from requests import Request
from Tea.model import TeaModel
from Source.source_client import SourceClient

from tea_python_tests import models as main_models


class Client(object):
    _vid = None  # type: Request
    _model = None  # type: TeaModel

    def __init__(self, request, model):
        self._vid = request
        self._model = model

    def main(self, test_1, test_2):
        oss = SourceClient(test_1)
        m = main_models.M(
            a=test_1,
            b=test_2
        )
        self._vid = test_1
        self._model = test_2

    def test_http_request(self, req):
        return self.test_http_request_with('test', req)

    @staticmethod
    def test_http_request_with(method, req):
        raise Exception('Un-implemented')

    @staticmethod
    def test_http_header(method, headers):
        raise Exception('Un-implemented')
