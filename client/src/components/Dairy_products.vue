<template>
    <div>
    <Top></Top>
    <Tabs class="main" value="name1">
        <TabPane label="奶酪" name="name1"></TabPane>
        <TabPane label="奶油" name="name2"></TabPane>
        <TabPane label="奶粉" name="name3"></TabPane>
        <TabPane label="酸奶" name="name4"></TabPane>
        <TabPane label="巴氏奶" name="name5"></TabPane>
        <TabPane label="炼乳" name="name6"></TabPane>
        <TabPane label="冰淇淋" name="name7"></TabPane>
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
          name:'奶酪' 
        },
        {
          id:1,
          name:'奶油' 
        },
        {
          id:2,
          name:'奶粉' 
        },
        {
          id:3,
          name:'酸奶' 
        },
        {
          id:4,
          name:'巴氏奶' 
        },
        {
          id:5,
          name:'炼乳' 
        },
        {
          id:6,
          name:'冰淇淋' 
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
