export interface Word {
  id: number
  word: string
  phonetic: string
  translation: string
}

export interface DailyStat {
  learned: number
  added: number
}

/**
 * 按日期索引的统计数据集合。
 * 键名为 `YYYY-M-D` 格式的日期字符串，例如 { '2026-7-20': { learned: 3, added: 1 } }。
 */
export type DailyStats = Record<string, DailyStat>
