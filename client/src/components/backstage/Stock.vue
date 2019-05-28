<template>
    <div>
        <Table border @on-selection-change="handleSelectRow()" ref="selection" :columns="columns4" :data="data2"></Table>
        <div class="stock-bottom">
            <Button @click="sell" size="large" class="button" type="primary" icon="md-cart">卖出</Button>
            <Button @click="addgoods" size="large" class="button" type="primary" icon="md-add-circle">加入采购列表</Button>
            <Button @click="buy" size="large" class="button" type="primary" icon="md-cart">去采购</Button>
        </div>
        <Page @on-change="page" :total="listsize" show-elevator />
    </div>
</template>
<script>
import Sigh from "@/components/backstage/sigh";
export default {
  data() {
    return {
      listsize:1,
      listshow:1,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
          title: "到期时间",
          key: "guarantee_period"
        },
        {
          title: "库存剩余",
          key: "inventory"
        }
      ],
      data: [
      ],
      data1: [
      ],
      data2:[],
    };
  },
  methods: {
    buy() {
      this.addgoods()
      this.$router.push("buy");
    },
    sell() {
      let list = this.$refs.selection.getSelection();
      let data = {
        goods:[]
      }
      for (let i = 0; i < list.length; i++) {
        data.goods.push({
          goodsName:list[i].goodsName,
        })
      }
      // console.log(data);
      
      this.axios
      .post(this.serverUrl + `/saleall` ,this.qs.stringify(data), this.headconfig)
      .then(res => {
          if(res.data.code==0){
            this.$Message.success('卖出成功');
            for (let j = 0; j < data.goods.length; j++) {
              for (let k = 0; k < this.data2.length; k++) {
                if(this.data2[k].goodsName==data.goods[j].goodsName){
                  this.data2[k].inventory = 0
                }
              }
            }
          }
          else{
              this.$Message.error('卖出失败，请稍后再试');
          }
        })
        .catch(error => {
          this.$Message.error('卖出失败，请稍后再试');
          console.log(error)
          // this.errored = true
        })
    },
    page(index){
          this.listshow = index
          if(this.data1.length){
          // console.log(index);
          this.data2=[]
          for(let i = (index-1)*10; i < index*10; i++) {
              if (this.data1[i]) {
                  this.data2.push(this.data1[i])
              }
          }
          }
      },
    handleSelectRow(selection, index) {
      // console.log(this.$refs.selection.getSelection());
    },
    addgoods(){
      if (!this.$store.state.backbuygoodsList) {
        this.$store.state.backbuygoodsList=[]
      }
      let list = this.$refs.selection.getSelection();
      // console.log(list);
      
      for (let i = 0; i < list.length; i++) {
        if (this.$store.state.backbuygoodsList.length==0) {
          this.$store.state.backbuygoodsList.push(list[i])
        }
        else{
            for (let j = 0; j < this.$store.state.backbuygoodsList.length; j++) {
            if (list[i].goodsName==this.$store.state.backbuygoodsList[j].goodsName) {
              break
            }
            if(j==this.$store.state.backbuygoodsList.length-1){
              this.$store.state.backbuygoodsList.push(list[i])
            }
          }
        }
      }
      if(list.length>0){
        this.$Message.success('加入成功')
        console.log(this.$store.state.backbuygoodsList);
      }
    }
  },
  mounted: function() {
    this.axios
      .get(this.serverUrl + `/query/inventory` , this.headconfig)
      .then(res => {
          if(res.data.code==0){
              let respond = res.data.data[0]
              for (let j = 0; j < respond.length; j++) {
                      this.data1.push(respond[j])
              }
              for (let k = 0; k < this.data1.length; k++) {
                  this.data1[k].guarantee_period=this.$options.filters.dateformat(this.data1[k].guarantee_period)
              }
              this.listsize = this.data1.length
              for (let i = 0; i < 10; i++) {
                  if (this.data1[i]) {
                    
                    // console.log(this.data1[i]);
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
  },
  components: {
    Sigh
  }
};
</script>
<style>
.stock-bottom {
  float: right;
  margin-top: 20px;
}
.sigh {
  margin-bottom: 20px;
}
</style>
