<template>
	<div id="main" style="position: absolute;top:0px">
		<div class="content page-order-checkout checkout" style="width: 100%;">
			<div class="js-checkout-address-box">
				<div class="gray-box clear">
					<div class="title columns-title pre-title">
						<h2 style="font-size: 16px;">发票收件或联系地址地址</h2>
						<el-link type="info" style="float: right;color: orangered;font-size: 12px;" @click="showx=!showx" v-if="!dizhi">删除地址</el-link>
						<el-link type="info" style="float: right;color: orangered;font-size: 12px;" @click="dizhi=!dizhi" v-if="dizhi">管理地址</el-link>
					</div>
					<div class="box-inner js-checkout-address-panel " v-if="dizhi">
						<div class="address-common-table js-multiple-address-panel" >
							<ul class="address-item-list clear js-address-item-list">
								<li class="js-choose-address"  v-for="item,index in receiveInfo" @click="checkReceive(index)" v-if="receiveIndex==index">
									<div class="address-item">
										<div class="name-section">联系人：{{item.name}}</div>
										<div class="mobile-section">联系电话：{{item.phone}}</div>
										<div class="detail-section">联系地址:{{item.address}}</div>
									</div>
									<div class="operation-section">
										<span class="update-btn js-edit-address">修改</span>
										<span class="delete-btn js-delete-address">删除</span>
									</div>
								</li>
								<!-- <li class="add-address-item js-add-address" @click="showPop">
									<p>使用新地址</p>
								</li> -->
							</ul>
						</div>
					</div>
					<div class="box-inner js-checkout-address-panel " v-else>
						<div class="address-common-table js-multiple-address-panel" >
							<ul class="address-item-list clear js-address-item-list">
								<li class="js-choose-address" :class="{'selected-address-item':receiveIndex==index}" v-for="item,index in receiveInfo" @click="checkReceive(index)">
									<el-link type="info" @click="removeadd(item.id)" style="z-index:20;position: absolute;right: 5px;font-size: 24px;color:orangered;" class="el-icon-delete-solid" :underline="false" v-if="showx"></el-link>
									<div class="address-item">
										<div class="name-section">联系人：{{item.name}}</div>
										<div class="mobile-section">联系电话：{{item.phone}}</div>
										<div class="detail-section">联系地址：{{item.address}}</div>
									</div>
									<div class="operation-section">
										<span class="update-btn js-edit-address">修改</span>
										<span class="delete-btn js-delete-address">删除</span>
									</div>
								</li>
								<li class="add-address-item js-add-address" @click="showPop">
									<p>使用新地址</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="gray-box">
				<div class="title">
					<h2>发票信息</h2>
				</div>
				<div class="box-inner invoice-box js-invoice-box"> 
					<p class="invoice-detail"> 发票类型：电子发票 </p> 
					<div class="invoice-detail"> 发票抬头： 
						<div class="radio-box"> 
							 <label> 
								<input type="radio" class="hide"> 
								<span class="blue-radio" :class="{'blue-radio-on':!invoice.personal}" @click="chexkedInvoice(false)"><a></a></span>  单位
							</label> 
							<br>
							<label> 
								<input type="radio" class="hide"> 
								<span class="blue-radio" :class="{'blue-radio-on':invoice.personal}" @click="chexkedInvoice(true)"><a></a></span>  个人
							</label>
						</div>
						<div class="module-form-row form-item fn-hide js-invoice-title" v-if="!invoice.personal"> 
							<div class="module-form-item-wrapper no-icon small-item"> 
								<i v-show="!invoice.name">请填写公司发票抬头</i> 
								<input type="text" class="js-verify" v-model="invoice.name" > 
								<div class="verify-error" v-show="!invoice.name">必填</div>
							</div> 
						</div> 
					</div>
					 <br>
					<p class="invoice-detail">发票内容：购买商品明细</p> <p class="invoice-label"> 电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。 </p>
				</div>
			</div> -->
			<div class="gray-box">
				<div class="title pre-title">
					<h2>购物清单</h2> 
				</div>
				<div class="box-inner ui-goods-cart">
					<!-- <div class="gray-sub-title cart-table-title"> 
						<span class="name">商品名称</span> 
						<span class="subtotal">小计</span> 
						<span class="num">订购天数</span> 
						<span class="price">单价</span> 
					</div> -->
					<div class="cart-table">
						<div class="cart-group js-cart-group">
							<div class="cart-items" v-for="item,index in checkedGoods" v-if="checkedGoods[index].checked">
								<div class="items-thumb">  
									<a href="javascript:;" target="_blank"><img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></a>  
								</div>
								<div class="name hide-row" >
									<div class="name-cell"> 
										<a href="javascript:;" :title="item.title+'('+item.spec_json.show_name+')'" target="_blank">{{item.title|ellipsis}}</a><br>
										<a href="javascript:;" :title="item.title+'('+item.spec_json.show_name+')'" target="_blank" style="font-size: 12px;color: gray;">{{item.sub_title|ellipsis}}</a>
									</div>
								</div>
								<!-- <div class="subtotal">
									<div class="subtotal-cell">  ¥ {{item.num*item.price}}.00  </div> 
								</div> -->
								<!-- <div class="goods-num"></div> -->
								<div class="price"><i style="color: red;">¥ <i style="font-size: 14px;">{{item.price}}</i>.00</i><i style="color:gray;font-size: 12px;"></i>*{{item.num}}</div>
							</div>
							
						</div>
					</div>
					
				</div>
				<div class="box-inner"> 
					<div class="order-discount-line" > 
						<p> 商品总计： <span> {{checkedGoods.number}}件</span></p> 
						<p v-if="checkedGoods.count>88"> 服务费： <span style="color: red;">订单满88元|已免</span> </p>  
						<p v-else> 服务费： <span style="color: red;">¥8.00</span> </p>  
						<p class="discount-line js-discount-cash"> <em>优惠券</em>： <span> - 0 </span> </p>  
					</div> 
				</div>
				<div class="box-inner" style="position: fixed;bottom: 0px;height: 50px;width: 100%;background-color: white;"> 
				<div style="float: right;padding: 5px;">
					
					
					<span style="color: gainsboro;padding-right: 10px;">共{{checkedGoods.number}}件|<i style="color: #000000;">应付金额：</i> <em v-if="checkedGoods.count>88" style="color: red;">¥ {{checkedGoods.count}}.00</em>
						<em v-else  style="color: red;">¥ {{checkedGoods.count+8}}.00</em>
					</span>
					<el-button  type="success" plain @click="topay"><i class="el-icon-sold-out"></i>订单结算</el-button>
				</div>
						 
				</div>
			</div>
		</div>
		<AddressPop v-if="popShow" @close="closePop" @func="getMsgFormSon"></AddressPop>
	</div>
</template>

<script>
import AddressPop from "../components/address-pop.vue"
	export default{
		filters: {
		    ellipsis (value) {
		      if (!value) return ''
		      if (value.length > 12) {
		        return value.slice(0,12) + '...'
		      }
		      return value
		    }
		  },
		components:{
			AddressPop
		},
		data(){
			return {
				pay:[],
				receiveInfo:[],
				rf:[],
				checkedGoods:this.$route.query.carPanelData,
				receiveIndex:0,
				popShow:false,
				showx:false,
				dd:[],
				dizhi:true,
				invoice:{
					personal:true,
					name:''
				}
			}
		},
		watch:{
			checkedGoods(){
				return this.checkedGoods
			},
			rf(val){
				this.receiveInfo=this.rf
			}
		},
		computed:{
			free(){
				let free=8.00
				if(this.checkedGoods.count>=88){
					free="(满88元)服务费已免"
				}
				return free
			},
			free2(){
				let free2=8
				if(this.checkedGoods.count>=88){
					free2=0
				}
				return free2
			},
			
		},
		methods:{
			getMsgFormSon(data){
			                this.receiveInfo.push(data) 
							this.receiveIndex=0
						},
			async topay(){
				console.log(this.receiveIndex)
				if(this.receiveInfo.length<1){
					this.$notify({
									offset: 500,
						          message: '警告：请至少添加一个联系地址',
						          type: 'warning'
						        });
				}
				else{
					let t=new Date().getTime()+60*60*1000
					if(!this.receiveInfo[this.receiveIndex].address){
						this.receiveInfo[this.receiveIndex].address=this.receiveInfo[this.receiveIndex].add
					}
				console.log(this.receiveInfo[this.receiveIndex])
				for(let x=0;x<this.checkedGoods.length;x++){
					for(let y=0;y<this.dd.length;y++){
						if(this.dd[y].sku_id==this.checkedGoods[x].sku_id){
							if(this.checkedGoods[x].checked==true){
								const sl=await this.axios.get("rng/pay",{params:{
					usr:localStorage.getItem('token').substring(3,14),
					name:this.receiveInfo[this.receiveIndex].name,
					phone:this.receiveInfo[this.receiveIndex].phone,
					address:this.receiveInfo[this.receiveIndex].address,
					pay_id:t,
					sku_id:this.checkedGoods[x].sku_id,
					day:this.dd[y].day,
					price:this.checkedGoods[x].price
					}}).then(res=>console.log(res.sql))
							}
					
						}
					}
				}
				this.$router.push({
					path:"/gocheck",
					query:{
						id:t,
						checkedGoods:this.checkedGoods
					}
					})
				 }
				
			},
			async addressALL(){
				const sl=await this.axios.get("rng/checkaddress",{params:{
					usr:localStorage.getItem('token').substring(3,14),
					}})
				this.receiveInfo=sl.results
				console.log(sl)
				this.rf=this.receiveInfo
			},
			checkReceive(index){
				if(this.showx==true){
					
				}
				else{
					this.dizhi=true
				this.receiveIndex=index
				}
				
			},
			closePop(){
				this.popShow=false
				this.$store.state.receiveInfo.forEach((item,index)=>{
					if(item.default){
						this.receiveIndex=0
						return
					}
				})
			},
			showPop(){
				this.popShow=true
			},
			chexkedInvoice(boole){
				this.invoice.personal=boole
			},
			async removeadd(id){
				
				const select=await this.axios.get("rng/deladd",{params:{id:id}})
				this.addressALL()
			},
			 async show(){
				 console.log(this.$route.query.carPanelData)
			// 	this.token=localStorage.getItem('token')
			// 	const select=await this.axios.get("rng/selData",{params:{phone:this.token.substring(3,14)}})
			// 	const www=await this.axios.get("rng/getday")
			// 	this.carPanelData=select.results
			// 	let ddd=www.results
			// 	this.$store.commit('carPanelData1',this.carPanelData)
			// 	if(this.carPanelData!=""){this.count=this.carPanelData.length}
			// 	for(let x=0;x<this.carPanelData.length;x++){
			// 		let ssr=[]
			// 		let wwr=[]
			// 		let ssb=[]
			// 				ssb=ssb.concat(this.carPanelData[x].image)
			// 				ssb=ssb.concat(this.carPanelData[x].show_name)
			// 				this.carPanelData[x].spec_json=ssb
			// 				let ccc=0
			// 				for(let y=0;y<ddd.length;y++){
			// 					if(ddd[y].phone==this.token.substring(3,14)){
			// 						if(ddd[y].sku_id==this.carPanelData[x].sku_id){
			// 						ccc++
			// 					}
			// 					}
			// 				}
			// 				let num=0
			// 				num=ccc
			// 				this.carPanelData[x].num=num
			// 				this.carPanelData[x].checked=false
			// 		// for(let y=0;y<this.ali_images.length;y++){
			// 		// 	if(this.sku_info[x].sku_id==this.ali_images[y].sku_id){
							
			// 		// 		ssr=ssr.concat(this.ali_images[y].images) 
			// 		// 	}
			// 		// }
			// 		//
			// 		// this.sku_info[x].ali_images=ssr
			// 		// for(let z=0;z<this.sku_list.length;z++){
			// 		// 	if(String(this.sku_info[x].sku_id).substring(0,7)==String(this.sku_list[z].id).substring(0,7)){
			// 		// 		wwr=wwr.concat(this.sku_list[z])
			// 		// 	}
			// 		// }
			// 		// this.sku_info[x].sku_list=wwr
			// 	}
				const select2=await this.axios.get("rng/getday")
				let check=select2.results
				this.dd=select2.results
				let number=0
				let count=0
				for(let x=0;x<check.length;x++){
					if(check[x].flag==1){
						for(let y=0;y<this.checkedGoods.length;y++){
							if(check[x].sku_id==this.checkedGoods[y].sku_id){
								if(this.checkedGoods[y].checked==true){
									number++
								}
								
							}
						}
					}
				}
				this.checkedGoods.number=number
				
				for(let w=0;w<this.checkedGoods.length;w++){
					if(this.checkedGoods[w].checked==true){
						count+=this.checkedGoods[w].num*this.checkedGoods[w].price
					}
					
				}
				this.checkedGoods.count=count
				console.log(this.checkedGoods)
			// 	//this.$store.commit("showcar")
			},
		},
		mounted(){
			this.show()
			this.addressALL()
		},
		created(){
			this.$store.state.receiveInfo.forEach((item,index)=>{
				if(item.default){
					this.receiveIndex=0
					return
				}
			})
		},
	}
</script>

<style>
.content{
  clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
}
.page-order-checkout{
  padding-top: 40px;
}
.checkout .gray-box{
  overflow: hidden;
    border: 1px solid #D1D1D1;
    border-color: rgba(0,0,0,.14);
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.checkout .gray-box, .gray-btn-menu-on:hover{
  background: #FFF;
}
.checkout .gray-box{
  margin-bottom: 30px;
}
.checkout .gray-box .title{
  height: 60px;
    padding: 0 10px 0 28px;
    background: #F5F5F5;
    background: linear-gradient(#FFF,#F5F5F5);
    border-bottom: 1px solid #DCDCDC;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 7px rgba(0,0,0,.06);
    line-height: 60px;
    color: #646464;
}
.checkout .gray-box .pre-title{
    position: relative;
    z-index: 2;
}
.checkout .gray-box .title h2{
  font-size: 18px;
    font-weight: 400;
    color: #626262;
}
.checkout .gray-box .columns-title h2{
  float: left; 
}
.checkout .address-common-table .address-item-list{
  padding:10px
}
.checkout .address-common-table .address-item-list li{
    position: relative;
    overflow: hidden;
    float: left;
    width: 95%;
    height: 120px;
    margin:10px;
    border: 1px solid #E5E5E5;
    border-radius: 3px;
    background: #FAFAFA;
    line-height: 14px;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    color: #626262;
    cursor: pointer;
    user-select: none;
}
.checkout .address-common-table .address-item-list li.selected-address-item{
  background: #FFF;
    border-color: #6A8FE5;
}
.checkout .address-common-table .address-item-list .address-item{
  padding: 19px 14px 0 19px;
}
.checkout .address-common-table .name-section{
  height: 16px;
    padding-right: 10px;
    line-height: 16px;
    font-size: 16px;
    color: #666;
}
.checkout .address-common-table .mobile-section{
  height: 14px;
    padding-top: 17px;
    line-height: 14px;
    color: #999;
}
.checkout .address-common-table .detail-section{
  padding-top: 6px;
    line-height: 24px;
    color: #999;
}
.checkout .address-common-table .address-item-list li.selected-address-item:after{
  content: '√';
    display: block;
    position: absolute;
    left: 5px;
    top: 19px;
    font-size: 24px;
    color: #6A8FE5;
}
.checkout .address-common-table .operation-section{
  visibility: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 28px;
    background: #E1E1E1;
    border-top: 1px solid #E1E1E1;
    transform: translate(0,29px);
}
.checkout .address-common-table .operation-section .delete-btn,
.checkout .address-common-table .operation-section .update-btn{
  float: left;
    display: block;
    height: 28px;
    background: #FFF;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    transition: background .15s ease;
}
.checkout .address-common-table .operation-section .update-btn{
  width: 137px;
}
.checkout .address-common-table .operation-section .delete-btn{
  float: right;
    width: 138px;
}
.checkout .address-common-table .add-address-item::before{
  content: '+';
    display: block;
    position: absolute;
    left: 50%;
    top: 54px;
    height: 24px;
    margin-left: -10px;
    line-height: 24px;
    text-align: center;
    font-size: 24px;
    color: #626262;
}
.checkout .address-common-table .add-address-item p{
  height: 14px;
    padding-top: 85px;
    line-height: 14px;
    text-align: center;
    color: #999;
}
.checkout .address-common-table .address-item-list li:hover{
  background: #F2F2F2;
}
.checkout .invoice-box{
  padding: 22px 29px 29px 28px;
}
.checkout .invoice-box .invoice-detail{
  position: relative;
    height: 36px;
    line-height: 36px;
    color: #666;
}
.checkout .invoice-box .radio-box{
  position: absolute;
    left: 65px;
    top: 0;
    padding: 0;
    margin: 0;
}
.checkout .invoice-box .radio-box>label{
  margin-right: 5px;
}
.checkout .blue-radio{
  overflow: hidden;
    display: inline-block;
    position: relative;
    top: 2px;
    width: 10px;
    height: 10px;
    padding: 4px;
    background: #F9F9F9;
    background: linear-gradient(#F5F6F6,#FDFDFD);
    border: 1px solid #E6E6E6;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,.05) inset;
    cursor: pointer;
}
.checkout .invoice-box .blue-radio{
  top: 4px;
    margin: 0 3px 0 6px;
}
.checkout .blue-radio-on a, .choose-radio-on .blue-radio a{
  overflow: hidden;
    display: block;
    width: 8px;
    height: 8px;
    background: #6C94F3;
    background: linear-gradient(#749AF4,#668EF2);
    border: 1px solid #5D81D9;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
}
.checkout .module-form-row .small-item{
  width: 180px;
    height: 36px;
    border-radius: 4px;
    line-height: 36px;
    font-size: 14px;
}
.checkout .invoice-box .module-form-row{
    position: absolute;
    left: 215px;
    top: -1px;
    padding: 0;
    margin: 0;
}
.checkout .module-form-item-wrapper i{
  position: absolute;
    left: 15px;
    top: 0;
    font-style: normal;
    font-size: 16px;
    color: #bebebe;
}
.checkout .module-form-row .small-item i{
  font-size: 14px;
}
.checkout .invoice-box .module-form-item-wrapper{
  width:50%;
    height: 34px;
    line-height: 34px;
}
.checkout .module-form-item-wrapper{
  display: block;
    position: relative;
    width:50%px;
    height: 46px;
    background-color: #FFF;
    box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;
    border: 1px solid #CCC;
    border-radius: 6px;
    line-height: 46px;
    font-size: 16px;
    opacity: 1;
    transition: opacity .3s ease-in;
}
.checkout .invoice-box .module-form-item-wrapper i{
  left: 11px;
}
.checkout .module-form-item-wrapper input{
  position: relative;
    z-index: 3;
    width: 290px;
    padding: 0 13px 0 15px;
    background: 0 0;
    border: none;
    font-size: 16px;
    color: #333;
}
.checkout .module-form-row .small-item input{
  padding-left: 15px;
    margin-top: 8px;
    width: 137px;
    font-size: 14px;
}
.checkout .invoice-box .module-form-item-wrapper input{
  width: 310px;
    padding-left: 11px;
}
.checkout .invoice-box .invoice-label{
  position: relative;
    padding-top: 25px;
    margin-top: 11px;
    border-top: 1px solid #E5E5E5;
    line-height: 12px;
    text-indent: 10px;
    font-size: 12px;
    color: #999;
}
.checkout .gray-box .gray-sub-title{
  height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
}
.checkout .ui-goods-cart .cart-table-title{
  padding: 0 0 0 29px;
    border-top: none;
    font-size: 12px;
}
.checkout .ui-goods-cart .cart-table-title span{
  float: right;
    text-align: center;
}
.checkout .ui-goods-cart .cart-table-title .name{
  float: left;
    text-align: left;
}
.ui-goods-cart .cart-table-title .num, .ui-goods-cart .cart-table-title .operation, .ui-goods-cart .cart-table-title .price, .ui-goods-cart .cart-table-title .subtotal{
  width: 130px;
    padding-right: 29px;
    text-align: right;
}
.ui-goods-cart .cart-table-title .num{
  width: 132px;
}
.ui-goods-cart .cart-table-title .price{
  width: 120px;
}
.ui-goods-cart .cart-group, .ui-goods-cart .cart-items{
  border-top: 1px solid #EBEBEB;
}
.ui-goods-cart .cart-items{
  position: relative;
    height: 110px;
    padding-left: 29px;
    color: #666;
}
.ui-goods-cart .cart-group:first-child, .ui-goods-cart .cart-items:first-child{
  border-top: none;
}
.ui-goods-cart .cart-items .items-choose, .ui-goods-cart .cart-items .items-thumb, .ui-goods-cart .cart-items .name{
  float: left;
}
.ui-goods-cart .cart-items .items-thumb, .ui-goods-cart .cart-items .items-thumb img{
  width: 108px;
    height: 72px;
    border-radius: 4px;
}
.ui-goods-cart .cart-items .items-thumb{
  margin-top: 15px;
    border: 1px solid #EBEBEB;
}
.ui-goods-cart .cart-items .name{
  display: table;
    width: 100px;
    height: 20%;
	padding-top: 10px;
    margin-left: 10px;
}
.ui-goods-cart .cart-items .name-cell{
  display: table-cell;
    vertical-align: middle;
}
.ui-goods-cart .cart-items .name a{
  color: #333;
}
.ui-goods-cart .cart-items .subtotal{
  float: right;
    display: table;
    width: 129px;
    height: 100%;
    padding-right: 29px;
    text-align: right;
    line-height: 24px;
    color: #333;
}
.ui-goods-cart .cart-items .subtotal-cell{
  display: table-cell;
    vertical-align: middle;
}
.ui-goods-cart .cart-items .goods-num, .ui-goods-cart .cart-items .operation, .ui-goods-cart .cart-items .price, .ui-goods-cart .cart-items .select{
  overflow: hidden;
    float: right;
    width: 129px;
    padding-right: 29px;
    line-height: 50px;
    text-align: right;
    color: #333;
}
.ui-goods-cart .cart-items .goods-num{
  width: 64px;
    padding: 0 9px 0 90px;
    text-align: center;
}
.ui-goods-cart .cart-items .price{
  width: 120px;
}
.page-order-checkout .order-discount-line{
  padding: 21px 30px;
    border-top: 1px solid #EBEBEB;
    line-height: 30px;
    text-align: right;
}
.page-order-checkout .order-discount-line span{
  float: right;
    width: 157px;
}
.page-order-checkout .last-payment{
  padding: 22px 29px 19px 30px;
    background: linear-gradient(#FCFCFC,#F5F5F5);
    border-top: 1px solid #DADADA;
    box-shadow: -3px 0 8px rgba(0,0,0,.04);
}
.blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
  display: block;
    padding: 1px;
    margin: 0 auto;
    border-radius: 6px;
    background: #015e94;
    background: linear-gradient(#5598c9,#2a6da2);
    text-align: center;
    text-shadow: rgba(255,255,255,.496094) 0 1px 0;
    font-family: 'Microsoft Yahei','微软雅黑','PingFang SC',sans-serif;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
.jianguo-blue-main-btn{
  background: #6383C6;
    background: linear-gradient(#6383C6,#4262AF);
    box-shadow: none;
}
.checkout .big-main-btn{
  height: 46px;
}
.page-order-checkout .payment-blue-bt, .page-order-checkout .payment-blue-bt a{
    width: 136px;
    font-size: 16px;
}
.blue-main-btn a, .gray-main-btn a, .jianguo-blue-main-btn a{
  display: block;
    padding: 2px 0;
    border-radius: 6px;
}
.jianguo-blue-main-btn a{
  background: linear-gradient(#6F97E5,#527ED9);
    box-shadow: inset 0 1px 2px #7EA1E8;
    text-shadow: 0 -1px 0 #4F70B3;
    color: #FFF;
    transition: all .3s ease;
}
.checkout .big-main-btn a{
  height: 42px;
  line-height: 42px;
  width: 136px;
  font-size: 16px;
}
.jianguo-blue-main-btn:hover a{
  box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);
}
.page-order-checkout .last-payment .prices{
  padding: 0 40px;
    line-height: 50px;
    font-size: 14px;
}
.page-order-checkout .last-payment .prices em{
  display: inline-block;
    position: relative;
    top: 3px;
    margin-top: -4px;
    font-size: 24px;
    color: #D44D44;
}
.verify-error {
  display: block;
  position: absolute;
  right: 6px;
  top: 4px;
  z-index: 5;
  padding: 0 9px;
  border-radius: 5px;
  line-height: 26px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  background: #E66157;
  opacity: 1;
}
</style>
