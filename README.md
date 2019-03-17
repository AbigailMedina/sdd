# React Express Starter Pack

> Create full stack apps with React and Express. Run your client and server with a single command. 

### Redux Version
This version does not include Redux
[Click Here For Redux Version](https://github.com/bradtraversy/react_redux_express_starter) 

## Installing Dependencies

``` bash
# Install dependencies
npm install

# Install dependencies for client
npm run-script client-install
```

## Running Server
``` bash
# Server runs on http://localhost:5000 and client on http://localhost:3000
#To run Backend, change directory to backend
nodemon server.js
```

## Starting Database on UNIX
``` bash
#start mongo in separate terminal by running "mongod" in bash
## if you see "waiting for connections on port 27017" its gucci
## if you see "Failed to set up listener: SocketException: Address already in use", run "sudo lsof -iTCP -sTCP:LISTEN -n -P | grep mongo" then "kill <the pid id for mongo>"
#open third terminal and run mongo to start up db by typing in "mongo"
## in mongo client that pops up, write "use sdd"
```

## Starting Database on Windows
``` bash
# Download and install mongodb from https://www.mongodb.com/download-center/community
# Go to path C:\Program Files\MongoDB\Server\x.x\bin and run mongo.exe
# Within the terminal that pops up, write 
use sdd
```
# Run the React client only
npm run client

## App Info

### Author

PEAKE

### Version

1.0.0