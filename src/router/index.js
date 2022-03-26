import { createRouter, createWebHistory } from 'vue-router'
import VisitorsView from '../views/VisitorsView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import UsersView from '../views/UsersView.vue'
import SportsView from '../views/SportsView.vue'
import ProfilView from '../views/ProfilView.vue'
import ItemView from '../views/ItemFormView.vue'
import ActivityFormView from '../views/ActivityFormView.vue'
import SearchView from '../views/SearchView.vue'
import CompetitionsView from '../views/CompetitionsView.vue'
import CompetitionFormView from '../views/CompetitionFormView.vue'

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
    component: UsersView,
    meta: { requireAuth: true }
  },
  {
    path: '/sports',
    name: 'sports',
    component: SportsView,
    meta: { requireAuth: true }
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView,
    meta: { requireAuth: true }
  },
  {
    path: '/search/:name',
    name: 'search',
    component: SearchView,
    meta: { requireAuth: true }
  },
  {
    path: '/item',
    name: 'item',
    component: ItemView,
    meta: { requireAuth: true }
  },
  {
    path: '/activityForm/:id',
    name: 'activityForm',
    component: ActivityFormView,
    meta: { requireAuth: true }
  },
  {
    path: '/competitions',
    name: 'competitions',
    component: CompetitionsView,
    meta: { requireAuth: true }
  },
  {
    path: '/competitions/form/:id',
    name: 'competitionsForm',
    component: CompetitionFormView,
    meta: { requireAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!localStorage.getItem("token")) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
