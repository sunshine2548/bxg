/**
 * Created by Asus on 2017/8/25.
 */
define(["jquery", "tool", "template", "ckeditor"], function ($, tool, template, CKEDITOR) {
  $(function () {
    var cs_id = tool.getParam("cs_id");
    $.ajax({
      type: "get",
      url: "/api/course/basic",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          var html = template("step1_tpl", info.result);
          $(".course-add").html(html);
          //富文本编辑器
          CKEDITOR.replace("cs_brief", {
            toolbarGroups: [{name: "clipboard", groups: ["clipboard", "undo"]}, {name: "forms"},
              {name: "basicstyles", groups: ["basicstyles", "cleanup"]},
              {name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"]},
              {name: "styles"}, {name: "colors"}]
          });
        }
      }
    })
    
    $("body").on("change", "#cs_cg_pid", function () {
      var cg_id = $(this).val();
      $.ajax({
        type: "get",
        url: "/api/category/child",
        data: {
          cg_id: cg_id
        },
        success: function (info) {
          console.log(info);
          if(info.code==200){
            var html = template("category_tpl", info);
            $("#cs_cg_id").html(html);
          }else{
            $("#cs_cg_id").html('<option value="">二级分类</option>');
          }
         
        }
        
      })
      
    });
    
    $("body").on("click", ".btn_save", function () {
      ////点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
      
      $.ajax({
        type: "post",
        url: "/api/course/update/basic",
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            location.href = "/course/step2?cs_id=" + cs_id;
          }
          
        }
      })
    });
    
    
  });
});