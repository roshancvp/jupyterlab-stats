var BASE = "https://api.github.com/repos/jupyter/jupyterlab";

console.log("Starting...")

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

  // Stargazers + Issues + Forks
  var jsonPulls = JSON.parse(requestPulls.responseText)
  $('#pull').text(jsonPulls.length)

  var requestData = new XMLHttpRequest();
  requestData.open("GET", BASE, false);
  requestData.send();

  var jsonData = JSON.parse(requestData.responseText)
  $("#stars").text(jsonData.stargazers_count)
  $("#forks").text(jsonData.forks_count)
  $("#issues").text(jsonData.open_issues_count)

  // Last PR
  var requestPR = new XMLHttpRequest();
  requestPR.open("GET", BASE + "/issues", false);
  requestPR.send();

  var jsonPR = JSON.parse(requestPR.responseText);
  console.log(jsonPR)
  $("#last_issue_1").text(jsonPR[0].title);
  $("#last_issue_2").text(jsonPR[1].title);
  $("#last_issue_3").text(jsonPR[2].title);

}
