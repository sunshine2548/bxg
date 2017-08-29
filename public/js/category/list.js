/**
 * Created by Asus on 2017/8/23.
 */

define(["jquery","template"],function($,template){
  
  $(function(){
    $.ajax({
      type:"get",
      url:"/api/category",
      success:function(info){
        var html = template("category_list_tp1",info);
        $("tbody").html(html);
      }
    });
    
    
    
  });
  
  
});