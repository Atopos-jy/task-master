import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import { UserOutlined, FileTextOutlined, CloudServerOutlined, RiseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminDashboard = () => {
  const userGrowthOption = {
    title: { text: '用户增长趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', smooth: true }]
  };

  const templateUsageOption = {
    title: { text: '热门模板 TOP 5' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: ['入职清单', '项目里程碑', '周报', '会议纪要', '日程规划'] },
    series: [{ name: '使用次数', type: 'bar', data: [120, 132, 150, 234, 290] }]
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>管理员全局概览</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="总用户数" value={1128} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="模板总数" value={93} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="系统负载" value={45} suffix="%" prefix={<CloudServerOutlined />} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="AI 调用次数" value={9340} prefix={<RiseOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="用户增长趋势" bordered={false}>
            <ReactECharts option={userGrowthOption} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="模板使用排行" bordered={false}>
            <ReactECharts option={templateUsageOption} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
