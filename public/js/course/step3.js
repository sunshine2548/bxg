/**
 * Created by Asus on 2017/8/25.
 */
define(["jquery", "template", "tool", "bootstrap", "jquery_form"], function ($, template, tool) {
  $(function () {
    var cs_id = tool.getParam("cs_id");
    $.ajax({
      type: "get",
      url: "/api/course/lesson",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        // console.log(info);
        if (info.code == 200) {
          var html = template("step3_tpl", info.result);
          $(".course-add").html(html);
        }
      }
    });
    
    $("body").on("click", ".btn_edit", function () {
      var ct_id = $(this).parent().data("id");
      $.ajax({
        type: "get",
        url: "/api/course/chapter/edit",
        data: {
          ct_id: ct_id
        },
        success: function (info) {
          // console.log(info);
          var data = info.result;
          data.title = "修改课时";
          data.btnText = "修 改";
          var html = template("lesson_tpl", data);
          $("#lesson").html(html);
          $("#lesson").data("type", "edit");
          $("#lesson").modal('show');
        }
      })
      
      
    });
    
    
    $("body").on("click", ".btn_add", function () {
      var html = template("lesson_tpl", {
        title: "添加课时",
        btnText: "添 加",
        ct_cs_id:cs_id
      });
      $("#lesson").html(html);
      $("#lesson").data("type", "add");
      $("#lesson").modal("show");
    });
    
    
    $("body").on("click", ".btn_save", function () {
      console.log(111);
      var type = $("#lesson").data("type");
      var url = "";
      //判断是添加还是修改
      if (type == "edit") {
        url = "/api/course/chapter/modify";
      } else {
        url = "/api/course/chapter/add";
      }
      //判断免费视频的多选框是否选中
      var ct_is_free;
      if ($("#ct_is_free").prop("checked")) {
        ct_is_free = 0;
      } else {
        ct_is_free = 1;
      }
      
      $("form").ajaxSubmit({
        type: "post",
        url: url,
        data: {
          ct_is_free: ct_is_free
        },
        success: function (info) {
          if (info.code == 200) {
            console.log(info);
            $("#lesson").modal('hide');
            location.reload();
          }
        }
      });
      
    })
    
  })
})