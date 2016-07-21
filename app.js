var BASE = "https://api.github.com/repos/jupyter/jupyterlab";

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
  }, 5000)

});
