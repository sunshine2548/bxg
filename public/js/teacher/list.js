/**
 * Created by Asus on 2017/8/20.
 */
define(["jquery", "template", "bootstrap"], function ($, template) {
  $(function () {
    $.get("/api/teacher", function (info) {
      if (info.code == 200) {
        var html = template("teacher_list_tp1", info);
        // console.log(info);
        $("#teacher_list").html(html);
      }
    });
    
    //点击查看按钮,让模态框显示,注册委托事件
    $("#teacher_list").on("click", ".btn_view", function () {
      var tc_id = $(this).parent().data("id");
      //获取到id,发送ajax,查看讲师详细信息
      $.ajax({
        type: "get",
        url: "/api/teacher/view",
        data: {
          tc_id: tc_id
        },
        success: function (info) {
          if (info.code == 200) {
            var html = template("teacher_info_tp1", info.result);
            $("#teacher_info").html(html);
            $("#teacherModal").modal('show');
          }
        }
      });
    });
    
  //注销,启用功能
    $("#teacher_list").on("click",".btn_handle",function(){
      var tc_id = $(this).parent().data("id");
      var tc_status = $(this).parent().data("status");
      var $that = $(this);
      $.ajax({
        type:"post",
        url:"/api/teacher/handle",
        data:{
          tc_id:tc_id,
          tc_status:tc_status
        },
        success:function(info){
          if(info.code==200){
          // 根据返回的status切换状态
            if(info.result.tc_status==0){
              $that.text("注销");
              $that.removeClass("btn-success").addClass("btn-warning");
            }else{
              $that.text("启用");
              $that.addClass("btn-success").removeClass("btn-warning");
            }
            $that.parent().data("status",info.result.tc_status);
          }
        }
      });
    });
    
    
  })
})





