import React from "react";
import { Tag } from "antd";
import { TaskStatus } from "@/types/task";

interface TaskStatusTagProps {
  status: TaskStatus | string;
}

const statusConfig: Record<string, { color: string; text: string }> = {
  "To Do": { color: "default", text: "待处理" },
  "In Progress": { color: "processing", text: "进行中" },
  Done: { color: "success", text: "已完成" },
};

const TaskStatusTag: React.FC<TaskStatusTagProps> = ({ status }) => {
  const config = statusConfig[status] || { color: "default", text: status };
  return <Tag color={config.color}>{config.text}</Tag>;
};

export default TaskStatusTag;
