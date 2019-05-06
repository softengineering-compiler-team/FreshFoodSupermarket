<template>
    <div>
        <Top></Top>
        <Tabs class="tabs" value="name1">
                <TabPane label="修改密码" name="name1"></TabPane>
        </Tabs>
        <div class="reset-body">
            <div class="reset-body-center">
            新密码：<Input type="password" class="reset-body-content" v-model="newpass" style="width:300px;"/>
            <Button @click="submitpass" class="reset-body-content block" type="primary">确认</Button>
            </div>
        </div>
        
    </div>
</template>

<script>
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
export default {
    data () {
        return {
            newpass:'',
            token:'',
        }
    },
    methods:{
        submitpass(){
            if(this.newpass!=''){
                let data = {
                    password:this.newpass,
                    token:this.token
                }
                this.axios
                .post(this.serverUrl+'/reset',this.qs.stringify(data),this.headconfig)
                .then(res => {
                    console.log(res.data);
                    if(res.data.code==0){
                        this.$Message.success('修改成功，请重新登录');
                        this.$router.push({
                            name:'Login',
                            params:{
                            id:true
                            }
                        })
                    }
                    else{
                        this.$Message.error('修改失败，请重试');
                    }
                })
                .catch(error => {
                    this.$Message.error('修改失败，请重试');
                    console.log(error)
                    // this.errored = true
                })
            }
            else{
                this.$Message.error('密码不可为空')
            }
        }
    },
    created:function(){
        if(this.$route.query.token)
        {
            this.token = this.$route.query.token
        }
    },
    components:{
        Top
    }
}
</script>

<style>
.tabs{
    margin-left:10%;
    margin-right: 10%;
}
.reset-body{
    margin-left:35%;
    margin-right:35%;
    text-align: center;
    /* width: 400px; */
    font-size: 16px;
}
.reset-body-content{
    margin-top:20px;
    margin-bottom:20px;
    display: inline-block;
    
}
.reset-body-center{
    width: 400px;
    position: relative;
    box-shadow: 0px 0px 10px rgb(220, 220, 220);
}
</style>
