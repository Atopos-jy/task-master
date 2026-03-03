# Task Master

React 18 + TypeScript + Vite 项目，集成 Ant Design 5.x, Redux Toolkit, React Router v6, Axios, ECharts。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm start
```

项目将在 http://localhost:3000 运行。

### 3. 构建生产版本

```bash
npm run build
```

## API 对接说明

本项目默认使用 Mock 数据。如需对接真实 API (Apifox)：

1. 打开 `src/api/taskApi.ts` 和 `src/api/dashboardApi.ts`
2. 将 `const USE_MOCK = true;` 修改为 `false`
3. 在 `src/api/request.ts` 中配置你的 API 基础路径：
   ```typescript
   const instance = axios.create({
     baseURL: "YOUR_API_BASE_URL", // 例如：http://127.0.0.1:4523/m1/123456-0-default
     timeout: 10000,
   });
   ```

## 项目结构

```
src/
├── api/                    # API接口层
│   ├── request.ts          # axios封装
│   ├── taskApi.ts          # 任务相关接口
│   └── dashboardApi.ts     # 仪表盘相关接口
├── assets/                 # 静态资源
├── components/             # 组件层
│   ├── common/             # 公共组件 (StatCard, TaskChart, PageHeader, etc.)
│   └── business/           # 业务组件 (TaskStatusTag, TaskPriorityTag)
├── types/                  # 类型定义
│   ├── api.ts              # API接口类型
│   └── task.ts             # 任务相关类型
├── utils/                  # 工具函数
│   └── format.ts           # 格式化工具
├── router/                 # 路由配置
└── pages/                  # 页面组件
    ├── Dashboard/          # 仪表盘
    └── TaskManagement/     # 任务管理
```

## 技术栈

- **Core**: React 18, TypeScript, Vite
- **UI**: Ant Design 5.x
- **State Management**: Redux Toolkit
- **Routing**: React Router v6 (Lazy Loading)
- **HTTP**: Axios
- **Charts**: ECharts / echarts-for-react
- **Styling**: SCSS / CSS Modules
