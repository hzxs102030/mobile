<template>
	<div style="display: flex;height: 100px;">
	      <transition name="el-fade-in-linear" >
	        <div class="transition-box" v-show="show6" style="position: absolute;top:50px;width: 100%;height: 700px;margin-right: 0px;padding-left: 0px;padding-right: 0px;">
			<div style="font-size: 24px;100%;border-bottom: 1px solid rgba(0,255,255);padding-left: 5%;">所有评价
					<i style="color:lightpink;font-size: 18px;"></i></div>
					  <el-table :data="message" border :row-style="tableRowStyle"
			:header-cell-style="tableHeaderColor" style="margin-top: 20px;background-color: rgba(0,0,0,0);"
			size="mini">
						<el-table-column property="pay_id" label="对象缩略图" width="129">
							<template slot-scope="scope">
								<el-link type="danger" @click="checkDetail(scope.row)" :underline="false">
									<img :src="scope.row.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"
									width="108px">
								</el-link>
							</template>
						</el-table-column>
						<el-table-column property="pingfen" label="评分" width="40"></el-table-column>
						<el-table-column property="pingjia" label="评价" width="250"></el-table-column>
					    
						<el-table-column width="100"   label="评价操作">
						<template slot-scope="scope">
							<el-link type="danger" @click="checkDetail(scope.row)" :underline="false">
								<i class="el-icon-delete"></i>删除评价
							</el-link>
						</template>
						</el-table-column>
					  </el-table>		
			</div>
	      </transition>
	     
	</div>
</template>

<script>
export default{
	data(){
		return{
			message:[]
		}
	},
	props:["show6"],
	methods:{
		personal(){
			
		},
		tableRowStyle({ row, rowIndex }) {
		      return 'background-color: #F7F6Fd'
		    },
		    // 修改table header的背景色
		    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		      if (rowIndex === 0) {
		        return 'background-color:rgba(0,0,0,0.7);color:rgba(0, 255, 255,0.8);font-weight: 500;border:rgba(0, 255, 255,0.8)'
		      }
		    },
		personal(){
			
		},
		async getPingjia(){
				   let f=localStorage.getItem('token').substring(3,14)
					const select=await this.axios.get("rng/selfenshu",{params:{phone:f}})
					const delect=await this.axios.get("rng/sku_info")
					let dd=delect.results
					this.message=select.results
					for(let x=0;x<this.message.length;x++){
						
						for(let y=0;y<dd.length;y++){
							if(String(dd[y].sku_id).substring(0,7)==this.message[x].sku_id){
								this.message[x].ali_image=dd[y].ali_image
							}
						}
					}
					console.log(this.message)
				},
	},
	mounted(){
	    this.getPingjia()
	},
}
</script>

<style>
	.transition-box {
	    margin-bottom: 10px;
	    height: 400px;
	    background-color: rgba(0,0,0,0.7);box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.8);
	    color: #fff;
	    padding: 40px 20px;
	    box-sizing: border-box;
	  }
</style>