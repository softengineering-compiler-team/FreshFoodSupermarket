import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//初始化数据
const state = {
  count: 0
};
var vuexStore = new Vuex.Store({
  username:''
});
// 使用 export default 封装，让外部可以访问
export default vuexStore;