<template>
    <div>
        <div v-if="listshow" class="box">
            <div class="list" v-for="(goods,index) in list" :key="index">
                <div class="imgbox"><img class="img" :src="'/static/goodsimg/'+goods.goodsName+'.jpg'"></div>
                <div class="introbox"><div class="intro">{{goods.goodsName}}</div></div>
                <div class="countbox">
                        <div class="count">
                            {{goods.num}}
                        </div>
                </div> 
                <div class="pricebox1"><div class="price1">￥{{goods.subtotal}}</div></div>
            </div>
            <div class="totalbox1">
            <div class="total1">
                <div class="totalprice1">总计：￥{{totalprice()}}</div>
                <Button @click="shoppingcar" class="totalicon1" size="small" type="warning">查看详情</Button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      modal:false,
      indeterminate: false,
      checkAll: true,
      checkAllGroup: ['1', '2', '3'],
      deleteid:-1,
      listshow:true,
     list: [
        {
          url:"/static/default.png",
          num:2,
          price:200,
          goodsName:"介绍介绍介绍介绍介绍介绍介绍介绍",
          subtotal:0
        },
        {
          url:"/static/default.png",
          num:1,
          price:100,
          goodsName:"介绍介绍介绍介绍介绍介绍介绍介绍",
          subtotal:0
        },
        {
          url:"/static/default.png",
          num:1,
          price:50,
          goodsName:"介绍介绍介绍介绍介绍介绍介绍介绍",
          subtotal:0
        },
      ],
    }
  },
  computed: {
  },
  methods: {
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
        if (this.checkAll) {
          this.checkAllGroup = ['1', '2', '3'];
        } else {
          this.checkAllGroup = [];
        }
    },
    checkAllGroupChange (data) {
        if (data.length === 3) {
            this.indeterminate = false;
            this.checkAll = true;
        } else if (data.length > 0) {
            this.indeterminate = true;
            this.checkAll = false;
        } else {
            this.indeterminate = false;
            this.checkAll = false;
        }
    },
    price1 (a,b){
        return a*b;
    },
     ok () {
         
    },
    cancel () {

    },
    del (){
        this.list.splice(this.deleteid,1);
        this.modal=false;
    },
    icon (id){
        this.modal=true;
        this.deleteid=id;
        console.log(this.deleteid);
    },
    totalprice (){
        let total=0;
        for (const key in this.list) {
            total+=this.list[key].subtotal
        }
        console.log(total);
        return total;
    },
    shoppingcar () {
      this.$router.push('shoppingcar')
    }
},
    created:function(){
        if(this.$store.state.goodsList){
            this.list = this.$store.state.goodsList
        }
        else{
            this.listshow = false
        }
    }
}
</script>

<style scoped>
.box{
    width: 300px;
    height: auto;
    background: rgb(252, 252, 252);
    opacity: 0.95;
    border-radius: 20px;
}
.list {
    height: 80px;
    border-top:1px solid rgb(240, 240, 240  );
}
.checkbox{
    float: left;
    margin:65px 0;
    height:20px;
}
.imgbox{
    width: 30%;
    text-align: center;
    height: 100%;
    margin-left:3%;
    display: inline-block;
     vertical-align:top;
}
.img{
    width: 40px;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.introbox{
    width: 25%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.intro{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.pricebox{
    width: 12%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.price{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.countbox{
    width: 12%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.count{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.pricebox1{
    width: 12%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.price1{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.deletebox{
    width: 12%;
    text-align: center;
    height: 100%;
    margin-left:1%;
    display: inline-block;
     vertical-align:top;
}
.delete{
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.icon{
    cursor: pointer;
}
.totalbox1{
    height: 35px;
}
.total1{
    float:right;
    margin-right:30px;
}
.totalprice1{
    display: inline-block;
    font-size:16px;
}
.totalicon1{
    display: inline-block;
    margin-left:30px;
}
</style>
