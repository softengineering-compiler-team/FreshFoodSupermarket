import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from '@/components/Mainpage'
import Fruit from '@/components/Fruit'
import Shoppingcar from '@/components/Shoppingcar'
import Details from '@/components/Details'
import Adminlogin from '@/components/backstage/Adminlogin'
import Backstage from '@/components/backstage/backstage'
import Selling from '@/components/backstage/Selling'
import Stock from '@/components/backstage/Stock'
import Buy from '@/components/backstage/Buy'
import Sell from '@/components/backstage/Sell'
import Order from '@/components/backstage/Order'
import Receive from '@/components/backstage/Receive'
import Deliver from '@/components/backstage/Deliver'
import Userorder from '@/components/Userorder'
import Login from '@/components/login'
import PersonalCenter from '@/components/PersonalCenter'
import Reset from '@/components/reset'
import Search from '@/components/search'
import Fpass from '@/components/Fpass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mainpage',
      component: Mainpage
    },
    {
      path: '/fruit',
      name: 'Fruit',
      component: Fruit
    },//水果
    {
      path: '/shoppingcar',
      name: 'Shoppingcar',
      component: Shoppingcar
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/admin',
      name: 'Adminlogin',
      component: Adminlogin
    },
    {
      path: '/userorder',
      name: 'Userorder',
      component: Userorder
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/personalcenter',
      name:'PersonalCenter',
      component:PersonalCenter
    },
    {
      path:'/reset',
      name:'Reset',
      component:Reset
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/fpass',
      name:'Fpass',
      component:Fpass
    },
    {
      path: '/backstage',
      name: 'Backstage',
      component: Backstage,
      children: [  //这里就是二级路由的配置
        {
          path: '/selling',
          name: 'Selling',
          component: Selling
        },
        {
          path: '/stock',
          name: 'Stock',
          component: Stock
        },
        {
          path: '/buy',
          name: 'Buy',
          component: Buy
        },
        {
          path: '/sell',
          name: 'sell',
          component: Sell
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
        {
          path: '/receive',
          name: 'receive',
          component: Receive
        },
        {
          path: '/deliver',
          name: 'deliver',
          component: Deliver
        }
      ]
    }
  ]
})
