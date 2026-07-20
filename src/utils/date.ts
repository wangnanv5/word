/**
 * 日期工具函数。
 * 被 store（写入每日统计）与 Status 视图（读取每日统计）共用，
 * 统一日期字符串的格式，避免出现两种实现导致键名不一致。
 */

/**
 * 生成指定日期的字符串表示，格式为 `YYYY-M-D`。
 * @param date 目标日期，默认取当前时间。允许传入以方便单元测试。
 * @returns 形如 `2026-7-20` 的日期键名，用于聚合同一天的数据。
 */
export function getTodayDateString(date: Date = new Date()): string {
  // 月份从 0 开始计数，需要 +1
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
