/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

const renderTweets = function(tweets) {
  for (let tweet in tweets) {
    console.log(tweets[tweet]);
    $("#tweets-container").append(createTweetElement(tweets[tweet]));
  }
};

const createTweetElement = function(tweet) {
  let $tweet = `
  <article class="tweet">
  <header>
  <div class="flex">
  <div class="user"><img src="${tweet.user.avatars}"></i>${
    tweet.user.name
  }</div>
  <div class="handle">@${tweet.user.name}</div>
</div>
  <div class="tweet-body"> ${tweet.content.text}</div>
  </header>
  <footer>
    <span class="date">${tweet.created_at}</span>
    <span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
  </footer>
</article>
  `;
  return $tweet;
};

$(document).ready(function() {
  renderTweets(data);
});
