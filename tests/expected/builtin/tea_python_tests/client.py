# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
import base64 
from darabonba.utils.bytes import Bytes as DaraBytes 
from darabonba.date import Date as DaraDate 
import os 
from darabonba.file import File as DaraFile 
from darabonba.utils.form import Form as DaraForm 
from darabonba.core import DaraCore as DaraCore 
import json 
import logging 
import random 
import math 
from darabonba.utils.stream import Stream as DaraStream 
from darabonba.url import Url as DaraURL 
from darabonba.utils.xml import XML as DaraXML 
import sys 
from typing import List, Any


class Client:

    def __init__(self):
        pass

    @staticmethod
    def array_test(
        args: List[str],
    ) -> None:
        if (len(args) > 0) and 'cn-hanghzou' in args:
            index = args.index('cn-hanghzou')
            region_id = args[index]
            all = ','.join(args)
            first = args.pop(0)
            last = args.pop()
            length_1 = args.insert(0, first)
            length_2 = args.insert(last)
            length_3 = length_1 + length_2
            long_str = 'long' + first + last
            full_str = ','.join(args)
            new_arr = [
                'test'
            ]
            c_arr = new_arr + args
            acs_arr = sorted(new_arr)
            desc_arr = sorted(new_arr, reverse=True)
            ll_arr = acs_arr + desc_arr
            ll_arr.insert(10, 'test')
            ll_arr.remove('test')

    @staticmethod
    async def array_test_async(
        args: List[str],
    ) -> None:
        if (len(args) > 0) and 'cn-hanghzou' in args:
            index = args.index('cn-hanghzou')
            region_id = args[index]
            all = ','.join(args)
            first = args.pop(0)
            last = args.pop()
            length_1 = args.insert(0, first)
            length_2 = args.insert(last)
            length_3 = length_1 + length_2
            long_str = 'long' + first + last
            full_str = ','.join(args)
            new_arr = [
                'test'
            ]
            c_arr = new_arr + args
            acs_arr = sorted(new_arr)
            desc_arr = sorted(new_arr, reverse=True)
            ll_arr = acs_arr + desc_arr
            ll_arr.insert(10, 'test')
            ll_arr.remove('test')

    @staticmethod
    def bytes_test(
        args: List[str],
    ) -> None:
        full_str = ','.join(args)
        data = full_str.encode('utf-8')
        new_full_str = data.decode('utf-8')
        if full_str != new_full_str:
            return
        hex_str = data.hex()
        base_64str = base64.b64encode(data).decode('utf-8')
        length = len(data)
        obj = data.decode('utf-8')
        data_2 = DaraBytes.from_(full_str, 'base64')

    @staticmethod
    async def bytes_test_async(
        args: List[str],
    ) -> None:
        full_str = ','.join(args)
        data = full_str.encode('utf-8')
        new_full_str = data.decode('utf-8')
        if full_str != new_full_str:
            return
        hex_str = data.hex()
        base_64str = base64.b64encode(data).decode('utf-8')
        length = len(data)
        obj = data.decode('utf-8')
        data_2 = DaraBytes.from_(full_str, 'base64')

    @staticmethod
    def date_test(
        args: List[str],
    ) -> None:
        date = DaraDate('2023-09-12 17:47:31.916000 +0800 UTC')
        date_str = date.strftime('%Y-%m-%d %H:%M:%S')
        timestamp = date.timestamp()
        yesterday = date.sub('day', 1)
        one_day = date.diff('day', yesterday)
        tomorrow = date.add('day', 1)
        two_day = tomorrow.diff('day', date) + one_day
        hour = date.hour()
        minute = date.minute()
        second = date.second()
        day_of_month = date.day_of_month()
        day_of_week = date.weekday()
        week_of_year = date.week_of_year()
        month = date.month()
        year = date.year()
        utc_date = date.UTC()

    @staticmethod
    async def date_test_async(
        args: List[str],
    ) -> None:
        date = DaraDate('2023-09-12 17:47:31.916000 +0800 UTC')
        date_str = date.strftime('%Y-%m-%d %H:%M:%S')
        timestamp = date.timestamp()
        yesterday = date.sub('day', 1)
        one_day = date.diff('day', yesterday)
        tomorrow = date.add('day', 1)
        two_day = tomorrow.diff('day', date) + one_day
        hour = date.hour()
        minute = date.minute()
        second = date.second()
        day_of_month = date.day_of_month()
        day_of_week = date.weekday()
        week_of_year = date.week_of_year()
        month = date.month()
        year = date.year()
        utc_date = date.UTC()

    @staticmethod
    def env_test(
        args: List[str],
    ) -> None:
        es = os.environ.get('TEST')
        ma = os.environ['TEST'] = es + 'test'

    @staticmethod
    async def env_test_async(
        args: List[str],
    ) -> None:
        es = os.environ.get('TEST')
        ma = os.environ['TEST'] = es + 'test'

    @staticmethod
    def file_test(
        args: List[str],
    ) -> None:
        if DaraFile.exists('/tmp/test'):
            file = DaraFile('/tmp/test')
            path = file.path()
            length = file.length() + 10
            create_time = file.create_time()
            modify_time = file.modify_time()
            time_long = modify_time.diff('minute', create_time)
            data = file.read(300)
            file.write(DaraBytes.from_('test', 'utf8'))
            rs = DaraFile.create_read_stream('/tmp/test')
            ws = DaraFile.create_write_stream('/tmp/test')

    @staticmethod
    async def file_test_async(
        args: List[str],
    ) -> None:
        if await DaraFile.exists_async('/tmp/test'):
            file = DaraFile('/tmp/test')
            path = file.path()
            length = await file.length_async() + 10
            create_time = await file.create_time_async()
            modify_time = await file.modify_time_async()
            time_long = modify_time.diff('minute', create_time)
            data = await file.read_async(300)
            await file.write_async(DaraBytes.from_('test', 'utf8'))
            rs = DaraFile.create_read_stream('/tmp/test')
            ws = DaraFile.create_write_stream('/tmp/test')

    @staticmethod
    def form_test(
        args: List[str],
    ) -> None:
        m = {
            'key1': 'test1',
            'key2': 'test2',
            'key3': 3,
            'key4': {
                'key5': 123,
                'key6': '321'
            }
        }
        form = DaraForm.to_form_string(m)
        form = form + '&key7=23233&key8=' + DaraForm.get_boundary()
        r = DaraForm.to_file_form(m, DaraForm.get_boundary())

    @staticmethod
    async def form_test_async(
        args: List[str],
    ) -> None:
        m = {
            'key1': 'test1',
            'key2': 'test2',
            'key3': 3,
            'key4': {
                'key5': 123,
                'key6': '321'
            }
        }
        form = DaraForm.to_form_string(m)
        form = form + '&key7=23233&key8=' + DaraForm.get_boundary()
        r = DaraForm.to_file_form(m, DaraForm.get_boundary())

    @staticmethod
    def json_test(
        args: List[str],
    ) -> None:
        m = {
            'key1': 'test1',
            'key2': 'test2',
            'key3': 3,
            'key4': {
                'key5': 123,
                'key6': '321'
            }
        }
        ms = DaraCore.to_json_string(m)
        ma = json.loads(ms)
        arr_str = '[1,2,3,4]'
        arr = json.loads(arr_str)

    @staticmethod
    async def json_test_async(
        args: List[str],
    ) -> None:
        m = {
            'key1': 'test1',
            'key2': 'test2',
            'key3': 3,
            'key4': {
                'key5': 123,
                'key6': '321'
            }
        }
        ms = DaraCore.to_json_string(m)
        ma = json.loads(ms)
        arr_str = '[1,2,3,4]'
        arr = json.loads(arr_str)

    @staticmethod
    def loger_test(
        args: List[str],
    ) -> None:
        logging.log(logging.NOTSET, 'test')
        logging.log(logging.INFO, 'test')
        logging.log(logging.WARNING, 'test')
        logging.log(logging.DEBUG, 'test')
        logging.log(logging.ERROR, 'test')

    @staticmethod
    async def loger_test_async(
        args: List[str],
    ) -> None:
        logging.log(logging.NOTSET, 'test')
        logging.log(logging.INFO, 'test')
        logging.log(logging.WARNING, 'test')
        logging.log(logging.DEBUG, 'test')
        logging.log(logging.ERROR, 'test')

    @staticmethod
    def map_test_case(
        args: List[str],
    ) -> None:
        map_test = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        }
        length = len(map_test)
        num = length + 3
        keys = map_test.keys()
        all_key = ''
        for key in keys:
            all_key = all_key + key
        entries = map_test.items()
        new_key = ''
        new_value = ''
        for k, v in entries:
            new_key = new_key + k
            new_value = new_value + v
        json = json.dumps(map_test)
        map_test_2 = {
            'key1': 'value4',
            'key4': 'value5'
        }
        map_test_3 = map_test.update(map_test_2)
        if map_test_3.get('key1') == 'value4':
            return

    @staticmethod
    async def map_test_case_async(
        args: List[str],
    ) -> None:
        map_test = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        }
        length = len(map_test)
        num = length + 3
        keys = map_test.keys()
        all_key = ''
        for key in keys:
            all_key = all_key + key
        entries = map_test.items()
        new_key = ''
        new_value = ''
        for k, v in entries:
            new_key = new_key + k
            new_value = new_value + v
        json = json.dumps(map_test)
        map_test_2 = {
            'key1': 'value4',
            'key4': 'value5'
        }
        map_test_3 = map_test.update(map_test_2)
        if map_test_3.get('key1') == 'value4':
            return

    @staticmethod
    def number_test(
        args: List[str],
    ) -> None:
        num = 3.2
        inum = int(num)
        lnum = int(num)
        fnum = float(num)
        dnum = float(num)
        inum = int(inum)
        lnum = int(inum)
        fnum = float(inum)
        dnum = float(inum)
        inum = int(lnum)
        lnum = int(lnum)
        fnum = float(lnum)
        dnum = float(lnum)
        inum = int(fnum)
        lnum = int(fnum)
        fnum = float(fnum)
        dnum = float(fnum)
        inum = int(dnum)
        lnum = int(dnum)
        fnum = float(dnum)
        dnum = float(dnum)
        lnum = inum
        inum = lnum
        random_num = random.random()
        inum = math.floor(inum)
        inum = round(inum)

    @staticmethod
    async def number_test_async(
        args: List[str],
    ) -> None:
        num = 3.2
        inum = int(num)
        lnum = int(num)
        fnum = float(num)
        dnum = float(num)
        inum = int(inum)
        lnum = int(inum)
        fnum = float(inum)
        dnum = float(inum)
        inum = int(lnum)
        lnum = int(lnum)
        fnum = float(lnum)
        dnum = float(lnum)
        inum = int(fnum)
        lnum = int(fnum)
        fnum = float(fnum)
        dnum = float(fnum)
        inum = int(dnum)
        lnum = int(dnum)
        fnum = float(dnum)
        dnum = float(dnum)
        lnum = inum
        inum = lnum
        random_num = random.random()
        inum = math.floor(inum)
        inum = round(inum)

    @staticmethod
    def stream_test(
        args: List[str],
    ) -> None:
        if DaraFile.exists('/tmp/test'):
            rs = DaraFile.create_read_stream('/tmp/test')
            ws = DaraFile.create_write_stream('/tmp/test')
            data = rs.read(30)
            ws.write(data)

            rs.seek(0)

            data = DaraStream.read_as_bytes(rs)
            obj = DaraStream.read_as_json(rs)
            json_str = DaraStream.read_as_string(rs)

    @staticmethod
    async def stream_test_async(
        args: List[str],
    ) -> None:
        if await DaraFile.exists_async('/tmp/test'):
            rs = DaraFile.create_read_stream('/tmp/test')
            ws = DaraFile.create_write_stream('/tmp/test')
            data = rs.read(30)
            ws.write(data)

            rs.seek(0)

            data = await DaraStream.read_as_bytes_async(rs)
            obj = await DaraStream.read_as_json_async(rs)
            json_str = await DaraStream.read_as_string_async(rs)

    @staticmethod
    def string_test(
        args: List[str],
    ) -> None:
        full_str = ','.join(args)
        args = full_str.split(',')
        if (len(full_str) > 0) and 'hangzhou' in full_str:
            new_str_1 = full_str.replace('hangzhou', 'beijing')
        if full_str.startswith('cn'):
            new_str_2 = full_str.replace('cn', 'zh', flags=re.IGNORECASE)
        if full_str.startswith('beijing'):
            new_str_3 = full_str.replace('beijing', 'chengdu', 1)
        start = full_str.find('beijing')
        end = start + 7
        region = full_str[start:end]
        lower_region = region.lower()
        upper_region = region.upper()
        if region == 'beijing':
            region = region + ' '
            region = region.strip()
        tb = full_str.encode('utf-8')
        em = 'xxx'
        if not em:
            return
        num = '32.0a'
        inum = int(num) + 3
        lnum = int(num)
        fnum = float(num) + 1
        dnum = float(num) + 1

    @staticmethod
    async def string_test_async(
        args: List[str],
    ) -> None:
        full_str = ','.join(args)
        args = full_str.split(',')
        if (len(full_str) > 0) and 'hangzhou' in full_str:
            new_str_1 = full_str.replace('hangzhou', 'beijing')
        if full_str.startswith('cn'):
            new_str_2 = full_str.replace('cn', 'zh', flags=re.IGNORECASE)
        if full_str.startswith('beijing'):
            new_str_3 = full_str.replace('beijing', 'chengdu', 1)
        start = full_str.find('beijing')
        end = start + 7
        region = full_str[start:end]
        lower_region = region.lower()
        upper_region = region.upper()
        if region == 'beijing':
            region = region + ' '
            region = region.strip()
        tb = full_str.encode('utf-8')
        em = 'xxx'
        if not em:
            return
        num = '32.0a'
        inum = int(num) + 3
        lnum = int(num)
        fnum = float(num) + 1
        dnum = float(num) + 1

    @staticmethod
    def url_test(
        args: List[str],
    ) -> None:
        url = DaraURL(args[0])
        path = url.path()
        pathname = url.pathname()
        protocol = url.protocol()
        hostname = url.hostname()
        port = url.port()
        host = url.host()
        hash = url.hash()
        search = url.search()
        href = url.href()
        auth = url.auth()
        url_2 = DaraURL.parse(args[1])
        path = url_2.path()
        new_url = DaraURL.url_encode(args[2])
        new_search = DaraURL.percent_encode(search)
        new_path = DaraURL.path_encode(pathname)
        all = 'test' + path + protocol + hostname + hash + search + href + auth + new_url + new_search + new_path

    @staticmethod
    async def url_test_async(
        args: List[str],
    ) -> None:
        url = DaraURL(args[0])
        path = url.path()
        pathname = url.pathname()
        protocol = url.protocol()
        hostname = url.hostname()
        port = url.port()
        host = url.host()
        hash = url.hash()
        search = url.search()
        href = url.href()
        auth = url.auth()
        url_2 = DaraURL.parse(args[1])
        path = url_2.path()
        new_url = DaraURL.url_encode(args[2])
        new_search = DaraURL.percent_encode(search)
        new_path = DaraURL.path_encode(pathname)
        all = 'test' + path + protocol + hostname + hash + search + href + auth + new_url + new_search + new_path

    @staticmethod
    def xml_test(
        args: List[str],
    ) -> None:
        m = {
            'key1': 'test1',
            'key2': 'test2',
            'key3': 3,
            'key4': {
                'key5': 123,
                'key6': '321'
            }
        }
        xml = DaraXML.to_xml(m)
        xml = xml + '<key7>132</key7>'
        resp_map = DaraXML.parse_xml(xml, None)

    @staticmethod
    async def xml_test_async(
        args: List[str],
    ) -> None:
        m = {
            'key1': 'test1',
            'key2': 'test2',
            'key3': 3,
            'key4': {
                'key5': 123,
                'key6': '321'
            }
        }
        xml = DaraXML.to_xml(m)
        xml = xml + '<key7>132</key7>'
        resp_map = DaraXML.parse_xml(xml, None)

    @staticmethod
    def return_any() -> Any:
        raise Exception('Un-implemented')

    @staticmethod
    def main(
        args: List[str],
    ) -> None:
        Client.array_test(args)
        Client.bytes_test(args)
        Client.date_test(args)
        Client.env_test(args)
        Client.file_test(args)
        Client.form_test(args)
        Client.loger_test(args)
        Client.map_test_case(args)
        Client.number_test(args)
        Client.stream_test(args)
        Client.string_test(args)
        Client.url_test(args)
        Client.xml_test(args)
        a = int(args[0]) + 10
        b = str(a) + args[1] + str(Client.return_any())
        c = DaraCore.to_number(b) + DaraCore.to_number(a) + DaraCore.to_number(Client.return_any())
        d = int(b) + int(a) + int(Client.return_any())
        e = int(b) + int(a) + int(Client.return_any())
        f = int(b) + int(a) + int(Client.return_any())
        g = int(b) + int(a) + int(Client.return_any())
        h = int(b) + int(a) + int(Client.return_any())
        i = int(b) + int(a) + int(Client.return_any())
        j = int(b) + int(a) + int(Client.return_any())
        k = int(b) + int(a) + int(Client.return_any())
        l = int(b) + int(a) + int(Client.return_any())
        m = int(b) + int(a) + int(Client.return_any())
        n = float(b) + float(a) + float(Client.return_any())
        o = float(b) + float(a) + float(Client.return_any())
        if bool(args[2]):
            data = bytes(Client.return_any())
            length = len(data)
            test = data
            maps = {
                'key': 'value'
            }
            obj = maps
            ws = DaraStream.to_writable(obj)
            rs = DaraStream.to_readable(maps)
            data = rs.read(30)
            if not DaraCore.is_null(data):
                ws.write(data)

        DaraCore.sleep(a)
        default_val = args[0] or args[1]
        if default_val == b:
            return

    @staticmethod
    async def main_async(
        args: List[str],
    ) -> None:
        await Client.array_test_async(args)
        await Client.bytes_test_async(args)
        await Client.date_test_async(args)
        await Client.env_test_async(args)
        await Client.file_test_async(args)
        await Client.form_test_async(args)
        await Client.loger_test_async(args)
        await Client.map_test_case_async(args)
        await Client.number_test_async(args)
        await Client.stream_test_async(args)
        await Client.string_test_async(args)
        await Client.url_test_async(args)
        await Client.xml_test_async(args)
        a = int(args[0]) + 10
        b = str(a) + args[1] + str(Client.return_any())
        c = DaraCore.to_number(b) + DaraCore.to_number(a) + DaraCore.to_number(Client.return_any())
        d = int(b) + int(a) + int(Client.return_any())
        e = int(b) + int(a) + int(Client.return_any())
        f = int(b) + int(a) + int(Client.return_any())
        g = int(b) + int(a) + int(Client.return_any())
        h = int(b) + int(a) + int(Client.return_any())
        i = int(b) + int(a) + int(Client.return_any())
        j = int(b) + int(a) + int(Client.return_any())
        k = int(b) + int(a) + int(Client.return_any())
        l = int(b) + int(a) + int(Client.return_any())
        m = int(b) + int(a) + int(Client.return_any())
        n = float(b) + float(a) + float(Client.return_any())
        o = float(b) + float(a) + float(Client.return_any())
        if bool(args[2]):
            data = bytes(Client.return_any())
            length = len(data)
            test = data
            maps = {
                'key': 'value'
            }
            obj = maps
            ws = DaraStream.to_writable(obj)
            rs = DaraStream.to_readable(maps)
            data = rs.read(30)
            if not DaraCore.is_null(data):
                ws.write(data)

        awiat DaraCore.sleep_async(a)
        default_val = args[0] or args[1]
        if default_val == b:
            return


if __name__ == '__main__':
    Client.main(sys.argv[1:])
