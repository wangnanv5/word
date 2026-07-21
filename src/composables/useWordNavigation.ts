import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Word } from '@/types/word'

/** 左右方向键对应的自定义处理回调 */
export interface NavigationHandlers {
  /** 按下 ← 时触发（Learn 视图中为“已认识”，VocabBook 视图中为“移除”） */
  onLeft?: (word: Word) => void
  /** 按下 → 时触发（Learn 视图中为“加入生词本”） */
  onRight?: (word: Word) => void
}

/**
 *
 * @param getList  返回当前单词列表的 getter，便于在列表引用变化时获取最新数据
 * @param handlers 左右方向键的自定义回调，按需传入
 */
export function useWordNavigation(
  getList: () => Word[],
  handlers: NavigationHandlers = {}
) {
  /** 当前选中的单词索引 */
  const currentIndex = ref(0)
  /** 是否展开显示音标与释义 */
  const showDetails = ref(false)

  /** 当前选中的单词；列表为空时返回 null，供模板做空状态判断 */
  const currentWord = computed<Word | null>(
    () => getList()[currentIndex.value] ?? null
  )

  /**
   * 监听列表长度变化：当单词被移除导致列表缩短时，
   * 修正 currentIndex 防止越界指向不存在的元素。
   */
  watch(
    () => getList().length,
    (newLength) => {
      if (newLength === 0) {
        currentIndex.value = 0
      } else if (currentIndex.value >= newLength) {
        currentIndex.value = newLength - 1
      }
    }
  )

  function handleKeydown(event: KeyboardEvent): void {
    if (!currentWord.value) return

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        if (currentIndex.value > 0) currentIndex.value--
        showDetails.value = false
        break
      case 'ArrowDown':
        event.preventDefault()
        if (currentIndex.value < getList().length - 1) currentIndex.value++
        showDetails.value = false
        break
      case 'ArrowLeft':
        event.preventDefault()
        handlers.onLeft?.(currentWord.value)
        showDetails.value = false
        break
      case 'ArrowRight':
        event.preventDefault()
        handlers.onRight?.(currentWord.value)
        showDetails.value = false
        break
      case ' ':
        event.preventDefault()
        showDetails.value = !showDetails.value
        break
    }
  }

  // 组件挂载时绑定、卸载时解绑，避免事件监听泄漏
  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

  return { currentIndex, showDetails, currentWord }
}
