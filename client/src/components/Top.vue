<template>
    <div>
      <div class="top">
      <div @click="gomain" class="top-left"><Icon type="md-home" /> 叶鲜生首页</div>
      <div @click="login" class="top-left">登陆</div>
      <div @click="register" class="top-left">注册</div>
      <div @click="admin" class="top-right right">商家后台</div>
      <div @mouseenter="enterperson()" @mouseleave="leaveperson()" class="top-right"><Icon type="md-person" /> 个人中心
          <div v-if="showperson" class="person">
            <div @click="goorder" class="ordertitle">我的订单</div>
            <div class="ordertitle">修改信息</div>
            <div class="ordertitle">修改密码</div>
            <div class="ordertitle">注销</div>
          </div>
      </div>
      <div  @mouseenter="entercart()" @mouseleave="leavecart()"  class="top-right">
        <Icon @click="shoppingcar" type="md-cart" /> <span @click="shoppingcar">我的购物车</span> 
        <SmallCart v-if="show" class="show"></SmallCart>
      </div>   
    </div>
    <div class="search">
      <img @click="gomain" class="logo" src="../assets/logo.png">
      <Input class="input" size="large" search enter-button="搜索" placeholder="输入你想要的生鲜" />
    </div>
    </div>
</template>
<script>
import SmallCart from '@/components/SmallCart'
export default {
  data () {
    return {
      showperson:false,
      show:false,
    }
  },
  methods: {
    shoppingcar () {
      this.$router.push('shoppingcar')
    },
    admin () {
      this.$router.push('admin')
    },
    gomain () {
      this.$router.push('/')
    },
    entercart () {
      this.show=true;
    },
    leavecart() {
      this.show=false;
    },
    enterperson () {
      this.showperson=true;
    },
    leaveperson() {
      this.showperson=false;
    },
    goorder() {
      this.$router.push('userorder')
    },
    login() {
      this.$router.push({
        name:'Login',
        params:{
          id:true
        }
      })
    },
    register(){
      this.$router.push({
        name:'Register',
        params:{
          id:false
        }
      })
    }
  },
  components :{
    SmallCart
  }
}
</script>
<style>
.top{
  height:40px;
  background-color: rgba(240, 240, 240, 1);
  padding:12px;
  padding-left:50px;
}
.top .top-left{
  display: inline;
  margin-left:50px;
  cursor:pointer;
}
.top .top-right{
  display: inline-block;
  float: right;
  margin-right:100px;
  cursor:pointer;
  height: 28px;
}
.search{
  height:100px;
  position: relative;
  top:12px;
}
.logo{
  display: inline-block;
  width:200px;
  height:40px;
  margin:40px;
  margin-top:20px;
  margin-left:100px;
  cursor:pointer;
}
.input{
  float:right;
  width:350px;
  margin:38px;
  margin-top:20px;
  margin-right:220px;
}
.show{
  position: absolute;
  top:40px;
  cursor: default;
  z-index: 100;
  border-radius: 20px;
  box-shadow: 0px 0px 5px #888888;
}
.top .right{
  margin-right:5px;
}
.person{
  position: absolute;
  top:40px;
  width: 100px;
  background: rgb(250, 250, 250);
  border-radius: 10px;
  box-shadow: 0px 0px 5px #888888;
  z-index: 100;
}
.ordertitle{
  width: 100%;
  text-align: center;
  height: 30px;
  padding:5px;
  border-top:1px solid rgb(240, 240, 240);
}
.ordertitle:hover{
  background-color: rgba(109, 210, 250,0.2);
}
</style>
