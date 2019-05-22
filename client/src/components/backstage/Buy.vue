<template>
    <div>
        <div class="buy-input-content">
          一键输入：<InputNumber :min="1" :max="100" @on-change="changenum" class="buy-input" v-model="allnum"/>
        </div>
        <Table border ref="selection" :columns="columns4" :data="data"></Table>
        <div class="buy-bottom">
            <Button @click="buygoods" size="large" class="button" type="default" icon="md-cart">下单</Button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      allnum:10,
      columns4: [
        {
          title: "生鲜分类",
          key: "subtype"
        },
        {
          title: "生鲜名称",
          key: "goodsName"
        },
        {
          title: "单价(斤)",
          key: "cost"
        },
        {
            title: '需求量',
            key: 'num',
            align: 'center',
            render: (h, params) => {
                return h('Input', {
                    props: {
                        type: 'text',
                        value: this.data[params.index].num,
                    },
                     on:{
                          'on-blur':(event) => {
                              this.data[params.index].num = event.target.value;
                          }
                      },
                });
            },
        },
      ],
      data: [
      ]
    };
  },
  methods: {
    changenum(num){
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].num=num
        this.data.push('1')
        this.data.splice(this.data.length-1,1)
        console.log(1);
        
      }
    },
    buygoods(){
      let data = {
        goods:[]
      }
      for (let i = 0; i < this.data.length; i++) {
        data.goods.push({
          goodsName:this.data[i].goodsName,
          num:this.data[i].num
        })
      }
      console.log(data);
      
      this.axios
      .post(this.serverUrl + `/purchase` ,this.qs.stringify(data), this.headconfig)
      .then(res => {
          if(res.data.code==0){
            this.$Message.success('采购成功');
            this.$store.state.backbuygoodsList=[]
            this.$router.push('stock')
          }
          else{
              this.$Message.error('采购失败，请稍后再试');
          }
        })
        .catch(error => {
          this.$Message.error('采购失败，请稍后再试');
          console.log(error)
          // this.errored = true
        })
    }
  },
  mounted:function(){
    this.data = this.$store.state.backbuygoodsList
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].num=this.allnum
    }
  }
};
</script>
<style>
.buy-bottom{
    float:right;
    margin-top:20px;
    margin-right: 50px;
}
.buy-input-content{
  display: inline-block;
  position: relative;
  left:75%;
}
.buy-input{
  width:200px;
}
</style>
