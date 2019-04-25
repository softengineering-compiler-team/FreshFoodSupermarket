<template>
    <div>
        <div>
            <img @click="fruit" class="cimg" src="../assets/default.png">
            <img @click="vegetables" class="cimg" src="../assets/default.png">
            <img @click="seafood" class="cimg" src="../assets/default.png">
            <img @click="meat" class="cimg" src="../assets/default.png">
            <img @click="dairy_products" class="cimg" src="../assets/default.png">
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
    fruit () {
      this.$router.push('fruit')//原goods
    },
    vegetables() {
      this.$router.push('vegetables')
    },
    seafood () {
      this.$router.push('seafood')
    },
    meat () {
      this.$router.push('meat')
    },
    dairy_products () {
      this.$router.push('dairy_products')
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
    cursor:pointer;
}
.c-intro{
    font-size: 20px;
    margin:50px;
    cursor:pointer;
}
</style>
