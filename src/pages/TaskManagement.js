import React, { useState } from "react";
import {
  Tabs,
  Table,
  Tag,
  Space,
  Button,
  Card,
  Typography,
  Avatar,
  Modal,
  Input,
  Select,
  message,
  Badge,
  Timeline,
  Alert,
} from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  RobotOutlined,
  ClockCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { TASKS } from "../services/mockData";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const TaskManagement = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [view, setView] = useState("list");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Table Columns
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Done"
            ? "green"
            : status === "In Progress"
              ? "geekblue"
              : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "优先级",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        let color =
          priority === "High"
            ? "red"
            : priority === "Medium"
              ? "orange"
              : "green";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "负责人",
      dataIndex: "assignee",
      key: "assignee",
      render: (text) => (
        <Avatar style={{ backgroundColor: "#f56a00" }}>{text[0]}</Avatar>
      ),
    },
    {
      title: "截止日期",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a style={{ color: "red" }}>删除</a>
        </Space>
      ),
    },
  ];

  // Kanban View Component
  const KanbanView = () => {
    const columns = ["To Do", "In Progress", "Done"];
    return (
      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 16,
        }}
      >
        {columns.map((status) => (
          <div
            key={status}
            style={{
              flex: 1,
              minWidth: 280,
              background: "#f0f2f5",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Title level={5} style={{ margin: 0 }}>
                {status}
              </Title>
              <Badge
                count={tasks.filter((t) => t.status === status).length}
                style={{ backgroundColor: "#52c41a" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tasks
                .filter((t) => t.status === status)
                .map((task) => (
                  <Card
                    key={task.id}
                    size="small"
                    hoverable
                    style={{ cursor: "grab" }}
                    actions={[
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {task.dueDate}
                      </Text>,
                      <Avatar
                        size="small"
                        style={{ backgroundColor: "#87d068" }}
                      >
                        {task.assignee[0]}
                      </Avatar>,
                    ]}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                      }}
                    >
                      <Text strong>{task.title}</Text>
                      <Tag color={task.priority === "High" ? "red" : "blue"}>
                        {task.priority}
                      </Tag>
                    </div>
                    <Paragraph
                      type="secondary"
                      ellipsis={{ rows: 2 }}
                      style={{ marginTop: 8, fontSize: 13 }}
                    >
                      {task.description}
                    </Paragraph>
                  </Card>
                ))}
              <Button type="dashed" block icon={<PlusOutlined />}>
                添加任务
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // AI Analysis Handler
  const handleAiAnalyze = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiAnalysisResult({
        breakdown: [
          "1. 收集各部门销售数据 (Due: Today)",
          "2. 清洗并整合数据至 Excel (Due: Tomorrow)",
          "3. 制作 PPT 初稿 (Due: Wed)",
          "4. 团队评审与修改 (Due: Thu)",
        ],
        warning:
          '注意：任务 "修复登录页 Bug" 接近截止日期 (10-20)，建议提升优先级。',
        efficiency: "本周完成率 85%，相比上周提升 10%。建议保持当前节奏。",
      });
      setAiLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <Title level={3}>任务管理</Title>
        <Space>
          <Button
            icon={<RobotOutlined />}
            onClick={() => setIsAiModalVisible(true)}
          >
            AI 智能助手
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            新建任务
          </Button>
        </Space>
      </div>

      <Card>
        <Tabs
          defaultActiveKey="list"
          onChange={setView}
          items={[
            {
              key: "list",
              label: (
                <span>
                  <UnorderedListOutlined />
                  列表视图
                </span>
              ),
              children: (
                <Table
                  columns={columns}
                  dataSource={tasks}
                  rowKey="id"
                  pagination={false}
                />
              ),
            },
            {
              key: "board",
              label: (
                <span>
                  <AppstoreOutlined />
                  看板视图
                </span>
              ),
              children: <KanbanView />,
            },
            {
              key: "timeline",
              label: (
                <span>
                  <ClockCircleOutlined />
                  时间线
                </span>
              ),
              children: (
                <div style={{ padding: 24 }}>
                  <Timeline
                    mode="left"
                    items={tasks.map((task) => ({
                      label: task.dueDate,
                      color: task.status === "Done" ? "green" : "blue",
                      children: (
                        <>
                          <Text strong>{task.title}</Text> - {task.description}
                        </>
                      ),
                    }))}
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Create Task Modal */}
      <Modal
        title="新建任务"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Input placeholder="任务标题" />
          <TextArea rows={4} placeholder="任务描述" />
          <Select placeholder="优先级" style={{ width: "100%" }}>
            <Option value="High">高</Option>
            <Option value="Medium">中</Option>
            <Option value="Low">低</Option>
          </Select>
          <Select placeholder="选择模板（可选）" style={{ width: "100%" }}>
            <Option value="t1">入职清单</Option>
            <Option value="t2">日程任务</Option>
          </Select>
        </Space>
      </Modal>

      {/* AI Assistant Modal */}
      <Modal
        title={
          <span>
            <RobotOutlined style={{ color: "#1890ff" }} /> AI 智能助手
          </span>
        }
        open={isAiModalVisible}
        onCancel={() => setIsAiModalVisible(false)}
        footer={null}
        width={600}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Text type="secondary">我可以帮你拆解任务、预警风险、分析效率。</Text>
        </div>

        {!aiAnalysisResult ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Button size="large" onClick={handleAiAnalyze} loading={aiLoading}>
              智能拆解当前任务
            </Button>
            <Button size="large" onClick={handleAiAnalyze} loading={aiLoading}>
              生成本周效率报告
            </Button>
            <Button size="large" onClick={handleAiAnalyze} loading={aiLoading}>
              检查进度风险
            </Button>
          </div>
        ) : (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert message="AI 分析完成" type="success" showIcon />

            <Card title="任务智能拆解" size="small">
              {aiAnalysisResult.breakdown.map((item, idx) => (
                <div key={idx} style={{ marginBottom: 8 }}>
                  {item}
                </div>
              ))}
            </Card>

            <Card
              title="进度预警"
              size="small"
              style={{ borderColor: "#ffa39e", background: "#fff1f0" }}
            >
              <Text type="danger">{aiAnalysisResult.warning}</Text>
            </Card>

            <Card title="效率分析" size="small">
              <Text>{aiAnalysisResult.efficiency}</Text>
            </Card>

            <Button block onClick={() => setAiAnalysisResult(null)}>
              返回
            </Button>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default TaskManagement;
