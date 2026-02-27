import React from "react";
import { Card, Row, Col, Statistic, Progress, List, Typography } from "antd";
import {
  ArrowUpOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>仪表盘</Title>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="本周完成任务"
              value={12}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<CheckCircleOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="剩余任务"
              value={5}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ClockCircleOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="效率提升"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="项目进度">
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
          <Card title="近期动态">
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
