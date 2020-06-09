<template>
  <div>
    <div style="position:absolute;top:80px;height: 30px;z-index: 10;right:20px;right: 5px;">
		<i style="color: #00B7FF;" class="el-icon-s-promotion">{{(ks.distance/1000).toFixed(1)}}</i>km
		
	</div>
	<!-- <div style="position:absolute;top:115px;height: 30px;z-index: 100;right:20px;right: 5px;">
		<i style="color:coral" class="el-icon-time">{{(ks.time/60).toFixed(0)}}</i>分钟
		
	</div> -->
	
  </div>
</template>
<script>
  var map
  export default {
	  props:{
	  	demo:{
	  		required:true
	  	}
	  },
	  data(){
		return{
			ks:""
		}  
	  },
    mounted: function () {
      this.init()
    },	 
  //     init: function () {
  //       map = new AMap.Map('container', {
		// 	 mapStyle: 'amap://styles/whitesmoke',
  //         center: [116.397428, 39.90923],
  //         resizeEnable: true,
  //         zoom: 13
  //       })
  //       var startLngLat =[]
		// AMap.plugin('AMap.CitySearch', function () {
		//   var citySearch = new AMap.CitySearch()
		//   citySearch.getLocalCity(function (status, result) {
		//     if (status === 'complete' && result.info === 'OK') {
		//       // 查询成功，result即为当前所在城市信息
		// 	  AMap.plugin('AMap.Geocoder', function() {
		// 	    var geocoder = new AMap.Geocoder({
		// 	      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
		// 	      city: result.adcode
		// 	    })
			   
		// 	    var lnglat = result.rectangle.split(";")[0].split(",");
			  
		// 	    geocoder.getAddress(lnglat, function(status, data) {
		// 	      if (status === 'complete' && data.info === 'OK') {
		// 			startLngLat=result.rectangle.split(";")
		// 			AMap.plugin('AMap.Driving', function() {
		// 			var driving = new AMap.Driving({
		//     // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
		// 			map: map,
		//             center:map.getCenter()
		// 			})
					
		// 			var endLngLat = [116.427281, 39.903719]
		// 			startLngLat=[119.8824799,29.95931271]
		// 			driving.search(startLngLat[0], endLngLat, function (status, result) {
		//     // 未出错时，result即是对应的路线规划方案
		// 				console.log(result)
		// 			})
		// 			})
		// 	      }
		// 	    })
		// 	  })
		//     }
		//   })
		// })
  //     }
	watch:{
		newName:{
			handler(val) {
			      this.newName=val
				  this.init()
			    },
			deep: true,
		}
	},
	computed: {
	      newName: {
			  get:function(){
				  return this.$store.getters.address
			  },
				set:function(val){
					return val
				}
	      }
	    },
    methods: {
    async init() {
		const self=this;
		let address=this.$store.getters.address
		var endLngLat=[this.demo.yy,this.demo.xx]
		AMap.plugin('AMap.CitySearch', function () {
		  var citySearch = new AMap.CitySearch()
		  citySearch.getLocalCity(function (status, result) {
		    if (status === 'complete' && result.info === 'OK') {
		      // 查询成功，result即为当前所在城市信息
			  AMap.plugin('AMap.Geocoder', function() {
			    var geocoder = new AMap.Geocoder({
			      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
			    })
			    var lnglat = result.rectangle.split(";")[0].split(",");
			
			if(address!=""){
				let a=""
				geocoder.getLocation(address, function(status, result) {
				    if (status === 'complete' && result.info === 'OK') {

					 var startLngLat=[]
					 startLngLat.push(result.geocodes[0].location.R)
					 startLngLat.push(result.geocodes[0].location.Q)
					 AMap.plugin('AMap.Driving', function() {
					 var driving = new AMap.Driving({
					     // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
					         map: map,
					             
					   })
					 
					   driving.search(startLngLat, endLngLat, function (status, result) {
					     // 未出错时，result即是对应的路线规划方案
						 self.ks=result.routes[0]
						console.log(result)
					   })
					 })
				    }
				  })
				  
			}
			else{
				geocoder.getAddress(lnglat, function(status, data) {
			      if (status === 'complete' && data.info === 'OK') {
					var startLngLat=[]
					startLngLat.push(result.rectangle.split(";")[0].split(",")[0])
					startLngLat.push(result.rectangle.split(";")[0].split(",")[1])
					  AMap.plugin('AMap.Driving', function() {
          var driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                map: map,
                    
          })
			var p1 = [116.434027, 39.941037];
			var p2 = [116.461665, 39.941564];
			// 返回 p1 到 p2 间的地面距离，单位：米
			var dis = AMap.GeometryUtil.distance(p1, p2);
			
          driving.search(startLngLat, endLngLat, function (status, result) {
            // 未出错时，result即是对应的路线规划方案
			self.ks=result.routes[0]
          })
        })
					
					
			      }
			    })
			}
			  })
		    }
		  })
		})		
		
		
		
		
		
		
		
      
      }
    }
  }
</script>
<style>
</style>