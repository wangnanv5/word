import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DailyStat, DailyStats, Word } from '@/types/word'
import { getTodayDateString } from '@/utils/date'

/**
 * 模拟的初始单词数据。
 * 实际项目中通常改为从后端接口拉取；此处保持静态数据以便演示。
 */
const mockWords: Word[] = [
  { id: 1, word: 'apple', phonetic: '/ˈæp(ə)l/', translation: '苹果' },
  { id: 2, word: 'banana', phonetic: '/bəˈnɑːnə/', translation: '香蕉' },
  { id: 3, word: 'cherry', phonetic: '/ˈtʃeri/', translation: '樱桃' },
  { id: 4, word: 'date', phonetic: '/deɪt/', translation: '枣' },
  { id: 5, word: 'elderberry', phonetic: '/ˈeldəberi/', translation: '接骨木果' },
  { id: 6, word: 'fig', phonetic: '/fɪɡ/', translation: '无花果' },
  { id: 7, word: 'grape', phonetic: '/ɡreɪp/', translation: '葡萄' },
  { id: 8, word: 'honeydew', phonetic: '/ˈhʌnidjuː/', translation: '蜜瓜' },
  { id: 9, word: 'kiwi', phonetic: '/ˈkiːwi/', translation: '猕猴桃' },
  { id: 10, word: 'lemon', phonetic: '/ˈlemən/', translation: '柠檬' }
]

/**
 * 单词中心 store（采用 Setup 风格以获得最完整的类型推导，避免使用 this）。
 * 负责维护：待学习列表、生词本、以及按日期聚合的学习统计。
 */
export const useWordStore = defineStore('words', () => {
  // ===== 响应式状态 =====
  /** 当前待学习的单词列表 */
  const learningList = ref<Word[]>([...mockWords])
  /** 用户收藏的生词本 */
  const vocabBook = ref<Word[]>([])
  /** 按日期聚合的统计数据 */
  const dailyStats = ref<DailyStats>({})

  // ===== 内部辅助方法 =====

  /**
   * 确保“今天”的统计对象存在，并返回其引用。
   * 这样后续对 learned / added 的累加无需再判断是否存在，避免冗余的空值检查。
   */
  function ensureTodayStat(): DailyStat {
    const today = getTodayDateString()
    let stat = dailyStats.value[today]
    if (!stat) {
      stat = { learned: 0, added: 0 }
      dailyStats.value[today] = stat
    }
    return stat
  }

  // ===== 对外动作（Actions） =====

  /**
   * 标记为已掌握：将单词移出学习列表，并累加今日已学数量。
   * 对于“已认识”的单词，只计 learned，不进入生词本。
   */
  function markAsLearned(word: Word): void {
    learningList.value = learningList.value.filter((w) => w.id !== word.id)
    ensureTodayStat().learned++
  }

  /**
   * 加入生词本：将单词移出学习列表，并计入今日已学与新增生词。
   * 若单词已存在于生词本中，则只计 learned，避免 added 重复累加。
   */
  function addToVocab(word: Word): void {
    const stat = ensureTodayStat()
    // 先移出学习列表（无论是否已收录都视为本次已学）
    learningList.value = learningList.value.filter((w) => w.id !== word.id)
    const alreadyInVocab = vocabBook.value.some((w) => w.id === word.id)
    if (!alreadyInVocab) {
      vocabBook.value.push(word)
      stat.added++
    }
    stat.learned++
  }

  /**
   * 从生词本中移除指定单词（不影响每日统计的历史数据）。
   */
  function removeFromVocab(word: Word): void {
    vocabBook.value = vocabBook.value.filter((w) => w.id !== word.id)
  }

  return {
    learningList,
    vocabBook,
    dailyStats,
    markAsLearned,
    addToVocab,
    removeFromVocab
  }
})
