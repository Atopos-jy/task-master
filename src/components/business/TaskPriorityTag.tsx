import React from "react";
import { Tag } from "antd";
import { TaskPriority } from "@/types/task";

interface TaskPriorityTagProps {
  priority: TaskPriority | string;
}

const priorityConfig: Record<string, { color: string; text: string }> = {
  High: { color: "red", text: "高" },
  Medium: { color: "orange", text: "中" },
  Low: { color: "green", text: "低" },
};

const TaskPriorityTag: React.FC<TaskPriorityTagProps> = ({ priority }) => {
  const config = priorityConfig[priority] || {
    color: "default",
    text: priority,
  };
  return <Tag color={config.color}>{config.text}</Tag>;
};

export default TaskPriorityTag;
