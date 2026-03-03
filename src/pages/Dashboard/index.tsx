import React, { useEffect, useState } from "react";
import { Row, Col, Progress, List, Typography, Tag, message, Card } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import StatCard from "../../components/common/StatCard";
import TaskChart from "../../components/common/TaskChart";
import PageHeader from "../../components/common/PageHeader";
import {
  dashboardApi,
  DashboardStats,
  TrendData,
  PriorityData,
} from "../../api/dashboard";
import { EChartsOption } from "echarts";

const { Text } = Typography;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trend, setTrend] = useState<TrendData[]>([]);
  const [priority, setPriority] = useState<PriorityData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, trendRes, priorityRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getTrend(),
        dashboardApi.getPriorityDistribution(),
      ]);
      if (statsRes.code === 200) setStats(statsRes.data);
      if (trendRes.code === 200) setTrend(trendRes.data);
      if (priorityRes.code === 200) setPriority(priorityRes.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const lineOption: EChartsOption = {
    title: { text: "本周任务趋势", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { data: ["新增", "完成"], bottom: 0 },
    grid: { left: "3%", right: "4%", bottom: "10%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: trend.map((t) => t.date),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "新增",
        type: "line",
        data: trend.map((t) => t.new),
        itemStyle: { color: "#1890ff" },
        smooth: true,
      },
      {
        name: "完成",
        type: "line",
        data: trend.map((t) => t.completed),
        itemStyle: { color: "#52c41a" },
        smooth: true,
      },
    ],
  };

  const pieOption: EChartsOption = {
    title: { text: "任务优先级分布", left: "center" },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left", bottom: 0 },
    series: [
      {
        name: "优先级",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
        label: { show: false, position: "center" },
        emphasis: { label: { show: true, fontSize: 20, fontWeight: "bold" } },
        data: priority.map((p) => ({
          value: p.value,
          name: p.name,
          itemStyle: {
            color:
              p.name === "High"
                ? "#ff4d4f"
                : p.name === "Medium"
                  ? "#faad14"
                  : "#52c41a",
          },
        })),
      },
    ],
  };

  return (
    <div>
      <PageHeader title="用户仪表盘" />

      {/* Top Statistics Row */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <StatCard
            title="待办任务"
            value={stats?.todo || 0}
            loading={loading}
            prefix={<Tag color="blue">To Do</Tag>}
            valueStyle={{ fontSize: 24, fontWeight: "bold" }}
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="进行中"
            value={stats?.inProgress || 0}
            loading={loading}
            prefix={<Tag color="orange">In Progress</Tag>}
            valueStyle={{ fontSize: 24, fontWeight: "bold" }}
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="已完成"
            value={stats?.done || 0}
            loading={loading}
            prefix={<Tag color="green">Done</Tag>}
            valueStyle={{ fontSize: 24, fontWeight: "bold" }}
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="本周效率"
            value={stats?.efficiency || 0}
            loading={loading}
            prefix={<ArrowUpOutlined />}
            suffix="%"
            valueStyle={{ color: "#3f8600", fontSize: 24, fontWeight: "bold" }}
          />
        </Col>
      </Row>

      {/* Middle Charts Row */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={16}>
          <TaskChart
            title="任务趋势分析"
            option={lineOption}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <TaskChart title="优先级分布" option={pieOption} loading={loading} />
        </Col>
      </Row>

      {/* Bottom Project Progress & Activity Row */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="项目进度" loading={loading}>
            <div style={{ marginBottom: 16 }}>
              <Text>前端开发</Text>
              <Progress percent={70} status="active" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text>后端接口</Text>
              <Progress percent={90} status="success" />
            </div>
            <div>
              <Text>测试用例</Text>
              <Progress percent={30} status="exception" />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="近期动态" loading={loading}>
            <List
              dataSource={[
                "完成登录页面开发 (2小时前)",
                "修复 API 接口 404 问题 (昨天)",
                "更新需求文档 (2天前)",
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
