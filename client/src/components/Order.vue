<template>
    <div>
        <div class="title">订单管理页面</div> 
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      columns4: [
        {
          title: "订单编号",
          key: "id"
        },
        {
          title: "生鲜名称",
          key: "name"
        },
        {
          title: "总价",
          key: "price"
        },
        {
          title: "下单时间",
          key: "ordertime"
        },
        {
          title: "下单用户",
          key: "user"
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
        {
        //   time:6
        },
        {
        //   time:4
        },
        {
        //   time:2
        },
        {
        //   time:2
        }
      ]
    };
  },
  methods: {
  }
};
</script>

<style>
.title{
    font-size: 20px;
    margin:10px;
}
</style>
