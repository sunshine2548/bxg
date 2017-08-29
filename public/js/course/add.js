/**
 * Created by Asus on 2017/8/25.
 */
define(["jquery","template"],function ($,template) {
  $(function () {
    $(".btn_create").click(function () {
      var cs_name = $("#cs_name").val();
      $.ajax({
        type:"post",
        url:"/api/course/create",
        data:{
          cs_name:cs_name
        },
        success:function (info) {
         if(info.code==200){
           location.href = "/course/step1?cs_id="+info.result.cs_id;
         }
        }
      })
    })
    
    
    
  })
})