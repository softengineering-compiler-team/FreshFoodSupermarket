<template>
    <div>
    <Top></Top>
    <div class="fixbox">
      <div class="fixbox-title">分类</div>
      <div @click="goods('fruits')" class="fixbox-content">新鲜水果</div>
      <div @click="goods('vegetables')" class="fixbox-content">时令蔬菜</div>
      <div @click="goods('seafoods')" class="fixbox-content">海鲜水产</div>
      <div @click="goods('meat')" class="fixbox-content">肉禽蛋品</div>
      <div @click="goods('dairy')" class="fixbox-content">乳品烘培</div>
    </div>
    <Tabs class="main" value="name1">
        <TabPane label="搜索结果" name="name1"></TabPane>
    </Tabs>
    <div v-if="list" class="guessyoukile search-width">
        <div class="guess-goods" v-for="(goods,index) in list" :key="index">
        <Card @click.native="details(goods.goodsName)" style="width:160px;cursor:pointer;">
            <div style="text-align:center">
                <img class="guess-img" :src="'/static/goodsimg/'+goods.goodsName+'.jpg'">
                <div class="guess-money">￥{{goods.price}}</div>
                <span class="inventory">库存:</span><span class="inventory">{{goods.inventory}}</span>
                <div class="guess-intro">{{goods.goodsName}}
                </div>
            </div>
        </Card>
        </div>
    </div>
      <div class="errorlist" v-if="!list">
          123
      </div>
          <img @click="backtop" class="backtop" src="/static/backtop.png" alt="">
        <Bottom></Bottom>
    </div>
</template>
<script>
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
export default {
  data () {
    return {
      goodscls:'',
      list: '',
      errorlist:[
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
      ],
    }
  },
  methods: {
    details (goodsName) {
      console.log(goodsName);
      this.$router.push({
        name:'Details',
        params:{
          name:goodsName,
        }
      })
    },
    backtop(){
      $('html,body').animate({scrollTop:0 },500)
    },
    getquery(){  
      this.list = this.$store.state.searchlist
    },
    goods(index){
      this.$store.state.classification=index
      this.$router.push({
        name:'Fruit',
        params:{
          id:index
        }
      })
    },
  },
  created:function(){
    this.getquery()
    },
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.main{
  margin-left:10%;
  margin-right:10%;
}
.Goods{
  text-align: center;
  margin-left:10%;
  margin-right:10%;
}
.goods-card{
  width:160px;
  cursor:pointer;
}
.Name{
  font-size:20px;
  position: relative;
  right:45%;
  margin-top:30px;
}
.goods-img {
  width: 100%;
  height: 120px;
  margin: 0px;
  margin-bottom:15px;
}

.inventory{
  font-size:11px;
}
.goods-intro {
  font-size: 15px;
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
.backtop{
  position: fixed;
  top:75%;
  right:20px;
  box-shadow: 0 0 5px 5px rgb(210, 210, 210);
  font-size:16px;
  cursor: pointer;
  width: 40px;
  border-radius: 50%;
}
.errorlist{
  min-height:500px;
}
.fixbox{
  text-align: center;
  display: absolute;
  position:fixed;
  width:100px;
  left:10px;
  background: rgb(250, 250, 250);
  border-radius: 10%;
  font-size:16px;
  box-shadow: 0px 0px 5px #888888;
  letter-spacing: 2px;
  z-index: 1003;
}
.fixbox-title{
  text-align: center;
  width: 60px;
  margin-left:20px;
  margin-right:20px;
  font-size:16px;
  border-top:1px solid rgb(240, 240, 240);
  margin-bottom:2px;
  line-height: 150%;
}
.fixbox-content{
  text-align: center;
  border-top:1px solid rgb(240, 240, 240);
  margin-bottom:5px;
  cursor: pointer;
}
.guessyoukile{
  text-align: center;
}
.guessname{
  font-size:20px;
  position: relative;
  right:45%;
  margin-top:50px;
}
.guess-img {
  width: 100%;
  height: 120px;
  margin: 0px;
  margin-bottom:15px; 
}
.guess-intro {
  font-size: 15px;
  margin-top: 10px;
}
.guess-goods{
  margin:20px;
  display: inline-block;
}
.guess-money{
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  color:red;
}
.carbtn{
  letter-spacing:2px;
  margin-top: 5px;
}
.inventory{
  font-size:11px;
}
.search-width{
    margin-left:10%;
    margin-right:10%;
}
</style>
