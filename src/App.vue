<template>
  <div class="app-container">
    <header class="navbar">
      <h1 class="m-0 text-1.5rem text-#2c3e50">词汇达人</h1>
      <nav class="flex gap-6">
        <router-link to="/learn" class="nav-link" active-class="text-#42b983! border-b-2 border-b-#42b983">背单词</router-link>
        <router-link to="/vocab" class="nav-link" active-class="text-#42b983! border-b-2 border-b-#42b983">单词本</router-link>
        <router-link to="/status" class="nav-link" active-class="text-#42b983! border-b-2 border-b-#42b983">用户状态</router-link>
      </nav>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>