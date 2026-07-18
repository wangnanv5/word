import { defineStore } from 'pinia'

// Some mock data
const mockWords = [
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

const getTodayDateString = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const useWordStore = defineStore('words', {
  state: () => ({
    learningList: [...mockWords],
    vocabBook: [],
    dailyStats: {}, // e.g., { '2023-10-10': { learned: 0, added: 0 } }
  }),
  actions: {
    initTodayStats() {
      const today = getTodayDateString()
      if (!this.dailyStats[today]) {
        this.dailyStats[today] = { learned: 0, added: 0 }
      }
      return today
    },
    markAsLearned(word) {
      const today = this.initTodayStats()
      this.learningList = this.learningList.filter(w => w.id !== word.id)
      this.dailyStats[today].learned++
    },
    addToVocab(word) {
      const today = this.initTodayStats()
      this.learningList = this.learningList.filter(w => w.id !== word.id)
      if (!this.vocabBook.find(w => w.id === word.id)) {
        this.vocabBook.push(word)
        this.dailyStats[today].added++
      }
      this.dailyStats[today].learned++
    },
    removeFromVocab(word) {
      this.vocabBook = this.vocabBook.filter(w => w.id !== word.id)
    }
  }
})
