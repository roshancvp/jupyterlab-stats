var BASE = "https://api.github.com/repos/jupyter/jupyterlab";

console.log("Starting...")

var prevStars;
var prevForks;
var prevIssues;

$(document).ready(function(){

  pullChanges()

  setInterval(function() {
    pullChanges();
  }, 60000)

});

var pullChanges = function() {

  // Pull Requests
  var requestPulls = new XMLHttpRequest();
  requestPulls.open("GET", BASE + "/pulls", false);
  requestPulls.send();
  var jsonPulls = JSON.parse(requestPulls.responseText)
  $('#pull').text(jsonPulls.length)

  // Stargazers + Issues + Forks
  var requestData = new XMLHttpRequest();
  requestData.open("GET", BASE, false);
  requestData.send();

  var jsonData = JSON.parse(requestData.responseText);
  var stars = parseInt(jsonData.stargazers_count);
  var forks = parseInt(jsonData.forks_count);
  var issues = parseInt(jsonData.open_issues_count);

  $("#stars").text(stars);
  $("#forks").text(forks);
  $("#issues").text(issues);

  /* End of Top Level Updates */
  
  // Notifications
  if (prevStars == null || prevForks == null || prevIssues == null) {
    prevStars = stars;
    prevForks = forks;
    prevIssues = issues;
  }

  // Check Stars
  if (prevStars < stars) {
    $('.cards-notif').prepend(createCard('New Star!'))
    prevStars = stars;
  } else if (prevStars > stars) {
    $('#notif').text("LOST STAR :(");
    prevStars = stars;
  }
  
  /* End of Notifications */

  // Activity
  var requestPR = new XMLHttpRequest();
  requestPR.open("GET", BASE + "/issues", false);
  requestPR.send();

  var jsonPR = JSON.parse(requestPR.responseText);

  // Works only if there is one new notification
  var lastPRID;
  if (lastPRID == null){
    for (x = 5; x >= 0; x--) {
    $('.cards-activity').prepend(createCard(jsonPR[x].title, jsonPR[x].user.login));    
    }
    var lastPRID = jsonData[0].number;
  } 
  
  if(lastPRID != jsonData[0].number) {
    $('.cards-activity').prepend(createCard(jsonPR[0].title, jsonPR[0].user.login));    
    var lastPRID = jsonData[0].number;
  }

}

var createCard = function(text, user) {
  var htmlText = `
    <div class="card">
      <div class="row">
        <!-- Icon -->
        <div class="col-md-1 issue-icon card-icon">
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        </div>
        <!-- Message -->
        <div class="col-md-11">
          <h2 id="last-issue">` + text + `</h2><br>
          <h3 class="card-user">` + user + `</h3>
        </div>
      </div>
    </div>`;
  return htmlText;
}