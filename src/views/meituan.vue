<template>
	<div id='app' v-cloak>
        <!-- <header class="header">
          <span>时间范围</span>
        </header> -->
        <div class="body">
            <div class='calendar'>
                <div class='week-title'>
                    <div>日</div>
                    <div>一</div>
                    <div>二</div>
                    <div>三</div>
                    <div>四</div>
                    <div>五</div>
                    <div>六</div>
                </div>
                <div class='box' style="background-color:#000000;">
                    <div class='calendar-body' style="background-color:#000000;color: rgba(0,255,255);">
                        <div v-for="(item,index) in calendar" style="background-color:#000000;">
                            <!-- 标题 -->
                            <div class='data-title' style="background-color:#000000;color:lightgreen;">
                                {{item.fullYear + '年' + item.fullMonth+'月'}}
                            </div>
                            <!-- 日期 -->
                            <div class='calendar-data' style="background-color:#000000;color: rgba(0,255,255);">
                                <div class="day"                      
                                :class="item2.disabled + ' '+ item2.disabled2 + ' ' +item2.start_date + ' ' + item2.end_date +' ' + item2.active_date"  
                                v-for="(item2,index) in item.days" 
                                @click="selectDate(item2)">
                                    {{item2.day}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="screenbottom" style=" box-shadow: 0 2px 12px 0 #48D8BF;">
                <div class="reset" style="background-color: #000000;">
					<i style="color: yellowgreen;font-size: 13px;position: absolute;top:-5px;left: 5px;">入住：{{select_start_ymd}}</i>
					<i style="color: rosybrown;font-size: 13px;position: absolute;top:10px;left: 5px;">离开：{{select_end_ymd}}</i><br>
					<i style="color: rgba(0,255,255,0.8);font-size: 15px;position: absolute;top:3px;left:150px;;">共计：
					{{((new Date(select_end_ymd).getTime()-new Date(select_start_ymd).getTime())/86400000).toFixed(0)}}天</i>
				</div>
                <div class="determine" @click="se">确定</div>
            </div>
        </footer>        
    </div>
	
</template>
<style>
html,body{padding:0;margin:0;height:100%;}
.header{
   width:100%;
   height:40px;
   text-align: center;
   position: relative;
   line-height: 40px;
}
.body{
   width:100%;
   height:87%;
   height: -moz-calc(100% - 80px);
   height: -webkit-calc(100% - 80px);
   height: calc(100% - 80px);
   overflow-y: auto;
   position:absolute;
}
.golbal-left{
   width: 13px;
   height: 13px;
   border-top: 2px solid gainsboro;
   border-right: 2px solid gainsboro;
   transform: rotate(225deg);
   -webkit-transform: rotate(225deg);
   position: absolute;
   left: 16px;
   top: 15px;
}
.calendar {
  width: 100vw;
  text-align: center;
}
.week-title {
  overflow: hidden;
  position: fixed;
  margin-bottom: 1.5rem;
  background-color: #f6f6f8;
  z-index: 2;
}
.week-title>div {
  width: 14.28vw;
  height: 2rem;
  line-height: 2rem;
  float: left;
}
.box {
  position: absolute;
  top: 2rem;
  z-index: 1;
}
.data-title {
  height: 2rem;
  line-height: 2rem;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  clear: both;
}
.calendar-data {
  width: 100vw;
  clear: both;
}
.day {
  width: 14.28vw;
  height: 3rem;
  line-height: 1.6rem;
  float: left;
  display: flex;
  flex-direction: column;
}
.day.disabled{
  color:#ddd;
}
.active-start {
  color:lightcoral;
  font-size: 24px;
  background-color: #000000;
  border-radius: 5px;
   box-shadow: 0 2px 12px 0 rgba(0, 255, 0, 0.8)
}
.active-start::after {
  content: '入住';
  font-size: .5rem;
}
.active {
  color:yellow;
 background-color:rgba(255, 0, 0, 0.2)
}
.active-end {
  color: white;
   border-radius: 5px;;
  background-color: #000000;
  color:lightcoral;
  font-size: 24px;
   box-shadow: 0 2px 12px 0 rgba(0, 255, 0, 0.8);
  position: relative;
}
.active-end::after {
  content: '离开';
  font-size: .5rem;
}
.active-end i{
    position: absolute;
    top:-120%;
    width:100%;
    height:100%;
    background:rgba(0,0,0,1);
    opacity:0.6;
    border-radius:8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-size: 15px;
    color:#fff;
}
.active-end i::after{
    position: absolute;
    content: '';
    float: left;
    width: 0; 
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color:#000 transparent transparent transparent;
    opacity:1;
    bottom:-20px;
    left:50%;
    margin-left:-10px;
}
.screenbottom{
	
   height:45px;
   width:100%;
   display: flex;
}
.reset{
   width:60%;
   height:50px;
   line-height: 40px;
   color:#3E3E3E;
   text-align: center;
   background: #fff;
}
.determine{
   width:40%;
   height:50px;
   line-height: 40px;
   background: #48D8BF;
   color:#000000;
   text-align: center;
}
footer{
	z-index:999;
    position: fixed;
    bottom:0;
    width:100%;
}
[v-cloak] 
{
    display: none;
}
</style>


 <script type="text/javascript">
export default{
         data(){
			 return{
				 start:'',              //开始时间。从当天开始。
            calendar:[],
            month_length: 6,       //最长预定多少个月后的房间  读取总店配置。
            max_reserve_days: 0,   //最长预定天数。，一个月按30天计划
            max_reserve_date: '',  //最长可预定的日期。例如：2019-09-12
            select_start_ymd : '', //入住开始提交时间  例如：2019-5-8
            select_start_show: '', //入住开始显示时间  例如：05月08日
            select_end_ymd: '',    //离店开始提交时间  例如：2019-5-8
            select_end_show: '',   //离店开始显示时间  例如：05月08日
            select_index:'start',  //记录当前点击时间，所对应的时间是开始时间还是结束时间
            select_all_day:''
			 }
            
         },
         methods:{
           initDate:function(){
                var _this = this;
                // 创建时间对象
                let date = new Date();
                //如果当前时间为凌晨6点前。则当前日期往前一天
                if (date.getHours() < 6) {
                    date = new Date(date.getTime() - 86400 * 1000);
                }
                // 获取完整年月
                let fullDate = [
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate(),
                    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                ];
                /**
                 * 从缓存拿已经设置的开始和结束日期
                 * 如果第一次用户是第一次进入。则设置默认值为,并且保存进缓存。
                 */
                var select_start_ymd = '';
                var select_start_ymd_show = '';
                var select_end_ymd = '';
                var select_end_ymd_show = '';

                if (select_start_ymd == '' || select_start_ymd == undefined || select_start_ymd == 'undefined' || _this.compareDate(select_start_ymd, fullDate[3]) == 3) {
                    select_start_ymd = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                    select_start_ymd_show = _this.parseMonth(date.getMonth() + 1) + '月' + _this.parseDay(date.getDate()) + '日';
                }

                if (select_end_ymd == '' || select_end_ymd == undefined || select_end_ymd == 'undefined' || _this.compareDate(select_end_ymd, fullDate[3]) == 3) {
                    let temp_date = new Date(date.getTime() + 86400 * 1000)
                    select_end_ymd = temp_date.getFullYear() + '-' + (temp_date.getMonth() + 1) + '-' + temp_date.getDate();
                    select_end_ymd_show = _this.parseMonth(temp_date.getMonth() + 1) + '月' + _this.parseDay(temp_date.getDate()) + '日';
                }
                //设置数据。并且保存缓存
                _this.select_start_ymd = select_start_ymd
                _this.select_end_ymd = select_end_ymd

                //通过月份。计划最长可预定天数和日期  ,最后一天为离店时间。所以多加一天可选择
                let max_reserve_days = _this.month_length * 30 + 1;

                //最大天数转换成毫秒数。再转换成时间
                let max_date = new Date(date.getTime() + max_reserve_days * 24 * 60 * 60 * 1000);
                let max_reserve_date = max_date.getFullYear() + '-' + (max_date.getMonth() + 1) + '-' + max_date.getDate() + '';
                _this.max_reserve_days = max_reserve_days
                _this.max_reserve_date = max_reserve_date

                //获取当前月份完整日期天数
                let cur_month_date = new Date(fullDate[0] + '-' + _this.parseMonth(fullDate[1]) + '-01')
                let cur_month = {};
                cur_month.fullYear = fullDate[0]; //  年
                cur_month.fullMonth = fullDate[1];  //月
                cur_month.dayLength = _this.getMonthDays(cur_month.fullMonth, cur_month.fullYear);//当前月份总共有多少天
                cur_month.firstDayWeek = cur_month_date.getDay();  //当前月份第一天星期几0~7
                cur_month.curDay = date.getDate(); //当前天
                cur_month.days = [];
                //初始化天数
                var item = {};
                for (let i = 1; i <= cur_month.dayLength; i++) {
                    item = {
                        ymd: cur_month.fullYear + '-' + cur_month.fullMonth + '-' + i,
                        ymd_cn: _this.parseMonth(cur_month.fullMonth) + '月' + _this.parseDay(i) + '日',
                        day: i,
                        disabled: i < cur_month.curDay ? 'disabled' : '',
                    };
                    //开始时间
                    item.start_date = _this.compareDate(_this.select_start_ymd, item.ymd) == 2 ? 'active-start' : '';
                    //中间的日期
                    item.active_date = (_this.compareDate(_this.select_start_ymd, item.ymd) == 3 && _this.compareDate(_this.select_end_ymd, item.ymd) == 1) ? 'active' : '';
                    //结束时间
                    item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                    //超过设置最长日期。禁止选择
                    item.disabled2 = _this.compareDate(max_reserve_date, item.ymd) == 3 ? 'disabled' : '';
                    cur_month['days'].push(item);
                }

                //前补0
                if (cur_month.firstDayWeek > 0) {
                    for (let i = 0; i < cur_month.firstDayWeek; i++) {
                        cur_month['days'].unshift('');
                    }
                }

                _this.calendar.push(cur_month)

                var next_month_date;
                var nextfullDate = [];
                for (let i2 = 0; i2 < _this.month_length; i2++) {
                    //下一个朋的天数信息
                    next_month_date = new Date(fullDate[0], fullDate[1] + i2, '1');
                    nextfullDate = [
                        next_month_date.getFullYear(),
                        next_month_date.getMonth() + 1,
                    ]
                    var next_month = {};
                    next_month.fullYear = nextfullDate[0]; //  年
                    next_month.fullMonth = nextfullDate[1];  //月
                    next_month.dayLength = _this.getMonthDays(next_month.fullMonth, next_month.fullYear);//当前月份总共有多少天
                    next_month.firstDayWeek = next_month_date.getDay();  //当前月份第一天星期几0~6
                    next_month.days = [];
                     //初始化天数
                    for (let i = 1; i <= next_month.dayLength; i++) {
                        item = {
                            ymd: next_month.fullYear + '-' + next_month.fullMonth + '-' + i,
                            ymd_cn: _this.parseMonth(next_month.fullMonth) + '月' + _this.parseDay(i) + '日',
                            day: i,
                            active: '',
                            disabled: '',
                        };
                        //开始时间
                        item.start_date = _this.compareDate(_this.select_start_ymd, item.ymd) == 2 ? 'active-start' : '';
                        //中间的日期
                        item.active_date = (_this.compareDate(_this.select_start_ymd, item.ymd) == 3 && _this.compareDate(_this.select_end_ymd, item.ymd) == 1) ? 'active' : '';
                        //结束时间
                        item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                        //超过设置最长日期。禁止选择
                        item.disabled2 = _this.compareDate(max_reserve_date, item.ymd) == 3 ? 'disabled' : '';
                        next_month['days'].push(item);
                    }
                    //前补0
                    if (next_month.firstDayWeek > 0) {
                        for (let i = 0; i < next_month.firstDayWeek; i++) {
                        next_month['days'].unshift('');
                        }
                    }
                    _this.calendar.push(next_month)
                }
                console.log(_this.calendar);
            },
                        //格式月份期
            parseMonth: function(month){
                month = parseInt(month);
                if(month <10){
                    month = '0'+month
                }
                return month;
            },

            //格式天
            parseDay: function (day) {
                day = parseInt(day);
                if (day < 10) {
                day = '0' + day
                }
                return day;
            },
            // 获取每个月的天数
            getMonthDays(m, year) {
                let days = [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (m != 2) {
                    return days[m];
                }
                if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 && year % 100 === 0)) {
                    return 29
                } else {
                    return 28
                }
            },
            compareDate(date1, date2){
                var dateone = date1.replace(/-/g,'/');
                var datetwo = date2.replace(/-/g,'/');
                var oDate1 = new Date(dateone)
                var oDate2 = new Date(datetwo)
                if(oDate1.getTime() > oDate2.getTime()){
                    return 1; //大于
                } else if (oDate1.getTime() == oDate2.getTime()) {
                    return 2; //等于
                }else{
                    return 3; //小于
                }
            },
            //点击日期按钮
            selectDate:function(item){
                var _this = this;
                let select_data = item;
                console.log(select_data)
                let select_start_ymd = _this.select_start_ymd;
                let select_end_ymd = _this.select_end_ymd;
                //如果是点击不能用的地址
                if (select_data.disabled != ''){
                    return false;
                }
                if (_this.select_index == 'start') {
                    select_start_ymd = select_data.ymd;
                    //如果选择的日期。是当前日期。或者比当前开始日期还早的。就 要把当前日期变为开始日期
                   
                    _this.select_start_ymd = select_start_ymd;
                    _this.select_start_ymd_show = select_data.ymd_cn;
                    _this.select_end_ymd = '';
                    _this.select_end_ymd_show = '';

                    //将索引改为结束时间

                    _this.select_index = 'end';

                } else if (_this.select_index == 'end'){
                    let v = _this.compareDate(select_start_ymd, select_data.ymd)
                    //如果选择的时间大于开始时间。则有效。否则重置开始时间
                    if(v == 3 ){
                        _this.select_end_ymd = select_data.ymd;
                        _this.select_end_ymd_show = select_data.ymd_cn;
                        //将索引改为结束时间
                        _this.select_index = 'start';
                        //保存数据到缓存
                        _this.saveDate();
                    }else{
                        _this.select_start_ymd = select_data.ymd;
                        _this.select_start_ymd_show = select_data.ymd_cn;
                        _this.select_end_ymd = '';
                        _this.select_end_ymd_show = '';
                        //将索引改为结束时间
                        _this.select_index = 'end';
                    }

                }
                _this.resetCalendar();
            },
            //重新计算一下日历
            resetCalendar:function(){
                let _this = this;
                let calendar = _this.calendar;
                if(calendar.length > 0 ){
                    for (var i in calendar){
                        if(calendar[i]['days'].length > 0 ){
                            for (var i2 in calendar[i]['days']) {
                                if (calendar[i]['days'][i2] != ''){
                                    //开始时间
                                    calendar[i]['days'][i2]['start_date'] = _this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 2 ? 'active-start' : '';
                                    //中间的日期
                                    calendar[i]['days'][i2]['active_date'] = (_this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 3 && _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 1) ? 'active' : '';
                                    //结束时间
                                    calendar[i]['days'][i2]['end_date'] = _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 2 ? 'active-end' : '';
                                }
                            }    
                        }
                    }
                }

                _this.calendar = calendar;
            },
            //如果设置结束时间成功。保存一次当前时间。并且计算总天数。到缓存中
            saveDate:function(){
                var _this = this;
                var date1 = new Date(this.select_start_ymd.replace(/-/g,'/'));
                var date2 = new Date(this.select_end_ymd.replace(/-/g,'/'));
                //计算天数
                var days = parseInt((date2.getTime() - date1.getTime()) / 1000 / 86400);
                //保存缓存
                _this.select_all_day = days;
            },
			se(){
				let se=[]
				se.push(this.select_start_ymd)
				se.push(this.select_end_ymd)
				this.$router.push({
				          name: 'Shop',
				          params: {
				            se: se
				          }
				        })
				
				
			},
			exit(){
				this.$router.push({
				          name: 'Shop'
				        })
			}
         },computed:{

         },mounted(){
            var _this = this;
            _this.$nextTick(function () {
                _this.initDate()
            })
         }
    }
 </script>
