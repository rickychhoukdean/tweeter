/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Function to append tweets to the end of the page
const renderTweets = function(tweets) {
  for (let tweet in tweets) {
    $("#tweets-container").append(createTweetElement(tweets[tweet]));
  }
};

//Calculates dates by comparing date of tweet to current date
const dateCalculator = function(tweetTime) {
  let currentDate = new Date();
  let currentTime = currentDate.getTime();
  let timeElapsed = currentTime - tweetTime;
  let daysElapsed = timeElapsed / (60 * 60 * 24 * 1000);

  switch (true) {
  case daysElapsed >= 1: {
    return `${Math.round(daysElapsed)} days ago`;
  }
  case daysElapsed < 1 && daysElapsed > 1 / 24: {
    return `${Math.round(daysElapsed * 24)} hours ago`;
  }
  case daysElapsed < 1 && daysElapsed > 1 / 1440: {
    return `${Math.round(daysElapsed * 1440)} minutes ago`;
  }
  default:
    return "Less than a minute ago";
  }
};

const errorMessage = function(messageLength) {
  if (messageLength === 0) {
    return "❌ Error, you have submitted nothing.";
  } else if (messageLength > 140) {
    return "❌ Error, you are trying to submit over 140 characters.";
  }
};

//To escape from HTML injection
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Function to use details from user to create a new tweet
const createTweetElement = function(tweet) {
  let $tweet = `
  <article class="tweet">
    <header>
      <div class="flex">
        <div class="user"><span class="smallpic"><img src="${tweet.user.avatars}"></span></i>${tweet.user.name}</div>
       <div class="handle">@${tweet.user.name}</div>
      </div>
      <div class="tweet-body"> ${escape(tweet.content.text)}</div>
     </header>
     <footer>
      <span class="date">${dateCalculator(tweet.created_at)} </span>
      <span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
     </footer>
  </article>
  `;
  return $tweet;
};

$(document).ready(function() {
  //Function to render all the tweets at once
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };

  //Function to append the last tweet
  const appendTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data.slice(data.length - 1));
    });
  };

  //Page initializing by loading all of the tweets in the database and hiding the error message and compose tweet
  loadTweets();
  $(".error-message").slideUp(0);
  $(".new-tweet").slideUp(0);
  $(".nagivate-up-button").fadeOut(0);

  //Soon to add this onclick function to remove the slideup
  // $(window).on("click", function() {
  //   if ($(".error-message").is(":visible")) {
  //     $(".error-message").slideUp();
  //   }
  // });

  //Event listener on the tweet button
  $("#tweet-button").on("click", function(event) {
    event.preventDefault();
    const payload = $(this)
      .siblings(".new-tweet")
      .serialize();

    let messageLength = payload.length - 5;
    if (messageLength === 0 || messageLength > 140) {
      $(".error-message")
        .text(errorMessage(messageLength))
        .slideDown(0);
      setTimeout(() => $(".error-message").slideUp("slow"), 5000);
    } else {
      $.post("/tweets", payload, function(data, status) {
        appendTweets();
        $(".counter").text("140");
        $(".new-tweet").val("");
        $(".error-message").slideUp(0);
      });
    }
  });

  //Navigation button that shows and focuses on the compose tweet textarea
  $(".navbutton").on("click", function() {
    $(".new-tweet")
      .animate(
        {
          height: "toggle"
        },
        300
      )
      .focus();
  });

  //Navigate up to bring the user to the top of the page
  $(".nagivate-up-button").on("click", function() {
    $("html,body").animate(
      {
        scrollTop: $("html,body").offset().top
      },
      1000
    );
    $(".new-tweet")
      .animate(
        {
          height: "toggle"
        },
        300
      )
      .focus();
  });

  //The button will appear if the user has scrolled
  $(window).scroll(function() {
    let height = $(window).scrollTop();
    if (height > 1) {
      $(".nagivate-up-button").fadeIn(300);
      $(".navbutton").fadeOut(300);
    } else {
      $(".nagivate-up-button").fadeOut(300);
      $(".navbutton").fadeIn(300);
    }
  });
});
