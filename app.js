var BASE = "https://api.github.com/repos/jupyter/jupyterlab";

console.log("Starting...")

var prevStars;
var prevForks;
var prevIssues;
var lastIssueID;
var loopCount = 0;

$(document).ready(function(){

  pullChanges();
  console.log("YAAS");

  setInterval(function() {
    pullChanges();
    loopCount++;
    console.log(loopCount);
  }, 60000);

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

  // Issues
  var requestIssues = new XMLHttpRequest();
  requestIssues.open("GET", BASE + "/issues", false);
  requestIssues.send();

  var jsonIssue = JSON.parse(requestIssues.responseText);

  // Works only if there is one new notification
  if (lastIssueID == null){
    for (x = 5; x >= 0; x--) {
			if(jsonIssue[x].html_url.search('issue') > 0){
				$('.cards-issues').prepend(createCard(jsonIssue[x].title, jsonIssue[x].user.login, 'issue'));  
			}
    }
    lastIssueID = jsonIssue[0].number;
  } 
  		
  if(lastIssueID != jsonIssue[0].number && jsonIssue[0].html_url.search('issue') > 0) {
    $('.cards-issues').prepend(createCard(jsonIssue[0].title, jsonIssue[0].user.login, 'issue'));    
    lastIssueID = jsonIssue[0].number;
  }
	
	/* End of Issues */
  
  //Pull Requests 
  for(i = jsonPulls.length - 1; i >= 0; i--){
    $('.cards-pulls').prepend(createCard(jsonPulls[i].title, jsonPulls[i].user.login));
  }

}

var createCard = function(text, user, type) {
  
	if(type == 'issue'){
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
	} else {
			var htmlText = `
    <div class="card">
      <div class="row">
        <!-- Icon -->
        <div class="col-md-1 issue-icon card-icon">
          <img src="icons/merge.png">
        </div>
        <!-- Message -->
        <div class="col-md-11">
          <h2 id="last-issue">` + text + `</h2><br>
          <h3 class="card-user">` + user + `</h3>
        </div>
      </div>
    </div>`;
	}
		
	
  return htmlText;
}