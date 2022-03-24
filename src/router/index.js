import { createRouter, createWebHistory } from 'vue-router'
import VisitorsView from '../views/VisitorsView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import UsersView from '../views/UsersView.vue'
import SportsView from '../views/SportsView.vue'
import ProfilView from '../views/ProfilView.vue'
import ItemView from '../views/ItemFormView.vue'
import activityFormView from '../views/ActivityFormView.vue'
import SearchView from '../views/SearchView.vue'

const routes = [
  {
    path: '/',
    name: 'visitors',
    component: VisitorsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/sports',
    name: 'sports',
    component: SportsView
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/item',
    name: 'item',
    component: ItemView
  },
  {
    path: '/activityForm',
    name: 'activityForm',
    component: activityFormView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
