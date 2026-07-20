/// <reference types="vite/client" />

/**
 * 为 Vue 单文件组件提供模块声明，使 TypeScript 能识别 `*.vue` 的导入。
 * 使用 unknown 而非 any，避免向项目引入隐式 any 类型。
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
