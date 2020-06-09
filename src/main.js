import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
//import 'amfe-flexible'
import axios from 'axios'
Vue.config.productionTip = false;
Vue.prototype.axios=axios
import setAxios from './setaxios.js'
setAxios()
import  VueResource  from 'vue-resource'
Vue.use(VueResource)
import Loadmore from 'mint-ui/lib/loadmore'
Vue.component(Loadmore.name, Loadmore)
import Mint from 'mint-ui'; 
Vue.use(Mint); 
import $ from 'jquery'
import 'c-swipe/dist/swipe.css';
import { Swipe, SwipeItem } from 'c-swipe';
// 全局注册组件
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);
import wcView from 'wc-view';
import 'wc-view/style.css';
 

Vue.use(wcView);
router.beforeEach((to,from,next)=>{
	store.commit('settoken',localStorage.getItem('token'))
	if(to.meta.requireAuth){
		if(store.state.token){
			next()
		}else{
			next({
				path:'/Login',
				query:{redirect:to.fullPath}
			})
		}
	}
	else{
		next()
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
