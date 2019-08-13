// $(document).ready(function() {
//   $("textarea").on("input", function() {
//     let maxLength = 5;
//     let currentLength = $(this).val().length;

//     if (currentLength >= maxLength) {
//       alert("hi");
//     } else {
//       alert("nice");
//     }
//   });
// });
let maxLength = 140;
$(document).ready(function() {
  $(".new-tweet").on("keyup", function() {
    let newLength = maxLength - $(this).val().length;

    if (newLength > 0) {
      $(this)
        .siblings("span")
        .text(newLength)
        .css("color", "black");
    } else {
      $(this)
        .siblings("span")
        .text(newLength)
        .css("color", "red");
    }
  });
});
