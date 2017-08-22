/**
 * Created by Asus on 2017/8/20.
 */
define(["jquery", "template","nprogress","jquery_cookie"], function ($, template,NProgress) {
  $(function () {
    if (location.pathname !== "/login") {
      if ($.cookie("PHPSESSID")) {
        // 设置头像和用户名
        var userinfo = $.cookie("userinfo");
        userinfo = JSON.parse(userinfo);
        var html = template("userinfo_tp1", userinfo);
        $("#userinfo").html(html);
      } else {
        location.href = "/login";
      }
      //侧边栏高亮
      var pathname = location.pathname;
      var pathObj = {
        "/teacher/add": "/teacher/list",
        "/settings": "/",
        "/repass":"/"
      }
      pathname = pathObj[pathname] || pathname;
      
      var $links = $(".navs a");
      $links.each(function () {
        $that = $(this);
        $that.removeClass("active");
        if ($that.attr("href") == pathname) {
          $that.addClass("active");
        }
      })
      //如果是二级菜单,点击的时候,展开内容
      $(".secondary_menu").click(function () {
        $(this).children("ul").slideToggle();
      })
      //如果是二级菜单下的某个菜单亮起来，需要让这个二级菜单展开的状态。
      $(".secondary_menu").find(".active").parent().parent().show();
      
      //退出功能
      $("#logout").click(function () {
        console.log("呵呵");
        // 发送ajax请求
        $.post("/api/logout", function (info) {
          if (info.code == 200) {
            $.removeCookie("userinfo", {path: "/"});
            location.href = "/login";
          }
          
        });
      });
    }
  
    //进度条
    NProgress.start();
    setTimeout(function(){
      NProgress.done();
    },400);
    
    //小齿轮
    $(document).ajaxStart(function(){
      $(".mask").show();
    })
  
    $(document).ajaxStop(function(){
      setTimeout(function(){
        $(".mask").hide();
      },400);
    })
    
  });
});