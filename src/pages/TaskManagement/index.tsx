import React, { useEffect, useState } from "react";
import {
  Tabs,
  Table,
  Space,
  Button,
  Card,
  Typography,
  message,
  Spin,
} from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchTasks, deleteTask } from "@/stores/modules/taskSlice";
import { Task } from "@/types/task";
import PageHeader from "@/components/common/PageHeader";
import TaskStatusTag from "@/components/business/TaskStatusTag";
import TaskPriorityTag from "@/components/business/TaskPriorityTag";

const { Title, Text } = Typography;

const TaskManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: tasks, loading } = useAppSelector((state) => state.tasks);
  const [view, setView] = useState("list");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      message.success("任务删除成功");
    } catch (error) {
      message.error("删除失败");
    }
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <TaskStatusTag status={status} />,
    },
    {
      title: "优先级",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => <TaskPriorityTag priority={priority} />,
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: Task) => (
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const KanbanView = () => {
    const statuses = ["To Do", "In Progress", "Done"];
    return (
      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 16,
        }}
      >
        {statuses.map((status) => (
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
              <TaskStatusTag status={status} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tasks
                .filter((t) => t.status === status)
                .map((task) => (
                  <Card key={task.id} size="small" hoverable>
                    <Text strong>{task.title}</Text>
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TaskPriorityTag priority={task.priority} />
                      <Space>
                        <Button
                          type="text"
                          size="small"
                          onClick={() => handleDelete(task.id)}
                          danger
                        >
                          删除
                        </Button>
                      </Space>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <PageHeader title="任务管理" />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          新建任务
        </Button>
      </div>

      <Card>
        <Spin spinning={loading}>
          <Tabs
            activeKey={view}
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
                    pagination={{ pageSize: 10 }}
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
            ]}
          />
        </Spin>
      </Card>
    </div>
  );
};

export default TaskManagement;
