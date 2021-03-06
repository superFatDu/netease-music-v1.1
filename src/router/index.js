import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'my',
        name: 'MySource',
        component: () => import('../components/MySource.vue'),
        meta: {
          KeepAlive: true
        }
      },
      {
        path: 'find',
        name: 'FindSource',
        component: () => import('../components/FindSource.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/songlist/:from/:id/:desc',
    name: 'SongList',
    component: () => import('../views/SongList.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 };
  }
});

export default router;
