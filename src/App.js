import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import UserDashboard from "./pages/UserDashboard";
import TaskManagement from "./pages/TaskManagement";
import UserReports from "./pages/UserReports";
import AiAssistant from "./pages/AiAssistant";
import CalendarView from "./pages/CalendarView";
import TemplateReview from "./pages/TemplateReview";
import AdminDashboard from "./pages/AdminDashboard";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/user/dashboard" replace />}
            />

            {/* User Routes */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<TaskManagement />} />
            <Route path="/user/calendar" element={<CalendarView />} />
            <Route path="/user/reports" element={<UserReports />} />
            <Route path="/user/ai-assistant" element={<AiAssistant />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/users"
              element={<div>用户管理（开发中）</div>}
            />
            <Route path="/admin/templates" element={<TemplateReview />} />
            <Route
              path="/admin/system"
              element={<div>系统配置（开发中）</div>}
            />
            <Route
              path="/admin/ai-monitor"
              element={<div>AI 监控（开发中）</div>}
            />
          </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
