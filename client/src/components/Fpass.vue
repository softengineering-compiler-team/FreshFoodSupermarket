<template>
  <div>
    <Top></Top>
    <div class="fpass-main">
      <Tabs class="top-label" value="name1">
          <TabPane class="top-lebel-left" label="找回密码" name="name1">
            </TabPane>
      </Tabs>
        <Input size="large" placeholder="账户" class="fpass-input" v-model="username"/>
      <Button @click="findpass" type="primary">点击发送邮件</Button>
              <div class="center-pass-intro">
                <div class="center-pass-intro-title">步骤：</div>
                <div class="fpass-intro">
                <ul>
                  <li>输入您的用户名</li>
                  <li>点击上方按钮</li>
                  <li>成功后，会往您注册时填写的邮箱中发送一条邮件</li>
                  <li>打开邮件，进入修改密码页面</li>
                  <li>输入新密码</li>
                  <li>完成</li>
                </ul>
                </div>
              </div>
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
        username:''
    }
  },
  methods: {
    gocar (){
      this.$router.push('shoppingcar')
    },
    gomain (){
      this.$router.push('/')
    },
    admin () {
      this.$router.push('admin')
    },
    findpass(){
        let data = {
            username:this.username
        }
        this.axios
        .post(
          this.serverUrl + "/retrieve",
          this.qs.stringify(data),
          this.headconfig
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$Modal.success({
              title: "发送成功",
              content: "请进入邮箱确认邮件"
            });
          } else {
            this.$Message.error("发送失败，请稍后重试")
          }
        })
        .catch(error => {
          this.$Message.error("发送失败，请稍后重试")
        });
    }
  },
  components: {
    Bottom,
    Top
  }
}
</script>

<style>
.top-label{
  text-align: center;
}
.top-lebel-left{
}
.fpass-main{
    min-height:500px;
    margin-left:10%;
    margin-right:10%;
    text-align: center;
}
.center-pass-intro {
  margin-left: 0%;
  margin-bottom: 20px;
  font-size: 14px;
}
.center-pass-intro-title {
  margin-top: 50px;
  margin-bottom: 10px;
}
.fpass-input{
    width: 200px;
}
.fpass-intro{
    margin-left:30%;
    margin-right:30%;
}
</style>
