/**
 * 单词应用的核心类型定义。
 * 集中声明数据结构，便于在 store、组合式函数与视图之间复用，
 * 并避免散落各处的隐式 any。
 */

/** 单个单词的数据结构（对应学习列表与生词本中的条目） */
export interface Word {
  /** 唯一标识：用于列表渲染的 key，也是去重/查找的判断依据 */
  id: number
  /** 单词拼写，例如 apple */
  word: string
  /** 音标（含斜杠），例如 /ˈæp(ə)l/ */
  phonetic: string
  /** 中文释义 */
  translation: string
}

/** 单日的统计信息 */
export interface DailyStat {
  /** 当日已掌握（已学）的单词数量 */
  learned: number
  /** 当日加入生词本的单词数量 */
  added: number
}

/**
 * 按日期索引的统计数据集合。
 * 键名为 `YYYY-M-D` 格式的日期字符串，例如 { '2026-7-20': { learned: 3, added: 1 } }。
 */
export type DailyStats = Record<string, DailyStat>
