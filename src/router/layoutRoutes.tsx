import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TaskManagement from "../pages/TaskManagement";
import CalendarView from "../pages/Calendar";
import Reports from "../pages/Reports";
import AiAssistant from "../pages/AiAssistant";

const layoutRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="dashboard" replace />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "tasks",
    element: <TaskManagement />,
  },
  {
    path: "calendar",
    element: <CalendarView />,
  },
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "ai-assistant",
    element: <AiAssistant />,
  },
];

export default layoutRoutes;
