import React, { useState } from 'react';
import { Layout, Input, List, Avatar, Card, Typography, Button, Spin } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是你的 AI 任务助手。我可以帮你拆解任务、分析进度或提供建议。请问有什么可以帮你的？' }
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
      let aiResponse = '收到！正在分析...';
      if (inputValue.includes('拆解')) {
        aiResponse = '根据你的描述，我建议将该任务拆解为以下步骤：\n1. 需求调研 (2天)\n2. 方案设计 (1天)\n3. 开发实现 (3天)\n4. 测试验收 (1天)';
      } else if (inputValue.includes('进度')) {
        aiResponse = '目前你的 "Q3 季度报告" 任务进度滞后，建议优先处理。';
      } else {
        aiResponse = '这是一个很好的问题。根据你的工作习惯，我建议你先完成高优先级的任务，再处理琐事。';
      }
      
      setMessages([...newMessages, { role: 'ai', content: aiResponse }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout style={{ height: 'calc(100vh - 120px)', background: '#fff' }}>
      <Sider width={300} theme="light" style={{ borderRight: '1px solid #f0f0f0', padding: 16 }}>
        <Title level={4}>常用指令</Title>
        <List
          dataSource={[
            '拆解 "完成季度报告" 任务',
            '检查本周任务进度',
            '分析我的工作效率',
            '推荐适合我的模板'
          ]}
          renderItem={item => (
            <List.Item>
              <Button type="link" onClick={() => setInputValue(item)}>{item}</Button>
            </List.Item>
          )}
        />
      </Sider>
      <Content style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 24 }}>
          <List
            dataSource={messages}
            renderItem={item => (
              <List.Item style={{ justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start', border: 'none' }}>
                <div style={{ display: 'flex', flexDirection: item.role === 'user' ? 'row-reverse' : 'row', gap: 12, maxWidth: '80%' }}>
                  <Avatar icon={item.role === 'user' ? <UserOutlined /> : <RobotOutlined />} style={{ backgroundColor: item.role === 'user' ? '#1890ff' : '#52c41a' }} />
                  <Card size="small" style={{ backgroundColor: item.role === 'user' ? '#e6f7ff' : '#f6ffed' }}>
                    <Text style={{ whiteSpace: 'pre-wrap' }}>{item.content}</Text>
                  </Card>
                </div>
              </List.Item>
            )}
          />
          {loading && <div style={{ textAlign: 'center' }}><Spin /></div>}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <TextArea 
            rows={2} 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            onPressEnter={(e) => { e.preventDefault(); handleSend(); }}
            placeholder="输入你的问题..." 
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend} style={{ height: 'auto' }}>发送</Button>
        </div>
      </Content>
    </Layout>
  );
};

export default AiAssistant;
