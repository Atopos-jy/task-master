import React from 'react';
import { Card, Statistic, Tag } from 'antd';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  tagText?: string;
  tagColor?: string;
  valueStyle?: React.CSSProperties;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  tagText,
  tagColor,
  valueStyle,
  loading = false
}) => {
  return (
    <Card loading={loading} hoverable>
      <Statistic
        title={title}
        value={value}
        prefix={
          <>
            {prefix}
            {tagText && <Tag color={tagColor} style={{ marginLeft: 8 }}>{tagText}</Tag>}
          </>
        }
        suffix={suffix}
        valueStyle={valueStyle}
      />
    </Card>
  );
};

export default StatCard;
