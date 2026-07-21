<template>
  <div class="flex flex-col min-h-100vh">
    <header class="flex justify-between items-center bg-white px-8 h-60px shadow-[0_2px_8px_rgba(0,0,0,0.1)] sticky top-0 z-100">
      <h1 class="m-0 text-1.5rem text-#2c3e50">词汇达人</h1>
      <nav class="flex gap-6">
        <router-link to="/learn" class="no-underline text-#666 font-500 p-2 transition-colors duration-200 hover:text-#42b983" active-class="text-#42b983! border-b-2 border-b-#42b983">背单词</router-link>
        <router-link to="/vocab" class="no-underline text-#666 font-500 p-2 transition-colors duration-200 hover:text-#42b983" active-class="text-#42b983! border-b-2 border-b-#42b983">单词本</router-link>
        <router-link to="/status" class="no-underline text-#666 font-500 p-2 transition-colors duration-200 hover:text-#42b983" active-class="text-#42b983! border-b-2 border-b-#42b983">用户状态</router-link>
        <button @click="toggleDark()">{{ isDark ? '☀️' : '🌙' }}</button>
      </nav>
    </header>
    <main class="flex-1 p-8 max-w-1200px mx-auto w-full">
      <router-view />
    </main>
  </div>
</template> 

<script setup>
import { useDark, useToggle } from '@vueuse/core'

// 默认 Tailwind 风格：html 上加/删 class="dark"
const isDark = useDark({
  storageKey: 'theme-mode',   // localStorage 键，默认 vueuse-color-scheme
})
const toggleDark = useToggle(isDark)
</script>