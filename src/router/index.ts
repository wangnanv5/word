import { createRouter, createWebHistory } from 'vue-router'

import Learn from '@/views/Learn.vue'
import VocabBook from '@/views/VocabBook.vue'
import Status from '@/views/Status.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/learn'
    },
    {
      path: '/learn',
      name: 'learn',
      component: Learn
    },
    {
      path: '/vocab',
      name: 'vocab',
      component: VocabBook
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    }
  ]
})

export default router