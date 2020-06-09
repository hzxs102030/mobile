<template>
  <div @click="ppp">
    <div style="position: absolute;z-index: 9999;">
      <transition name="fade">
        <loading v-if="isLoading"></loading>
      </transition>
    </div>
    <div id="main" v-on:click="hidePanel">
      <div
        style="width: 100%;height: 50px;border-radius: 8px;margin-bottom: 10px;"
      >
        <div
          style="width:100%;position: absolute;top:40px;height: 50px;background-color:white;margin-bottom: 20px;"
        >
		
		<div style="margin: 0 auto;font-size: 24px;top:5px;width:300px">
		
		
		
		
		<el-input v-show="edit"  style="width: 192px;float: left;"  v-model="search" placeholder="商品编号/名字/简介"></el-input>	
		
		<div style="width:192px;border-radius: 3px;margin-bottom: 10px;background-color:#FFFFFF;
					position: absolute;top:40px;box-shadow: 0 2px 12px 0 rgba(255, 0, 0, 0.2);z-index: 20;">
					<ul>
					<li style="width:100%;background-color:white;height: 3px;border-top-right-radius: 3px;border-top-left-radius: 3px;" v-if="search">
					</li>
					 </ul>
					<ul v-for="list,index in searchData" id="myPanel" v-if="panelShow" style="box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.1);border-radius: 3px;" >
					 <li style="width:100%;background-color:white;border-bottom: 1px #EDEDED solid;" v-if="index<=5">
						 <router-link :to="{name:'Item',query:{itemId:list.sku_info[0].sku_id}}"  style="font-size: 14px;padding-left:5px;color:green" v-html="brightenKeyword(list.name, search)" ></router-link>
					
						 <router-link :to="{name:'Item',query:{itemId:list.sku_info[0].sku_id}}" style="font-size: 12px;color: #707F76;" v-html="brightenKeyword(list.name_title, search)" ></router-link>
						
					</li>
					 </ul>
					 <ul>
					 <!-- <li style="width:100%;background-color:white;border-bottom: 1px #EDEDED solid;border-bottom-right-radius: 3px;border-bottom-left-radius: 3px;font-size: 12px;" v-if="search">
					 	 <span v-html="brightenKeyword2(sd, search)" style="padding-left:2px;"></span>
					 </li> -->
					  </ul>
					</div>
		
		
		<el-button style="border: 1px solid #00B7FF;float: left;" plain @click="mmd" >民宿搜索</el-button>
		
		
		<!-- <el-button type="warning" plain @click="find" style="float:right;" ><i class="el-icon-date"></i>择日入住</el-button> -->
		
			
			  
		  </div>
		 
		  
          <!-- <div style="left: 30%;position: absolute;font-size: 13px;top:16px">
						<div style="position: relative;left: 135px;">
						入住    
						</div>
						<div style="position: relative;left: 290px;top:-18px">
						离开    
						</div>
					</div> -->
          <!-- <div style="left: 60%;position: absolute;font-size: 16px;top:13px">
						<i style="color: rosybrown;">共{{parseFloat((value[1]-value[0])/86400000).toFixed(0)}}晚</i>
						
					</div> -->
          <!-- <div style="right:5%;position: absolute;font-size: 16px;top:5px">
            <el-button type="warning" plain @click="find">民宿搜索</el-button>
          </div> -->
        </div>
      </div>

      <div style="margin-bottom: 10px;height: 30px;width: 100%;background-color: #FFFFFF;
				position:absolute;top:87px;left: 0px;border-bottom: 2px sold #EDEDED;border-radius: 3px;">
				  <div index="1" style="width: 70px;height: 30px;position:absolute;left: 0px;line-height:1;padding-left: 10px;
				  background-color:rgb(255,255,255,);border-radius: 3px;" @click="sort" :class="{'colo':count1>0}">综合排序</div>
				  <div index="2" style="width: 60px;height: 30px;position:absolute;left: 70px;line-height: 1;padding-left: 10px;
				  background-color:rgb(255,255,255);" @click="sort2" :class="{'colo':count2>0}">评分排序</div>
				  <div index="3" style="width: 70px;height: 30px;position:absolute;left: 140px;line-height: 1;padding-left: 10px;
				  background-color:rgb(255,255,255);border-radius: 3px;"  @click="sort3" v-if="price" :class="{'colo':count3>0}">价格升序<i class="el-icon-caret-top"></i></div>
				  <div index="3" style="width: 70px;height: 30px;position:absolute;left: 140px;line-height: 1;padding-left: 10px;
				  background-color:rgb(255,255,255);border-radius: 3px;"  @click="sort4" v-else :class="{'colo':count3>0}">价格降序<i class="el-icon-caret-bottom
"></i></div>
<div @click="drawer = true" type="primary" style="width: 70px;height: 30px;position:absolute;right: 0px;line-height: 1;padding-left: 10px;
				  background-color:rgb(255,255,255);border-radius: 3px;color:goldenrod;">
<i class="el-icon-s-fold">更多筛选</i>
</div>
				</div>
      <!-- <div class="sort-option">
				<ul class="line clear">
					<li><a href="javascript:;" class="active">综合排序</a></li>
					<li><a href="javascript:;" class="">销量排序</a></li>
					<li><a href="javascript:;" class="">价格低到高</a></li>
					<li><a href="javascript:;" class="">价格高到低</a></li>
				</ul>
			</div> -->
     

<div>
	<el-drawer
	  
	  :visible.sync="drawer"
	  size="60%"
	  :with-header="false">
	  <div style="width:100%;overflow-x: hidden; overflow-y: auto;" :style="{'height':screenHeight}">
		 <el-collapse v-model="activeNames" >
		   <el-collapse-item  name="1">
			   <template slot="title">
			        <i class="el-icon-s-promotion"></i>目的地<div style="font-size: 14px;">
			        	      <span class="el-dropdown-link">
			        	        <i class="el-icon-location-outline" style="color:coral;" ></i><i style="color:cadetblue">{{findcity}}</i>
			        	      </span>
			        	        
			        </div>
			   </template>
		     <el-tag v-for="item,index in selectcity" :key="index" style="background-color: white;margin-left: 10px;"
			 :class="active==index ? 'activeClass' : '' " @click="change(index,item)"><i>{{item}}</i></el-tag>
		   </el-collapse-item>
		   <el-collapse-item name="5">
		     <template slot="title">
		          <i class="el-icon-link" ></i>日期选择
		     </template>
		   			<div >
		   	<el-button-group style="width:100%;height:50px;float:left;" v-if="se">
		   <el-button @click="tomeituan" plain size="small" style="padding-top: 3px;padding-bottom: 3px;width:100%;"><i style="color: rosybrown;">入住时间：{{se[0]}}</i></el-button>
		   <el-button @click="tomeituan" plain size="small" style="padding-top: 3px;padding-bottom: 3px;width:100%;"><i style="color:green;">退房时间：{{se[1]}}</i></el-button>
		   
		   </el-button-group>
		   <el-button-group style="width:100%;height:50px;float:left;" v-else>
		   <el-button @click="tomeituan" plain size="small" style="padding-top: 3px;padding-bottom: 3px;width:100%;"><i style="color: rosybrown;">入住时间：{{systemDate}}</i></el-button>
		   <el-button @click="tomeituan" plain size="small" style="padding-top: 3px;padding-bottom: 3px;width:100%;"><i style="color:green">退房时间：{{systemDate2}}</i></el-button>
		   
		   </el-button-group>
		   </div> 
		   </el-collapse-item>
		   <el-collapse-item  name="2">
		     <template slot="title">
		          <i class="el-icon-magic-stick"></i>环境选择
		     </template>
			 <el-tag style="background-color: white;z-index:150;margin-left: 10px;"
			 size="small"
			 :class="{deeppink: !isshow1,gray: isshow1}" @click="iss1" ><i class="el-icon-s-flag">免费停车</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshow2,gray: isshow2}" @click="iss2" ><i class="el-icon-thumb">有无电梯</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshow3,gray: isshow3}" @click="iss3" ><i class="el-icon-check">WI-FI环境</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshow4,gray: isshow4}" @click="iss4" ><i class="el-icon-key">电子门禁</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshow5,gray: isshow5}" @click="iss5" ><i class="el-icon-ice-drink">有无超市</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshow6,gray: isshow6}" @click="iss6" ><i class="el-icon-guide">有无公园</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshow7,gray: isshow7}" @click="iss7" ><i class="el-icon-fork-spoon">有无餐厅</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshow8,gray: isshow8}" @click="iss8" ><i class="el-icon-soccer">健身房</i>
			 </el-tag>
		   </el-collapse-item>
		   <el-collapse-item  name="3">
		     <template slot="title">
		          <i class="el-icon-table-lamp"></i>住宿环境
		     </template>
			 
			 <el-tag style="background-color: white;z-index:150;margin-left: 10px;"
			 size="small"
			 :class="{deeppink: !isshowa,gray: isshowa}" @click="issa" ><i class="el-icon-basketball">三人</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshowb,gray: isshowb}" @click="issb" ><i class="el-icon-dish-1">有厨房</i>
			 </el-tag>
			 <el-tag style="background-color: white;z-index:150;"
			 size="small"
			 :class="{deeppink: !isshowc,gray: isshowc}" @click="issc" ><i class="el-icon-coffee-cup">有客厅</i>
			 </el-tag>
		   </el-collapse-item>
		   <el-collapse-item name="4">
		     <template slot="title">
		          <i class="el-icon-link" ></i>价格筛选
		     </template>
			 <div style="width:100%;height:220px;border-radius: 3px;margin-bottom: 10px;background-color:#FFFFFF;
			 			"  >
			 			
			 			<div style="left:8px;color:deeppink;float: right;border: 1px solid deeppink;padding: 5px;border-radius: 5px;margin-right: 5px;" >最低{{ddd[0]}}元-最高{{ddd[1]}}元</div>
						<div style="float: right;width:60%;height: 100%;margin-top: 2px;">
							<div style="padding: 5px;border-radius: 5px;margin-right: 5px;width:98px;" class="el-icon-s-data"  :class="{deeppink: !isshowd,gray: isshowd}" @click="issd" >200元~500元</div>
						<div style="margin-top: 2px;padding: 5px;border-radius: 5px;margin-right: 5px;width:98px" class="el-icon-s-data"  :class="{deeppink: !isshowe,gray: isshowe}" @click="isse" >50元~200元</div>
						<div style="left:8px;margin-top: 2px;padding: 5px;border-radius: 5px;margin-right: 5px;width:98px"  class="el-icon-s-data"  :class="{deeppink: !isshowf,gray: isshowf}" @click="issf" >500元~1000元</div>
						</div>
						
			 			<div style="width:50px;height: 220px;right: 0px;background-color: #FFFFFF;margin-top:12px ;" v-if="drawer">
			 				<div class="block" style="width: 50px;margin: 0 auto;" id="line">
			 			    <el-slider
			 			      v-model="ddd"
			 			      range
							   vertical
							   height="200px"
			 				  tooltip-class="pice"
			 			      :max="1000">
			 			    </el-slider>
			 			  </div>
			 			</div>
			 			</div>
		   </el-collapse-item>
		   
		   
		   
		   
		   
		 </el-collapse>
	  </div>
	  
	</el-drawer>
</div>     
			</div>

      <div class="gray-box" @click="ckline">
				<div class="item-box">
					<shop-item v-for="item,index in goodsData" :item="item" :key="index" v-if="item.show==true&&item.price<=ddd[1]&&item.price>=ddd[0]&&item.sku_info[0].city==nn&&item.che1==true&&item.dianti1==true&&item.wifi1==true&&item.men1==true&&item.chaoshi1==true&&item.yuan1==true&&item.can1==true&&item.jian1==true&&item.peo1==true&&item.ting1==true&&item.chu1==true"></shop-item>
					
				</div>
			</div>
	<!-- <div v-if="pk"><i class="el-icon-loading"></i>抱歉，没有搜索到更多关于<i style="color: red;">{{pika}}</i>的内容</div> -->
    </div>

    <!-- <prompt></prompt> -->
  </div>
</template>

<script>
import Rili from "../components/rili.vue"
import Loading from "../components/index";
import shopItem from "../components/shop-item";
import prompt from "../components/prompt";
function sortBykey(ary, key) {
  return ary.sort(function(a, b) {
    let x = a[key];
    let y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
}
function sortBykey2(ary, key) {
  return ary.sort(function(a, b) {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

export default {
	// filters: {
	//     ellipsis (value) {
	//       if (!value) return ''
	//       if (value.length > 16) {
	//         return value.slice(0,16) + '...'
	//       }
	//       return value
	//     }
	//   },
  data() {
    return {
		activeNames: ['1','2','5'],
		screenHeight:String(window.innerHeight)+"px",
		isshow1:true,
		isshow2:true,
		isshow3:true,
		isshow4:true,
		isshow5:true,
		isshow6:true,
		isshow7:true,
		isshow8:true,
		isshow9:true,
		isshowa:true,
		isshowb:true,
		isshowc:true,
		isshowd:true,
		isshowe:true,
		isshowf:true,
		tiao:false,
		nn:"杭州",
		selectcity:["杭州","成都","上海","天津","广州"],
		findcity:"杭州",
	se:this.$route.params.se,
	line:false,
		mei:false,
      loading: true,
      day: [],
      isLoading: true,
      panelShow: true,
      ddd: [200, 500],
      count1: 1,
      search: "",
      count2: 0,
      count3: 0,
      price: true,
      activeIndex: "1",
      goodsData: [],
	  goodsData2: [],
      mmp: [],
	  pk:false,
	  pika:"",
	  active:0,
	   drawer: false,
	  systemDate:"",
	  systemDate2:"",
	  edit: true,
	        description: "你好！"
    };
  },
  watch: {
    goodsData: {
      handler(val) {
        this.goodsData = val;
      },
      deep: true
    },
    ddd: {
      handler(val) {
        this.ddd = val;
      },
      deep: true
    }
  },
  computed: {
    
    sd() {
      return "搜索更多关于" + this.search + "的内容";
    },
    searchData: function(event) {
		this.goodsData=this.goodsData2
      this.panelShow = true;
      if (this.search.length > 0) {
        var search = this.search;

        if (search) {
          return this.goodsData.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return (
                String(product[key])
                  .toLowerCase()
                  .indexOf(search) > -1
              );
            });
          });
        }
        return this.goodsData;
      }
    },
    sortgoodsData: function() {
      return sortBykey(this.goodsData, "pingfen");
    },
    sortgoods: function() {
      return sortBykey(this.goodsData, "id");
    },
    sortgoodsup: function() {
      return sortBykey(this.goodsData, "price");
    },
    sortgoodsdown: function() {
      return sortBykey2(this.goodsData, "price");
    }
  },
  components: {
    Loading,
    shopItem,
    prompt,
	Rili
  },
  methods: {
	  iss1(){
	  	this.isshow1=!this.isshow1
	  	if(this.isshow1==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].che==0){
	  				this.goodsData[x].che1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].che1=true
	  		}
	  	}
	  },	
	  iss2(){
	  	this.isshow2=!this.isshow2
	  	if(this.isshow2==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].dianti==0){
	  				this.goodsData[x].dianti1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].dianti1=true
	  		}
	  	}
	  },	
	  iss3(){
	  	this.isshow3=!this.isshow3
	  	if(this.isshow3==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].wifi==0){
	  				this.goodsData[x].wifi1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].wifi1=true
	  		}
	  	}
	  },	
	  iss4(){
	  	this.isshow4=!this.isshow4
	  	if(this.isshow4==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].men==0){
	  				this.goodsData[x].men1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].men1=true
	  		}
	  	}
	  },	
	  iss5(){
	  	this.isshow5=!this.isshow5
	  	if(this.isshow5==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].chaoshi==0){
	  				this.goodsData[x].chaoshi1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].chaoshi1=true
	  		}
	  	}
	  },	
	  iss6(){
	  	this.isshow6=!this.isshow6
	  	if(this.isshow6==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].yuan==0){
	  				this.goodsData[x].yuan1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].yuan1=true
	  		}
	  	}
	  },	
	  iss7(){
	  	this.isshow7=!this.isshow7
	  	if(this.isshow7==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].can==0){
	  				this.goodsData[x].can1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].can1=true
	  		}
	  	}
	  },	
	  iss8(){
	  	this.isshow8=!this.isshow8
	  	if(this.isshow8==false){
	  		for(let x=0;x<this.goodsData.length;x++){
	  			if(this.goodsData[x].jian==0){
	  				this.goodsData[x].jian1=false
	  			}
	  		}
	  	}
	  	else{
	  		for(let x=0;x<this.goodsData.length;x++){
	  				this.goodsData[x].jian1=true
	  		}
	  	}
	  },
		  issa(){
		  	this.isshowa=!this.isshowa
		  	if(this.isshowa==false){
		  		for(let x=0;x<this.goodsData.length;x++){
		  			if(this.goodsData[x].peo<=3){
		  				this.goodsData[x].peo1=false
		  			}
		  		}
		  	}
		  	else{
		  		for(let x=0;x<this.goodsData.length;x++){
		  				this.goodsData[x].peo1=true
		  		}
		  	}
		  },	
		  issb(){
		  	this.isshowb=!this.isshowb
		  	if(this.isshowb==false){
		  		for(let x=0;x<this.goodsData.length;x++){
		  			if(this.goodsData[x].chu<1){
		  				this.goodsData[x].chu1=false
		  			}
		  		}
		  	}
		  	else{
		  		for(let x=0;x<this.goodsData.length;x++){
		  				this.goodsData[x].chu1=true
		  		}
		  	}
		  },	
		  issc(){
		  	this.isshowc=!this.isshowc
		  	if(this.isshowc==false){
		  		for(let x=0;x<this.goodsData.length;x++){
		  			if(this.goodsData[x].ting<1){
		  				this.goodsData[x].ting1=false
		  			}
		  		}
		  	}
		  	else{
		  		for(let x=0;x<this.goodsData.length;x++){
		  				this.goodsData[x].ting1=true
		  		}
		  	}
		  },
			  issd(){console.log("!1")
			  	this.isshowd=!this.isshowd
				this.isshowe=true
				this.isshowf=true
			  	this.ddd=[200,500]
			  },
				  isse(){
				  	this.isshowe=!this.isshowe
					this.isshowf=true
					this.isshowd=true
				  	this.ddd=[50,200]
				  },
				  issf(){
				  	this.isshowf=!this.isshowf
					this.isshowe=true
					this.isshowd=true
				  	this.ddd=[500,1000]
				  },
	  change(index,item){
		  this.hangzhou(item)
	  				//把index值赋给active，点击改变样式
	  				this.active=index;
	  			},
	  ppp(){
		  this.$store.commit("offcar")
	  },
	  mmd(){
				if(this.search.length>0){
					var search = this.search;
				   let x=[]
				 if (search) {
				 x= this.goodsData.filter(function(product) {
					
				 return Object.keys(product).some(function(key) {
				 return String(product[key]).toLowerCase().indexOf(search) > -1
				 })
				 })
				 }
				 this.goodsData=x
				 
				 if(this.goodsData.length>0){
					 this.nn=this.goodsData[0].sku_info[0].city
					 this.ddd=[0,1000]
					 this.findcity=this.nn
				 }
				 else{
					 const h = this.$createElement;
					this.$notify({
					          title: '数据匹配失败..',
					          message: h('i', { style: 'color: teal'}, '请根据搜索提示重新检索')
					        }); 
					this.goodsData=this.goodsData2		
				 }
				}
				else{
					this.goodsData=this.goodsData2
				}
			},
	  addDate() {
	                      
	                      let date = {
	                          year: new Date().getFullYear(),
	                          month: new Date().getMonth() + 1,
	                          date: new Date().getDate(),
	                      }
	                      var day3 = new Date();
	                                  day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
	                                  var strMonth = day3.getMonth() + 1;
	                                  var strDay = day3.getDate();
	                                  if (strMonth < 10) {
	                                      strMonth = "0" + strMonth;
	                                  }
	                                  if (strDay < 10) {
	                                      strDay = "0" + strDay;
	                                  }
	                      this.systemDate = date.year + '-' + 0 + date.month + '-'  + date.date;
						  this.systemDate2 = day3.getFullYear() + "-" + strMonth + "-" + strDay
	                  },
	  ckline: function(event){
	  
	  var sp = document.getElementById("line");
	  
	  if(sp){
	  
	  if(!sp.contains(event.target)){            //这句是说如果我们点击到了id为myPanel以外的区域
	  
	  this.line = false;
	  
	  }
	  
	  }
	  
	  },
	 tomeituan(){
		 this.$router.push({
		 	path:"/Meituan"
		 	
		 	})
	 },
    loadPageData: function() {
      this.isLoading = false;
    },
    brightenKeyword(val, keyword) {
		if (val.length > 16) {
		        val= val.slice(0,16) + '...'
		      }
      val = val + "";
      if (val.indexOf(keyword) !== -1 && keyword !== "") {
        return val.replace(
          keyword,
          '<font color="plum">' + keyword + "</font>"
        );
      } else {
        return val;
      }
    },
    brightenKeyword2(val, keyword) {
		
      val = val + "";
      if (val.indexOf(keyword) !== -1 && keyword !== "") {
        return val.replace(keyword, '<font color="red">' + keyword + "</font>");
      } else {
        return val;
      }
    },
    hidePanel: function(event) {
      var sp = document.getElementById("myPanel");

      if (sp) {
        if (!sp.contains(event.target)) {
          //这句是说如果我们点击到了id为myPanel以外的区域

          this.panelShow = false;
        }
      }
    },
    sort() {
      this.sortgoods;
      this.count1 = 1;
      this.count2 = 0;
      this.count3 = 0;
    },
    sort2() {
      this.sortgoodsData;
      this.count1 = 0;
      this.count2 = 1;
      this.count3 = 0;
    },
    sort3() {
      this.sortgoodsup;
      this.count1 = 0;
      this.count2 = 0;
      this.count3 = 1;
      this.price = false;
    },
    sort4() {
      this.count1 = 0;
      this.count2 = 0;
      this.count3 = 1;
      this.sortgoodsdown;
      this.price = true;
    },
    async find() {
      if(this.se){
		  const select=await this.axios.get('rng/getday')
      let day=select.results
      //console.log(this.value[0].getTime())
      	// console.log(new Date(day[x].day).getTime())
      for(let y=0;y<this.goodsData.length;y++){
      	this.goodsData[y].show=true
      	for(let x=0;x<day.length;x++){
      		if(this.goodsData[y].id==String(day[x].sku_id).substring(0,7)){
      			if(new Date(day[x].day).getTime()>=new Date(this.se[0]).getTime()&&new Date(day[x].day).getTime()<=new Date(this.se[1]).getTime()){
      				this.goodsData[y].show=false

      			}
      		}
      	}
      }
	  }
      else{
		  const select=await this.axios.get('rng/getday')
		  let day=select.results
		  //console.log(this.value[0].getTime())
		  	// console.log(new Date(day[x].day).getTime())
		  for(let y=0;y<this.goodsData.length;y++){
		  	this.goodsData[y].show=true
		  	for(let x=0;x<day.length;x++){
		  		if(this.goodsData[y].id==String(day[x].sku_id).substring(0,7)){
		  			if(new Date(day[x].day).getTime()>=new Date(this.systemDate).getTime()&&new Date(day[x].day).getTime()<=new Date(this.systemDate2).getTime()){
		  				this.goodsData[y].show=false
		  
		  			}
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
    hangzhou(city){
    	this.search=""
    	this.mmd()
    	this.nn=city
    	this.ddd=[0,1000]
    	this.findcity=this.nn
    	
    },
    async token() {
      const ree = await this.axios.get("rng/goodsData");
      const fee = await this.axios.get("rng/sku_info");
      const ddd = await this.axios.get("rng/fenshu");
      let www = ddd.results;
      this.goodsData = ree.results;
      this.sku_info = fee.results;

      for (let x = 0; x < this.goodsData.length; x++) {
        let ssr = [];
        this.goodsData[x].show = true;
        this.goodsData[x].sou = false;
        for (let y = 0; y < this.sku_info.length; y++) {
          let str = String(this.sku_info[y].sku_id).substring(0, 7);

          if (this.goodsData[x].id == str) {
            let ssb = [];
            // console.log(this.goodsData[x])
            // console.log(this.numberValidateForm)
            ssb = ssb.concat(this.sku_info[y].image);
            ssb = ssb.concat(this.sku_info[y].show_name);
            // ssd=ssd.concat(this.sku_info[y].sku_id)
            // ssd=ssd.concat(this.sku_info[y].title)
            // ssd=ssd.concat(this.sku_info[y].sub_title)
            // ssd=ssd.concat(this.sku_info[y].ali_image)
            // ssd=ssd.concat(this.sku_info[y].price)
            // ssd=ssd.concat(this.sku_info[y].limit_num)
            this.sku_info[y].spec_json = ssb;
            ssr = ssr.concat(this.sku_info[y]);
          }
        }
        this.goodsData[x].sku_info = ssr;
		this.goodsData[x].che1=true
		this.goodsData[x].dianti1=true
		this.goodsData[x].wifi1=true
		this.goodsData[x].men1=true
		this.goodsData[x].chaoshi1=true
		this.goodsData[x].yuan1=true
		this.goodsData[x].can1=true
		this.goodsData[x].jian1=true
		this.goodsData[x].chu1=true
		this.goodsData[x].peo1=true
		this.goodsData[x].ting1=true
      }

      for (let x = 0; x < this.goodsData.length; x++) {
        let num = 0.0;
        let n = 0;
        for (let y = 0; y < www.length; y++) {
          if (www[y].sku_id == this.goodsData[x].id) {
            num += parseInt(www[y].pingfen);
            n++;
          }
        }
        if (num == 0) {
          this.goodsData[x].pingfen = 0.0;
        } else {
          this.goodsData[x].pingfen = (num / n).toFixed(2);
        }

        this.goodsData[x].renshu = n;
      }
	  this.goodsData2=this.goodsData
	  console.log(this.goodsData)
      console.log(this.goodsData.sort(this.goodsData.pingfen));
      // console.log( this.$store.state.token.substring(0,11))
    }
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
  mounted() {
    // this.fenshu()
    this.token();
    const me = this;
	this.addDate();
    // 初始化页面数据
    me.loadPageData();
	const that = this;
	    window.onresize = () => {
	      return (() => {
	        that.screenHeight = String(window.innerHeight)+"px"
	      })()
	    }
		console.log(this.screenHeight)
  }
};
</script>

<style>
@charset "utf-8";
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.activeClass{
        color:#ca151e;
        border: 1px solid #ca151e;
 }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.pice {
  background-color: red;
  color: palegreen;
}
.colo {
  color: indianred;
}
.sku-box {
  position: relative;
}
.sort-option {
  border-top: 1px solid #d8d8d8;
  color: #999;
}
.sort-option ul {
  height: 60px;
  line-height: 60px;
}
.sort-option li {
  position: relative;
  float: left;
  padding-left: 42px;
}
.sort-option li:first-child {
  padding-left: 9px;
}
.deeppink {
        color: deeppink;
		border: 1px solid deeppink;
    }
.gray {
        color:gray;
		border: 1px solid gray;
    }
.sort-option li:before {
  content: " ";
  display: block;
  position: absolute;
  left: 20px;
  top: 50%;
  width: 2px;
  height: 2px;
  margin-top: -1px;
  background: #c7c7c7;
}
.sort-option li:first-child:before {
  display: none;
}
.sort-option a {
  display: block;
  font-size: 12px;
  color: #999;
}
.sort-option a.active,
.sort-option a:hover {
  color: #5683ea;
}
.gray-box {
  overflow: hidden;
  background: #ededed;
  border-radius: 8px;
  border: 0px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  /* box-shadow: 0 3px 8px -6px rgba(0,0,0,.1); */
}
.sku-box .item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}
.sku-box .item {
  position: relative;
  float: left;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  width: 25%;
  height: 429px;
  background: #ffffff;
  /* background-color:rgba(0,0,0,0.9) */
  box-sizing: border-box;
}
.sku-box .item:hover {
  box-shadow: 0 0 38px rgba(0, 0, 0, 0.08) inset;
  transition: all 0.15s ease;
}
.sku-box .item .item-img img {
  display: block;
  width: 206px;
  height: 206px;
  margin: 50px auto 10px;
}
.sku-box .item h3,
.sku-box .item h6 {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sku-box .item h6 {
  line-height: 1.2;
  font-size: 16px;
  color: #424242;
  margin: 0 auto;
  padding: 0 14px;
}
.sku-box .item h3 {
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  margin: 8px auto 14px;
}
.sku-box .item .params-colors {
  margin-top: 23px;
  text-align: center;
}
.sku-box .item .colors-list {
  display: inline-block;
  overflow: hidden;
}
.sku-box .item .colors-list li {
  float: left;
  margin: 0 5px;
}
.sku-box .item .colors-list > li a {
  width: 8px;
  height: 8px;
  border: 1px solid #e5e5e5;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  padding: 2px;
  display: block;
}
.sku-box .item .colors-list > li a.active {
  box-shadow: inset 0 0 0 1px #b2b2b2;
  border-color: #b2b2b2;
}
.sku-box .item .colors-list > li img {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  display: block;
}
.sku-box .item .item-btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 29px;
  text-align: center;
  opacity: 0;
  z-index: 10;
}
.sku-box .item:hover .item-btns {
  opacity: 1;
  transition: all 0.2s ease-in;
}
.sku-box .item .item-btns .item-blue-btn,
.sku-box .item .item-btns .item-disabled-btn,
.sku-box .item .item-btns .item-gray-btn,
.sku-box .item .item-btns .item-green-btn {
  display: inline-block;
  box-sizing: border-box;
  width: 100px;
  height: 30px;
  font-size: 16px;
  line-height: 28px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 200;
  transition: all 0.1s ease;
}
.sku-box .item .item-btns .item-gray-btn {
  border: 1px solid #d5d5d5;
  color: #646464;
}
.sku-box .item .item-btns .item-gray-btn a {
  display: block;
  color: #a1a1a1;
}
.sku-box .item .item-btns .item-gray-btn:hover {
  background-image: linear-gradient(#f6f6f6, #ededed);
}
.sku-box .item .item-btns .item-blue-btn {
  background-color: #5c85e5;
  background-image: linear-gradient(#779ae9, #5078df);
  border: 1px solid #5c81e3;
  color: #fff;
  margin-left: 10px;
}
.sku-box .item .item-btns .item-blue-btn:hover {
  border: 1px solid #5374c8;
  background-color: #5074db;
  background-image: linear-gradient(#6e8ed5, #4769c2);
}
.sku-box .item .item-btns .item-blue-btn:active {
  border: 1px solid #3e61d7;
  background-color: #5c85e5;
  background-image: linear-gradient(#4d72de, #6189e6);
}
.sku-box .item .item-price {
  font-family: Arial;
  color: #c30a18;
  margin-top: 24px;
  text-align: center;
  opacity: 1;
}
.sku-box .item .item-price i {
  font-size: 16px;
}
.sku-box .item .item-price span {
  font-size: 18px;
  padding-left: 4px;
}
.sku-box .item:hover .item-price {
  opacity: 0;
  transition: all 0.1s ease-out;
}
.sku-box .item .discount-icon {
  display: none;
}
.sku-box .item .item-cover a {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 310px;
}
</style>
