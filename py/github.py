import requests;

BASE = "https://api.github.com/repos/jupyter/jupyterlab"

# Pull Requests
def pull_requests():
    req = requests.get(BASE + "/pulls")
    req_json = req.json()
    pr_number = len(req_json)
    return pr_number

# Stargazers + Issues + Forks
def more_data():
    req = requests.get(BASE)
    req_json = req.json()

    stars = req_json["stargazers_count"]
    issues = req_json["open_issues_count"]
    forks = req_json["forks_count"]
    return [stars, issues, forks]

class Github(object):

    pull_requests = pull_requests()
    data = more_data()
    stars = data[0]
    issues = data[1]
    forks = data[2]

    def init(self, pull_requests, stars, issues, forks):
        self.pull_requests = pull_requests
        self.stars = stars
        self.issues = issues
        self.forks = forks

#https://api.github.com/repos/jupyter/jupyterlab/merges
#https://api.github.com/repos/jupyter/jupyterlab/contributors

#Issues
req = requests.get(BASE + "/issues")
req_json = req.json()

print("\n\n******* Printing Issues *******\n")
for x in range(len(req_json)):
    print("User         : " + str(req_json[x]["user"]["login"]) + "\n"
        + "Issue number : " + str(req_json[x]["number"]) + "\n"
        + "Title        : " + str(req_json[x]["title"]) + "\n")

# Commmits
req = requests.get(BASE + "/commits")
req_json = req.json()

print("\n\n******* Printing Commits *******\n")
for x in range(len(req_json)):
    print("Author  : " + str(req_json[x]["commit"]["author"]["name"]) + "\n"
        + "Message : " + str(req_json[x]["commit"]["message"]) + "\n")
