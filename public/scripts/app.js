/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  for (let tweet in tweets) {
    $("#tweets-container").append(createTweetElement(tweets[tweet]));
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
  <div class="tweet-body"> ${escape(tweet.content.text)}</div>
  </header>
  <footer>
    <span class="date">${tweet.created_at}</span>
    <span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
  </footer>
</article>
  `;
  return $tweet;
};

// const safeHTML = `<p>${escape(textFromUser)}</p>`;

$(document).ready(function() {
  const loadTweets = function() {
    $.get("/tweets", function(data, status) {
      renderTweets(data);
    });
  };

  loadTweets();
  $(".error-message").slideUp(0);

  $("#tweet-button").on("click", function(event) {
    event.preventDefault();
    const payload = $(this)
      .siblings(".new-tweet")
      .serialize();

    let messageLength = payload.length - 5; // for some reason my request shows as text=xxxx+xxxx where + is the space
    if (messageLength === 0) {
      $(".error-message").text("❌ Error, you have submitted nothing.").slideDown(0);
      setTimeout(()=>$(".error-message").text("❌ Error, you have submitted nothing.").slideUp("slow"), 10000);
    } else if (messageLength > 140) {
      $(".error-message").text("❌ Error, you are trying to submit over 140 characters.").slideDown(0);
      setTimeout(()=>$(".error-message").text("❌ Error, you are trying to submit over 140 characters.").slideUp("slow"), 10000);
    } else {
      $.post("/tweets", payload, function(data, status) {
        loadTweets();
        $(".new-tweet").val("");
      });
    }
  });

  $(".navbutton").on("click", function() {
    $(".new-tweet").animate(
      {
        height: "toggle"
      },
      500
    );
  });

  $(".nagivate-up-button").on("click", function() {
    $("html,body").animate(
      {
        scrollTop: $("h2").offset().top
      },
      1000
    );
  });
});
