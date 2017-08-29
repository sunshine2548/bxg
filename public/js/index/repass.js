/**
 * Created by Asus on 2017/8/23.
 */
define(["jquery"], function ($) {
  
  $(function () {
    $("#btn_modify").click(function () {
      var tc_new_pass = $("#tc_new_pass").val();
      var tc_confirm_pass = $("#tc_confirm_pass").val();
      if (tc_confirm_pass != tc_new_pass) {
        alert("确认密码与密码不一致");
        return false;
      }
      $.ajax({
        type: "post",
        url: "/api/teacher/repass",
        data: $("form").serialize(),
        success: function (info) {
          console.log(info);
          if (info.code == 200) {
            alert("修改成功,请重新登录");
            $("#logout").click();
          }
        }
      });
    });
  
   
  });
});