# dsdsna4slack
SNA4slack project created for distributed software development course

# Install
1. Install [docker](https://docs.docker.com/engine/installation/) and docker compose (google it)
1. You are done :)

# Run development environment
1. `docker-compose up`
1. Should be working

[Note]: First time it needs to build images so it will take longer time.

# Adding new packages
- For angular add them to **packages.json**
- For django add them to **requirements.txt**  

Explanation:  
Before every run for both django and angular packages are installed/updated from requirements.txt and packages.json respectively so if you want to add new dependency it is sufficient to just add it to those files. Over time if there are a lot of new packages to install during start up it will take longer time. To change that you can run `docker-compose up --build` to rebuild images and after that all new dependency will be added to images and there will be no need for their installment during start up time.   

# Troubleshooting
If there is something wrong with docker containers/images try get into container directly for easier troubleshooting.  
Example, if something is wrong with frontend (angular) image you can run `docker-compose run angular sh` to start frontend container. From there you can use all commands like `npm install` and `ng serve`.
