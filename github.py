import requests;

BASE = "https://api.github.com/repos/jupyter/jupyterlab"

# Pull Requests
req = requests.get(BASE + "/pulls")
req_json = req.json()

pr_number = len(req_json)

print("Pull Requests:" + str(pr_number))

# Issues
req = requests.get(BASE + "issues")
req_json = req.json()

issues_number = len(req_json)

print("Issues:" + str(issues_number))

#Stargazers
req = requests.get(BASE)
req_json = req.json()

stars = req_json["stargazers_count"]
issues = req_json["open_issues_count"]

print("Stars:" + str(stars))
