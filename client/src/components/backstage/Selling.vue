<template>
    <div>
        <Sigh></Sigh>
        <Tabs value="name1">
            <TabPane label="销售额" name="name1">
                <div class="selling-top">
                    <div class="title">日销售</div>
                    <vue-chart type="bar" :data="chartData"></vue-chart>
                </div>
                <div class="middle">
                    <div class="title">周销售</div>
                </div>
                <div class="selling-bottom">
                    <div class="title">月销售</div>
                </div>
            </TabPane>
            <TabPane label="盈利额" name="name2">
                <div class="selling-top">
                    <div class="title">日盈利</div>
                    <vue-chart type="bar" :data="chartData"></vue-chart>
                </div>
                <div class="middle">
                    <div class="title">周盈利</div>
                </div>
                <div class="selling-bottom">
                    <div class="title">月盈利</div>
                </div>
            </TabPane>
            <TabPane label="商品热度" name="name3">
                <div class="selling-top">
                    <div class="title">日热度</div>
                    <vue-chart type="bar" :data="chartData"></vue-chart>
                </div>
                <div class="middle">
                    <div class="title">周热度</div>
                </div>
                <div class="selling-bottom">
                    <div class="title">月热度</div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import Sigh from '@/components/backstage/sigh'
export default {
  data (){
    return{
      chartData: {
        labels: ['Item 1', 'Item 2', 'Item 3'],
        datasets: [
            {
                label: 'Component 1',
                data: [10, 20, 30]
            },
            {
                label: 'Component 2',
                data: [20, 30, 40]
            }
        ]
    }
    }
  },
  components:{
      Sigh
  }
}
</script>
<style>
.selling-top{
    height: 300px;
}
.title{
    font-size:20px;
    text-align: center;
}
.middle{
    height: 300px;
}
.selling-bottom{
    height: 300px;
}
</style>
