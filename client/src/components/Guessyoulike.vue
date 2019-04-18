<template>
    <div class="guessyoukile">
      <div class="guessname">猜你喜欢</div>
        <div @click="details" class="guess-goods" v-for="index of 10" :key="index">
        <Card style="width:160px;cursor:pointer;">
            <div style="text-align:center">
                <img class="goods-img" src="../assets/default.png">
                <div class="money">￥200</div>
                <Icon type="md-star" /><span>12234</span>
                <div class="goods-intro">介绍介绍介介绍介绍介绍介绍介绍介绍介绍
                
                </div>
            </div>
        </Card>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    details () {
      this.$router.push('details')
    }
  }
}
</script>
<style>
.guessyoukile{
  text-align: center;
}
.guessname{
  font-size:20px;
  position: relative;
  right:500px;
  margin-top:50px;
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
.carbtn{
  letter-spacing:2px;
  margin-top: 5px;
}
</style>
