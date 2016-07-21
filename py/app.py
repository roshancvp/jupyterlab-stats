from flask import Flask, request, render_template
from github import *
import time

app = Flask(__name__)

@app.route('/')
def index():
    gh = Github()
    return render_template("index.html", stars = gh.stars, forks = gh.forks)

# # Routing with a string
# @app.route('/user/<profile>')
# def profile(profile):
#     return 'Hey there %s' %profile
#
# #Routing with an int
# @app.route('/post/<int:post_id>')
# def post(post_id):
#     return 'Post number: %s' %post_id
#
# #Method type
# # methods = ... -> types of methods the webpage can take
# @app.route('/method', methods = ['GET', 'POST'])
# def method():
#     return 'Method used: %s' %request.method
#
# #Take input
# @app.route('/write/<text>')
# def write(text):
#     return render_template("write.html", text = text)
#
if __name__ == "__main__":
    app.run(debug = True)
