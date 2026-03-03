import React from "react";
import { Navigate } from "react-router-dom";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  BarChartOutlined,
  RobotOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { AppRouteObject } from "../types/router";
import Dashboard from "../pages/Dashboard";
import TaskManagement from "../pages/TaskManagement";
import CalendarView from "../pages/Calendar";
import Reports from "../pages/Reports";
import AiAssistant from "../pages/AiAssistant";
import Immersive from "../pages/Immersive";
import Login from "../pages/Login";

// 基础路由（不需要认证，如登录、404等）
export const basicRoutes: AppRouteObject[] = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录",
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: "/404",
    element: <div>404 Not Found</div>, // 暂时简单的404页面
    meta: {
      title: "页面不存在",
      requiresAuth: false,
      hideInMenu: true,
    },
  },
];

// 主要路由（需要认证，显示在菜单中）
export const mainRoutes: AppRouteObject[] = [
  {
    path: "dashboard",
    element: <Dashboard />,
    meta: {
      title: "仪表盘",
      icon: <DashboardOutlined />,
      requiresAuth: true,
    },
  },
  {
    path: "tasks",
    element: <TaskManagement />,
    meta: {
      title: "任务管理",
      icon: <UnorderedListOutlined />,
      requiresAuth: true,
    },
  },
  {
    path: "calendar",
    element: <CalendarView />,
    meta: {
      title: "日历视图",
      icon: <CalendarOutlined />,
      requiresAuth: true,
    },
  },
  {
    path: "reports",
    element: <Reports />,
    meta: {
      title: "报表分析",
      icon: <BarChartOutlined />,
      requiresAuth: true,
    },
  },
  {
    path: "ai-assistant",
    element: <AiAssistant />,
    meta: {
      title: "AI 助手",
      icon: <RobotOutlined />,
      requiresAuth: true,
    },
  },
  {
    path: "immersive",
    element: <Immersive />,
    meta: {
      title: "沉浸专注",
      icon: <CoffeeOutlined />,
      requiresAuth: true,
    },
  },
];

// 导出所有路由配置（用于 react-router-dom）
export const layoutRoutes: AppRouteObject[] = [
  {
    index: true,
    element: <Navigate to="dashboard" replace />,
  },
  ...mainRoutes,
];
