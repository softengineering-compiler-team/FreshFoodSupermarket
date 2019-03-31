<template>
    <div class="adminlogin">
        <div class="title">叶鲜生后台管理</div>
        <Input class="block" v-model="value" placeholder="用户名" style="width: 300px" />
        <Input class="block" v-model="value" placeholder="密码" style="width: 300px" />
        <Button @click="adminlogin" class="block" type="primary">登陆</Button>
    </div>
</template>
<script>
export default {
  methods: {
    adminlogin () {
      this.$router.push('selling')
    }
  }
}
</script>
<style>
.adminlogin{
    text-align: center;
    margin-top:100px;
}
.title{
    margin-bottom:100px;
    font-size: 25px;
    font-weight: 600;
}
.block{
    display:inline-block;
    margin-bottom: 10px;
}
</style>
