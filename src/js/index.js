/**
 * Created by ahf on 2016/12/6.
 */
//初始化
var dataJson={
	"mks":{},
};
var dataPush = 1;
var itemTab=$(".row .item-tab");
itemTab.on("click", function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    var subText=$(this).find(".item-tab-sub").attr("num")
    if(subText){
		var dt=dateParse(subText);
		init(dt.minDate,dt.maxDate)
    }
});
function dateParse(num){
	var datetime=dataJson.mks["datetime"],
		l=datetime.length,
		dt;
		if(num<=12){
			var minDate=datetime[l-1],maxDate=datetime[l-1];
			minDate=new Date(minDate);
			minDate=minDate.setMonth(minDate.getMonth()-num);
			minDate=format(new Date(minDate),"line");
		}else{
			var minDate=datetime[0],maxDate=datetime[l-1];
		}
		dt={
			minDate:minDate,
			maxDate:maxDate
		};
		return dt;
}
function format(obj,type){
    var year=obj.getFullYear();
    var month=((obj.getMonth()+1).toString().length)==1?"0"+(obj.getMonth()+1):(obj.getMonth()+1);
    var date=(obj.getDate().toString().length)==1 ? "0"+obj.getDate():obj.getDate();
    if(type=="line"){
    return (year+'-'+month+"-"+date);
    }else if(type=="dot"){
    return (year+','+month+","+date);
    }
}
function init(date1,date2){
    var date1=date1||"2004-01-30";
    var date2=date2||"2026-10-25";
     $.post("./api/api.php?c=webHistory", { start:date1,end:date2},function(xhr){
        var json=JSON.parse(xhr);
       if(json.code=="1"){
           /*回测指标*/
           var index_num=$(".index-num");
           var rate_arr=[];
           rate_arr[0]=json.data.xiapu;
           rate_arr[1]=json.data.max_back+"%";
           rate_arr[2]=json.data.year_wave_rate+"%";
           rate_arr[3]=json.data.year_rate+"%";
           rate_arr[4]=json.data.total_revenue+"%";
           for(var i=0;i<index_num.length;i++){
               index_num[i].innerHTML=rate_arr[i];
           }
            
           var data=json.data;
           var datetime=[],moqiu=[],hushen=[];
           //历史回测
           datetime=data.date;
           moqiu=data.moqiu;
           hushen=data.hushen;
           if(dataPush==1){
	           	dataJson.mks={
		           	datetime:datetime,
		           	moqiu:moqiu,
		           	hushen:hushen
	           };
	           	dataPush=2;
           };
           
           historyChart.setOption({
           		xAxis: [                                    // 直角坐标系中横轴数组
                   {
                       data: datetime,
                   }
               ],
               series: [
                   {
                       data: moqiu
                   },
                   {
                       data: hushen
                   }
               ]
           });

       }else{
           alert(json.msg);
       }
    } );
}
	var historyChart = echarts.init(document.getElementById('history'));
    var option = {
               legend: {                                      // 图例配置
                   data: [{
                       name:"魔球"
                   },{
                       name:"沪深300"
                   }],
//                 right:90,
                   top:15,
                   icon:"bar",
                   itemGap:20,
                   itemWidth:20,
                   itemHeight:3,
                   textStyle:{
                       fontSize:14,
                       color:"#000"
                   },
                   selectedMode:"multiple"
               },
               grid:{
               		x:35,
                    y:45,
                    x2:10,
                    y2:30,
               },
               color:["#00a3f1","#cc0004"],
               tooltip: {                                  // 气泡提示配置
                   trigger: 'axis',                      // 触发类型，默认数据触发，可选为：'axis',
                   axisPointer:{
                       type:"line"
                   }
               },
               xAxis: [                                    // 直角坐标系中横轴数组
                   {
                       type: 'category',                   // 坐标轴类型，横轴默认为类目轴，数值轴则参考yAxis说明
                       data: [],
                       splitLine:{
                           show:false
                       }
                   }
               ],
               yAxis: [                                    // 直角坐标系中纵轴数组
                   {
                       type: 'value',                      // 坐标轴类型，纵轴默认为数值轴，类目轴则参考xAxis说明
                       boundaryGap: [0.1, 0.1],            // 坐标轴两端空白策略，数组内数值代表百分比
//                     min:"dataMin"
                   }
               ],
               series: [
                   {
                       name: "魔球",                        // 系列名称
                       symbol:"none",
                       itemStyle:{
                           normal:{
                               lineStyle:{
                                   width:2
                               }
                           }
                       },
                       type: 'line',                       // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
//                     data: moqiu
                   },
                   {
                       name: '沪深300',                        // 系列名称
                       symbol:"none",
                       itemStyle:{
                           normal:{
                               lineStyle:{
                                   width:2
                               }
                           }
                       },
                       type: 'line',                       // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
//                     data: hushen
                   }
               ]
           };
	historyChart.setOption(option);
	init();

