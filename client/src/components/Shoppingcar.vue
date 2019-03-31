<template>
    <div>
        <Top></Top>
        <div class="car">
            购物车组件
        </div>
        <bottom></bottom>
    </div>
</template>
<script>
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
export default {
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.car{
    margin-left:150px;
    margin-right:150px;
    width:1000px;
    font-size:30px;
    height:200px;
    text-align: center;
    background-color: rgb(248, 248, 248);
    padding-top:80px;
}
</style>
