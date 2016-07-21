var BASE = "https://api.github.com/repos/jupyter/jupyterlab";

console.log("Starting...")

$(document).ready(function(){

  setInterval(function() {
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

    // Last Issue
    var requestIssues = new XMLHttpRequest();
    requestIssues.open("GET", BASE + "/issues", false);
    requestIssues.send();

    var jsonIssues = JSON.parse(requestIssues.responseText);
    console.log(jsonIssues)
    $("#last_issue_1").text(jsonIssues[0].title);
    $("#last_issue_2").text(jsonIssues[1].title);
    $("#last_issue_3").text(jsonIssues[2].title);
  }, 60000)

});
