 $(document).ready(function () {
   $("input[type='radio']").click(function(){
      var final = $("input[name='item1']:checked").val();
      $(".result").val(final);
     });
    //  $("input[type='radio']").click(function(){
    //     var final = $("input[name='item2']:checked").val();
    //     $(".result").val(final);
    //    });
    //    $("input[type='radio']").click(function(){
    //     var final = $("input[name='item3']:checked").val();
    //     $(".result").val(final);
    //    });
  });

