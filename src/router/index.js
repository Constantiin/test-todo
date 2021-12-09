import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Todo from '@/views/Todo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: Todo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
