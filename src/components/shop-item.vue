<template>
  <div class="item" style="height: 120px;padding-bottom:5px;background-color: white;" >
    <div style="height:120px;position:relative;">
	<div  style="width: 60px;height: 55px;position: absolute;left: 10px;top:0px;background-color:rgba(0,0,0,0.6);border-radius: 2px;z-index: 10;"> 
				<div  style="width:55px;height: 35px;border-bottom: 1px white solid;margin: 0 auto;" v-if="item.pingfen"><i style="color:orange;font-size: 24px;text-align: center;">{{item.pingfen}}</i>
				<i style="font-size: 12px;position: absolute;top:20px;left: 48px;color: orange;">分</i>
				</div> 
				<div  style="width:55px;height: 35px;border-bottom: 1px white solid;margin: 0 auto;" v-else><i style="color:orange;font-size: 24px;text-align: center;">NAN</i></div> 
				  <div  style="width:60px;height: 30px;margin: 0 auto;color: white;font-size:5px;text-align: center;font-size:12px;" v-if="item.renshu"><i>{{item.renshu}}条评论</i></div> 
				  <div  style="width:60px;height: 30px;margin: 0 auto;color: white;font-size:5px;text-align: center;font-size:12px;" v-else><i>暂无评论</i></div> 
	</div>
	
      <div class="item-img"  >
		  <router-link :to="{name:'Item',query:{itemId:item.sku_info[itemIndex].sku_id}}">
        <img
          :alt="item.name"
          :src="
            item.sku_info[itemIndex].ali_image +
              '?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'
          "
          style="opacity: 1;width:180px;height: 120px;border-top-right-radius: 8px;position:absolute;left: 5px;border: 2px solid  magenta;"
        /></router-link>
      </div>
      
       
      <div class="item-btns clearfix" style="position: absolute;top:1px;height: 30px;z-index: 10;left:190px">
	<router-link :to="{name:'Item',query:{itemId:item.sku_info[itemIndex].sku_id}}">
	<h6 style="font-size:15px;color: coral;">{{ item.name| ellipsis2 }}</h6>
      <h3 style="font-size:12px;color: gray;">{{ item.name_title | ellipsis}}</h3></router-link>
        <!-- <span class="item-gray-btn"
          ><router-link :to="{name:'Item',query:{itemId:item.sku_info[itemIndex].sku_id}}">查看详情 </router-link></span
        > -->
      </div>
	  <span
	    class="el-icon-sell"
	    @click="addCar(item.sku_info[itemIndex])"
	    style="position: absolute;top:0px;height: 30px;z-index: 10;left:164px;font-size: 26px;width: 26px;height: 26px;background-color: white;border-radius: 8px;color: magenta;"
	    @mouseleave="hidecarButton"
	    >
	  </span>
	  <Mmap2 v-bind:demo="item.sku_info[itemIndex]" ></Mmap2>
      <div class="item-price clearfix" style="position:absolute;top:98px;height: 22px;z-index: 10;right:2px;border-radius: 30px;border: 1px solid rgba(255,0,0,0.6);padding-left: 5px;padding-right: 5px;font-size: 12px;">
        <i>¥</i><span><i style="color: red;font-size: 15px;">{{ item.price }}</i><i style="color:#616161">/晚</i></span>
      </div>
      <div class="discount-icon"></div>
      <div class="item-cover">
        <router-link :to="{name:'Item',query:{itemId:item.sku_info[itemIndex].sku_id}}"></router-link>
		
      </div>
	 
    </div>
  </div>
</template>
<style>

</style>
<script>
import Mmap2 from "../components/map2";
export default {
	filters: {
		    ellipsis (value) {
		      if (!value) return ''
		      if (value.length > 22) {
		        return value.slice(0,22) + '...'
		      }
		      return value
		    },
			ellipsis2 (value) {
			  if (!value) return ''
			  if (value.length > 9) {
			    return value.slice(0,9) + '...'
			  }
			  return value
			}
		  },
  data() {
    return {
		
		show:false,
      itemIndex: 0,
	  token:"",

    };
  },
  props: {
    item: {
      type: Object
    }
  },
  components:{
	  Mmap2
  },
  computed: {
    ball () {
      return this.$store.state.ball
    },
  },
  watch: {
       // 如果路由有变化，会再次执行该方法
       "$route": "fenshu",
	   item(){
		   return this.item
	   }
      },
  methods: {

	 fenshu(){},
    // showcarButton() {
    //   this.$store.commit("showcar");
    // },
    hidecarButton() {
      this.$store.commit("hidecar2");
    },
    tableIndex(index) {
      this.itemIndex = index;
    },
    async addCar(dd){
		
		let add=dd.sku_id
		let bb=event
		this.token=localStorage.getItem('token')
		if(!this.token){
			this.$store.commit('settoken','')
			localStorage.removeItem('token')
			this.$router.push({
				path:'/Login'
			})
			
		}
		else{
			this.show=true
			let f=true
			const select=await this.axios.get("rng/selCar",{params:{phone:this.token.substring(3,14)}})
			for(let x=0;x<select.results.length;x++){
				if(select.results[x].sku_id==add){
					f=false
				}
			}
			if(f==false){
				this.$notify({
				          title: '收藏失败',
				          dangerouslyUseHTMLString: true,
				          message: '<strong>已经收藏过该商品</strong>',
				        });
			}
			else{
				await this.axios.get("rng/addCar",{params:{sku_id:add,phone:this.token.substring(3,14)}}).then(
					this.$store.commit('gotocar',{dd,bb})
				)
				this.$message({
				message: '房源收藏成功',
				type: 'success'
				    });
			}
			
		}
    },
  },
};
</script>

<style></style>
