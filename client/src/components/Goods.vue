<template>
    <div>
    <Top></Top>
    <Tabs class="main" value="name1">
        <TabPane label="香蕉" name="name1"></TabPane>
        <TabPane label="苹果" name="name2"></TabPane>
        <TabPane label="葡萄" name="name3"></TabPane>
        <TabPane label="西瓜" name="name4"></TabPane>
        <TabPane label="梨" name="name5"></TabPane>
        <TabPane label="柚子" name="name6"></TabPane>
        <TabPane label="车厘子" name="name7"></TabPane>
    </Tabs>
    <div @click="details" v-for="index1 in list" :key="index1.id" class="Goods">
    <div class="Name">{{index1.name}}</div>
        <div class="guess-goods" v-for="index of 5" :key="index">
        <Card style="width:160px">
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
          name:'香蕉' 
        },
        {
          id:1,
          name:'苹果' 
        },
        {
          id:2,
          name:'葡萄' 
        },
        {
          id:3,
          name:'西瓜' 
        },
        {
          id:4,
          name:'梨' 
        },
        {
          id:5,
          name:'柚子' 
        },
        {
          id:6,
          name:'车厘子' 
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
