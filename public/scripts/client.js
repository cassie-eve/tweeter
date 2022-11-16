/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    let epoch = new Date(tweetData.created_at); 
    let date = epoch.toLocaleDateString('en-US');
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
        <p>Created on ${date}</p>
        <p><i class="fa-solid fa-flag"></i>   <i class="fa-solid fa-retweet"></i>   <i class="fa-solid fa-heart"></i></p>
      </footer>
    </article>`)
    return $tweet
  }

  const renderTweets = function(array) {
    for (let user of array) {
      const $tweet = createTweetElement(user);
      $('#tweets-container').append($tweet); 
    }
  }

  renderTweets(data);

  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    console.log( $(this).serialize() );
    $.ajax({
      type: "POST",
      url: '/tweets/',
      data: $(this).serialize()
    });
  });

});