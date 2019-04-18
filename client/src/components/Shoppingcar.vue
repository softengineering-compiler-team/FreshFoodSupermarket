<template>
    <div>
        <Top></Top>
            <Tabs class="tabs" value="name1">
                <TabPane label="购物车" name="name1"></TabPane>
            </Tabs>
        <div class="car">
            <Checkbox
            class="checkall"
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
            <div class="imgtitle">商品信息</div>
            <div class="pricetitle">单价</div>
            <div class="counttitle">数量</div>
            <div class="subtotal">小计</div>
            <div class="deletetitle">删除</div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <div class="list" v-for="index in list" :key="index.id">
                    <Checkbox class="checkbox" :label="index.name"></Checkbox>
                    <div class="imgbox"><img class="img" :src="index.url"></div>
                    <div class="introbox"><div class="intro">{{index.intro}}</div></div>
                    <div class="pricebox"><div class="price">￥{{index.price}}</div></div>
                    <div class="countbox">
                        <div class="count">
                            <InputNumber  :min="1" :step="1" v-model="index.count"></InputNumber>
                        </div>
                    </div>
                    <div class="pricebox1"><div class="price1">￥{{price1(index.price,index.count)}}</div></div>
                    <div class="deletebox"><div class="delete"><Icon @click="icon(index.id)" class="icon" size="20" type="md-close" /></div></div>
                </div>          
            </CheckboxGroup>
            <!-- <Modal
                v-model="modal"
                title="是否删除所选商品"
                @on-ok="ok"
                @on-cancel="cancel">
                <div>删除后无法恢复</div>
            </Modal> -->
            <Modal v-model="modal"
                @on-ok="ok"
                @on-cancel="cancel"
                width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>删除后无法恢复</p>
                    <p>确认删除吗？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del">删除</Button>
                </div>
            </Modal>
        </div>
        <div class="totalbox">
            <div class="total">
                <div class="totalprice">总计：￥{{totalprice()}}</div>
                <Button @click="goorder" class="totalicon" size="large" type="warning">结算</Button>
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
      modal:false,
      indeterminate: false,
      checkAll: true,
      checkAllGroup: ['1', '2', '3'],
      deleteid:-1,
      list: [
        {
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
        },
      ]
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
            total+=this.list[key].count*this.list[key].price
        }
        console.log(total);
        return total;
    },
    goorder(){
        this.$router.push('userorder')
    }
},
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.car {
  margin-left: 150px;
  margin-right: 150px;
  font-size: 30px;
  height: auto;
  padding-left: 10px;
  margin-bottom:30px;
  background-color: rgb(252, 252, 252);
}
.tabs{
    margin-left:150px;
    margin-right: 150px;
}
.checkall{
    margin:0 0 20px 0;
    display: inline-block;
}
.list {
    height: 150px;
    border-top:1px solid rgb(240, 240, 240  );
}
.checkbox{
    float: left;
    margin:65px 0;
    height:20px;
}
.imgbox{
    width: 20%;
    text-align: center;
    height: 100%;
    margin-left:3%;
    display: inline-block;
     vertical-align:top;
}
.img{
    width: 100px;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.introbox{
    width: 15%;
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
.totalbox{
    margin-right: 150px;
    margin-left: 150px;
    height: 60px;
}
.total{
    float:right;
    margin-right:30px;
}
.totalprice{
    display: inline-block;
    font-size:16px;
}
.totalicon{
    display: inline-block;
    margin-left:30px;
}
.imgtitle{
    display: inline-block;
    width:38%;
    font-size:15px;
    text-align: center;
}
.nametitle{
    display: inline-block;
    width: 17%;
    font-size:15px;
    text-align: center;
}
.pricetitle{
    display: inline-block;
    width: 12%;
    font-size:15px;
    text-align: center;
}
.counttitle{
    display: inline-block;
    width: 12%;
    font-size:15px;
    text-align: center;
}
.subtotal{
    display: inline-block;
    width: 14%;
    font-size:15px;
    text-align: center;
}
.deletetitle{
    display: inline-block;
    width: 11%;
    font-size:15px;
    text-align: center;
}
</style>
