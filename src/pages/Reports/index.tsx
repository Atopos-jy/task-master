import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;

const Reports: React.FC = () => {
  const barOption = {
    title: { text: '周任务完成情况' },
    tooltip: {},
    xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: {},
    series: [{ name: '完成任务', type: 'bar', data: [5, 20, 36, 10, 10, 20, 5] }]
  };

  const pieOption = {
    title: { text: '任务类型分布', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '类型',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '开发' },
          { value: 735, name: '测试' },
          { value: 580, name: '设计' },
          { value: 484, name: '文档' },
          { value: 300, name: '会议' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div>
      <Title level={2}>效率分析</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <ReactECharts option={barOption} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ReactECharts option={pieOption} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
