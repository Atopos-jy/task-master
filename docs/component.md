# 通用组件使用文档

本文档详细介绍了项目中通用组件的使用方法和参数说明。

## 1. AuthRoute (权限守卫)

**路径**: `src/components/common/AuthRoute`

用于保护需要登录才能访问的路由。如果用户未登录（无 Token），将自动重定向至登录页。

### 使用方式
通常在路由配置中使用，包裹需要保护的组件。

```tsx
import AuthRoute from "@/components/common/AuthRoute";

<AuthRoute>
  <Dashboard />
</AuthRoute>
```

---

## 2. ErrorBoundary (错误边界)

**路径**: `src/components/common/ErrorBoundary`

用于捕获子组件树中的渲染错误，防止整个应用崩溃，并展示友好的错误提示 UI。

### 使用方式
通常包裹在应用根组件或主要路由入口处。

```tsx
import ErrorBoundary from "@/components/common/ErrorBoundary";

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 3. PageHeader (页面头部)

**路径**: `src/components/common/PageHeader`

统一风格的页面标题栏，包含标题、副标题及可选的操作按钮。

### Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 页面主标题 |
| subTitle | string | 否 | 页面副标题 |
| extra | ReactNode | 否 | 右侧操作区内容 (如按钮) |

### 示例

```tsx
import PageHeader from "@/components/common/PageHeader";
import { Button } from "antd";

<PageHeader 
  title="任务管理" 
  subTitle="查看和管理所有任务"
  extra={<Button type="primary">新建任务</Button>}
/>
```

---

## 4. StatCard (统计卡片)

**路径**: `src/components/common/StatCard`

用于在仪表盘展示关键指标数据的卡片组件。

### Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 指标名称 |
| value | string \| number | 是 | 指标数值 |
| icon | ReactNode | 否 | 左侧图标 |
| trend | number | 否 | 趋势百分比 (正数为上升，负数为下降) |
| color | string | 否 | 图标背景色 |

### 示例

```tsx
import StatCard from "@/components/common/StatCard";
import { UserOutlined } from "@ant-design/icons";

<StatCard
  title="总用户数"
  value={1234}
  icon={<UserOutlined />}
  trend={5.2}
  color="#1890ff"
/>
```

---

## 5. TaskChart (任务图表)

**路径**: `src/components/common/TaskChart`

基于 ECharts 封装的任务数据可视化组件。

### Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | any[] | 是 | 图表数据源 |
| type | 'bar' \| 'line' \| 'pie' | 否 | 图表类型，默认为 'bar' |
| title | string | 否 | 图表标题 |

### 示例

```tsx
import TaskChart from "@/components/common/TaskChart";

<TaskChart 
  title="任务完成趋势" 
  data={chartData} 
  type="line" 
/>
```
