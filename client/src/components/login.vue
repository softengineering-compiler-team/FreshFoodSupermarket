<template>
    <div>
        <div class="background">
            <div class="login" v-if="loginswitch">
                <div class="login-title">
                    <img @click="gomain" src="/static/logo.png" class="login-logo" alt="">
                </div>
                <Input @input="clearinfo_l" size="large" placeholder="账户" class="username" v-model="data.username"/>
                <Input @input="clearinfo_l" size="large" placeholder="密码" class="password" type="password" v-model="data.password"/>
                <div class="info_l">{{info_l}}</div>
                <Button @click="login" size="large" class="login-btn" type="primary">登陆</Button>
                <div class="login-href">没有账号？<a @click="goreg">注册</a></div>
            </div>

            <div class="login" v-if="!loginswitch">
                <div class="login-title">
                    <img @click="gomain" src="/static/logo.png" class="login-logo" alt="">
                </div>
                <Input @input="clearinfo_r" size="large" placeholder="账户" class="username" v-model="username_r"/>
                <Input @input="clearinfo_r" size="large" placeholder="密码" class="email" type="password" v-model="password_r"/>
                <Input @input="clearinfo_r" size="large" placeholder="确认密码" class="email" type="password" v-model="password_r2"/>
                <Input @input="clearinfo_r" size="large" placeholder="电子邮箱" class="password" v-model="email_r"/>
                <div class="info_l">{{info_r}}</div>
                <Button @click="register" size="large" class="login-btn" type="primary">注册</Button>
                <div class="login-href">已有账号？<a @click="goreg">登陆</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import store from "../store/store.js";
export default {
    store,
  data () {
    return {
        data:{
            username:'',
            password:'',
        },
        info_l:'',
        info_r:'',
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
    gomain(){
        this.$router.push('/')
    },
    //登陆
    login(){
        console.log(this.serverUrl);
        
        this.axios
      .post(this.serverUrl+'/signin', this.qs.stringify(this.data), this.headconfig)
      .then(res => {
          console.log(res);
          
        if(res.data.code==0){
             this.$Message.success(res.data.data.msg);
              this.info_l=""
            //   this.$store.state.username=this.data.username
             this.$router.push('/')
        }
        else{
            this.info_l=res.data.data.msg
        }
      })
      .catch(error => {
        this.$Message.error('登陆失败');
        console.log(error)
        // this.errored = true
      })
    },
    //注册
    register(){
        // console.log(111);
        
        if(this.password_r==this.password_r2){
            let data = {
                username:this.username_r,
                password:this.password_r,
                email:this.email_r
            }
            this.axios
            .post(this.serverUrl+'/signup', this.qs.stringify(data), this.headconfig)
            .then(res => {
                if(res.data.code==0){
                    this.$Message.success(res.data.data.msg);
                    this.info_r=""
                    this.data.username=data.username
                    this.data.password=data.password
                    setTimeout(this.login(),1000)
                    
                }
                else{
                    this.info_=res.data.data.msg
                }
            })
            .catch(error => {
                this.$Message.error('注册失败');
                console.log(error)
            })
        }
        else{
            this.info_r="两次输入的密码不一致"
        }
    },
    clearinfo_l(){
        this.info_l=""
    },
    clearinfo_r(){
        this.info_r=""
    }
  },
  created:function(){
      if(this.$route.params){
          this.loginswitch=this.$route.params.id
      }
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
    border-radius: 5%;
    opacity: 0.95;
}
.login-title{
    padding-top:7%;
    padding-bottom:12%;
}
.login-logo{
    width:60%;
    cursor: pointer;
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
.login-btn{
    width: 70%;
    display: inline-block;
    margin-bottom:5%;
    margin-top:5%;
}
.login-href{
    font-size:15px;
    padding-bottom:5%;
    padding-top:1%;
}
.info_l{
    color: rgb(182, 9, 9);
    position: relative;
    left:12%;
    bottom:5%;
}
</style>
