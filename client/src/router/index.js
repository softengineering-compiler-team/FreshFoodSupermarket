import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from '@/components/Mainpage'
import Goods from '@/components/Goods'
import Shoppingcar from '@/components/Shoppingcar'
import Details from '@/components/Details'
import Adminlogin from '@/components/Adminlogin'
import Backstage from '@/components/backstage'
import Selling from '@/components/Selling'
import Stock from '@/components/Stock'
import Buy from '@/components/Buy'
import Sell from '@/components/Sell'
import Order from '@/components/Order'
import Receive from '@/components/Receive'
import Deliver from '@/components/Deliver'
import Userorder from '@/components/Userorder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mainpage',
      component: Mainpage
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
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
