/**
 * Created by Asus on 2017/8/25.
 */
define(["jquery", "template", "tool", "uploadify", "jquery_Jcrop"], function ($, template, tool) {
  $(function () {
    
    var cs_id = tool.getParam("cs_id");
    var x, y, w, h;
    $.ajax({
      type: "get",
      url: "/api/course/picture",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("step2_tpl", info.result);
          $(".course-add").html(html);
          
          
          //上传图片
          $("#upfile").uploadify({
            swf: "/public/assets/uploadify/uploadify.swf",
            buttonText: "上传图片",
            buttonClass: "btn btn-success btn-sm btn_upfile",
            uploader: "/api/uploader/cover",
            fileObjName: "cs_cover_original",
            formData: {
              cs_id: cs_id
            },
            itemTemplate: "<span></span>",
            fileSizeLimit: "2MB",
            fileTypeExts: '*.gif; *.jpg; *.png',
            onUploadSuccess: function (file, data) {
              data = JSON.parse(data);
              
              var path = data.result.path;
              $(".preview img").attr("src", path);
              $(".brief img").attr("src", path);
              $("#btn_crop").removeAttr("disabled");
              
            }
          });
          
          
        }
      }
    });
    
    $("body").on("click", "#btn_crop", function () {
      if ($(this).text() == "裁切图片") {
        $(this).text("保存图片");
        $('.preview img').Jcrop({
          setSelect: [0, 0, 10000, 10000],
          aspectRatio: 2,
          boxWidth: 400
        }, function () {
          this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
          var init = this.getSelection();
          x = init.x;
          y = init.y;
          w = init.w
          h = init.h;
          
          $(".preview").on("cropmove", function (e, s, c) {
            x = parseInt(c.x);
            y = parseInt(c.y);
            w = parseInt(c.w);
            h = parseInt(c.h);
          });
        });
      } else {
        $.ajax({
          type: "post",
          url: "/api/course/update/picture",
          data: {
            cs_id: cs_id,
            x: x,
            y: y,
            w: w,
            h: h
          },
          success: function (info) {
            if (info.code == 200) {
              location.href = "/course/step3?cs_id=" + cs_id;
            }
          }
        });
      }
      
    })
    
    
  });
})