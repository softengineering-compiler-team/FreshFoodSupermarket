<template>
<div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                    </div>
                    <div class="layout-nav">
                        <MenuItem @click.native="selling" name="1">
                            <Icon type="ios-navigate"></Icon>
                            销售情况
                        </MenuItem>
                        <MenuItem @click.native="stock" name="2">
                            <Icon type="ios-keypad"></Icon>
                            库存
                        </MenuItem>
                        <MenuItem @click.native="buy" name="3">
                            <Icon type="ios-analytics"></Icon>
                            采购
                        </MenuItem>
                        <MenuItem @click.native="sell" name="4">
                            <Icon type="ios-paper"></Icon>
                            卖出
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
export default {
  methods: {
    selling () {
      this.$router.push('selling')
    },
    stock () {
      this.$router.push('stock')
    },
    buy () {
      this.$router.push('buy')
    },
    sell () {
      this.$router.push('sell')
    }
  }
}
</script>
<style>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
.ivu-layout-header{
    z-index: 1000;
}
</style>
