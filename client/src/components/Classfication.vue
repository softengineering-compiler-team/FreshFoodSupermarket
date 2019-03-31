<template>
    <div>
        <div>
            <img @click="hreftwo" class="cimg" src="../assets/default.png">
            <img class="cimg" src="../assets/default.png">
            <img class="cimg" src="../assets/default.png">
            <img class="cimg" src="../assets/default.png">
            <img class="cimg" src="../assets/default.png">
        </div>
        <div>
            <span class="c-intro">新鲜水果</span>
            <span class="c-intro">时令蔬菜</span>
            <span class="c-intro">海鲜水产</span>
            <span class="c-intro">肉禽蛋品</span>
            <span class="c-intro">乳品烘培</span>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    hreftwo () {
      this.$router.push('goods')
    }
  }
}
</script>
<style>
.cimg{
    width: 100px;
    height:100px;
    margin:40px;
    border-radius: 50%;
}
.c-intro{
    font-size: 20px;
    margin:50px;
}
</style>
