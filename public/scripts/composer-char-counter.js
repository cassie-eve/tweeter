$(document).ready(function() {
  $("#tweet-text").on('keyup', function(){
    const result = 140 - this.value.length;
    const counter = document.querySelector('.counter');
    counter.innerHTML = result;

    // This implements the char counter as well as adds and removes error messaging
    if (result < 0) {
      $('.counter').addClass('minus');
      $("#long").removeClass("hide");
    } else if (result > 0) {
      $('.counter').removeClass('minus');
      $("#long").addClass("hide");
      $("#short").addClass("hide");
    }
  });
});