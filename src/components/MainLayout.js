import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Badge, Dropdown, Space, Typography } from 'antd';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  CalendarDays, 
  BarChart3, 
  Settings, 
  User, 
  Bot, 
  Bell, 
  Search,
  Plus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const userItems = [
    { key: '/user/dashboard', icon: <LayoutDashboard size={20} />, label: '仪表盘' },
    { key: '/user/tasks', icon: <KanbanSquare size={20} />, label: '任务管理' },
    { key: '/user/calendar', icon: <CalendarDays size={20} />, label: '日历视图' },
    { key: '/user/reports', icon: <BarChart3 size={20} />, label: '效率分析' },
    { key: '/user/ai-assistant', icon: <Bot size={20} />, label: 'AI 助手' },
  ];

  const adminItems = [
    { key: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: '全局概览' },
    { key: '/admin/users', icon: <User size={20} />, label: '用户管理' },
    { key: '/admin/templates', icon: <KanbanSquare size={20} />, label: '模板审核' },
    { key: '/admin/system', icon: <Settings size={20} />, label: '系统配置' },
    { key: '/admin/ai-monitor', icon: <Bot size={20} />, label: 'AI 监控' },
  ];

  const menuItems = isAdmin ? adminItems : userItems;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" width={240}>
        <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: '#1890ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <KanbanSquare size={20} />
          </div>
          {!collapsed && <Title level={4} style={{ margin: 0, color: '#1890ff' }}>TaskMaster</Title>}
        </div>
        <Menu 
          theme="light" 
          defaultSelectedKeys={[location.pathname]} 
          mode="inline" 
          items={menuItems} 
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button type="text" icon={isAdmin ? <User size={20}/> : <Settings size={20}/>} onClick={() => navigate(isAdmin ? '/user/dashboard' : '/admin/dashboard')}>
              {isAdmin ? '切换到用户端' : '切换到管理端'}
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Button icon={<Search size={18} />} type="text" />
            <Badge count={5} dot>
              <Button icon={<Bell size={18} />} type="text" />
            </Badge>
            <Button type="primary" icon={<Plus size={16} />} style={{ borderRadius: 6 }}>
              {isAdmin ? '发布公告' : '新建任务'}
            </Button>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<User size={16} />} />
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#f5f7fa' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
