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

# Things to improve

* If you run twice the `process/updateGameAvailability` process, it will apply 20% on the game each time. It would be best to keep a flag into the object to know if it's on a discount or not.

# API Usage

## Get game list

    GET /games

## Game a specific game by id

    GET /game/<id>

## Insert a new game

    PUT /game/
    title=title&price=19.99&publisher_id=1&tags=tag1,tag2,tag3&releaseDate=UNIX_TIMESTAMP

## Update an existing game

    POST /game/<id>
    title=new_title

## Game a game publisher

    GET /game/publisher/<id>

## Remove a game

    DELETE /game/<id>

## Update game price and availability based on release date

    POST /process/updateGameAvailability
