<template>
  <div id="main">
    <!-- <div class="top">
      <div @click="gomain" class="top-left"><Icon type="md-home" /> 叶鲜生首页</div>
      <div class="top-left">登陆</div>
      <div class="top-left">注册</div>
      <div @click="admin" class="top-right">商家后台</div>
      <div @click="gocar" class="top-right"><Icon type="md-cart" /> 我的购物车</div>
    </div> -->
    <Top></Top>
    <!-- <div class="search">
      <img @click="gomain" class="logo" src="../assets/logo.png">
      <Input class="input" size="large" search enter-button="搜索" placeholder="输入你想要的生鲜" />
    </div> -->
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
import Top from '@/components/Top'
export default {
  data () {
    return {
    }
  },
  methods: {
    gocar (){
      this.$router.push('shoppingcar')
    },
    gomain (){
      this.$router.push('/')
    },
    admin () {
      this.$router.push('admin')
    },
  },
  components: {
    Homepage,
    Classfication,
    Guessyoulike,
    Bottom,
    Top
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
.main{
  margin-left:10%;
  margin-right:10%;
}
.top-label{
  text-align: center;
}
.top-lebel-left{
}
</style>
