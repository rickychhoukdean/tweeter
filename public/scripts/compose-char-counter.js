
$(document).ready(function() {
  $(".new-tweet").on("input", function() {
    let maxLength = 140;
    let newLength = maxLength - $(this).val().length;

    if (newLength > 0) {
      $(this).siblings(".counter").text(newLength).addClass("valid");
      $(this).siblings(".counter").text(newLength).removeClass("invalid");
      
    } else {
      $(this).siblings(".counter").text(newLength).addClass("invalid");
      $(this).siblings(".counter").text(newLength).removeClass("valid");
    }
  });
});
