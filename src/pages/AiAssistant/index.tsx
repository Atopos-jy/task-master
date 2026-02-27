import React, { useState } from 'react';
import { Input, Button, Card, List, Typography, Avatar, Spin } from 'antd';
import { RobotOutlined, UserOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是你的智能任务助手。我可以帮你拆解任务、分析效率或提供建议。请问有什么可以帮你的？' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { role: 'user', content: inputValue }];
    setMessages(newMessages);
    setInputValue('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { role: 'ai', content: `收到你的请求："${inputValue}"。正在分析中...（这里是模拟回复）` },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <Title level={2}>AI 智能助手</Title>
      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }} bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
              <List.Item style={{ justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start', border: 'none' }}>
                <div style={{ display: 'flex', flexDirection: item.role === 'user' ? 'row-reverse' : 'row', maxWidth: '80%' }}>
                  <Avatar icon={item.role === 'user' ? <UserOutlined /> : <RobotOutlined />} style={{ backgroundColor: item.role === 'user' ? '#1890ff' : '#52c41a', margin: '0 8px' }} />
                  <Card size="small" style={{ backgroundColor: item.role === 'user' ? '#e6f7ff' : '#f6ffed' }}>
                    <Text>{item.content}</Text>
                  </Card>
                </div>
              </List.Item>
            )}
          />
          {loading && <div style={{ textAlign: 'center', padding: 10 }}><Spin /></div>}
        </div>
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', display: 'flex', gap: 10 }}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入你的问题..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>发送</Button>
        </div>
      </Card>
    </div>
  );
};

export default AiAssistant;
