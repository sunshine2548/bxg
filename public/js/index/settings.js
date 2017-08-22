/**
 * Created by Asus on 2017/8/22.
 */
define(["jquery", "template","tool","uploadify","region"], function ($, template,tool) {
  $(function () {
    
    $.ajax({
      type: "get",
      url: "/api/teacher/profile",
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("teacher_profile_tp1", info.result);
          $(".teacher-profile").html(html);
          tool.setDate("#birthday");
          tool.setDate("#join_date");
          
          //三级联动
          $("#hometown").region({
            url:"/public/assets/jquery-region/region.json"
          });
          
        //头像上传
          $("#upfile").uploadify({
            height: 120,
            swf: '/public/assets/uploadify/uploadify.swf',
            uploader: '/api/uploader/avatar',
            width: 120,
            fileObjName: "tc_avatar",
            buttonText: "",
            onUploadSuccess: function (data) {
              $(".preview img").attr("src", data.result.path);
            }
          });
        }
        
      }
    });
    
    
  });
  
  
})