import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout';
Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: {
          activeMenu: '/home/index'
        }
      }
    ]
  },
  // 农业资产
  {
    path: '/farmstock',
    component: Layout,
    redirect: '/farmstock/index',
    children: [
      {
        path: 'index',
        name: 'FarmStock',
        component: () => import('@/views/farm_stock/FarmStock'),
        meta: {
          activeMenu: '/farmstock/index'
        }
      }
    ]
  },
  // 销售数据
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    children: [
      {
        path: 'index',
        name: 'Sale',
        component: () => import('@/views/sale/Sale'),
        meta: {
          activeMenu: '/sale/index'
        }
      }
    ]
  },
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: constantRouterMap
})
