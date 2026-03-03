import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { EChartsOption } from 'echarts';

interface TaskChartProps {
  title?: string;
  option: EChartsOption;
  height?: number | string;
  loading?: boolean;
}

const TaskChart: React.FC<TaskChartProps> = ({
  title,
  option,
  height = 300,
  loading = false
}) => {
  return (
    <Card title={title} loading={loading} hoverable>
      <ReactECharts option={option} style={{ height }} />
    </Card>
  );
};

export default TaskChart;
