<template>
    <div>
        
        <Tabs value="name1">
            <TabPane label="销售额" name="name1">
                <div class="selling-top">
                    <div class="selling-title">日销售</div>
                    <div class="daysellchart">
                        <Sale :type="'day'" />
                    </div>
                </div>
                <div class="middle">
                    <div class="selling-title">周销售</div>
                    <div class="daysellchart">
                        <Sale :type="'week'" />
                    </div>
                </div>
                <div class="selling-bottom">
                    <div class="selling-title">月销售</div>
                    <div class="daysellchart">
                        <Sale :type="'month'" />
                    </div>
                </div>
            </TabPane>
            <TabPane label="盈利额" name="name2">
                <div class="selling-top">
                    <div class="selling-title">日盈利</div>
                    <div class="daysellchart">
                        <Profit :type="'day'" />
                    </div>
                    <!-- <vue-chart type="bar" :data="chartData"></vue-chart> -->
                </div>
                <div class="middle">
                    <div class="selling-title">周盈利</div>
                    <div class="daysellchart">
                        <Profit :type="'week'" />
                    </div>
                </div>
                <div class="selling-bottom">
                    <div class="selling-title">月盈利</div>
                    <div class="daysellchart">
                        <Profit :type="'month'" />
                    </div>
                </div>
            </TabPane>
            <TabPane label="商品热度" name="name3">
                <div class="selling-top">
                    <div class="selling-title">日热度</div>
                    <!-- <vue-chart type="bar" :data="chartData"></vue-chart> -->
                    <div class="daysellchart">
                        <Heat :type="'day'" />
                    </div>
                </div>
                <div class="middle">
                    <div class="selling-title">周热度</div>
                    <div class="daysellchart">
                        <Heat :type="'week'" />
                    </div>
                </div>
                <div class="selling-bottom">
                    <div class="selling-title">月热度</div>
                    <div class="daysellchart">
                        <Heat :type="'month'" />
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import Sigh from '@/components/backstage/sigh'
import Heat from '@/components/backstage/chartcomponent/heat'
import Sale from '@/components/backstage/chartcomponent/sale'
import Profit from '@/components/backstage/chartcomponent/profit'


export default {
  data (){
    return{
    }
  },
  created:function(){
  },
  components:{
      Sigh,
      Heat,
      Sale,
      Profit
  }
}
</script>
<style>
.selling-top{
    height: 500px;
    text-align: center;
}
.selling-title{
    font-size:20px;
    text-align: center;
}
.middle{
    height: 500px;
}
.selling-bottom{
    height: 500px;
}
.daysellchart{
    height:400px;
    text-align: center;
}
</style>
