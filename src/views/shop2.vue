<template>
	<div>
		<div style="position: absolute;z-index: 9999;">
		    <transition name="fade">
		      <loading v-if="isLoading"></loading>
		    </transition>
		</div>
		<div id="main"   v-on:click="hidePanel">
		 
		<div class="sku-box store-content" style="width:100%">
			<div style="width: 100%;height: 50px;border-radius: 8px;margin-bottom: 10px;">
				
				<div style="width:100%;float: left;height: 50px;background-color:white;border-radius: 8px;margin-bottom: 20px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
					<div style="left: 5%;position: absolute;font-size: 24px;top:8px" @click="hangzhou"><i class="el-icon-location-outline" style="color:coral;" ></i><i style="color:cadetblue">杭州</i></div>
					<div style="left: 20%;position: absolute;font-size: 24px;top:5px">
						<div class="block">
						    <el-date-picker
						      v-model="value"
						      type="daterange"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :default-time="['00:00:00', '23:59:59']">
						    </el-date-picker>
						  </div>
						
					</div>
					
					<!-- <div style="left: 60%;position: absolute;font-size: 16px;top:13px">
						<i style="color: rosybrown;">共{{parseFloat((value[1]-value[0])/86400000).toFixed(0)}}晚</i>
						
					</div> -->
					<div style="right: 5%;position: absolute;font-size: 16px;top:5px">
						<el-button type="warning" plain @click="find">民宿搜索</el-button>
					</div>
				</div>
				
			</div>
			
				<div style="margin-bottom: 10px;height: 30px;width: 57%;background-color: #FFFFFF;
				position: relative;top:0px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-bottom: 2px sold #EDEDED;border-radius: 3px;">
				  <div index="1" style="width:18%;height: 30px;position:relative;left: 0px;line-height:1;padding-left: 20px;
				  background-color:rgb(255,255,255,);border-radius: 3px;" @click="sort" :class="{'colo':count1>0}">综合排序</div>
				  <div index="2" style="width:18%;height: 30px;position:relative;left: 20%;line-height: 1;padding-left: 20px;top:-21px
				  background-color:rgb(255,255,255);" @click="sort2" :class="{'colo':count2>0}">评分排序</div>
				  <div index="3" style="width:21%;height: 30px;position:relative;left: 40%;line-height: 1;padding-left: 20px;top:-51px
				  background-color:rgb(255,255,255);border-radius: 3px;"  @click="sort3" v-if="price" :class="{'colo':count3>0}">价格升序<i class="el-icon-caret-top"></i></div>
				  <div index="3" style="width:21%;height: 30px;position:relative;left: 40%;line-height: 1;padding-left: 20px;top:-51px
				  background-color:rgb(255,255,255);border-radius: 3px;"  @click="sort4" v-else :class="{'colo':count3>0}">价格降序<i class="el-icon-caret-bottom
"></i></div>
				</div>
			<!-- <div class="sort-option">
				<ul class="line clear">
					<li><a href="javascript:;" class="active">综合排序</a></li>
					<li><a href="javascript:;" class="">销量排序</a></li>
					<li><a href="javascript:;" class="">价格低到高</a></li>
					<li><a href="javascript:;" class="">价格高到低</a></li>
				</ul>
			</div> -->
			<!-- <div style="width: 48%;height: 30px;border-radius: 3px;margin-bottom: 10px;background-color:#FFFFFF;
			position: absolute;top:60px;left: 26%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
			<div style="position: absolute;top:5px;height: 20px;left:8px;color: coral;">价格筛选</div>
			<div style="position: absolute;top:-4px;width: 68%;height: 20px;left: 70px;">
				<div class="block">
			    <el-slider
			      v-model="ddd"
			      range
				  tooltip-class="pice"
			      :max="1000">
			    </el-slider>
			  </div>
			</div> -->
			<!-- <div style="position: absolute;top:5px;height: 20px;left:480px;color: yellowgreen;">{{ddd[0]}}元~{{ddd[1]}}元</div> -->
			<!-- </div> -->
			
			<div style="width:45%;height: 30px;border-radius: 3px;margin-bottom: 10px;background-color:#FFFFFF;
			position: absolute;top:60px;left:58%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);z-index: 20;">
			<div style="width:20%;position:absolute;top:5px;left: 10px;color:plum" @click="panelShow=true">
				搜索
			</div>
			<div style="width:79%;position:absolute;top:-1px;left: 15%;"><el-input v-model="search" placeholder="商品编号/名字/简介" size="small" ></el-input>
			<ul>
			<li style="width:100%;background-color:white;height: 3px;border-top-right-radius: 3px;border-top-left-radius: 3px;" v-if="search">
			</li>
			 </ul>
			<ul v-for="list,index in searchData" id="myPanel" v-if="panelShow" style="box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.1);border-radius: 3px;" >
			 <li style="width:100%;background-color:white;border-bottom: 1px #EDEDED solid;" v-if="index<=5">
				 <router-link :to="{name:'Item',query:{itemId:list.sku_info[0].sku_id}}" tag="span" style="padding-left:5px;color:green" v-html="brightenKeyword(list.name, search)" ></router-link>
			<br>
				 <router-link :to="{name:'Item',query:{itemId:list.sku_info[0].sku_id}}" tag="span"style="font-size: 5px;color: #707F76;" v-html="brightenKeyword(list.name_title, search)" ></router-link>
				
			</li>
			 </ul>
			 <ul>
			 <li style="width:100%;background-color:white;border-bottom: 1px #EDEDED solid;border-bottom-right-radius: 3px;border-bottom-left-radius: 3px;" v-if="search">
			 	 <span v-html="brightenKeyword2(sd, search)" style="padding-left:2px;"></span>
			 </li>
			  </ul>
			</div>
			</div>
			
			<!-- <div class="gray-box">
				<div class="item-box">
					<shop-item v-for="item,index in goodsData" :item="item" :key="index" v-if="item.show==true&&item.price<=ddd[1]&&item.price>=ddd[0]"></shop-item>
					
				</div>
			</div> -->
		</div>
		
		<!-- <prompt></prompt> -->
	</div>
	</div>
	
</template>

<script>
import Loading from '../components/index'
	import shopItem from "../components/shop-item"
	import prompt from "../components/prompt"
	
	function sortBykey(ary, key) {
	  return ary.sort(function (a, b) {
	    let x = a[key]
	    let y = b[key]
	    return ((x > y) ? -1 : (x < y) ? 1 : 0)
	  })
	}
	function sortBykey2(ary, key) {
	  return ary.sort(function (a, b) {
	    let x = a[key]
	    let y = b[key]
	    return ((x < y) ? -1 : (x > y) ? 1 : 0)
	  })
	}
	
	export default{
		data(){
			return{
				loading: true,
				isLoading: true,
				panelShow: true,
				ddd:[200, 500],
				count1:1,
				search:'',
				count2:0,
				count3:0,
				price:true,
				activeIndex: '1',
				value: [new Date(), (new Date()).getTime()+24*60*60*1000],
				goodsData:[],
					  mmp:[]
			}
		},
		watch:{
			value(){
				// this.find()
				
			},
			goodsData:{
				handler(val) {
				      this.goodsData=val
				    },
				deep: true,
			},
			ddd:{
				handler(val) {
				      this.ddd=val
				    },
				deep: true,
			},
		},
		computed: {
			sd(){
				return '搜索更多关于'+this.search+'的内容'
			},
			searchData: function(event) {
			this.panelShow=true
			if(this.search.length>0){
				var search = this.search;
			   
			 if (search) {
			 return this.goodsData.filter(function(product) {
				
			 return Object.keys(product).some(function(key) {
			 return String(product[key]).toLowerCase().indexOf(search) > -1
			 })
			 })
			 }
			 return this.goodsData;
			}
			 
			 },
		    sortgoodsData: function () {
		      return sortBykey(this.goodsData, 'pingfen')
		    },
			sortgoods: function () {
		      return sortBykey(this.goodsData, 'id')
		    },
			sortgoodsup: function () {
			  return sortBykey(this.goodsData, 'price')
			},
			sortgoodsdown: function () {
			  return sortBykey2(this.goodsData, 'price')
			},
		  },
		components:{
			Loading,
			shopItem,
			prompt
		},
		methods: {
			 loadPageData: function() {
			        this.isLoading = false
			    },
			brightenKeyword(val, keyword) {
			   val = val + '';
			   if (val.indexOf(keyword) !== -1 && keyword !== '') {
			        return val.replace(keyword, '<font color="plum">' + keyword + '</font>')
			   } else {
			      return val
			    }
			},
			brightenKeyword2(val, keyword) {
			   val = val + '';
			   if (val.indexOf(keyword) !== -1 && keyword !== '') {
			        return val.replace(keyword, '<font color="red">' + keyword + '</font>')
			   } else {
			      return val
			    }
			},
			hidePanel: function(event){
			
			var sp = document.getElementById("myPanel");
			
			if(sp){
			
			if(!sp.contains(event.target)){            //这句是说如果我们点击到了id为myPanel以外的区域
			
			this.panelShow = false;
			
			}
			
			}
			
			},
			sort(){
				this.sortgoods
				this.count1=1
				this.count2=0
				this.count3=0
			},
			sort2(){
				this.sortgoodsData
				this.count1=0
				this.count2=1
				this.count3=0
			},
			sort3(){
				this.sortgoodsup
				this.count1=0
				this.count2=0
				this.count3=1
				this.price=false
			},
			sort4(){
				this.count1=0
				this.count2=0
				this.count3=1
				this.sortgoodsdown
				this.price=true
			},
			async find(){
				const select=await this.axios.get('rng/getday')
				let day=select.results
				//console.log(this.value[0].getTime())
					// console.log(new Date(day[x].day).getTime())
				for(let y=0;y<this.goodsData.length;y++){
					this.goodsData[y].show=true
					for(let x=0;x<day.length;x++){
						if(this.goodsData[y].id==String(day[x].sku_id).substring(0,7)){
							if(new Date(day[x].day).getTime()>=new Date(this.value[0]).getTime()&&new Date(day[x].day).getTime()<=new Date(this.value[1]).getTime()){
								this.goodsData[y].show=false
								
							}
						}
					}
				}
				this.sortgoodsdown
				this.sortgoods	
				
			// this.$router.push({
			// 	path:'/Find',
			// 	query:{
			// 		goodsData:this.goodsData
			// 	}
			// })
				
			},
			hangzhou(){
				this.$message({
				          message: 'Sorry,当前仅支持杭州市',
				          type: 'warning'
				        });
			},
			async token(){
				const ree=await this.axios.get('rng/goodsData')
				const fee=await this.axios.get('rng/sku_info')
				const ddd=await this.axios.get('rng/fenshu')
				let www=ddd.results
						this.goodsData=ree.results
						this.sku_info=fee.results
				
					for(let x=0;x<this.goodsData.length;x++){
						let ssr=[]
						this.goodsData[x].show=true
						this.goodsData[x].sou=false
					for(let y=0;y<this.sku_info.length;y++){
						let str=String(this.sku_info[y].sku_id).substring(0,7)
						
						if(this.goodsData[x].id==str){
							let ssb=[]
							// console.log(this.goodsData[x])
							// console.log(this.numberValidateForm)
							ssb=ssb.concat(this.sku_info[y].image)
							ssb=ssb.concat(this.sku_info[y].show_name)
							// ssd=ssd.concat(this.sku_info[y].sku_id)
							// ssd=ssd.concat(this.sku_info[y].title)
							// ssd=ssd.concat(this.sku_info[y].sub_title)
							// ssd=ssd.concat(this.sku_info[y].ali_image)
							// ssd=ssd.concat(this.sku_info[y].price)
							// ssd=ssd.concat(this.sku_info[y].limit_num)
							this.sku_info[y].spec_json=ssb
							ssr=ssr.concat(this.sku_info[y]) 
							
						}
						
					}
				this.goodsData[x].sku_info=ssr
				}
				
				for(let x=0;x<this.goodsData.length;x++){
					
					let num=0.0
						let n=0
					for(let y=0;y<www.length;y++){
						
						
						if(www[y].sku_id==this.goodsData[x].id){
							
							num+=parseInt(www[y].pingfen)
							n++
						}
						
					}
					if(num==0){
						this.goodsData[x].pingfen=0.0
					}
					else{
						this.goodsData[x].pingfen=(num/n).toFixed(2)
					}
						
						this.goodsData[x].renshu=n
				}
				console.log(this.goodsData.sort(this.goodsData.pingfen));
				// console.log( this.$store.state.token.substring(0,11))
			},
			// async fenshu(){
			// 	const select=await this.axios.get("rng/fenshu")
			// 	let fen=select.results
			
					
			// 		let num=0
			// 		let n=0	
			// 			for(let x=0;x<fen.length;x++){
							
			// 				if(fen[x].sku_id==String(this.$router.props.item.id).substring(0,7)){
			// 				num+=parseInt(fen[x].pingfen)
			// 				n++
			// 			}
			// 		}
			// 		this.mmp.pingfen=(num/n).toFixed(2)
			// 		this.mmp.ren=n
			
			// 		console.log(this.mmp)
			// }
			},
			mounted(){
				// this.fenshu()
				this.token()
				const me = this
				    // 初始化页面数据
				    me.loadPageData()
				
			}
	}
</script>


<style>
	@charset "utf-8";
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.pice{
	background-color: red;
	color: palegreen;
}
.colo{
	color: indianred;
}
	.sku-box{
	    position: relative;
	}
	.sort-option{
	    border-top: 1px solid #D8D8D8;
	    color: #999;
	}
	.sort-option ul{
	    height: 60px;
	    line-height: 60px;
	}
	.sort-option li{
	    position: relative;
	    float: left;
	    padding-left: 42px;
	}
	.sort-option li:first-child{
		padding-left: 9px;
	}
	.sort-option li:before{
		content: ' ';
	    display: block;
	    position: absolute;
	    left: 20px;
	    top: 50%;
	    width: 2px;
	    height: 2px;
	    margin-top: -1px;
	    background: #C7C7C7;
	}
	.sort-option li:first-child:before{
		display: none;
	}
	.sort-option a{
		display: block;
	    font-size: 12px;
	    color: #999;
	}
	.sort-option a.active, .sort-option a:hover{
	    color: #5683EA;
	}
	.gray-box{
		overflow: hidden;
	    background: #EDEDED;
	    border-radius: 8px;
	    border: 0px solid #dcdcdc;
	    border-color: rgba(0,0,0,.14);
	   /* box-shadow: 0 3px 8px -6px rgba(0,0,0,.1); */
	}
	.sku-box .item-box{
		clear: both;
	    overflow: hidden;
	    margin: 0 -1px -1px -1px;
	}
	.sku-box .item{
	    position: relative;
	    float: left;
	    border-right: 1px solid #efefef;
	    border-bottom: 1px solid #efefef;
	    width: 25%;
	    height: 429px;
	    background: #ffffff;
		/* background-color:rgba(0,0,0,0.9) */;
	    box-sizing: border-box
	}
	.sku-box .item:hover{
		box-shadow: 0 0 38px rgba(0,0,0,.08) inset;
	    transition: all .15s ease;
	}
	.sku-box .item .item-img img{
		display: block;
	    width: 206px;
	    height: 206px;
	    margin: 50px auto 10px;
	}
	.sku-box .item h3, .sku-box .item h6{
		overflow: hidden;
	    text-align: center;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.sku-box .item h6{
	    line-height: 1.2;
	    font-size: 16px;
	    color: #424242;
	    margin: 0 auto;
	    padding: 0 14px;
	}
	.sku-box .item h3{
		line-height: 1.2;
	    font-size: 12px;
	    color: #d0d0d0;
	    margin: 8px auto 14px;
	}
	.sku-box .item .params-colors{
		margin-top: 23px;
	    text-align: center;
	}
	.sku-box .item .colors-list{
		display: inline-block;
	    overflow: hidden;
	}
	.sku-box .item .colors-list li{
		float: left;
	    margin: 0 5px;
	}
	.sku-box .item .colors-list>li a{
		width: 8px;
	    height: 8px;
	    border: 1px solid #e5e5e5;
	    -webkit-border-radius: 50%;
	    -moz-border-radius: 50%;
	    border-radius: 50%;
	    padding: 2px;
	    display: block;
	}
	.sku-box .item .colors-list>li a.active{
	    box-shadow: inset 0 0 0 1px #b2b2b2;
	    border-color: #b2b2b2;
	}
	.sku-box .item .colors-list>li img{
	    width: inherit;
	    height: inherit;
	    border-radius: 50%;
	    display: block;
	}
	.sku-box .item .item-btns{
	    position: absolute;
	    left: 0;
	    right: 0;
	    bottom: 29px;
	    text-align: center;
	    opacity: 0;
	    z-index: 10;
	}
	.sku-box .item:hover .item-btns{
	    opacity: 1;
	    transition: all .2s ease-in;
	}
	.sku-box .item .item-btns .item-blue-btn, .sku-box .item .item-btns .item-disabled-btn, .sku-box .item .item-btns .item-gray-btn, .sku-box .item .item-btns .item-green-btn{
		display: inline-block;
	    box-sizing: border-box;
	    width: 100px;
	    height: 30px;
	    font-size: 16px;
	    line-height: 28px;
	    border-radius: 4px;
	    cursor: pointer;
	    font-weight: 200;
	    transition: all .1s ease;
	}
	.sku-box .item .item-btns .item-gray-btn{
		border: 1px solid #d5d5d5;
	    color: #646464;
	}
	.sku-box .item .item-btns .item-gray-btn a{
	    display: block;
	    color: #a1a1a1;
	}
	.sku-box .item .item-btns .item-gray-btn:hover{
		background-image: linear-gradient(#f6f6f6,#ededed);
	}
	.sku-box .item .item-btns .item-blue-btn{
		background-color: #5c85e5;
	    background-image: linear-gradient(#779ae9,#5078df);
	    border: 1px solid #5c81e3;
	    color: #fff;
	    margin-left: 10px;
	}
	.sku-box .item .item-btns .item-blue-btn:hover{
		border: 1px solid #5374c8;
	    background-color: #5074db;
	    background-image: linear-gradient(#6e8ed5,#4769c2);
	}
	.sku-box .item .item-btns .item-blue-btn:active{
		border: 1px solid #3e61d7;
	    background-color: #5c85e5;
	    background-image: linear-gradient(#4d72de,#6189e6);
	}
	.sku-box .item .item-price{
		font-family: Arial;
	    color: #c30a18;
	    margin-top: 24px;
	    text-align: center;
	    opacity: 1;
	}
	.sku-box .item .item-price i{
	    font-size: 16px;
	}
	.sku-box .item .item-price span{
		font-size: 18px;
	    padding-left: 4px;
	}
	.sku-box .item:hover .item-price{
		opacity: 0;
	    transition: all .1s ease-out;
	}
	.sku-box .item .discount-icon{
		display: none;
	}
	.sku-box .item .item-cover a{
		display: block;
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 20;
	    width: 100%;
	    height: 310px;
	}

</style>
