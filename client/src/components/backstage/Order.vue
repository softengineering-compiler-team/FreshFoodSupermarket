<template>
    <div>
        <div class="order-title">订单管理页面</div> 
        <Table border ref="selection" :columns="columns4" :data="data2"></Table>
        <Page @on-change="page" :total="listsize" show-elevator />
    </div>
</template>

<script>
export default {
  data() {
    return {
      listsize:1,
      columns4: [
        {
          title: "订单编号",
          key: "orderNo"
        },
        {
          title: "生鲜名称",
          key: "name"
        },
        {
          title: "总价",
          key: "total"
        },
        {
          title: "下单时间",
          key: "orderTime"
        },
        {
          title: "下单用户",
          key: "username"
        },
        {
            title:"用户地址",
            key: "address"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "操作",
          key: "operation"
        },
      ],
      data1: [
      ],
      data2:[],
    };
  },
  methods: {
    page(index){
          this.listshow = index
          if(this.data1.length){
          console.log(index);
          this.data2=[]
          for(let i = (index-1)*10; i < index*10; i++) {
              if (this.data1[i]) {
                  this.data2.push(this.data1[i])
              }
          }
          }
      }
  },
  created:function(){
      this.axios
        .get(this.serverUrl+'/query/allorder',this.headconfig)
        .then(res => {
          if(res.data.code==0){
              console.log(res.data.data);
              this.data1 = res.data.data
              for (let k = 0; k < this.data1.length; k++) {
                  this.data1[k].orderTime=this.$options.filters.dateformat(this.data1[k].orderTime)
                  if (this.data1[k].status==0) {
                      this.data1[k].status='未接单'
                  }
                  else if(this.data1[k].status==1){
                      this.data1[k].status='正在配送'
                  }
                  else{
                      this.data1[k].status='已完成'
                  }
                  this.data1[k].name=''
                  for (let l = 0; l < this.data1[k].goodsList.length; l++) {
                      this.data1[k].name += this.data1[k].goodsList[l].goodsName+'*'+this.data1[k].goodsList[l].num+','
                  }
              }
              this.listsize = this.data1.length
              for (let i = 0; i < 10; i++) {
                  if (this.data1[i]) {
                    this.data2.push(this.data1[i])
                  }
              }
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
};
</script>

<style>
.order-title{
    font-size: 20px;
    margin:20px;
    text-align: center;
}
</style>
