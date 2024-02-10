
# Movie Database

![Spring-Next-MovieDB](https://socialify.git.ci/toczekmj/Spring-Next-MovieDB/image?description=1&descriptionEditable=Group%20D%27s%20project%20for%20graphic%20interfaces%20class.%20%0AWritten%20in%20Next.js%20and%20Spring&language=1&name=1&owner=1&stargazers=1&theme=Auto)





## Authors

- [@Michał Toczek](https://github.com/toczekmj) - backend
- [@Michał Harasim](https://github.com/michalharasim) - backend
- [@Mariusz Wilk](https://github.com/mario343) - frontend


## Tech Stack

**Client:** Next.js, TypeScript

**Server:** Java, Spring, Docker, Bash, Node


## Run Locally

Clone the project, make sure that Node, Java, Docker and MySql are installed. 

### Compile frontend

```bash
  git clone https://github.com/toczekmj/Interfejsy-Graficzne.git
```

Go to the project directory

```bash
  cd Interfejsy-Graficzne/frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Compile Backend 
Go to the project directory
```bash
  cd Interfejsy-Graficzne/InterfejsyGraficzne
```
Edit application.properties
```bash
  nano /src/main/resources/application.properties
```
Set the following:
```bash
  database.port= #make sure it matches your local instance of MySql
  database.password= #your database password
  database.username= #your database login 
  database.name= #your database name
  database.url= #url to your instance e.g. jdbc:mysql://my.database.url:
  seed.on.startup= #true if you want to fulfill the database with randomly generated data
  working.environment= local #can be 'local' 'dev' 'prod'
  

``` 

After that, you should be able to perform 
```bash
  sudo chmod +x run.sh
  ./run.sh
```
and if you had your docker instance configured properly, just select option: 
0) run autostart script which should run the app. 

One thing you should keep in mind is, that this docker container is running on port 80 and also forwarding traffic on port 80 from your computer. You can change that with:
```bash
nano run.sh 
```
and chane ports to your liking here:
```bash
docker_run_detached() {
  docker run -d -p 80:80 --name "$1" "$2"
}
```
Also you shouldn't care about update.sh file, which was designed to work with cron and to pull latest changes from main branch of this repo, to the remote server. What this file does it checkes if there was any update to main branch of this repository and in case it was, pulls lates changes and recompiles the docker image. 

