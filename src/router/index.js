import { getUserInfoByTokenApi } from '@/api'
import store from '@/store'
// import { toast } from '@/components/Toast'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
  },
  ,
  {
    path: '/person',
    name: 'person',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Person.vue'),
    redirect: '/person/cart',
    children: [
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/components/Cart.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫 - 执行时机 ： 每个路由在进入之前执行
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  // to 是将要进入的路由
  // from 是从哪里跳转过来
  // console.log(to, from, next);

  // 由于每个路由都会进入这里，我们在这对token进行判断，如果有tonken，需要去服务器获取用户的信息
  let token = localStorage.getItem('token')
  if (token && !store.state.userState.user.email) {
    getUserInfoByTokenApi().then(res => {
      if (res.code === 0) {
        // toast('获取数据成功');
        // 存起来
        store.commit('userState/changeUserInfo', res.data.userInfo);
      }
    })
  }

  // next 是一个函数，这个函数是一个 放行函数
  // 如果不放行， router-view里面不会展示 路由对应的组件
  next();
})

export default router
