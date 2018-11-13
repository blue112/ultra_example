# How to install

Clone repository
`npm install`

# How to build

`npm run build`

# How to run in docker

`docker build -t ultra_example . && docker run ultra_example`

# How to test

App is running on port 3000

Use the provided `test.sh` script or write curl commands to test API. Pass it the IP address of the docker, for instance :

`./test.sh 172.17.0.2`


