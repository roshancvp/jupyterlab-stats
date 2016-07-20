import requests;

BASE = "https://api.github.com/repos/jupyter/jupyterlab"

# Pull Requests
req = requests.get(BASE + "/pulls")
req_json = req.json()

pr_number = len(req_json)

print("Pull Requests:" + str(pr_number))

# Stargazers + Issues + Forks
req = requests.get(BASE)
req_json = req.json()

stars = req_json["stargazers_count"]
issues = req_json["open_issues_count"]
forks = req_json["forks_count"]

print("Stars: " + str(stars))
print("Open Issues: " + str(issues))
print("Forks: " + str(forks))

#https://api.github.com/repos/jupyter/jupyterlab/merges
#https://api.github.com/repos/jupyter/jupyterlab/contributors

# Issues
req = requests.get(BASE + "/issues")
req_json = req.json()

print("\n\n******* Printing Issues *******\n")
for x in range(len(req_json)):
    print("User         : " + str(req_json[x]["user"]["login"]) + "\n"
        + "Issue number : " + str(req_json[x]["number"]) + "\n" +
        + "Title        : " + str(req_json[x]["title"]) + "\n")
