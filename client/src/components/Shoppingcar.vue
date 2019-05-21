<template>
    <div>
        <Top></Top>
            <Tabs class="tabs" value="name1">
                <TabPane label="购物车" name="name1"></TabPane>
            </Tabs>
        <div class="car" v-if="listshow">
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
                <div class="list" v-for="(goods,index) in list" :key="index">
                    <Checkbox class="checkbox" :label="index"></Checkbox>
                    <div class="imgbox"><img class="img" :src="'/static/goodsimg/'+goods.goodsName+'.jpg'"></div>
                    <div class="introbox"><div class="intro">{{goods.goodsName}}</div></div>
                    <div class="pricebox"><div class="price">￥{{goods.price}}</div></div>
                    <div class="countbox">
                        <div class="count">
                            <InputNumber :on-change="numchange(index)" :min="1" :step="1" v-model="goods.num"></InputNumber>
                        </div>
                    </div>
                    <div class="pricebox1"><div class="price1">￥{{goods.subtotal}}</div></div>
                    <div class="deletebox"><div class="delete"><Icon @click="icon(index)" class="icon" size="20" type="md-close" /></div></div>
                </div>          
            </CheckboxGroup>
            <!-- <Modal
                v-model="modal"
                title="是否删除所选商品"
                @on-ok="ok"
                @on-cancel="cancel">
                <div>删除后无法恢复</div>
            </Modal> -->
            <Modal v-model="modal2"
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
        <div v-if="listshow" class="totalbox">
            <div class="total">
                <div class="totalprice">总计：￥{{totalprice()}}</div>
                <Button @click="settleaccount" class="totalicon" size="large" type="warning">结算</Button>
            </div>
        </div>
        <div v-if="!listshow" class="nolist">这里空空如也，快去买买买吧</div>
        <Modal v-model="modal"
                width="600"
                style="z-index:1001">
                <p slot="header" style="color:#f60;text-align:center;">
                    <Icon type="ios-information-circle"></Icon>
                    <span>地址确认</span>
                </p>
                <div class="modal-body">
                    <div class="modal-body-content1">
                        当前地址：{{currentaddr}}
                        <a @click="changeaddrbtn">修改地址</a>
                        <a @click="addaddrbtn">新增地址</a>
                    </div>
                    <div v-if="showaddr" class="modal-body-change-body">
                        <Table :columns="addrtable" :data="resaddr"></Table>
                    </div>
                </div>
                <div slot="footer">
                    <Button type="primary" size="large" @click="buyaffirm">确认购买</Button>
                </div>
                <Modal v-model="modal1"
                width="600"
                style="z-index:1002;">
                    <p slot="header" style="color:#f60;text-align:center;">
                    <Icon type="ios-information-circle"></Icon>
                    <span>添加地址</span>
                    </p>
                    <div>
                        <div class="center-info-subtitle">地址信息*</div>
                         <div class="center-info-info">
                            <area-select :level='2' type='text' v-model='address' :data="pcaa"></area-select>
                        </div>
                        <div class="center-info-subtitle">详细地址*</div>
                        <div class="center-info-detail">
                            <Input v-model="addrdetails" class="center-info-detail-input"/>
                        </div>
                        <div class="center-info-subtitle">备注</div>
                        <div class="center-info-remarks">
                            <Select size="large" v-model="remarks" style="width:200px">
                                <Option v-for="item in remarksList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <Checkbox class="center-info-default" v-model="defaultaddr">默认地址</Checkbox>
                    </div>
                    <div slot="footer">
                    <Button @click="saveaddr" type="primary" size="large">确认添加</Button>
                    </div>
                </Modal>
            </Modal>
        <bottom></bottom>
    </div>
</template>
<script>
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
import { AreaCascader } from "vue-area-linkage"
import { pca, pcaa } from 'area-data';
export default {
  data () {
    return {
      modal:false,
      modal1:false,
      modal2:false,
      currentaddr:'',
      indeterminate: false,
      checkAll: true,
      listshow:true,
      checkAllGroup: [],
      deleteid:-1,
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
      resaddr:[
                {
                    area:'',
                    street:''
                }
            ],
            // currentaddr:'',
            showaddr:false,
            addrtable: [
          {
              title: '所在地区',
              key: 'area',
              width:150
          },
          {
              title: '详细地址',
              key: 'street',
              width:200
          },
          {
              title:'操作',
              key:'action',
              render: (h, params) => {
                return h('div', [
                    h('a', {
                    style: {
                        // 样式
                    },
                    on: {
                        click: () => {
                            this.changeaddr(params.index)
                        }
                    }
                    },'设为当前地址')
                ])
              }
          }
      ],
      address:[],
      pcaa: pcaa,
      addrdetails:'',
      remarksList: [
          {
              value: '学校',
              label: '学校'
          },
          {
              value: '家',
              label: '家'
          },
          {
              value: '单位',
              label: '单位'
          },
      ],
      remarks:'',
      defaultaddr:'',
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
          this.checkAllGroup = [];
          for (let i=0;i<this.list.length ;i++) {
              this.checkAllGroup.push(i)
          }
        //   console.log(this.checkAllGroup);
          
        } else {
          this.checkAllGroup = [];
        }
    },
    checkAllGroupChange (data) {
        if (data.length === this.list.length) {
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
    numchange(index){
        this.list[index].subtotal = this.list[index].num*this.list[index].price
    },
     ok () {
         
    },
    cancel () {

    },
    del (){
        this.list.splice(this.deleteid,1);
        this.modal2=false;
    },
    icon (id){
        this.modal2=true;
        this.deleteid=id;
        // console.log(this.deleteid);
    },
    totalprice (){
        let total=0;
        for (let i =0;i<this.checkAllGroup.length;i++) { 
            let j = this.checkAllGroup[i]   
            console.log(j);
                     
            total+=this.list[j].subtotal
        }
        // console.log(total);
        return total;
    },
    changeaddrbtn(){
       this.showaddr=true 
    },
    changeaddr(index){
        this.currentaddr = this.resaddr[index].area+' '+this.resaddr[index].street
    },
    addaddrbtn(){
        this.modal1 = true
    },
    //
    saveaddr(){
      let isdefault
      if(this.defaultaddr){
        isdefault=1
      }
      else{
        isdefault=0
      }
      let data = {
        username:this.$cookies.get("username"),
        province:this.address[0],
        city:this.address[1],
        county:this.address[2],
        street:this.addrdetails,
        addressname:this.remarks,
        default:isdefault,
      }
      // console.log(data);
      if(!data.province||!data.city||!data.county||!data.street){
        this.$Message.error("地址或详细地址未填");
      }
      else{
         this.axios
      .post(this.serverUrl+'/address',this.qs.stringify(data), this.headconfig)
      .then(res => {
          // console.log(res);
        if(res.data.code==0){
            this.$Message.success(res.data.data.msg);
            let key = this.resaddr.length
            this.resaddr.push(data)
            this.resaddr[key].area = this.resaddr[key].province+' '+this.resaddr[key].city+' '+this.resaddr[key].county
            this.modal1 = false
            this.currentaddr = this.resaddr[key].area+' '+this.resaddr[0].street
        }
        else{
            this.$Message.error(res.data.data.msg);
        }
      })
      .catch(error => {
        this.$Message.error('保存失败');
        console.log(error)
        // this.errored = true
      })
      }
  },
  settleaccount(){
    if(this.checkAllGroup.length==0){
            this.$Message.error('未选择任何商品')
        }
    else{
        let data={
      username:this.$cookies.get("username"),
    }
    this.axios
      .get(this.serverUrl+'/query/address',{params:data},this.headconfig)
      .then(res => {
          // console.log(res.data);
        if(res.data.code==0){
            this.resaddr=res.data.data
            console.log(this.resaddr);
            
            if(this.resaddr.length!=0){
            for (const key in this.resaddr) {
              this.resaddr[key].area = this.resaddr[key].province+' '+this.resaddr[key].city+' '+this.resaddr[key].county
            }
            // console.log(this.resaddr);
            this.currentaddr = this.resaddr[0].area+' '+this.resaddr[0].street
            }
        }
        else{
            this.$Message.error('获取地址信息失败');
        }
      })
      .catch(error => {
        this.$Message.error('获取信息失败');
        console.log(error)
        // this.errored = true
      })
        this.modal=true
    }
    },
    buyaffirm(){
        // console.log(this.list);
        let data = {
            goods:[]
        }
        if(this.currentaddr){
            for(let i = 0;i<this.checkAllGroup.length;i++)
            {
                let j = this.checkAllGroup[i]
                data.goods.push(this.list[j])
            }
            for(let k = 0;k<data.goods.length;k++){
                data.goods[k].username = this.$cookies.get('username')
                data.goods[k].address = this.currentaddr
            }
            console.log(data);
            
            this.axios
            .post(this.serverUrl+'/buy',this.qs.stringify(data), this.headconfig)
            .then(res => {
                // console.log(res);
                if(res.data.code==0){
                    this.$Message.success('购买成功，请查看订单');
                    this.modal=false
                    this.$store.state.goodsList=null
                    this.$router.push('userorder')
                }
                else{
                    this.$Message.error('购买失败，请稍后重试');
                }
            })
            .catch(error => {
                this.$Message.error('购买失败，请稍后重试');
                console.log(error)
                // this.errored = true
            }) 
        }
        else{
            this.$Message.error('地址未填写')
        }
        
    }
  },
  created:function(){
    if(this.$store.state.goodsList){
        this.list = this.$store.state.goodsList
        for (let i=0;i<this.list.length ;i++) {
            this.checkAllGroup.push(i)
        }
    }
    else{
        this.listshow = false
    }
  },
  beforeDestroy:function(){
    
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
.nolist{
    font-size:30px;
    color:rgb(200, 200, 200);
    font-weight: 700;
    letter-spacing:10px;
    margin-left:10%;
    margin-right:10%;
    padding-top:100px;
    text-align: center;
    min-height: 350px;
}

/* 详情页复制 */
.modal-body{
    margin-left:5%;
    margin-right:5%;
}
.modal-body-title{
    font-size:15px;
}
.modal-body-content1{
    margin-left:5%;
    margin-top:10px;
    font-size:16px;
}
.modal-body-change-body{

}


/* 个人中心样式复制 */
.center-info-info{
  margin-bottom:10px;
  margin-left:5%;
}
.center-info-detail{
  margin-bottom:10px;
  margin-left:6%;
}
.center-info-detail-input{
  width:75%;
  /* margin-left:5%; */
}
.center-info-remarks{
  margin-bottom:10px;
  margin-left:6%;
}
.center-info-remarks-input{
  width: 30%;
}
.center-info-default{
  font-size: 14px;
  margin-top:10px;
  margin-left:6%;
  display: block;
  width: 80px;
}
.center-savebtn{
  margin-top:10px;
  margin-left:3%;
  width: 70px;
  margin-bottom:20px;
}
</style>
