<template>
    <div>
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <div class="buy-bottom">
            <Button size="large" class="button" type="default" icon="md-cart">下单</Button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      columns4: [
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
          title: "需求量",
          key: "amount"
        },
        {
          title: "总价",
          key: "all-price"
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
  }
};
</script>
<style>
.buy-bottom{
    float:right;
    margin-top:20px;
    margin-right: 50px;
}
</style>
