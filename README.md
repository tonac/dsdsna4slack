# About SNA4Slack:
SNA4Slack is a web application that visualizes and analyses social networks built upon Slack conversations within public channels. Since Slack is widely used by many people, in business and private life, this application can contribute to better project management, efficiency and success of many business and private projects. The system gives a better perception of the relationships within the team, thus providing an opportunity to detect communication problems and improve both communication and teamwork.

For live version of application please visit: [https://sna4slack.com](https://sna4slack.com)
 
## Application usage:
1. Create account on https://sna4slack.com/register
2. Log in with your credentials https://sna4slack.com
3. Create export of your slack workspace https://[your_workspace].slack.com/services/export (you need to be an admin to do it)
4. Click on + sign to add new archive
5. To create analysis of your uploaded archive by choice visit https://sna4slack.com/dashboard/analyse
6. You can check all of your analysis results on https://sna4slack.com/dashboard/results

* to see list of all of your slack workspce admins visit https://[your_workspace].slack.com/account/team


# Local installation and development

## Install
1. Install [docker](https://docs.docker.com/engine/installation/) and docker compose (google it)
1. You are done :)

## Run development environment
1. `docker-compose up`
1. Should be working

[Note]: First time it needs to build images so it will take longer time.

## Adding new packages
- For angular add them to **packages.json**
- For django add them to **requirements.txt**  

Explanation:  
Before every run for both django and angular packages are installed/updated from requirements.txt and packages.json respectively so if you want to add new dependency it is sufficient to just add it to those files. Over time if there are a lot of new packages to install during start up it will take longer time. To change that you can run `docker-compose up --build` to rebuild images and after that all new dependency will be added to images and there will be no need for their installment during start up time.   

## Troubleshooting
If there is something wrong with docker containers/images try get into container directly for easier troubleshooting.  
Example, if something is wrong with frontend (angular) image you can run `docker-compose run angular sh` to start frontend container. From there you can use all commands like `npm install` and `ng serve`.
