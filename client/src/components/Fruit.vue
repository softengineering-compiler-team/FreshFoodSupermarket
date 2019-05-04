<template>
    <div>
    <Top></Top>
    <Tabs @on-click="gofruit($event)" class="main" value="name1">
        <TabPane :label="tablist[0]" name="name1"></TabPane>
        <TabPane :label="tablist[1]" name="name2"></TabPane>
        <TabPane :label="tablist[2]" name="name3"></TabPane>
        <TabPane :label="tablist[3]" name="name4"></TabPane>
        <TabPane :label="tablist[4]" name="name5"></TabPane>
        <TabPane :label="tablist[5]" name="name6"></TabPane>
        <TabPane :label="tablist[6]" name="name7"></TabPane>
    </Tabs>
    <div v-if="list" v-for="(sub,index) in list" :key="index" class="Goods" :ref="'fruit'+index">
    <div class="Name">{{tablist[index]}}</div>
        <div class="guess-goods" v-for="(goods,index1) in sub" :key="index1">
        <Card @click.native="details" class="goods-card">
            <div style="text-align:center">
                <img class="goods-img" :src="'/static/'+goodscls+'/'+tablist[index]+'_'+(index1+1)+'.jpg'">
                <div class="money">￥{{goods.price}}</div>
                <span class="inventory">库存:</span><span class="inventory">{{goods.inventory}}</span>
                <div class="goods-intro">{{goods.goodsName}}</div>
            </div>
        </Card>
        </div>
      </div>
      <div class="errorlist" v-if="!list">
        <div v-for="index1 in errorlist" :key="index1.id" class="Goods" :ref="'fruit'+index1.id">
          <div class="Name">{{index1.name}}</div>
          <div class="guess-goods" v-for="index of 5" :key="index">
          <Card @click.native="details" style="width:160px;cursor:pointer">
              <div style="text-align:center">
                  <img class="goods-img" src="../assets/default.png">
                  <div class="money">￥200</div>
                  <span>库存</span><span>12234</span>
                  <div class="goods-intro">介绍介绍
                  </div>
              </div>
          </Card>
          </div>
        </div>
      </div>
          <img @click="backtop" class="backtop" src="/static/backtop.png" alt="">
        <Bottom></Bottom>
    </div>
</template>
<script>
import Bottom from '@/components/bottom'
import Top from '@/components/Top'
export default {
  data () {
    return {
      goodscls:'',
      list: '',
      errorlist:[
        {
          id:0,
          name:'香蕉' 
        },
        {
          id:1,
          name:'苹果' 
        },
        {
          id:2,
          name:'葡萄' 
        },
        {
          id:3,
          name:'西瓜' 
        },
        {
          id:4,
          name:'梨' 
        },
        {
          id:5,
          name:'柚子' 
        },
        {
          id:6,
          name:'车厘子' 
        },
      ],
      tablist:[

      ]
    }
  },
  methods: {
    details () {
      this.$router.push('details')
    },
    gofruit($event){
      // console.log($event);
      // console.log(this.$refs.fruit0[0].offsetTop);
      // console.log(this.$refs.fruit1[0].offsetTop);
      switch ($event) {
        case "name1":
          {
            $('html,body').animate({scrollTop:this.$refs.fruit0[0].offsetTop },500)
            break; 
          }
        case "name2":
          {
            $('html,body').animate({scrollTop:this.$refs.fruit1[0].offsetTop },500)  
            break;
          }
        case "name3":
          {
            $('html,body').animate({scrollTop:this.$refs.fruit2[0].offsetTop },500)  
            break;
          }
        case "name4":
          {
            $('html,body').animate({scrollTop:this.$refs.fruit3[0].offsetTop },500) 
            break; 
          }
        case "name5":
          {
            $('html,body').animate({scrollTop:this.$refs.fruit4[0].offsetTop },500) 
            break; 
          }
        case "name6":
          {
            $('html,body').animate({scrollTop:this.$refs.fruit5[0].offsetTop },500)  
            break;
          }
        case "name7":
          {
            $('html,body').animate({scrollTop:this.$refs.fruit6[0].offsetTop },500)  
            break;
          }
      }
    },
    backtop(){
      $('html,body').animate({scrollTop:0 },500)
    },
    tabswitch(name){
      switch (name) {
        case 'fruits':
          this.tablist=['香蕉','苹果','葡萄','西瓜','梨','柚子','车厘子']
          break;
        case 'vegetables':
          this.tablist=['茄子','黄瓜','小辣椒','小白菜','大葱','毛豆','番茄']
          break;
        case 'seafoods':
          this.tablist=['生蚝','帝王蟹','乌贼','扇贝','龙虾','鱿鱼','海胆']
          break;
        case 'meat':
          this.tablist=['火鸡','牛肉','羊肉','烤鸭','鹅肉','猪肉','鸡肉']
          break;
        case 'dairy':
          this.tablist=['奶酪','奶油','奶粉','酸奶','巴氏鲜奶','炼乳','冰淇淋']
          break;
        default:
          break;
      }
    }
  },
  created:function(){
    let classification = this.$store.state.classification
    this.goodscls=classification
    console.log(classification);
    this.tabswitch(classification)
    this.axios
      .get(this.serverUrl+'/query/'+classification,this.headconfig)
      .then(res => {
        if(res.data.code==0){
             console.log(res.data.data);
             this.list=res.data.data
        }
        else{
            this.$Message.error('获取信息失败');
        }
      })
      .catch(error => {
        this.$Message.error('获取信息失败');
        console.log(error)
        // this.errored = true
      })
    },
  components: {
    Bottom,
    Top
  }
}
</script>
<style>
.main{
  margin-left:10%;
  margin-right:10%;
}
.Goods{
  text-align: center;
  margin-left:10%;
  margin-right:10%;
}
.goods-card{
  width:160px;
  cursor:pointer;
}
.Name{
  font-size:20px;
  position: relative;
  right:45%;
  margin-top:30px;
}
.goods-img {
  width: 100%;
  height: 120px;
  margin: 0px;
  margin-bottom:15px;
}

.inventory{
  font-size:11px;
}
.goods-intro {
  font-size: 15px;
  margin-top: 10px;
}
.guess-goods{
  margin:20px;
  display: inline-block;
}
.money{
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  color:red;
}
.backtop{
  position: fixed;
  top:75%;
  right:20px;
  box-shadow: 0 0 5px 5px rgb(210, 210, 210);
  font-size:16px;
  cursor: pointer;
  width: 40px;
  border-radius: 50%;
}
.errorlist{
  min-height:500px;
}
</style>
