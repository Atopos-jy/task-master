import React from 'react';
import { Typography, Breadcrumb, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Title } = Typography;

interface PageHeaderProps {
  title: string;
  breadcrumbItems?: { title: string; path?: string }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbItems }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();

  // If breadcrumbItems are not provided, try to generate them from location
  const breadcrumbs = breadcrumbItems || location.pathname.split('/').filter(i => i).map((path, index, arr) => {
    const url = `/${arr.slice(0, index + 1).join('/')}`;
    return { title: path.charAt(0).toUpperCase() + path.slice(1), path: url };
  });

  return (
    <div style={{ padding: '16px 24px', background: colorBgContainer, marginBottom: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link to="/">Home</Link> },
          ...breadcrumbs.map((item, index) => ({
            title: item.path && index !== breadcrumbs.length - 1 ? <Link to={item.path}>{item.title}</Link> : item.title
          }))
        ]}
        style={{ marginBottom: 16 }}
      />
      <Title level={2} style={{ margin: 0 }}>{title}</Title>
    </div>
  );
};

export default PageHeader;
