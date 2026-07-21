import { defineStore } from 'pinia'
import { ref } from 'vue'

/** 布局模式：double = 双栏（单词栏+说明栏），single = 单栏（仅说明栏） */
export type LayoutMode = 'double' | 'single'
/** 主题模式：light = 亮色，dark = 暗色 */
export type ThemeMode = 'light' | 'dark'

/** 持久化到 localStorage 的 UI 偏好结构 */
interface PersistedUi {
  layout: LayoutMode
  theme: ThemeMode
}

const STORAGE_KEY = 'word-app-ui'

/**
 * 从 localStorage 读取已保存的 UI 偏好，带脏数据兜底。
 * 读取失败时回退到默认（双栏 + 亮色），保证应用始终可用。
 */
function loadPersisted(): PersistedUi {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedUi>
      return {
        layout: parsed.layout === 'single' ? 'single' : 'double',
        theme: parsed.theme === 'dark' ? 'dark' : 'light'
      }
    }
  } catch {
    // localStorage 不可用或数据损坏：忽略并回退默认值
  }
  return { layout: 'double', theme: 'light' }
}

/**
 * 全局 UI 偏好 store：管理「布局模式」与「主题模式」两个界面级状态，
 * 并将用户选择持久化，刷新后依然保留。
 */
export const useUiStore = defineStore('ui', () => {
  const initial = loadPersisted()
  const layout = ref<LayoutMode>(initial.layout)
  const theme = ref<ThemeMode>(initial.theme)

  /** 将当前偏好写入 localStorage（失败则静默忽略） */
  function persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ layout: layout.value, theme: theme.value }))
    } catch {
      // 忽略写入异常（如隐私模式禁用存储）
    }
  }

  function setLayout(mode: LayoutMode): void {
    layout.value = mode
    persist()
  }

  /** 在双栏 / 单栏之间切换 */
  function toggleLayout(): void {
    setLayout(layout.value === 'double' ? 'single' : 'double')
  }

  function setTheme(mode: ThemeMode): void {
    theme.value = mode
    persist()
  }

  /** 在亮色 / 暗色之间切换 */
  function toggleTheme(): void {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  return { layout, theme, setLayout, toggleLayout, setTheme, toggleTheme }
})
