<template>
    <div>
        <div class="background">
            <div class="login" v-if="loginswitch">
                <div class="login-title">
                    <img src="/static/logo.png" class="login-logo" alt="">
                </div>
                <Input size="large" placeholder="账户" class="username" v-model="username"/>
                <Input size="large" placeholder="密码" class="password" type="password" v-model="password"/>
                <Button @click="login" size="large" class="login-btn" type="primary">登陆</Button>
                <div class="login-href">没有账号？<a @click="goreg">注册</a></div>
            </div>

            <div class="login" v-if="!loginswitch">
                <div class="login-title">
                    <img src="/static/logo.png" class="login-logo" alt="">
                </div>
                <Input size="large" placeholder="账户" class="username" v-model="username_r"/>
                <Input size="large" placeholder="密码" class="password" type="password" v-model="password_r"/>
                <Input size="large" placeholder="确认密码" class="password" type="password" v-model="password_r2"/>
                <Input size="large" placeholder="电子邮箱" class="username" v-model="email_r"/>
                <Button size="large" class="login-btn" type="primary">注册</Button>
                <div class="login-href">已有账号？<a @click="goreg">登陆</a></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
        username:'',
        password:'', 
        loginswitch:true, 
        username_r:'',
        password_r:'',
        password_r2:'',
        email_r:'',
    }
  },
  methods:{
    goreg(){
        this.loginswitch=!this.loginswitch;
    },
    login(){
        this.axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => {
        console.log(res.data.chartName)
      })
      .catch(error => {
        console.log(error)
        // this.errored = true
      })
    }
  },
  mounted:function(){
      this.axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => {
        console.log(res.data.chartName)
      })
      .catch(error => {
        console.log(error)
        // this.errored = true
      })
    //   .finally(() => this.loading = false)
  }
}
</script>
<style>
.background{
    background-image: url('/static/login.jpg');
    background-repeat: no-repeat;
    background-color: #b8e5f8;
    background-size: cover;
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-right: 15px;
    text-align: center;
}
.login{
    z-index: 100;
    width: 432px;
    margin: 0 auto;
    text-align: center;
    background: rgb(255, 255, 255);
    margin-top:7%;
}
.login-title{
    padding-top:7%;
    padding-bottom:12%;
}
.login-logo{
    width:60%;
}
.username{
    width:60%;
    margin-bottom:5%;
    display: inline-block;
    border-left:none;
}
.password{
    width:60%;
    margin-bottom:5%;
    display: inline-block;
}
.login-btn{
    width: 70%;
    display: inline-block;
    margin-bottom:5%;
    margin-top:5%;
}
.login-href{
    font-size:15px;
    padding-bottom:3%;
}
</style>
