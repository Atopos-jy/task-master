# TaskMaster

基于 Trello 风格的任务管理与数据可视化平台。

## 功能特性

- **多视图任务管理**：列表视图、看板视图（Trello 风格）、时间线视图。
- **数据可视化**：
  - 用户端：任务状态分布、优先级分析、效率趋势、能力雷达图。
  - 管理员端：全局用户增长、热门模板排行、系统负载监控。
- **AI 智能助手**：
  - 任务智能拆解
  - 进度风险预警
  - 效率分析报告
  - 智能对话问答
- **模板系统**：支持自定义模板创建与管理员审核。

## 技术栈

- **前端**：React, Ant Design v5
- **图表**：ECharts (echarts-for-react)
- **图标**：Lucide React, Ant Design Icons
- **路由**：React Router v6

## 快速开始

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm start
   ```

3. 访问应用：
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 目录结构

- `src/components`: 公共组件（布局、导航）
- `src/pages`: 页面组件（用户端、管理员端）
- `src/services`: 模拟数据服务
- `src/utils`: 工具函数

## 注意事项

- 当前为演示版本，数据均为本地 Mock 数据。
- AI 功能为模拟实现，展示交互逻辑。
