<template>
    <div>
        <Sigh class="sigh"></Sigh>
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <Button @click="handleSelectAll(true)">Set all selected</Button>
        <Button @click="handleSelectAll(false)">Cancel all selected</Button>
        <div class="stock-bottom">
            <Button size="large" class="button" type="primary" icon="md-cart">推荐订货</Button>
            <Button @click="sell" size="large" class="button" type="primary" icon="md-cart">一键卖出</Button>
            <Button @click="buy" size="large" class="button" type="primary" icon="md-cart">一键采购</Button>
        </div>
    </div>
</template>
<script>
import Sigh from '@/components/sigh'
export default {
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "生鲜分类",
          key: "classification"
        },
        {
          title: "生鲜名称",
          key: "name"
        },
        {
          title: "单价(斤)",
          key: "price"
        },
        {
          title: "保质期",
          key: "time"
        },
        {
          title: "库存剩余",
          key: "remaining"
        }
      ],
      data1: [
        {
          time:6
        },
        {
          time:4
        },
        {
          time:2
        },
        {
          time:2
        }
      ]
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    buy () {
      this.$router.push('buy')
    },
    sell () {
      this.$router.push('sell')
    }
  },
  components:{
      Sigh
  }
};
</script>
<style>
.stock-bottom{
    float:right;
    margin-top:20px;
}
.sigh{
    margin-bottom: 20px;
}
</style>
