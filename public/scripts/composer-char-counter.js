$(document).ready(function() {
  $("#tweet-text").on('keyup', function(){
    const result = 140 - this.value.length;
    const counter = document.querySelector('.counter');
    counter.innerHTML = result;

    if (result < 0) {
      $('.counter').addClass('minus');
    } else if (result > 0) {
      $('.counter').removeClass('minus');
    }
  });
});