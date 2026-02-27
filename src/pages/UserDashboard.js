import React from "react";
import { Typography, Row, Col, Card, Statistic, Tag } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";

const { Title } = Typography;

const UserDashboard = () => {
  const chartOption = {
    title: {
      text: "本周任务趋势",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["新增", "完成"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "新增",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "完成",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
    ],
  };

  const pieOption = {
    title: {
      text: "任务优先级分布",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "优先级",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "高优先级" },
          { value: 735, name: "中优先级" },
          { value: 580, name: "低优先级" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>用户仪表盘</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="待办任务"
              value={12}
              prefix={<Tag color="blue">To Do</Tag>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="进行中"
              value={5}
              prefix={<Tag color="orange">In Progress</Tag>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已完成"
              value={28}
              prefix={<Tag color="green">Done</Tag>}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本周效率"
              value={92}
              suffix="%"
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={16}>
          <Card title="任务趋势分析" bordered={false}>
            <ReactECharts option={chartOption} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="优先级分布" bordered={false}>
            <ReactECharts option={pieOption} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
