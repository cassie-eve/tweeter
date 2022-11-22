/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // To avoid any potential xss
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // formats the tweet into html
  const createTweetElement = function(tweetData) {
    let date = timeago.format(tweetData.created_at);
    const $tweet = $(`<article class="tweet">
    <header>
      <div class="user">
        <img src="${tweetData.user.avatars}" alt="face">
        <p>${tweetData.user.name}</p>
      </div>
      <span>${tweetData.user.handle}</span>
      </header>
      <p id='user-tweet'>${escape(tweetData.content.text)}</p>
      <footer>
        <p>Created ${date}</p>
        <p><i class="fa-solid fa-flag"></i>   <i class="fa-solid fa-retweet"></i>   <i class="fa-solid fa-heart"></i></p>
      </footer>
    </article>`);
    return $tweet;
  };

  // form used to submit tweets
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    if ($("#tweet-text").val().length > 140) {
      // The error message for this populates from composer-char-counter.js
      return;
    };
    
    if ($("#tweet-text").val() === '') {
      $("#short").removeClass("hide");
      // The error message removal is handled in composer-char-counter.js
      return;
    };
    
    $.ajax({
      type: "POST",
      url: '/tweets/',
      data: $(this).serialize()
    }).then(loadTweets);
    $('#tweet-text').val("");
    const counter = document.querySelector('.counter');
    counter.innerHTML = 140;
  });

  //renders each tweet on the page
  const renderTweets = function(array) {
    $('#tweets-container').empty();
    for (let user of array) {
      const $tweet = createTweetElement(user);
      $('#tweets-container').prepend($tweet);
    }
  };

  // pulls in new tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
    }).then(renderTweets);
  };
  loadTweets();
});