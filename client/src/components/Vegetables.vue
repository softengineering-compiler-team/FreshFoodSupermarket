<template>
    <div>
    <Top></Top>
    <Tabs class="main" value="name1">
        <TabPane label="茄子" name="name1"></TabPane>
        <TabPane label="黄瓜" name="name2"></TabPane>
        <TabPane label="小辣椒" name="name3"></TabPane>
        <TabPane label="小白菜" name="name4"></TabPane>
        <TabPane label="大葱" name="name5"></TabPane>
        <TabPane label="毛豆" name="name6"></TabPane>
        <TabPane label="番茄" name="name7"></TabPane>
    </Tabs>
    <div v-for="index1 in list" :key="index1.id" class="Goods">
    <div class="Name">{{index1.name}}</div>
        <div class="guess-goods" v-for="index of 5" :key="index">
        <Card @click.native="details" style="width:160px;cursor:pointer">
            <div style="text-align:center">
                <img class="goods-img" src="../assets/default.png">
                <div class="money">￥200</div>
                <Icon type="md-star" /><span>12234</span>
                <div class="goods-intro">介绍介绍介介绍介绍介绍介绍介绍介绍介绍介绍
                </div>
            </div>
        </Card>
        </div>
        </div>
        <Bottom></Bottom>
    </div>
</template>
<script>
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
export default {
  data () {
    return {
      list: [
        {
          id:0,
          name:'茄子' 
        },
        {
          id:1,
          name:'黄瓜' 
        },
        {
          id:2,
          name:'小辣椒' 
        },
        {
          id:3,
          name:'小白菜' 
        },
        {
          id:4,
          name:'大葱' 
        },
        {
          id:5,
          name:'毛豆' 
        },
        {
          id:6,
          name:'番茄' 
        },
      ]
    }
  },
  methods: {
    details () {
      this.$router.push('details')
    }
  },
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.main{
  margin-left:100px;
  margin-right:100px;
}
.Goods{
  text-align: center;
  margin-left:100px;
  margin-right:100px;
}
.Name{
  font-size:20px;
  position: relative;
  right:500px;
  margin-top:30px;
}
.goods-img {
  width: 120px;
  height: 120px;
  margin: 10px;
}
.goods-intro {
  font-size: 12px;
  margin-top: 10px;
}
.guess-goods{
  margin:20px;
  display: inline-block;
}
.money{
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  color:red;
}
</style>
