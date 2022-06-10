import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ContactsView from '../views/ContactsView.vue'
import ContactsFormView from '../views/ContactsFormView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  //
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView
  },
  {
    path: '/contact/edit',
    name: 'cotact-edit',
    component: ContactsFormView
  },
  {
    path: '/contact/add',
    name: 'cotact-add',
    component: ContactsFormView
  },
  //
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  // Catch all
  // See https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: {
      template: '<div>Page Not Found</div>'
    }
  },
  { path: '/:pathMatch(.*)', name: 'bad-not-found', component: {template: '<div>Page Not Found</div>'} },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
