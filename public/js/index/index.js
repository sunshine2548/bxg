/**
 * Created by Asus on 2017/8/28.
 */
define(["jquery", "echarts"], function ($, echarts) {
  
  $.ajax({
    type: "get",
    url: "/api/dashboard",
    success: function (info) {
      // 指定图表的配置项和数据
      var myChart = echarts.init(document.getElementById('main'));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(info);
    }
  })
  
});