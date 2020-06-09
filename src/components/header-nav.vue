<template>
		<div style="background-color:white;width: 100%;height: 50px;" >
					<div  style="position:absolute;top: 10px;width:8%;height: 30px;z-index: 2;">
						<router-link to="/" style="border-radius: 50px;font-size: 30px;" class="el-icon-s-shop" tag="button"></router-link>
					</div>
					<div style="width:80%;height:50px;position:absolute;top:10px;left:10%;">
						<div @click="open1" type="primary" slot="reference" 
						style="background-color:white;color: #000000;padding-top:5px;padding-bottom: 5px;text-align: center;"
					   v-if="address"><i class="el-icon-location-information"></i>{{address| ellipsis}}
					  </div>
					  <div  @click="open1" type="primary" slot="reference" style="background-color:white;color: #000000;
					  						padding-top:5px;padding-bottom: 5px;text-align: center;" v-else><i class="el-icon-loading"></i>正在获取地址
					  </div>
					  
					</div>	
					<div style="position: absolute;top:10px;right:0%;">
						<car-panel ></car-panel>
					</div>
					

<Dingwei ref="mychild"></Dingwei>


		</div>
		
</template>
<style>
.fade-enter,.fade-leave-to{
			opacity: 0;
		
			}
				
.fade-enter-to{
			}
.fade-enter-active{
				
				transition:2s ease;
			}
.fade-leave-active{
				transition:0.2s ease;
			}
.checkaddress{
	size: 30%;
}
</style>
<script>
import Dingwei from "../components/dingwei.vue"
	import carPanel from "@/components/car-panel"
	export default{
		filters: {
		    ellipsis (value) {
		      if (!value) return ''
		      if (value.length > 10) {
		        return value.slice(0,10) + '...'
		      }
		      return value
		    }
		  },
		data(){
			return{
				screenWidth: document.body.clientWidth,
				opencar:false,
				cityx:"杭州",
				drawer: false,
				innerDrawer: false,
				flag:false,
				p1:"浙江省",
				token:"",
					search_val:"",
					areaList:"",
					city_val:"",
					keys:[],
					c:[],
					cc:[],
					disabled:"true",
					allcities:[],
					searchList:[],
					chanceProvince:false,
					chanceCity:false
			}
		},
		watch:{
			search_val(){
				this.searchPlace()
			},
			token(){
				return this.token
			}
			
		},
		computed:{
			address(){
				return this.$store.getters.address
			},
			city:{
				get:function(){
					this.cityx= (this.$store.getters.location.addressComponent.city||
				this.$store.getters.location.addressComponent.province)
				return this.$store.getters.location.addressComponent.city||
				this.$store.getters.location.addressComponent.province
				},
				set:function(value){
					this.cityx=value
					console.log(this.cityx)
				}
				
			}
		},
		components:{carPanel,Dingwei},
		methods:{
			enter(){
				this.token=localStorage.token
				console.log(localStorage.token)
				if(this.token!=null){
					this.opencar=true
					this.token=this.token
				}
			},
			open1() {
				this.$refs.mychild.drawer=true
				if(this.flag==false){
					const h = this.$createElement;
			        this.$notify({
			          title: '数据加载中',
			          message: h('i', { style: 'color: teal'}, '可能需要一段时间，请稍等...')
			        });
				}
			        
			      },

			
			
			// searchCity(){
			// AMap.plugin('AMap.DistrictSearch', function () {
			//   var districtSearch = new AMap.DistrictSearch({
			//     // 关键字对应的行政区级别，country表示国家
			//     level: 'country',
			//     //  显示下级行政区级数，1表示返回下一级行政区
			//     subdistrict: 1
			//   })
			  
			//   // 搜索所有省/直辖市信息
			//   districtSearch.search('中国', function(status, result) {
			//     // 查询成功时，result即为对应的行政区信息
			//   })
			// })	
			// },
			phone(){
				const h = this.$createElement;
				this.$notify({
				          title: '手机访问',
				          dangerouslyUseHTMLString: true,
				          message: '<i class="el-icon-camera" style="color:green">请使用手机扫描下面二维码</i><img src="https://i.loli.net/2020/03/27/XU2Y1ZsSW8ebPjn.png" >',
						  offset: 100
				        });
			},
			exit(){
				this.$store.commit('settoken','')
				localStorage.removeItem('token')
				this.$router.push({
					path:'/Login'
				})
				this.$message({
				          message: '已跳转到登录页面',
				          type: 'success'
				        });
						
			},
			
		},
		mounted(){
			this.enter()
		}
	}
</script>