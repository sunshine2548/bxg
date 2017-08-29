/**
 * Created by Asus on 2017/8/22.
 */
define(["jquery", "template", "tool", "ckeditor", "uploadify", "region", "jquery_cookie"], function ($, template, tool, CKEDITOR) {
  $(function () {
    
    $.ajax({
      type: "get",
      url: "/api/teacher/profile",
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("teacher_profile_tp1", info.result);
          $(".teacher-profile").html(html);
          tool.setDate("#tc_birthday");
          tool.setDate("#tc_join_date");
  
          //头像上传
          $("#upfile").uploadify({
            height: 120,
            swf: '/public/assets/uploadify/uploadify.swf',
            uploader: '/api/uploader/avatar',
            fileObjName: "tc_avatar",
            width: 120,
            fileSizeLimit: "5MB",
            buttonText: "",
            onUploadSuccess: function (f,data) {
              data = JSON.parse(data);
              var path = data.result.path;
              $(".preview img").attr("src", path);
      
              //修改侧边栏图片
              $("#userinfo img").attr("src", path);
              //修改cookie的tc_avatar
              var userinfo = $.cookie("userinfo");
              userinfo = JSON.parse(userinfo);
              // console.log(userinfo);
              userinfo.tc_avatar = path;
              $.cookie("userinfo", JSON.stringify(userinfo), {path: "/", expires: 1});
      
            }
          });
          
          
          //三级联动
          $("#hometown").region({
            url: "/public/assets/jquery-region/region.json"
          });
  
  
          //富文本编辑器
          CKEDITOR.replace("tc_introduce", {
            toolbarGroups: [{name: "clipboard", groups: ["clipboard", "undo"]}, {name: "forms"},
              {name: "basicstyles", groups: ["basicstyles", "cleanup"]},
              {name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"]},
              {name: "styles"}, {name: "colors"}]
          });
        }
        
      }
    });
    
    $("body").on("click", ".btn_save", function () {
      // for (instance in CKEDITOR.instances) {
      //   CKEDITOR.instances[instance].updateElement();
      // }
      CKEDITOR.instances["tc_introduce"].updateElement();
      $.ajax({
        type: "post",
        url: "/api/teacher/modify",
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            location.href = "/settings";
          }
        }
      })
      
    });
    
  });
  
  
})