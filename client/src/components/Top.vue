<template>
    <div>
        <div class="top">
      <div class="top-left"><Icon type="md-home" /> 叶鲜生首页</div>
      <div class="top-left">登陆</div>
      <div class="top-left">注册</div>
      <div @click="admin" class="top-right">商家后台</div>
      <div @click="shoppingcar" class="top-right"><Icon type="md-cart" /> 我的购物车</div>
    </div>
    <div class="search">
      <img class="logo" src="../assets/logo.png">
      <Input class="input" size="large" search enter-button="搜索" placeholder="输入你想要的生鲜" />
    </div>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    shoppingcar () {
      this.$router.push('shoppingcar')
    },
    admin () {
      this.$router.push('admin')
    }
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
}
.top .top-right{
  display: inline-block;
  float: right;
  margin-right:100px;
}
.search{
  height:100px;
}
.logo{
  display: inline-block;
  width:200px;
  height:40px;
  margin:40px;
  margin-top:20px;
  margin-left:100px;
}
.input{
  float:right;
  width:350px;
  margin:40px;
  margin-top:20px;
  margin-right:200px;
}
</style>
