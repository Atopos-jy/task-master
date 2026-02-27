import React from 'react';
import { Calendar, Badge, Card, Typography } from 'antd';
import type { Dayjs } from 'dayjs';

const { Title } = Typography;

const CalendarView: React.FC = () => {
  const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: '项目立项会议' },
          { type: 'success', content: '完成需求文档' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: '前端代码评审' },
          { type: 'success', content: '后端接口联调' },
          { type: 'error', content: '紧急 Bug 修复' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: '周报提交' },
          { type: 'success', content: '发布 v1.0.0' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item: any) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Title level={2}>日历视图</Title>
      <Card>
        <Calendar dateCellRender={dateCellRender} />
      </Card>
    </div>
  );
};

export default CalendarView;
