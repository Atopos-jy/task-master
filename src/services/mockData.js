export const TASKS = [
  {
    id: '1',
    title: '完成 Q3 季度报告',
    description: '整理销售数据，分析市场趋势，产出 PPT',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2023-10-25',
    assignee: 'Alice',
    tags: ['Report', 'Quarterly']
  },
  {
    id: '2',
    title: '修复登录页 Bug',
    description: '用户反馈无法使用 Google 账号登录',
    status: 'To Do',
    priority: 'High',
    dueDate: '2023-10-20',
    assignee: 'Bob',
    tags: ['Bug', 'Auth']
  },
  {
    id: '3',
    title: '设计新版首页 UI',
    description: '参考竞品，产出 3 版设计稿',
    status: 'Done',
    priority: 'Medium',
    dueDate: '2023-10-15',
    assignee: 'Charlie',
    tags: ['Design', 'UI']
  },
  {
    id: '4',
    title: '更新 API 文档',
    description: '补充新增接口的参数说明',
    status: 'To Do',
    priority: 'Low',
    dueDate: '2023-10-28',
    assignee: 'Alice',
    tags: ['Doc']
  },
  {
    id: '5',
    title: '团队建设活动策划',
    description: '预定场地，安排餐饮',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2023-11-01',
    assignee: 'David',
    tags: ['Admin']
  }
];

export const TEMPLATES = [
  { id: 't1', name: '入职清单', usage: 120 },
  { id: 't2', name: '日程任务', usage: 85 },
  { id: 't3', name: '项目里程碑', usage: 200 }
];
