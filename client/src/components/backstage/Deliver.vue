<template>
    <div>
        <div class="title">配送页面</div> 
                <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <!-- <Icon type="md-bicycle" /> -->
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
                    h('Button',[
                        h('Icon',
                            {
                                props:{
                                  type:'md-bicycle',  
                                }
                            }
                        ),
                        h('span',{
                            style:{
                                'font-size':'13px',
                            }
                        },' 已送达')
                    ],
                     {
                        props: {
                            type: 'default',
                            size: 'default'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                               
                            }
                        }
                    }, '已送达'),
                ]);
            }
        }
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
