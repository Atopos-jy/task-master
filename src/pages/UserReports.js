import React from 'react';
import { Card, Row, Col, Typography, Select } from 'antd';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;
const { Option } = Select;

const UserReports = () => {
  const efficiencyOption = {
    title: { text: '周效率分析' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['任务完成数', '拖延数'] },
    xAxis: { type: 'category', data: ['W1', 'W2', 'W3', 'W4'] },
    yAxis: { type: 'value' },
    series: [
      { name: '任务完成数', type: 'bar', data: [12, 15, 18, 14], color: '#52c41a' },
      { name: '拖延数', type: 'line', data: [2, 1, 3, 0], color: '#f5222d' }
    ]
  };

  const radarOption = {
    title: { text: '能力模型' },
    tooltip: {},
    legend: { data: ['个人能力', '团队平均'] },
    radar: {
      indicator: [
        { name: '沟通', max: 100 },
        { name: '执行力', max: 100 },
        { name: '代码质量', max: 100 },
        { name: '文档能力', max: 100 },
        { name: '创新', max: 100 }
      ]
    },
    series: [{
      name: '能力对比',
      type: 'radar',
      data: [
        { value: [80, 90, 85, 70, 60], name: '个人能力' },
        { value: [75, 80, 80, 75, 70], name: '团队平均' }
      ]
    }]
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={2}>效率报告</Title>
        <Select defaultValue="本月" style={{ width: 120 }}>
          <Option value="week">本周</Option>
          <Option value="month">本月</Option>
          <Option value="quarter">本季度</Option>
        </Select>
      </div>

      <Row gutter={24}>
        <Col span={14}>
          <Card title="效率趋势">
            <ReactECharts option={efficiencyOption} />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="能力雷达图">
            <ReactECharts option={radarOption} />
          </Card>
        </Col>
      </Row>

      <Card title="AI 建议" style={{ marginTop: 24 }}>
        <Typography.Paragraph>
          <ul>
            <li>本周您的执行力表现优异，但在文档撰写方面稍有欠缺，建议加强。</li>
            <li>相比上周，拖延任务数量减少了 50%，保持这种势头！</li>
            <li>根据您的历史数据，周二上午是您的高效时段，建议安排重要任务。</li>
          </ul>
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default UserReports;
