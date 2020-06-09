<template>
<div id="main" class="hander-car" ref="getheight"><div  style="position:absolute;top:50px;width: 100%;left: 0;
					height: 30px;background-color:rgba(0,0,0,0.7);text-align: center;color: white;padding-top: 10px;">
						<h2>收藏清单</h2>
					</div>
			<div class="store-content" style="width: 100%;">
				<div class="cart-box" >
					
					<div class="cart-inner" style="">
						<div class="empty-label" v-if="count<=0">
							<h3>您的收藏夹中还没有商品</h3>
							<router-link to="/" class="link">现在选购</router-link>
						</div>
						<div v-else>
							<!-- <div class="cart-table-title" >
								<span class="name" >商品信息</span -->
								<!-- <span class="operation">操作</span> -->
								<!-- <span class="subtotal">小计</span> -->
							<!-- 	<span class="num">选定日期</span> -->
								<!-- <span class="price">单价</span> -->
						<!-- 	</div> -->
							<div class="cart-table"  style="">
								<div class="cart-group">
									<!--购物列表-->
									<div class="cart-top-items" v-for="item,index in carPanelData">
										<div class="cart-items">
											<div class="items-choose" >
												<span class="blue-checkbox-new"  :class="{'checkbox-on':item.checked}" @click="checkGoodsHandle(item.sku_id)"><a></a></span>
											</div>
											<div class="items-thumb" style="margin-left: -35px;">
												<img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"
												>
												<router-link :to="{name:'Item',query:{itemId:item.sku_id}}"></router-link>
											</div>
											<div class="name hide-row" >
												<div class="name-table" style="padding-top: 5px;font-size: 12px;width: 130px;">
													<router-link :to="{name:'Item',query:{itemId:item.sku_id}}"style="font-size: 12px;">{{item.title|ellipsis }}</router-link><br><br>
													<div style="color: orangered;">¥ {{item.price}}.00</div>
												</div>
											</div>
											
											<!-- <div class="subtotal" v-if="item.num>0" style="color: red;">¥ {{item.num*item.price}}.00</div>
											<div class="subtotal" v-else>¥ 0.00</div> -->
											<div class="item-cols-num" style="width: 0px;">
												<div class="select js-select-quantity"  >
													<el-popover
													size="mini"
													  placement="right"
													  width="290"
													  trigger="click">
													  <el-table :data="gridData[0]" border :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor">
													    <el-table-column width="100" property="date" label="预定时间"></el-table-column>
													    <el-table-column width="90" property="name" label="订单状态"></el-table-column>
													    <!-- <el-table-column width="180" property="address" label="操作时间"></el-table-column> -->
														<el-table-column width="100"   label="订单操作">
														<template slot-scope="scope">
															<el-link type="danger" @click="checkDetail(scope.row)" :underline="false" v-if="scope.row.flag=='0'">
																<i class="el-icon-delete"></i>删除订单
															</el-link>
															<el-link type="danger" @click="checkDetail(scope.row)" :underline="false" v-if="scope.row.flag=='1'">
																<i class="el-icon-delete"></i>取消订单
															</el-link>
															<el-link type="danger" @click="checkDetail2(scope.row)" :underline="false" v-if="scope.row.flag=='2'">
																<i class="el-icon-delete"></i>查看订单
															</el-link>
															</template>
														</el-table-column>
													  </el-table>
													  <el-button style="text-align: center;padding-left: 5px;padding-right: 5px;
													  position: absolute;top:55px;right: 55px;" slot="reference" @click="bingo(item.sku_id)" v-if="item.num>0" size="mini" >已预定{{item.num}}天</el-button>
													  <el-button slot="reference" @click="bingo(item.sku_id)" v-else style="padding-left: 3px;padding-right: 3px;text-align:center;position: absolute;top:55px;right: 55px;" size="mini"><i style="color: brown;" class="el-icon-s-management">查看详情</i></el-button>
													  
													  
													</el-popover>
													<el-button class="items-delete-btn" @click="delPanelHandle(item.sku_id)"  
													style="text-align: center;padding-left: 5px;padding-right: 5px;position: absolute;top:55px;right: 5px;" size="mini">
														<i class="el-icon-close" style="color: gray;">删除</i>
													</el-button>
												</div>
											</div>
											
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="cart-bottom-bg fix-bottom" v-if="count>0" style="position: fixed;bottom: 0;">
						<!-- <div class="cart-bar-operation">
							<div>
								
							</div>
						</div> -->
						<div style="width: 320px;height:50px ;font-size: 12px;margin: 0 auto;margin-top: 20px;">
							<div >
								<div style="width: 95px;height:35px ;font-size: 12px;float: left;padding-left: 5px;">
									<h4 >
										已选择 <i>{{checkedCount}}</i> 件商品
									</h4>
									<h5 style="text-align:left;">
										共计 <i >{{count}}</i> 件商品
									</h5>
								</div>
								<div style="width: 115px;height:40px ;font-size: 12px;float: left;border-left: 1px solid rgba(0,0,0,0.5);">
									<h4 class="">
										应付额：<span style="color: red;font-size: 14px;">￥<i >{{checkedPrice}}</i> </span>
									</h4>
									<h5 style="color: coral;">
										应付额不含服务费
									</h5>
									
								</div>
							</div style="width: 80px;height:50px ;font-size: 12px;float:right;">
						<el-button  size="medium" type="primary" :disabled="checkedCount<=0" 
						@click="gocheck">现在结算</el-button>
								
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
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
		data(){
			return{
				carPanelData:[],
				count:0,
				check:[],
				time:[],
				gridData:[],
				checkedCount:0,
				checkedPrice:0,
				hhhh:""
			}
		},
		computed:{
		allChecked(){
			return this.$store.getters.allChecked
		},
		
		},
		methods:{
			async gocheck(){
				for(let x=0;x<this.carPanelData.length;x++){
					if(this.carPanelData[x].checked==true){
						const select=await this.axios.get("rng/gocheck",{params:{
							phone:this.token.substring(3,14),
							sku_id:this.carPanelData[x].sku_id
							}})
					}
					// else{
					// 	const select=await this.axios.get("rng/gocheck2",{params:{
					// 		phone:this.token.substring(3,14),
					// 		sku_id:this.carPanelData[x].sku_id
					// 		}})
					// }
				}
				this.$router.push({
					path:'/Checkout',
					query:{
						carPanelData:this.carPanelData
					}
				})
			},
			checkDetail(val){
			                this.axios.get("rng/delday",{params:{
			                	id:val.id
			                	}})
							this.$message({
							          message: '取消订单成功',
							          type: 'success'
							        });

			            },
						checkDetail2(val){
										this.$message({
										          message: '1',
										          type: 'success'
										        });
						
						            },
			tableRowStyle({ row, rowIndex }) {
			      return 'background-color: #F7F6Fd'
			    },
			    // 修改table header的背景色
			    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			      if (rowIndex === 0) {
			        return 'background-color:#EDEDED;color:#000000;font-weight: 500;'
			      }
			    },
			bingo(val){
				this.gridData=[]
				let xx=[]
				for(let x=0;x<this.time.length;x++){
					let z=[]
					
					if(this.time[x].sku_id==val){
						if(this.time[x].phone==this.token.substring(3,14)){
							let id=this.time[x].id
						let date=this.time[x].day
						if(this.time[x].flag=="0"){
							let name="尚未付款"
							z.name=name
							let flag="0"
							z.flag=flag
						}
						else if(this.time[x].flag=="1"){
							let name="预定中"
							z.name=name
							let flag="1"
							z.flag=flag
						}
						else{
							let name="已付"
							let flag="2"
							z.flag=flag
						}
						let d=new Date(this.time[x].date )
						let date_value = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
console.log(date_value)
						let address=this.time[x].date
						z.date=date_value.substring(0,10)
						z.id=id
						z.address=address.substring(0,19)
						xx.push(z)
						}
						
					}
					
				}
				this.gridData.push(xx)
				console.log(this.gridData)
			},
			async delPanelHandle(id){
				this.$store.commit('delCarPanelData',id)
				const select=await this.axios.get("rng/delcar",{params:{
					phone:this.token.substring(3,14),
					sku_id:id
					}})
				this.count-=1
			},
			plusCarPanelDataHandle(id){
				this.$store.commit('plusCarPanelData',id)
			},
			subCarPanelDataHandle(id){
				this.$store.commit('subCarPanelData',id)
			},
			
			checkGoodsHandle(id){
				for(let x=0;x<this.carPanelData.length;x++){
					if(id==this.carPanelData[x].sku_id){
						if(this.carPanelData[x].checked==true){
							this.carPanelData[x].checked=false
							this.checkedCount--
							this.checkedPrice-=this.carPanelData[x].price*this.carPanelData[x].num
							
							}
						else{
							if(this.carPanelData[x].num<1){
								this.$message({
								          message: '无法选择，请先前往选订日期',
								          type: 'warning'
								        });
							}
							else{
								this.checkedCount++
							this.checkedPrice+=this.carPanelData[x].price*this.carPanelData[x].num
							this.carPanelData[x].checked=true
							}
							
							
						}
					}
				}
			},
			
			allCheckGoodsHandle(allChecked){
				this.$store.commit('allCheckGoods',allChecked)
			},
			delCheckGoodsHandle(){
				this.$store.commit('delCheckGoods')
			},
			async show(){
				this.token=localStorage.getItem('token')
				const select=await this.axios.get("rng/selData",{params:{phone:this.token.substring(3,14)}})
				const www=await this.axios.get("rng/getday")
				this.carPanelData=select.results
				let ddd=www.results
				this.$store.commit('carPanelData1',this.carPanelData)
				if(this.carPanelData!=""){this.count=this.carPanelData.length}
				for(let x=0;x<this.carPanelData.length;x++){
					
						let ssr=[]
						let wwr=[]
						let ssb=[]
								ssb=ssb.concat(this.carPanelData[x].image)
								ssb=ssb.concat(this.carPanelData[x].show_name)
								this.carPanelData[x].spec_json=ssb
								let ccc=0
								this.carPanelData[x].checked=false
								for(let y=0;y<ddd.length;y++){
									if(ddd[y].flag=="0"){
											if(ddd[y].phone==this.token.substring(3,14)){
										if(ddd[y].sku_id==this.carPanelData[x].sku_id){
										ccc++
										
									}
									}
										}
									
									
								}
								let num=0
								num=ccc
								this.carPanelData[x].num=num
								

					// for(let y=0;y<this.ali_images.length;y++){
					// 	if(this.sku_info[x].sku_id==this.ali_images[y].sku_id){
							
					// 		ssr=ssr.concat(this.ali_images[y].images) 
					// 	}
					// }
					//
					// this.sku_info[x].ali_images=ssr
					// for(let z=0;z<this.sku_list.length;z++){
					// 	if(String(this.sku_info[x].sku_id).substring(0,7)==String(this.sku_list[z].id).substring(0,7)){
					// 		wwr=wwr.concat(this.sku_list[z])
					// 	}
					// }
					// this.sku_info[x].sku_list=wwr
				}
				console.log(this.carPanelData)
				//this.$store.commit("showcar")
			},
			async gettime(){

				const select=await this.axios.get("rng/getday",)
				this.time=select.results
				//console.log(this.time)
				}
			
		},
		mounted(){
			this.show()
			this.gettime()
			this.$nextTick(()=>{ // 页面渲染完成后的回调
			        this.hhhh=String(this.$refs.getheight.offsetHeight-100)+"px"
					console.log(this.hhhh)
			    })
		}
	}
</script>

<style>
.cart-box{
    position: relative;
    margin-top: 40px;
    
    background: #fff;
    border-color: rgba(0,0,0,.14);
}
.cart-box .title{
  position: relative;
    z-index: 10;
    height: 60px;
    padding: 0 10px 0 30px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: rgba(0,0,0,.06) 0 1px 7px;
    background: #f3f3f3;
    background: linear-gradient(#fbfbfb,#ececec);
    line-height: 60px;
    font-size: 18px;
    color: #333;
}
.cart-box .cart-inner{
  padding-bottom: 15px;
}
.cart-box .empty-label{
  height: 49px;
    padding: 385px 0 0 0;
    background: url(../assets/img/cart-box-empty.png) no-repeat center 50px;
    text-align: center;
}
.cart-box .empty-label h3{
  font-size: 14px;
    line-height: 1.5;
    color: #8d8d8d;
    margin-bottom: 17px;
}
.cart-box .empty-label>a.link{
    width: 151px;
    line-height: 38px;
    height: 38px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    display: inline-block;
    color: #999;
    font-size: 12px;
    background: #f9f9f9;
    background: -webkit-linear-gradient(#fff,#f0f0f0);
    background: linear-gradient(#fff,#f0f0f0);
}
.cart-box .cart-table-title{
  position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0,0,0,.08);
}
.cart-box .cart-table-title span {
  float: right;
  text-align: center;
}
.cart-box .cart-table-title .name{
  float: left;
  text-align: left;
}
.cart-box .cart-table-title .operation,
.cart-box .cart-table-title .num,
.cart-box .cart-table-title .price,
.cart-box .cart-table-title .subtotal{
  width: 100px;
}
.cart-box .cart-table-title .subtotal{
  text-align: right;
}
.cart-box .cart-group{
  position: relative;
}
.cart-box .cart-group .cart-items{
  border-top: 1px dashed #eee;
  position: relative;
  height: 85px;
  margin-left: 74px;
}
.cart-box .cart-group .cart-top-items:first-child .cart-items{
  border-top: none;
}
.cart-box .cart-items .items-choose, .cart-items .items-thumb, .cart-items .name{
  float: left;
}
.cart-box .cart-items .items-choose{
  position: absolute;
  left: -74px;
  top: 0;
  width: 74px;
  height: 20px;
  padding-top: 30px;
  padding-left: 10px;
  font-size: 12px;
  color: #999;
}
.cart-box .blue-checkbox-new{
  display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(../assets/img/checkbox-new.png) no-repeat 0 -20px;
    cursor: pointer;
    vertical-align: middle;
}
.cart-box .checkbox-on{
  background: url(../assets/img/checkbox-new.png) no-repeat 0 0;
}
.cart-box .cart-items .items-thumb{
  position: relative;
    margin-top: 5px;
    overflow: hidden;
}
.cart-box .cart-items .items-thumb, .cart-items .items-thumb img{
  width: 108px;
    height: 72px;
}
.cart-box .cart-items .items-thumb>a, .cart-items .items-thumb>i{
  position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    border: 0 solid rgba(255,255,255,.1);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
}
.cart-box .cart-items .name{
  width: 0px;
    margin-left: 10px;
    color: #323232;
    display: table;
}
.hide-row{
  overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cart-items .name-table{
  display: table-cell;
   
    height: 40px;
}
.cart-items .name a{
  color: #333;
    font-size: 16px;
}
.cart-items .name .attribute, .cart-items .name p{
  color: #999;
    font-size: 12px;
    padding-top: 4px;
    line-height: 17px;
}
.hander-car .cart-items .name .attribute li{
  float: left;
    padding: 0 0px;
    position: relative;
}
.hander-car .cart-items .name .attribute li:first-child{
  padding-left: 0;
}
.hander-car .cart-items .item-cols-num{
	overflow: hidden;
	  float: right;
	  width: 140px;
	 
	  text-align:left;
	  color: #666;
	  line-height: 140px;
} 
.hander-car .cart-items .operation, 
.hander-car .cart-items .price, 
.hander-car .cart-items .subtotal{
  overflow: hidden;
    float: right;
    width: 100px;
    text-align: center;
    color: #666;
    line-height: 140px;
}
.hander-car .cart-items .operation{
  padding: 58px 0 0;
  font-size: 12px;
  line-height: 24px;
}
.hander-car .cart-items .operation .items-delete-btn{
  display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    color: #C2C2C2;
    background: url(../assets/img/delete-btn-icon.jpg);
    background-size: 100% auto;
    transition: none;
}
.cart-items .operation .items-delete-btn:hover{
  background-position: 0 -36px;
}
.hander-car .cart-items .subtotal{
  font-weight: 700;
  text-align: right;
}
.cart-items .item-cols-num{
  padding-top: 0px;
    line-height: 40px;
}
.cart-items .select{
  width: 112px;
    height: 40px;
    padding-top: 4px;
    margin: 0 auto;
    line-height: 40px;
}
.select .down, .select .up{
  overflow: hidden;
    float: left;
    display: inline-block;
    width: 34px;
    height: 37px;
    margin-right: 5px;
    background: url(../assets/img/cart-updown.jpg) no-repeat;
    background-image: url(../assets/img/cart-updown.jpg);
    background-size: 100% auto;
    line-height: 40px;
    text-indent: -9999em;
    cursor: pointer;
    user-select: none;
}
.select .down{
  background-position: 0 -60px;
}
.select .down:hover{
  background-position: 0 -180px;
}
.select .down.down-disabled, .select .down.down-disabled:hover{
  background-position: 0 -300px;
    cursor: not-allowed;
}
.select .num{
  position: relative;
    overflow: hidden;
    float: left;
    display: inline-block;
    width: 36px;
    height: 18px;
    margin: 7px 0 0;
    border: none;
    border-radius: 3px;
    line-height: 18px;
    text-align: center;
    font-size: 14px;
}
.select input{
  width: 36px;
    height: 18px;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    padding: 0;
}
.select ul{
  display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
}
.select ul li{
  width: 36px;
    height: 18px;
}
.select .up{
  float: right;
    margin: 0;
    background-position: 0 0;
}
.select .up:hover{
  background-position: 0 -120px;
}
.select .up.up-disabled, .select .up.up-disabled:hover{
  background-position: 0 -240px;
    cursor: not-allowed;
}
.gray-box .cart-bottom-bg{
  /*height: 80px;
    background: url(../img/store/library/cart-wrapper-bg.jpg) repeat-x;
    border-top: 1px solid #D9D9D9;*/
    border-radius: 0 0 8px 8px;
}
.fix-bottom{
  height: 70px;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
    background-position: center;
    background: #fdfdfd;
    background: linear-gradient(#fdfdfd,#f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0,0,0,.04);
}
.cart-bar-operation{
  float: left;
    padding: 35px 26px;
    font-size: 12px;
}
.choose-all, .delete-choose-goods, .selected-count{
  float: left;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    position: relative;
}
.delete-choose-goods{
  position: relative;
    margin-left: 21px;
    color: #bbb;
}
.delete-choose-goods-disabled{
  cursor: not-allowed;
}
.shipping{
  display: inline-block;
    margin: 0 auto;
    padding: 5px;
}
.shipping-box{
  display: inline-block;
  border: 1px salmon solid;
    padding-top: 1px;
    margin-right: 10px;
}
.shipping-total{
  display: inline-block;
    border-left: 1px solid #e1e1e1;
    padding: 0 20px;
}
.shipping-total:first-child{
  border: none;
}
.shipping-total.shipping-num{
    border: 1px saddlebrown solid;
	width: 25%;font-size: 12px;
}
.shipping-total h4{
  color: #323232;
}
.shipping-total h4 i{
  font-size: 12px;
    font-weight: 700;
}
.shipping-total.shipping-num i{
  width: 28px;
    display: inline-block;

}
.shipping-total h4.highlight i, .shipping-total h4.highlight span{
  color: #d44d44;
}
.shipping-total h5{
  color: #959595;
}
.shipping-total h5 i{
  width: 28px;
    display: inline-block;

}
.shipping-total{
    display: inline-block;
    border-left: 1px solid #e1e1e1;
    padding: 0 20px;
}
.shipping-total.shipping-price{
  width:25%;border: 1px saddlebrown solid;font-size: 12px;
    padding-right: 0;padding-left: 0px;
}
.blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
  display: block;
    padding: 1px;
    margin: 0 auto;
    border-radius: 9px;
    background: #015e94;
    background: linear-gradient(#5598c9,#2a6da2);
    text-align: center;
    text-shadow: rgba(255,255,255,.496094) 0 1px 0;
    cursor: pointer;
    user-select: none;
}
.jianguo-blue-main-btn{
  background: #567CE6;
    background: linear-gradient(#799CEA,#567CE6);
    box-shadow: 0 1px 3px rgba(0,0,0,.1), inset 0 -1px 2px rgba(0,0,0,.2);
}
.cart-box .big-main-btn{
  height: 45px;
}
.cart-box .big-main-btn{
  float: right;
    background: #5d86e5;
    background: -webkit-linear-gradient(#688fe8,#5079e1);
    background: linear-gradient(#688fe8,#5079e1);
}
.cart-box .big-main-btn.jianguo-blue-main-btn.disabled-btn{
  background: #A9A9A9;
    background: linear-gradient(#BFBFBF,#999);
    box-shadow: none;
}
.cart-box .blue-main-btn a, .gray-main-btn a, .jianguo-blue-main-btn a{
  display: block;
    padding: 2px 0;
    border-radius: 9px;
    background: #5f7ed7;
    background: linear-gradient(#739fe1,#5f7ed7);
    box-shadow: inset 0 1px 3px #92b6ec, inset 0 0 2px #627dca, inset 0 -2px 3px #4c69b8;
    text-shadow: #4f70b3 0 -1px 0;
    cursor: pointer;
    color: #fff;
    transition: all .3s ease;
}
.cart-box .jianguo-blue-main-btn a{
  background: #6C94F3;
    background: linear-gradient(#7EA3F5,#5A82F0);
    box-shadow: none;
    text-shadow: none;
    color: #FFF;
    transition: all .3s ease;
}
.cart-box .big-main-btn a{
  height: 44px;
  line-height: 45px;
  font-size: 18px;
}
.cart-box .big-main-btn a{
  padding: 2px 32px;
  font-size: 16px;
}
.jianguo-blue-main-btn.disabled-btn a, 
.jianguo-blue-main-btn.disabled-btn:active a, 
.jianguo-blue-main-btn.disabled-btn:hover a{
  background: #B7B7B7;
  background: linear-gradient(#C3C3C3,#ABAAAA);
  box-shadow: inset 0 1px 3px #CCC;
}
.disabled-btn, .disabled-btn a{
  opacity: .7;
  cursor: not-allowed;
}
</style>
