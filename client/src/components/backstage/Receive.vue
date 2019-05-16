<template>
    <div>
        <div class="receive-title">接单页面</div> 
                <Table border ref="selection"  :columns="columns4" :data="data2"></Table>
                <Page @on-change="page" :total="listsize" show-elevator />
        <!-- <Icon type="md-bicycle" /> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
        listsize:1,
        listshow:1,
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
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button',
                     {
                        props: {
                            type: 'default',
                            size: 'default'
                        },
                        style: {
                            marginRight: '5px',
                            width:'80px'
                        },
                        on: {
                            click: () => {
                               this.godeliver(params.index)
                            }
                        }
                    }, 
                    [
                        h('Icon',
                            {
                                props:{
                                  type:"md-hand",  
                                },
                            }
                        ),
                        h('span',{
                            style:{
                                'font-size':'13px',
                            }
                        },' 接单'),
                        
                    ],'接单'),
                ]);
            }
        }
      ],
      data1: [
      ],
      data2: [
      ],
    };
  },
  methods: {
      godeliver (index) {
          console.log(index);
          let data = {
              orderNo:this.data2[index].orderNo
          }
          this.axios
      .post(this.serverUrl+'/takeorder', this.qs.stringify(data), this.headconfig)
      .then(res => {
        //   console.log(res);
        if(res.data.code==0){
             this.$Message.success(res.data.data.msg);
             this.data2.splice(index,1);
             this.data1.splice((this.listshow-1)*10+index,1)
            //   this.info_l=""
            //   this.$store.state.username=this.data.username
            //  this.$router.push('/')
            // this.$store.state.goodsList=null
        }
        else{
            this.$Message.error(res.data.data.msg);
        }
      })
      .catch(error => {
        this.$Message.error(res.data.data.msg);
        console.log(error)
        // this.errored = true
      })
      },
      page(index){
          this.listshow = index
          if(this.data1.length){
        //   console.log(index);
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
      let data = {
          status:0
      }
      this.axios
        .get(this.serverUrl+'/query/allorder',{params:data},this.headconfig)
        .then(res => {
          if(res.data.code==0){
            //   console.log(res.data.data);
              for (let j = 0; j < res.data.data.length; j++) {
                  if (res.data.data[j].status==0) {
                      this.data1.push(res.data.data[j])
                  }
              }
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
                  this.data2.push(this.data1[i])
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
.receive-title{
    font-size: 20px;
    margin:20px;
    text-align: center;
}
</style>
