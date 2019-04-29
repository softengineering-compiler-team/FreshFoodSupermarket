<template>
    <div>
        <Top></Top>
        <Tabs class="tabs" value="name1">
                <TabPane label="个人中心" name="name1"></TabPane>
        </Tabs>
        <div class="centerbody">
          <div class="centerbody-left">
            
          </div>
          <div class="centerbody-right"></div>
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
export default {
  data () {
    return {
      showperson:false,
      show:false,
    }
  },
  methods: {
    
  },
  components :{
    Bottom,
    Top
  }
}
</script>

<style>
.centerbody{
  margin:0 5% 0 5%;
  min-height:1000px;
}
.tabs{
    margin-left:150px;
    margin-right: 150px;
}
</style>
