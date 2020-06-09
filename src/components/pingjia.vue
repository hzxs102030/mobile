<template>
	<div style="width:100%;position:relative;left:0%;height:360px;padding-top: 20px;" >
		
		<div style="position: absolute;right:1%;top:0px;z-index: 20;" v-if="!flag" >
			<el-button round @click="dialogFormVisible = true"><i class="el-icon-edit-outline"  ></i>撰写评论</el-button>
		</div>
		   
		 

		<swipe class="my-swipe" style="height: 360px;z-index: 10;" loop:true>
		      <swipe-item class="slide1" v-for="item,index in pingjia" :key="index" style=";height:350px;width:98%;margin-left: 1%;margin-right: 1%;height: 355px;border-bottom-right-radius:20px ;border-bottom-left-radius:20px ;box-shadow: 0 2px 2px 0 rgba(221, 223, 230, 0.8);">
			  
				<div style="color: #909090;color:firebrick;position: absolute;width: 100%;height: 20px;top:0px;margin-left: 10px;" v-if="item.name">来自用户{{ item.name }}的评论：
				<div style="position: absolute;">
					<el-rate
			  	  v-model="item.pingfen"
			  	  disabled
			  	  show-text
			  	  text-color="#ff9900">
				  
			  	</el-rate>
				
				</div><div style="color:#D0D0D0;position: absolute;margin-left: 200px;">时间：{{ item.shijian.substring(0,10) }}</div>
				<div style="position: absolute;left: 0%;top:40px ;">
				<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 0px;font-size: 16px;" v-if="item.tag1">{{item.tag1}}</el-tag>
				<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag2">{{item.tag2}}</el-tag>
				<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag3">{{item.tag3}}</el-tag>
				</div>
				</div>
				
				<div style="color: #909090;position: absolute;width: 100%;height: 20px;top:0px;margin-left: 10px;" v-else>当前评论来自匿名用户：
				<div style="position: absolute;">
				<el-rate
				  v-model="item.pingfen"
				  disabled
				  show-text
				  text-color="#ff9900">
				</el-rate>
				</div>
				<div style="color:#D0D0D0;position: absolute;right: 20px;">发表时间：{{ item.shijian.substring(0,10) }}</div>
				<div style="position: absolute;left: 0%;top:40px ;">
					<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 0px;font-size: 16px;" v-if="item.tag1">{{item.tag1}}</el-tag>
					<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag2">{{item.tag2}}</el-tag>
					<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag3">{{item.tag3}}</el-tag>
				</div>
				</div>
				<div :style="randomRgb2(item)" style="position: absolute;top:80px;font-size: 24px;margin-left: 10px;width: 90%;height:200px;" >{{ item.pingjia }}</div>
				
				
			  </swipe-item>
		      <swipe-item v-if="flag" @click="dialogFormVisible = true">
				  <div style="color: #909090;" >暂无评价！
				  	
				  </div>
				  <div  shadow="hover":style="randomRgb2()" style="width: 70%;height: 40%;font-size: 24px;text-align: center;border: 0px ;" @click="dialogFormVisible = true"><i class="el-icon-edit"></i>给我打个分吧！
				  	    </div>
			  </swipe-item>
		   </swipe>

		<!-- <el-carousel :interval="8000" height="250px" style="width: 100%;" v-if="!flag">
		  <el-carousel-item v-for="item,index in pingjia" :key="index" style="border-radius: 20px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
		
			<div style="width:90%;height:70%;margin-left: 5%;margin-top:2%;">
				<div style="position:absolute;right:40%"><el-rate
				  v-model="item.pingfen"
				  disabled
				  show-text
				  text-color="#ff9900">
				</el-rate> </div>
				<div style="position:absolute;top:20%;color: #909090;color:firebrick;" v-if="item.name">来自注册用户{{ item.name }}的评价：
				<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px;" v-if="item.tag1">{{item.tag1}}</el-tag>
				<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag2">{{item.tag2}}</el-tag>
				<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag3">{{item.tag3}}</el-tag>
				</div>
				<div style="position:absolute;top:20%;color: #909090;" v-else>来自匿名用户的评价：
					<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px;" v-if="item.tag1">{{item.tag1}}</el-tag>
					<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag2">{{item.tag2}}</el-tag>
					<el-tag :style="randomRgb(item)" style="opacity:70%;margin-left: 5px;font-size: 16px" v-if="item.tag3">{{item.tag3}}</el-tag>
				</div>
				<div style="position:absolute;top:12%;left:2%;color:#D0D0D0;">时间：{{ item.shijian.substring(0,10) }}</div>
				<div :style="randomRgb2(item)" style="position:absolute;top:40%;left:15%;width: 70%;height: 40%;font-size: 24px;" >{{ item.pingjia }}</div>
				
				<div style="position:absolute;top:70%;right:5%;">
				<el-button type="warning" icon="el-icon-sort-down" circle style="font-size: 24px;"></el-button>
				  <el-button type="danger" icon="el-icon-sort-up" circle style="font-size: 24px;"></el-button></div>
			</div>
		    
		  </el-carousel-item>
		</el-carousel> -->
		<!-- <el-carousel :interval="8000" type="card" height="200px" v-else>
		      <el-carousel-item v-for="item in 1" :key="item" style="border-radius: 20px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
		        <div style="width:90%;height:70%;margin-left: 5%;margin-top:2%;">
		        	<div style="position:absolute;top:20%;color: #909090;" >暂无评价！
		        		
		        	</div>
		        	<div  shadow="hover":style="randomRgb2(item)" style="position:absolute;top:40%;left:15%;width: 70%;height: 40%;font-size: 24px;text-align: center;border: 0px ;" @click="dialogFormVisible = true"><i class="el-icon-edit"></i>给我打个分吧！
						    </div>
		        </div>
		      </el-carousel-item>
		</el-carousel> -->
		
		<el-dialog title="" :visible.sync="dialogFormVisible" custom-class="pj">
		<div style="position:relative;width:100%;height:20px;left: 0%;text-align: center;"><el-rate
		    v-model="value2"
		    :colors="colors"
			score-template="{value2}"
			show-text>
		  </el-rate></div>
		<div class="block">
		  
		</div>
<div style="width:100%;height:80px;left: 0%;position:relative;font-size: 18px;text-align: center;"><i class="el-icon-edit-outline"></i>撰写评价
		        	      <div style="width:100%;"><el-input
		        	        type="textarea"
		        	        placeholder="请输入内容"
		        	        v-model="textarea"
		        	        maxlength="30"
		        	        show-word-limit
							
		        	      >
		        	      </el-input></div></div>
<div style="width:100%;height:80px;left:0%;position:relative;font-size: 18px;" :style="randomRgb2()"><i class="el-icon-magic-stick"></i>添加自己喜欢的标签吧！
		        	      <div style="width:100%;left: 0%;position:relative;">
		        	      <el-tag
						  size="small"
		        	        :key="tag"
		        	        v-for="tag in dynamicTags"
		        	        closable
							:style="randomRgb3()"
		        	        :disable-transitions="false"
		        	        @close="handleClose(tag)">
		        	        {{tag}}
		        	      </el-tag>
		        	      <el-input
		        	        class="input-new-tag"
		        	        v-if="inputVisible"
		        	        v-model="inputValue"
		        	        ref="saveTagInput"
		        	        size="small"
							:style="randomRgb2()"
		        	        @keyup.enter.native="handleInputConfirm"
		        	        @blur="handleInputConfirm"
		        	      >
		        	      </el-input>
		        	      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
						 </div></div> 
<div style="width:100%;height:100px;left:0%;position:relative;font-size: 18px" :style="randomRgb2()"><i class="el-icon-data-analysis
"></i>热门标签
		        	      <div style="width:100%;left: 0%;">						  
						<div style="width:100% ;height: 40%;">
							  <el-tag
							  size="small"
						    :key="tag"
						    v-for="tag in dynamicTags2"
						  	:style="randomRgb3()"
						    :disable-transitions="false"
							@click="addtag(tag)"
							>
						    {{tag}}
						  </el-tag>
						  </div></div></div>

		        	  <div slot="footer" class="dialog-footer">
		        	    <el-button @click="dialogFormVisible = false">取 消</el-button>
		        	    <el-button type="primary"  @click="get">确 定</el-button>
		        	  </div>
		        	</el-dialog>
	</div>
  
</template>
<style>
.pj{
width:100%;
}
	.el-tag + .el-tag {
	    margin-left: 10px;
	  }
	  .button-new-tag {
	    margin-left: 10px;
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	  }
	  .input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	  }
</style>
<script>

export default{
	
	
	data(){
		return{
			iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
			pingjia:[],
			value2:4,
		gg:0,
		token:"",
		dynamicTags: [],
		dynamicTags2: ["非常棒","超喜欢","interesting","very Good!","辣鸡","wwwwwwww","下次不会去了","下次还要去","不错","@#￥%……&","环境差","饭菜不好","8行"],
		        inputVisible: false,
		        inputValue: '',
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
			itemId: this.$route.query.itemId,
			
			flag:true,
			textarea: '',
			voteList: [
				          {
				            name: 'A',
				            num: 12,
				            total: 24,
				            bg: '#f00'
				          }, {
				            name: 'B',
				            num: 4,
				            total: 24,
				            bg: '#0f0'
				          }
				        ],
			dialogTableVisible: false,
			        dialogFormVisible: false,
			        form: {
			          name: '',
			          region: '',
			          date1: '',
			          date2: '',
			          delivery: false,
			          type: [],
			          resource: '',
			          desc: ''
			        },
			formLabelWidth: '120px'
		}
	},
	mounted(){
	    this.getPingjia()
		
	},
	created() {
	    this.$nextTick(() => {
	      this.getPingjia()
	    })},
	methods:{
		get(){
			
			this.dialogFormVisible = false
			if(localStorage.getItem('token')){
				this.token=localStorage.getItem('token').substring(3,14)
				this.axios.get("rng/inpingjia",{params:{
				sku_id:String(this.itemId).substring(0,7),
				name:this.token,
				value2:this.value2,
				dynamicTags:this.dynamicTags,
				textarea:this.textarea,
				length:this.dynamicTags.length
				}}).then(res=>console.log(res.sql))
			}
			else{
				this.axios.get("rng/inpingjia",{params:{
				sku_id:String(this.itemId).substring(0,7),
				name:this.token,
				value2:this.value2,
				dynamicTags:this.dynamicTags,
				textarea:this.textarea,
				length:this.dynamicTags.length
				}}).then(res=>console.log(res.sql))
			}
			location.reload()
				
		},
		randomRgb(item) {
		        let R = Math.floor(Math.random() * 255);
		        let G = Math.floor(Math.random() * 255);
		        let B = Math.floor(Math.random() * 255);
		        let r = Math.floor(Math.random() * 255);
		        let g = Math.floor(Math.random() * 255);
		        let b = Math.floor(Math.random() * 255);
		        return {
		          width: (item.num / item.total * 100) + '%', // 进度条
		          color: 'rgb(' + r + ',' + g + ',' + b + ')',
		          background: 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')',
		          border:'1px solid rgb(' + R + ',' + G + ',' + B + ')',
		        };
		      },
		randomRgb2() {
		        let R = Math.floor(Math.random() * 255);
		        let G = Math.floor(Math.random() * 255);
		        let B = Math.floor(Math.random() * 255);
		        return {
		          color: 'rgb(' + R + ',' + G + ',' + B + ')',
		        };
		      },
		randomRgb3() {
		        let R = Math.floor(Math.random() * 255);
		        let G = Math.floor(Math.random() * 255);
		        let B = Math.floor(Math.random() * 255);
				let r = Math.floor(Math.random() * 255);
				let g = Math.floor(Math.random() * 255);
				let b = Math.floor(Math.random() * 255);
		        return {
		          color: 'rgb(' + r + ',' + g + ',' + b + ')',
				  background: 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')',
				  border:'1px solid rgb(' + R + ',' + G + ',' + B + ')',
		        };
		      },
	   async getPingjia(){
		   let sku_id=String(this.itemId).substring(0,7)
			const select=await this.axios.get("rng/pingjia",{params:{sku_id:sku_id}})
			this.pingjia=select.results
			
			if(this.pingjia.length>0){
				this.flag=false
				}
			// console.log(select.sql)
		},
		handleClose(tag) {
		        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
		      },
		
		      showInput() {
				if(this.dynamicTags.length<3){
					this.inputVisible = true;
		        this.$nextTick(_ => {
		          this.$refs.saveTagInput.$refs.input.focus();
		        });
				}
		        else{
					this.$message({
					          message: '警告:最多插入3个标签',
					          type: 'warning'
					        });
				}
		      },
			addtag(tag){
				if(this.dynamicTags.length<3){let inputValue = tag;
				if (inputValue) {
				  this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';}
				else{
					this.$message({
					          message: '警告:最多插入3个标签',
					          type: 'warning'
					        });
				}
				
			},
		      handleInputConfirm() {
		        let inputValue = this.inputValue;
		        if (inputValue) {
		          this.dynamicTags.push(inputValue);
		        }
		        this.inputVisible = false;
		        this.inputValue = '';
		      }
	}

}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>