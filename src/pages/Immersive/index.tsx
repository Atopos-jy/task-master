import React, { useState, useRef, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import useSound from 'use-sound';
import { Button, Select, InputNumber, Card, Typography, Space, Row, Col, message } from 'antd';
import { 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  ReloadOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// 沉浸式场景配置
// 注意：实际项目中请将图片放在 src/assets/ 目录下并导入
// import rainBg from '../../assets/rain.jpg';
const SCENES = [
  { 
    id: 'rain', 
    name: '雨天', 
    bg: 'https://images.unsplash.com/photo-1519689680023-430b54f419b5', 
    audio: 'https://assets.mixkit.co/sfx/preview/mixkit-rain-thunder-storm-1134.mp3' 
  },
  { 
    id: 'cafe', 
    name: '咖啡馆', 
    bg: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', 
    audio: 'https://assets.mixkit.co/sfx/preview/mixkit-coffee-shop-ambience-1351.mp3' 
  },
  { 
    id: 'bedroom', 
    name: '卧室', 
    bg: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914', 
    audio: 'https://assets.mixkit.co/sfx/preview/mixkit-light-night-ambience-1176.mp3' 
  },
];

const Immersive: React.FC = () => {
  // 全屏控制
  const handle = useFullScreenHandle();
  // 状态管理
  const [selectedScene, setSelectedScene] = useState(SCENES[0]);
  const [timer, setTimer] = useState(25 * 60); // 默认25分钟
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 白噪音播放控制
  const [playSound, { pause: pauseSound, stop: stopSound }] = useSound(
    selectedScene.audio,
    { loop: true, volume: 0.7 }
  );

  // 切换场景时更新音频
  useEffect(() => {
    stopSound(); // 停止当前音频
    if (isTimerRunning || handle.active) {
      playSound(); // 切换后重新播放
    }
    return () => stopSound();
  }, [selectedScene, playSound, stopSound, isTimerRunning, handle.active]);

  // 全屏状态监听：进入全屏自动播放音频+启动计时，退出则暂停
  useEffect(() => {
    if (handle.active) {
      playSound();
      if (remainingTime > 0 && !isTimerRunning) setIsTimerRunning(true);
    } else {
      // 退出全屏时不强制暂停，由用户决定是否继续
      // pauseSound(); 
      // setIsTimerRunning(false);
    }
    
    // 清理函数：组件卸载时停止
    return () => {
      stopSound();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handle.active, playSound, pauseSound, stopSound, remainingTime, isTimerRunning]);

  // 计时逻辑
  useEffect(() => {
    if (isTimerRunning && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            message.success('专注时间结束！');
            stopSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isTimerRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, remainingTime, stopSound]);

  // 启动计时
  const startTimer = () => {
    if (timer <= 0) return;
    if (remainingTime === 0) setRemainingTime(timer);
    setIsTimerRunning(true);
    playSound();
  };

  // 暂停计时
  const pauseTimer = () => {
    setIsTimerRunning(false);
    pauseSound();
  };

  // 重置计时
  const resetTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setRemainingTime(0);
    stopSound();
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <FullScreen handle={handle} className="immersive-container">
      <div 
        style={handle.active ? {
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${selectedScene.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textShadow: '0 0 10px rgba(0,0,0,0.8)',
          position: 'relative'
        } : {
          padding: '24px',
          height: '100%'
        }}
      >
        {!handle.active ? (
          <Card title={<Space><CustomerServiceOutlined /> Task Master 沉浸式专注</Space>} style={{ maxWidth: 800, margin: '0 auto' }}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Text strong>选择场景：</Text>
                <Select 
                  value={selectedScene.id} 
                  onChange={(val) => setSelectedScene(SCENES.find(s => s.id === val) || SCENES[0])}
                  style={{ width: 200, marginLeft: 16 }}
                >
                  {SCENES.map(scene => (
                    <Option key={scene.id} value={scene.id}>{scene.name}</Option>
                  ))}
                </Select>
              </Col>
              
              <Col span={24}>
                <Text strong>专注时长（分钟）：</Text>
                <InputNumber 
                  min={1} 
                  max={120}
                  value={timer / 60} 
                  onChange={(val) => setTimer((val || 0) * 60)} 
                  style={{ width: 100, marginLeft: 16 }} 
                />
              </Col>

              <Col span={24}>
                <Space size="large">
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />} 
                    onClick={startTimer}
                    disabled={isTimerRunning || timer <= 0}
                  >
                    开始计时
                  </Button>
                  <Button 
                    icon={<PauseCircleOutlined />} 
                    onClick={pauseTimer}
                    disabled={!isTimerRunning}
                  >
                    暂停
                  </Button>
                  <Button 
                    icon={<ReloadOutlined />} 
                    onClick={resetTimer}
                  >
                    重置
                  </Button>
                  <Button 
                    type="dashed"
                    icon={<FullscreenOutlined />} 
                    onClick={handle.enter}
                    style={{ marginLeft: 24 }}
                  >
                    进入全屏模式
                  </Button>
                </Space>
              </Col>

              {remainingTime > 0 && (
                <Col span={24}>
                  <div style={{ marginTop: 20, fontSize: 24, textAlign: 'center' }}>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    {formatTime(remainingTime)}
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        ) : (
          <>
            <div style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px' }}>
              {remainingTime > 0 
                ? formatTime(remainingTime)
                : '准备开始专注...'}
            </div>
            
            <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '20px' }}>
               <Button 
                ghost 
                size="large"
                icon={isTimerRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />} 
                onClick={isTimerRunning ? pauseTimer : startTimer}
              >
                {isTimerRunning ? '暂停' : '继续'}
              </Button>
              <Button 
                ghost 
                size="large"
                icon={<FullscreenExitOutlined />} 
                onClick={handle.exit}
              >
                退出全屏
              </Button>
            </div>
            
            <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '14px', opacity: 0.8 }}>
              当前场景：{selectedScene.name}
            </div>
          </>
        )}
      </div>
    </FullScreen>
  );
};

export default Immersive;
