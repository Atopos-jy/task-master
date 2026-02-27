import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal, message, Badge } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';

const TemplateReview = () => {
  const [templates, setTemplates] = useState([
    { id: '1', name: '极简周报', creator: 'UserA', status: 'Pending', usage: 12 },
    { id: '2', name: '产品发布流程', creator: 'UserB', status: 'Approved', usage: 56 },
    { id: '3', name: '每日复盘', creator: 'UserC', status: 'Rejected', usage: 2 },
  ]);

  const handleApprove = (id) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: 'Approved' } : t));
    message.success('模板已通过审核');
  };

  const handleReject = (id) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: 'Rejected' } : t));
    message.warning('模板已被拒绝');
  };

  const columns = [
    { title: '模板名称', dataIndex: 'name', key: 'name' },
    { title: '创建者', dataIndex: 'creator', key: 'creator' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: status => {
        let color = status === 'Approved' ? 'success' : status === 'Pending' ? 'processing' : 'error';
        return <Badge status={color} text={status} />;
      }
    },
    { title: '使用次数', dataIndex: 'usage', key: 'usage' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />}>预览</Button>
          {record.status === 'Pending' && (
            <>
              <Button type="link" style={{ color: '#52c41a' }} onClick={() => handleApprove(record.id)}>通过</Button>
              <Button type="link" danger onClick={() => handleReject(record.id)}>拒绝</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Table columns={columns} dataSource={templates} rowKey="id" />
    </div>
  );
};

export default TemplateReview;
