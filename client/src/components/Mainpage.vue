<template>
  <div id="main">
    <div class="top">
      <div class="top-left"><Icon type="md-home" /> 叶鲜生首页</div>
      <div class="top-left">登陆</div>
      <div class="top-left">注册</div>
      <div class="top-right">商家后台</div>
      <div class="top-right"><Icon type="md-cart" /> 我的购物车</div>
    </div>
    <div class="search">
      <img class="logo" src="../assets/logo.png">
      <Input class="input" size="large" search enter-button="搜索" placeholder="输入你想要的生鲜" />
    </div>
    <div class="main">
      <Tabs class="top-label" value="name1">
          <TabPane class="top-lebel-left" label="首页" name="name1">
            <Homepage></Homepage>
          </TabPane>
          <TabPane class="top-lebel-right" label="分类" name="name2">
            <Classfication></Classfication>
          </TabPane>
      </Tabs>
      <Divider />
      <guessyoulike></guessyoulike>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Homepage from '@/components/Homepage'
import Classfication from '@/components/Classfication'
import Guessyoulike from '@/components/Guessyoulike'
import Bottom from '@/components/bottom'
export default {
  data () {
    return {
    }
  },
  components: {
    Homepage,
    Classfication,
    Guessyoulike,
    Bottom
  }
}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width:1200px;
}
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
  width:500px;
  margin:40px;
  margin-top:20px;
  margin-right:300px;
}
.main{
  margin-left:100px;
  margin-right:100px;
}
.top-label{
  text-align: center;
}
.top-lebel-left{
}
</style>
