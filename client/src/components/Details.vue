<template>
    <div>
        <Top></Top>
        <div class="fenge" >
            <Divider/>
        </div>
        <div class="details">
            <img class="details-img" src="../assets/default.png">
            <div class="details-right">
                <div class="details-name">名称名称名称名称名称名称名称</div>
                <div class="details-price">价格</div>
                <div class="details-yunfei">运费</div>
                <div class="details-jinghan">净含量</div>
                <div class="details-yuexiao">月销量</div>
                <div class="details-count">数量</div>
                <div class="details-buttons">
                    <Button @click="addcart" size="large" class="button" type="warning" icon="md-cart">加入购物车</Button>
                    <Button size="large" class="button" type="warning">立即购买</Button>
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
  methods:{
    addcart () {
         this.$router.push('shoppingcar');
    }
  },
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.details{
    margin-left:100px;
    margin-right:100px;
    margin-top:50px;
    margin-bottom:50px;
    position: relative;
}
.fenge{
    max-width: 1000px;
    margin-left:100px;
    margin-right:100px;
}
.details-img{
    width:300px;
    height:400px;
    margin-left:60px;
}
.details-right{
    display: inline-block;
}
.details-name{
    margin-left:50px;
    height: 20px;
    font-size: 20px;
    position: absolute;
    font-weight: 600;
    top:0px;
}
.details-price{
    position: absolute;
    top:70px;
    margin-left:50px;
    height: 20px;
    font-size: 18px;
}
.details-yunfei{
    position: absolute;
    top:130px;
    margin-left:50px;
    height: 20px;
    font-size: 18px;
}
.details-jinghan{
    position: absolute;
    top:180px;
    margin-left:50px;
    height: 20px;
    font-size: 18px;
}
.details-yuexiao{
    position: absolute;
    top:240px;
    margin-left:50px;
    height: 20px;
    font-size: 18px;
}
.details-count{
    position: absolute;
    top:300px;
    margin-left:50px;
    height: 20px;
    font-size: 18px;
}
.details-buttons{
     position: absolute;
    top:360px;
    margin-left:50px;
    height: 20px;
    font-size: 18px;
}
.button{
    margin-right:30px;
}
</style>
