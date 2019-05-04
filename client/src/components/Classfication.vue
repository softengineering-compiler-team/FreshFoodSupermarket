<template>
    <div>
        <div>
            <img @click="goods('fruits')" class="cimg" src="../assets/default.png">
            <img @click="goods('vegetables')" class="cimg" src="../assets/default.png">
            <img @click="goods('seafoods')" class="cimg" src="../assets/default.png">
            <img @click="goods('meat')" class="cimg" src="../assets/default.png">
            <img @click="goods('dairy')" class="cimg" src="../assets/default.png">
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
    goods(index){
      this.$store.state.classification=index
      this.$router.push({
        name:'Fruit',
        params:{
          id:index
        }
      })
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
