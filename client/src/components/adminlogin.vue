<template>
  <div class="background">
    <div class="adminlogin">
        <div class="title">叶鲜生后台管理</div>
        <Input class="block"  placeholder="用户名" style="width: 300px" />
        <Input class="block"  placeholder="密码" style="width: 300px" />
        <div class="info_l">{{info_l}}</div>
        <Button @click="adminlogin" class="block" type="primary">登陆</Button>
    </div>
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
.background{
    background-image: url('/static/adminLogin.jpg');
    background-repeat: no-repeat;
    background-color: #b8e5f8;
    background-size: cover;
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-right: 15px;
    text-align: center;
}
.adminlogin{
    text-align: center;
    margin-bottom:5%;
    margin-top:5%;
}
.title{
    margin-bottom:100px;
    font-size: 35px;
    font-weight: 600;
    padding-top:10%;
    padding-bottom:1%;
    color: rgb(0, 8, 15);
}
.block{
    display:inline-block;
    margin-bottom: 1%;
}
.info_l{
    position: relative;
    left:12%;
    bottom:5%;
}
</style>
