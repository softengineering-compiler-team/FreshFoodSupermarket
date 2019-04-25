import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from '@/components/Mainpage'
import Fruit from '@/components/Fruit'
import Vegetables from '@/components/Vegetables'
import Seafood from '@/components/Seafood'
import Meat from '@/components/Meat'
import Dairy_products from '@/components/Dairy_products'
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
import Login from '@/components/login'
import Register from '@/components/register'
import PersonalCenter from '@/components/PersonalCenter'
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
      path: '/vegetables',
      name: 'Vegetables',
      component: Vegetables
    },//蔬菜
    {
      path: '/seafood',
      name: 'Seafood',
      component: Seafood
    },//海鲜
    {
      path: '/meat',
      name: 'Meat',
      component: Meat
    },//肉类
    {
      path: '/dairy_products',
      name: 'Dairy_products',
      component: Dairy_products
    },//乳制品
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
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/personalcenter',
      name:'PersonalCenter',
      component:PersonalCenter
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
