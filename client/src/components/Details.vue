<template>
    <div>
        <Top></Top>
        <div class="fenge" >
            <Divider/>
        </div>
        <Breadcrumb class="menu2">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem to="/fruit">{{judgeclass()}}</BreadcrumbItem>
            <BreadcrumbItem>{{Goods.goodsName}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="details">
            <img class="details-img" :src="'/static/goodsimg/'+Goods.goodsName+'.jpg'">
            <div class="details-right">
                <div class="details-name">{{Goods.goodsName}}</div>
                <div class="details-description">"{{Goods.description}}"</div>
                <div class="details-price">价格：<span style="font-size:25px;color:red"> ￥{{Goods.price}}</span></div>
                <div class="details-jinghan">库存：{{Goods.inventory}}</div>
                <div class="details-yuexiao">月销量：{{totalchange(Goods.total)}}</div>
                <div class="details-count">数量
                    <div class="details-counts">
                            <InputNumber  :min="1" :step="1" v-model="goodscount"></InputNumber>
                    </div>
                </div>
                <div class="details-buttons">
                    <Button @click="addcart" size="large" class="button" type="warning" icon="md-cart">加入购物车</Button>
                    <Button @click="clickbuy" size="large" class="button" type="warning">立即购买</Button>
                </div>
            </div>
        </div>
        <Modal v-model="modal"
                width="600"
                style="z-index:1001">
                <p slot="header" style="color:#f60;text-align:center;">
                    <Icon type="ios-information-circle"></Icon>
                    <span>购买确认</span>
                </p>
                <div class="modal-body">
                    <div class="modal-body-title">您购买的商品信息为</div>
                    <div class="modal-body-content">商品名称：{{Goods.goodsName}}</div>
                    <div class="modal-body-content">商品数量：{{goodscount}}</div>
                    <div class="modal-body-content">总价：￥{{countprice(Goods.price,goodscount)}}</div>
                    <div class="modal-body-content">
                        地址：{{currentaddr}}
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
            Goods:'',
            goodscount:1,
            modal:false,
            modal1:false,
            imgurl:'../assets/default.png',
            resaddr:[
                {
                    area:'',
                    street:''
                }
            ],
            currentaddr:'',
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
    methods:{
    addcart () {
         let data = {
             username:'',
             goodsNo:this.Goods.goodsNo,
             goodsName:this.Goods.goodsName,
             price:this.Goods.price,
             num:this.goodscount,
             subtotal:this.countprice(this.Goods.price,this.goodscount),
             url:"/static/default.png",
             address:'',
         }
         if(!this.$store.state.goodsList){
            this.$store.state.goodsList=[]
         }
         
        if(this.$store.state.goodsList.length>0){
            for (const key in this.$store.state.goodsList) {
                if(data.goodsNo==this.$store.state.goodsList[key].goodsNo){
                    this.$store.state.goodsList[key].num+=data.num
                    this.$store.state.goodsList[key].subtotal+=this.countprice(data.price,data.num),
                    this.$Message.success('已加入购物车')
                    break;
                }
                if(key==this.$store.state.goodsList.length-1){
                    this.$store.state.goodsList.push(data)
                    this.$Message.success('已加入购物车')
                }
            }
        }
        else{
            this.$store.state.goodsList.push(data)
            this.$Message.success('已加入购物车')
        }
        console.log(this.$store.state.goodsList);
    },
    clickbuy(){
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
    },
    countprice: function(money,count) {
      return money*count
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
            this.currentaddr = this.resaddr[key].area+' '+this.resaddr[key].street
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
    //
    buyaffirm(){
        let data = {
            goods:[{
                username:this.$cookies.get("username"),
                goodsNo:this.Goods.goodsNo,
                num:this.goodscount,
                subtotal:this.countprice(this.Goods.price,this.goodscount),
                address:this.currentaddr
            }]
        }
        if (data.goods[0].address) {
            this.axios
            .post(this.serverUrl+'/buy',this.qs.stringify(data), this.headconfig)
            .then(res => {
                // console.log(res);
                if(res.data.code==0){
                    this.$Message.success('购买成功，请查看订单');
                    this.modal=false
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
            this.$Message.error('地址未填写');
        }
    },
    judgeclass(){
        let name = this.$store.state.classification
        switch (name) {
        case 'fruits':
         return '新鲜水果'
          break;
        case 'vegetables':
          return '时令蔬菜'
          break;
        case 'seafoods':
          return '海鲜水产'
          break;
        case 'meat':
          return '肉禽蛋品'
          break;
        case 'dairy':
          return '乳品烘培'
          break;
        default:
          break;
      }
    },
    totalchange(total){
        if(total){
            return total
        }
        else{
            return 0
        }
    }
  },
  created:function(){
      let name = this.$route.params.name
      if(this.$store.state.goodsName&&!name){
          name=this.$store.state.goodsName
      }
      if(name){
          this.$store.state.goodsName=name
        let data = {
            goodsName:name
        }
          this.axios
        .get(this.serverUrl+'/query',{params:data}, this.headconfig)
        .then(res => {
            if(res.data.code==0){
                console.log(res.data.data);
                this.Goods=res.data.data[0]
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
      }
  },
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.menu2{
    margin-left:10%;
    margin-right:10%;
}
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
    top:100px;
    margin-left:50px;
    height: 20px;
    font-size: 18px;
}
.details-description{
    position: absolute;
    top:45px;
    margin-left:70px;
    height: 20px;
    font-size: 16px;
    color:rgb(200, 200 , 200);
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
.details-counts{
    display: inline-block;
    margin-left:30px;
}
.button{
    margin-right:30px;
}
.modal-body{
    margin-left:5%;
    margin-right:5%;
}
.modal-body-title{
    font-size:15px;
}
.modal-body-content{
    margin-left:5%;
    margin-top:10px;
    font-size:14px;
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
