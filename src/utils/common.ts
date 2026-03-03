/**
 * 通用工具函数
 */

/**
 * 防抖函数
 * @param fn 函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let lastTime = 0
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

/**
 * 深拷贝
 * @param obj 对象
 * @returns 拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj

  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any
  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }

  return obj
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target

  const source = sources.shift()
  if (!source) return target

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key] as any, source[key] as any)
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * 判断是否为对象
 * @param obj 对象
 * @returns 是否为对象
 */
export function isObject(obj: any): obj is object {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

/**
 * 判断是否为空
 * @param value 值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成 UUID
 * @returns UUID
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 数组去重
 * @param arr 数组
 * @returns 去重后的数组
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

/**
 * 数组分组
 * @param arr 数组
 * @param size 每组大小
 * @returns 分组后的数组
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * 数组打乱
 * @param arr 数组
 * @returns 打乱后的数组
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]!
    result[j] = temp!
  }
  return result
}

/**
 * 延迟执行
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 重试函数
 * @param fn 函数
 * @param times 重试次数
 * @param delay 延迟时间（毫秒）
 * @returns Promise
 */
export async function retry<T>(
  fn: () => Promise<T>,
  times: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (times <= 1) throw error
    await sleep(delay)
    return retry(fn, times - 1, delay)
  }
}

/**
 * 树形数据转扁平数组
 * @param tree 树形数据
 * @param childrenKey 子节点键名（默认 children）
 * @returns 扁平数组
 */
export function treeToList<T extends Record<string, any>>(
  tree: T[],
  childrenKey: string = 'children'
): T[] {
  const result: T[] = []
  const traverse = (nodes: T[]) => {
    nodes.forEach((node) => {
      result.push(node)
      if (node[childrenKey]) {
        traverse(node[childrenKey])
      }
    })
  }
  traverse(tree)
  return result
}

/**
 * 扁平数组转树形数据
 * @param list 扁平数组
 * @param options 配置
 * @returns 树形数据
 */
export function listToTree<T extends Record<string, any>>(
  list: T[],
  options: {
    idKey?: string
    parentKey?: string
    childrenKey?: string
  } = {}
): T[] {
  const { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = options

  const map = new Map<any, T>()
  const result: T[] = []

  list.forEach((item) => {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  list.forEach((item) => {
    const node = map.get(item[idKey])!
    const parent = map.get(item[parentKey])

    if (parent) {
      parent[childrenKey].push(node)
    } else {
      result.push(node)
    }
  })

  return result
}
