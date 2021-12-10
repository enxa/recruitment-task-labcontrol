import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Photos from '../views/Photos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/photos/:searchPhrase', 
    name: 'photos', 
    component: Photos,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
