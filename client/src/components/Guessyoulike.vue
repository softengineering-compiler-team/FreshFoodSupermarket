<template>
    <div v-if="list" class="guessyoukile">
      <div class="guessname">猜你喜欢</div>
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
</template>
<script>
export default {
  data () {
    return {
       list: '',
    }
  },
  methods: {
    details (goodsName) {
      console.log(goodsName);
      this.$router.push({
        name:'Details',
        params:{
          name:goodsName
        }
      })
    },
  },
  created:function(){
    if (this.$cookies.get("username")) {
      
    
    let data = {
      username:this.$cookies.get('username')
    }
    this.axios
    .post(this.serverUrl+'/query/fav',this.qs.stringify(data),this.headconfig)
    .then(res => {
        console.log(res.data);
        if(res.data.code==0){
            console.log(res.data.data);
            this.list = res.data.data
        }
        else{
            this.$Message.error('获取信息失败');
        }
    })
    .catch(error => {
        this.$Message.error('获取信息失败');
        console.log(error)
        // this.errored = true
    })
  }else{

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
</style>
