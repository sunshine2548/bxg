/**
 * Created by Asus on 2017/8/23.
 */

define(["jquery", "template", "tool"], function ($, template, tool) {
  
  $(function () {
    
    var cg_id = tool.getParam("cg_id");
    
    if (cg_id) {
      $.ajax({
        type: "get",
        url: "/api/category/edit",
        data: {
          cg_id: cg_id
        },
        success: function (info) {
          console.log(info);
          var data = info.result;
          data.title = "修改分类";
          data.btnText = "修 改";
          var html = template("category_add_tp1", data);
          $(".course-category").html(html);
        }
      });
      
    } else {
      $.ajax({
        type: "get",
        url: "/api/category/top",
        data: $("form").serialize(),
        success: function (info) {
          var html = template("category_add_tp1", {
            title: "添加分类",
            btnText: "添 加",
            top: info.result
          });
          $(".course-category").html(html);
        }
      });
    }
    
    $("body").on("click", "#btn_save", function () {
      
      var url = "";
      if (cg_id) {
        url = "/api/category/modify";
      } else {
        url = "/api/category/add";
      }
      
      $.ajax({
        type: "post",
        url: url,
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            location.href="/category/list";
          }
        }
      })
      
    });
    
    
  });
  
  
});