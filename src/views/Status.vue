<template>
  <div class="status-container">
    <h2 class="text-#2c3e50 mt-0 border-b-2 border-b-gray-100 pb-4 mb-8">用户状态</h2>
    
    <div class="stats-cards">
      <div class="stat-card">
        <h3 class="m-0 text-#666 text-1.1rem">今日已背</h3>
        <p class="text-3.5rem font-bold text-#42b983 my-4 mx-0">{{ todayLearned }}</p>
        <p class="text-gray-400 m-0">个单词</p>
      </div>
      
      <div class="stat-card">
        <h3 class="m-0 text-#666 text-1.1rem">今日加入生词本</h3>
        <p class="text-3.5rem font-bold text-#42b983 my-4 mx-0">{{ todayAdded }}</p>
        <p class="text-gray-400 m-0">个单词</p>
      </div>

      <div class="stat-card">
        <h3 class="m-0 text-#666 text-1.1rem">生词本总计</h3>
        <p class="text-3.5rem font-bold text-#42b983 my-4 mx-0">{{ store.vocabBook.length }}</p>
        <p class="text-gray-400 m-0">个单词</p>
      </div>

      <div class="stat-card">
        <h3 class="m-0 text-#666 text-1.1rem">剩余待背</h3>
        <p class="text-3.5rem font-bold text-#42b983 my-4 mx-0">{{ store.learningList.length }}</p>
        <p class="text-gray-400 m-0">个单词</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWordStore } from '../store'

const store = useWordStore()

const getTodayDateString = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const todayStats = computed(() => {
  const today = getTodayDateString()
  return store.dailyStats[today] || { learned: 0, added: 0 }
})

const todayLearned = computed(() => todayStats.value.learned)
const todayAdded = computed(() => todayStats.value.added)
</script>