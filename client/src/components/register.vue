<template>
    <div>
        <div class="background">
            <div class="register" v-if="loginswitch">
                <div class="register-title">
                    <img src="/static/logo.png" class="register-logo" alt="">
                </div>
                <Input size="large" placeholder="账户" class="username" v-model="data.username_r"/>
                <Input size="large" placeholder="密码" class="email" type="password" v-model="data.password_r"/>
                <Input size="large" placeholder="确认密码" class="email" type="password" v-model="data.password_r2"/>
                <Input size="large" placeholder="电子邮箱" class="password" v-model="data.email_r"/>
                <div class="info_r">{{info_r}}</div>
                <Button @click="register" size="large" class="register-btn" type="primary">注册</Button>
                <div class="register-href">已有账号？<a @click="goreg">登陆</a></div>
            </div>

            <div class="register" v-if="!loginswitch">
                <div class="register-title">
                    <img src="/static/logo.png" class="register-logo" alt="">
                </div>
                <Input size="large" placeholder="账户" class="username" v-model="username"/>
                <Input size="large" placeholder="密码" class="password" type="password" v-model="password"/>
                <div class="info_l">{{info_l}}</div>
                <Button @click="login" size="large" class="register-btn" type="primary">登陆</Button>
                <div class="register-href">没有账号？<a @click="goreg">注册</a></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
        data:{
            username_r:'',
            password_r:'',
            password_r2:'',
            email_r:'',
            
        },
        info_l:'',
        info_r:'',
        loginswitch:true, 
        username:'',
        password:'',
    }
  },
  methods:{
    goreg(){
        this.loginswitch=!this.loginswitch;
    },
    register(){
        
    },
    login(){
    let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        this.axios
      .post('http://localhost:3000/signin', this.qs.stringify(this.data), config)
      .then(res => {
        if(res.data.code==0){
             this.$Message.success('登陆成功！');
              this.info_l=""
             this.$router.push('/')
        }
        else{
            this.info_l="账户或密码错误"
        }
      })
      .catch(error => {
        this.$Message.success('登陆失败');
        console.log(error)
        // this.errored = true
      })
    }
    
  },
  mounted:function(){
    //   this.axios
    //   .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //   .then(res => {
    //     console.log(res.data.chartName)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     // this.errored = true
    //   })
    // //   .finally(() => this.loading = false)
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
.register{
    z-index: 100;
    width: 432px;
    margin: 0 auto;
    text-align: center;
    background: rgb(255, 255, 255);
    margin-top:7%;
    border-radius: 5%;
    opacity: 0.95;
}
.register-title{
    padding-top:7%;
    padding-bottom:12%;
}
.register-logo{
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
    margin-bottom:1%;
    display: inline-block;
}
.email{
    width:60%;
    margin-bottom:5%;
    display: inline-block;
}
.register-btn{
    width: 70%;
    display: inline-block;
    margin-bottom:5%;
    margin-top:5%;
}
.register-href{
    font-size:15px;
    padding-bottom:5%;
    padding-top:1%;
}
.info_l{
    color: rgb(182, 9, 9);
    position: relative;
    left:12%;
    bottom:5%;
}.info_r{
    color: rgb(182, 9, 9);
    position: relative;
    left:12%;
    bottom:5%;
}
</style>
