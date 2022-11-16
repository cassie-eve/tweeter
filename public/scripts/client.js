
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
      <p>${tweetData.content.text}</p>
      <footer>
        <p>Created ${date}</p>
        <p><i class="fa-solid fa-flag"></i>   <i class="fa-solid fa-retweet"></i>   <i class="fa-solid fa-heart"></i></p>
      </footer>
    </article>`)
    return $tweet
  }

  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    console.log( $(this).serialize() );
    $.ajax({
      type: "POST",
      url: '/tweets/',
      data: $(this).serialize()
    });
  });

  const renderTweets = function(array) {
    for (let user of array) {
      const $tweet = createTweetElement(user);
      $('#tweets-container').append($tweet); 
    }
  }

  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
    }).then(renderTweets);
  }

  loadTweets();

});