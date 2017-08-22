/**
 * Created by Asus on 2017/8/20.
 */
define(["jquery", "jquery_cookie", "jquery_form"], function ($) {
  $(function () {
    
    $("form").submit(function () {
      $(this).ajaxSubmit({
        type: "post",
        url: "/api/login",
        // data: $("form").serialize(),
        success: function (info) {
          console.log(info);
          if (info.code == 200) {
            var userinfo = JSON.stringify(info.result);
            $.cookie("userinfo", userinfo, {path: "/", expires: 1});
            location.href = "/";
          }
        }
      });
      return false;
    });
  });
});