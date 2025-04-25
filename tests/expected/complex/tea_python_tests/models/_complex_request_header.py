# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
from __future__ import annotations
from darabonba.model import DaraModel 




class ComplexRequestHeader(DaraModel):
    def __init__(
        self,
        content: str = None,
    ):
        # The ID of the security group to which you want to assign the instance. Instances in the same security group can communicate with each other. The maximum number of instances that a security group can contain depends on the type of the security group. For more information, see the "Security group limits" section in [Limits](https://help.aliyun.com/document_detail/25412.html#SecurityGroupQuota).
        # 
        # >Notice:  The network type of the new instance must be the same as that of the security group specified by the `SecurityGroupId` parameter. For example, if the specified security group is of the VPC type, the new instance is also of the VPC type and you must specify `VSwitchId`.
        # 
        # If you do not use `LaunchTemplateId` or `LaunchTemplateName` to specify a launch template, you must specify SecurityGroupId. Take note of the following items:
        # 
        # *   You can set `SecurityGroupId` to specify a single security group or set `SecurityGroupIds.N` to specify one or more security groups. However, you cannot specify both `SecurityGroupId` and `SecurityGroupIds.N`.
        # *   If `NetworkInterface.N.InstanceType` is set to `Primary`, you cannot specify `SecurityGroupId` or `SecurityGroupIds.N` but can specify `NetworkInterface.N.SecurityGroupId` or `NetworkInterface.N.SecurityGroupIds.N`.
        self.content = content

    def validate(self):
        self.validate_required(self.content, 'content')

    def to_map(self):
        result = dict()
        _map = super().to_map()
        if _map is not None:
            result = _map
        if self.content is not None:
            result['Content'] = self.content

        return result

    def from_map(self, m: dict = None):
        m = m or dict()
        if m.get('Content') is not None:
            self.content = m.get('Content')

        return self

