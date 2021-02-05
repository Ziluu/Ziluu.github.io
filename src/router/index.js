import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Statics from '../views/statics/Statics.vue'
import User from '../views/user/User.vue'
import Roles from '../views/user/Roles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: '/home',
    component: Home,
    meta: {
      name: '应用管理',
      id: "1",
      iconclass: "el-icon-user-solid"
    },
    redirect: "/home/user",
    children: [
      {
        path: '/home/statics',
        component: Statics
      },
      {
        path: "/home/user",
        component: User,
        meta: { name: "用户管理", id: "2" }
      },
      {
        path: "/home/roles",
        component: Roles,
        meta: { name: "角色管理", id: "3" }
      }
    ]
  }, {
    path: '/log',
    meta: { name: '日志管理', id: "4", iconclass: "el-icon-menu" },
    children: [
      {
        path: "/log/syslog",
        meta: { name: "系统日志", id: "5" }
      },
      {
        path: "/log/oplog",
        meta: { name: "管理员日志", id: "6" }
      },
      {
        path: "/log/userlog",
        meta: { name: "用户行为统计", id: "7" }
      }
    ]
  }
]

// const routes = [
//   {
//     path: '/',
//     redirect:'/login',
//   },
//   {
//     path: '/home',
//     component: Home
//   },
//   {
//     path: '/login',
//     component: Login
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
