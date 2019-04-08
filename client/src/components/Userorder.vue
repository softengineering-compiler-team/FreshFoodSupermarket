<template>
    <div>
        <Top></Top>
        <Tabs class="tabs" value="name1">
            <TabPane label="我的订单" name="name1"></TabPane>
        </Tabs>
        <div v-for="index in list" :key="index.id"  class="order">
            <div class="orderinfo">
                <div class="orderid">订单编号：{{index.id}}</div>
                <div class="ordercreatetime">创建时间：2019/4/8 21：00：23</div>
                <div class="orderstatus">订单状态：<span style="color:lightgreen">已送达</span> </div>
            </div>
            <div v-for="index1 in index.data" :key="index1.id" class="order-inside">
                <div class="imgbox2"><img class="img2" :src="index1.url"></div>
                <div class="introbox2"><div class="intro2">{{index1.intro}}</div></div>
                <div class="pricebox2"><div class="price2">单价：￥{{index1.price}}</div></div>
                <div class="countbox2">
                        <div class="count2">
                            数量：{{index1.count}}
                        </div>
                </div>
                <div class="pricebox2"><div class="price2">小计：￥{{price1(index1.price,index1.count)}}</div></div>
            </div>
            <div class="totalpricebox">
                <div class="goodsprice">商品总价：￥{{totalprice(index.data)}}</div>
                <div class="carriage">运费：￥5</div>
                <div class="totalexpense">总价：￥555</div>
                <div class="btnbox">
                    <Button size="large" type="primary" class="hastenbtn">催单</Button>
                    <Button size="large" type="primary" class="hastenbtn">退款</Button>
                </div>
            </div>
        </div>
        <bottom></bottom>
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
            data:[{
            id:0,
            name:'1',
            url:"/static/default.png",
            count:2,
            price:200,
            intro:"介绍介绍介绍介绍介绍介绍介绍介绍"
            },
            {
            id:1,
            name:'2',
            url:"/static/default.png",
            count:1,
            price:100,
            intro:"介绍介绍介绍介绍介绍介绍介绍介绍"
            },
            {
            id:2,
            name:'3' ,
            url:"/static/default.png",
            count:1,
            price:50,
            intro:"介绍介绍介绍介绍介绍介绍介绍介绍"
            }],
            id:0,
            status:true
         },
        {
            data:[{
            id:0,
            name:'1',
            url:"/static/default.png",
            count:2,
            price:200,
            intro:"介绍介绍介绍介绍介绍介绍介绍介绍"
            },
            {
            id:1,
            name:'2',
            url:"/static/default.png",
            count:1,
            price:100,
            intro:"介绍介绍介绍介绍介绍介绍介绍介绍"
            },
            {
            id:2,
            name:'3' ,
            url:"/static/default.png",
            count:1,
            price:50,
            intro:"介绍介绍介绍介绍介绍介绍介绍介绍"
            }],
            id:1,
            status:false
         },
      ]
    }
  },
  methods:{
    price1 (a,b){
        return a*b;
    },
    totalprice (a){
        let total=0;
        for (const key in a) {
            total+=a[key].count*a[key].price
        }
        console.log(total);
        return total;
    },
  },
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.tabs{
    margin-left: 150px;
    margin-right: 150px;
}
.order{
    margin:0 150px 30px 150px;
    background: rgb(250, 250, 250);
    box-shadow: 0px 0px 5px rgba(184, 175, 175, 0.685);
}
.order:hover{
    box-shadow: 0px 0px 10px rgba(184, 175, 175, 0.685);
}
.order-inside{
    height: 100px;
    border-top:1px solid rgb(240, 240, 240  );
}
.imgbox2{
    width: 20%;
    text-align: center;
    height: 100%;
    margin-left:3%;
    display: inline-block;
     vertical-align:top;
}
.img2{
    width: 80px;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.introbox2{
    width: 15%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.intro2{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.pricebox2{
    width: 15%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.price2{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.introbox2{
    width: 20%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.intro2{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.countbox2{
    width: 12%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.count2{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.pricebox2{
    width: 15%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.price2{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.orderinfo{
    margin:20px;
    font-size:16px;
    margin-left:80px;
    width:50%;
    display:inline-block;
}
.orderinfo div{
    margin-top:5px;
    margin-bottom:5px;
}
.totalpricebox{
    display: inline-block;
    font-size:16px;
    padding-left:80%;
    width: 100%;
    border-top:1px solid rgb(240, 240, 240  );
    position: relative;
}
.totalpricebox div{
    margin:10px;
}
.btnbox{
    position: absolute;
    top:30%;
    left:7%;
}
.hastenbtn{
    margin-right:20px;
    width:100px;
}
</style>
