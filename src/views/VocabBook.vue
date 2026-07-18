<template>
  <div class="learn-container">
    <div class="column">
      <h2 class="mt-0 text-#2c3e50 border-b-2 border-b-gray-100 pb-2">我的单词本</h2>
      <ul class="list-none p-0 m-0 overflow-y-auto flex-1">
        <li 
          v-for="(word, index) in store.vocabBook" 
          :key="word.id"
          class="list-item"
          :class="{ 'vocab-item-active': index === currentIndex }"
          @click="currentIndex = index"
        >
          {{ word.word }}
        </li>
        <li v-if="store.vocabBook.length === 0" class="text-center text-gray-400 mt-8 text-1.2rem">
          单词本是空的哦！
        </li>
      </ul>
    </div>
    
    <div class="column">
      <h2 class="mt-0 text-#2c3e50 border-b-2 border-b-gray-100 pb-2">说明栏</h2>
      <div v-if="currentWord" class="details-card">
        <h3 class="text-3rem m-0 mb-4 text-#2c3e50">{{ currentWord.word }}</h3>
        
        <div v-show="showDetails" class="text-1.5rem text-#555">
          <p class="text-gray-400 mb-4">音标: {{ currentWord.phonetic }}</p>
          <p class="font-bold text-#e74c3c">翻译: {{ currentWord.translation }}</p>
        </div>
        
        <div v-show="!showDetails" class="text-gray-400 italic text-1.2rem">
          按空格键显示释义
        </div>
      </div>
      <div v-else class="text-center text-gray-400 mt-8 text-1.2rem">
        暂无单词
      </div>

      <div class="mt-auto bg-#f8f9fa p-4 rd-8px text-0.9rem text-#666">
        <p class="font-bold mb-1">操作说明:</p>
        <p class="m-1"><code>↑</code> <code>↓</code> : 切换单词</p>
        <p class="m-1"><code>←</code> : 移除单词本</p>
        <p class="m-1"><code>空格键</code> : 显示/隐藏说明</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useWordStore } from '../store'

const store = useWordStore()
const currentIndex = ref(0)
const showDetails = ref(false)

const currentWord = computed(() => {
  return store.vocabBook[currentIndex.value] || null
})

// Ensure currentIndex is valid if the list shrinks
watch(() => store.vocabBook.length, (newLength) => {
  if (currentIndex.value >= newLength && newLength > 0) {
    currentIndex.value = newLength - 1
  }
})

const handleKeydown = (e) => {
  if (!currentWord.value) return

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      if (currentIndex.value > 0) currentIndex.value--
      showDetails.value = false
      break
    case 'ArrowDown':
      e.preventDefault()
      if (currentIndex.value < store.vocabBook.length - 1) currentIndex.value++
      showDetails.value = false
      break
    case 'ArrowLeft':
      e.preventDefault()
      store.removeFromVocab(currentWord.value)
      showDetails.value = false
      break
    case ' ':
      e.preventDefault()
      showDetails.value = !showDetails.value
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

