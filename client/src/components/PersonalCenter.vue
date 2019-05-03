<template>
    <div>
        <Top></Top>
        <Tabs class="tabs" value="name1">
                <TabPane label="个人中心" name="name1"></TabPane>
        </Tabs>
        <div class="centerbody">
          <div class="centerbody-left">
            <Menu :active-name="centershow">
                  <MenuItem @click.native="personinfo" name="0">
                      修改个人信息
                  </MenuItem>
                  <MenuItem @click.native="personpass" name="1">
                      修改密码
                  </MenuItem>
            </Menu>
          </div>
          <div class="centerbody-right">
            <div v-if="centershow=='0'" class="center-info">
              <div class="center-info-title">收货地址</div>
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
              <Button @click="saveaddr" class="center-savebtn" type="primary">保存</Button>
              <div class="center-info-title">已保存地址</div>
              <Table :columns="addrtable" :data="resaddr"></Table>
            </div>
            <div v-if="centershow=='1'" class="center-pass">
              密码模块
            </div>
          </div>
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import store from "../store/store.js";
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
import { AreaCascader } from "vue-area-linkage"
import { pca, pcaa } from 'area-data';
export default {
  store,
  data () {
    return {
      centershow:'0',
      address:[],
      pcaa: pcaa,
      addrdetails:'',
      remarks:'',
      defaultaddr:false,
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
      addrtable: [
          {
              title: '收货人',
              key: 'username',
              width:100
          },
          {
              title: '所在地区',
              key: 'area',
              width:200
          },
          {
              title: '详细地址',
              key: 'street',
              width:300
          },
          {
            title:'备注',
            key:'addressname'
          },
      ],
      resaddr:[],
    }
  },
  methods: {
    personinfo(){ 
      this.centershow='0'
    },
    personpass(){
      this.centershow='1'
    },
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
    }
  },
  created:function(){
    console.log(this.$route.params);
    
    if(this.$route.params.centershow){ //如果从Top栏中的修改信息或修改密码栏进入会传参数判断
          this.centershow=this.$route.params.centershow
          console.log(2);
      }
      console.log(this.centershow);
      
    let data={
      username:this.$cookies.get("username"),
    }
    this.axios
      .get(this.serverUrl+'/query/address',{params:data},this.headconfig)
      .then(res => {
          // console.log(res.data);
        if(res.data.code==0){
            this.resaddr=res.data.data
            for (const key in this.resaddr) {
              this.resaddr[key].area = this.resaddr[key].province+' '+this.resaddr[key].city+' '+this.resaddr[key].county
            }
            // console.log(this.resaddr);
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
  },
  components :{
    Bottom,
    Top,
  }
}
</script>

<style>
.centerbody{
  margin:0 10% 0 10%;
  /* min-height:1000px; */
  min-height:500px;
}
.tabs{
    margin-left:10%;
    margin-right: 10%;
}
.centerbody-left{
    display:inline-block;
    width:27%;
}
.centerbody-right{
  display: inline-block;
  width:73%;
  float:right;
}
.ivu-menu-vertical{
  height:100%;
}
.center-info-title{
  font-size: 16px;
  width: 100%;
  margin-bottom:20px;
  /* background-color:rgb(248, 248, 248);  */
}
.center-info-subtitle{
  margin-left:3%;
  margin-bottom:10px;
  font-size: 14px;
}
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


/* area插件样式 */
.area-selectable-list .area-select-option.selected{
  color:#2d8cf0;
  font-weight: 500;
  background-color:#f0faff;
  }
.area-selectable-list .area-select-option.hover{
  background-color:#f0faff;
}
</style>
