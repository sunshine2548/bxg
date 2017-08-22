/**
 * Created by Asus on 2017/8/22.
 */
define(["jquery", "template", "tool"], function ($, template, tool) {
  
  $(function () {
    var tc_id = tool.getParam("tc_id");
    // console.log(tc_id);
    if (tc_id) {
      //编辑功能
      $.ajax({
        type: "get",
        url: "/api/teacher/edit",
        data: {
          tc_id: tc_id
        },
        success: function (info) {
          if (info.code == 200) {
            var data = info.result;
            data.title = "讲师编辑";
            data.btnText = "修 改";
            data.type = "edit";
            var html = template("teacher_add_tp1", data);
            $(".teacher").html(html);
  
            //添加日期控件
            tool.setDate("#tc_join_date");
          }
        }
      });
      
    } else {
      //添加功能
      var html = template("teacher_add_tp1", {
        title: "讲师添加",
        btnText: "添 加",
        type: "add"
      });
      $(".teacher").html(html);
      //添加日期控件
      tool.setDate("#tc_join_date");
    }
    
    $(".teacher").on("click", ".btn_add", function () {
      console.log("hehe");
      var url = "";
      if (tc_id) {
        url = "/api/teacher/update";
      } else {
        url = "/api/teacher/add";
      }
      $.ajax({
        type: "post",
        url: url,
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            location.href = "/teacher/list";
          }
        }
      });
      
      
    });
    
  });
  
  
});