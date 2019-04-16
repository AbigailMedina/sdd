# Shut Up!

## Quick Start

``` bash
# Install dependencies
npm install

# Server runs on http://localhost:5000 and client on http://localhost:3000
#To run Backend, run "nodemon server.js"
#start mongo in separate terminal by running "mongod" in bash
## if you see "waiting for connections on port 27017" its gucci
## if you see "Failed to set up listener: SocketException: Address already in use", run "sudo lsof -iTCP -sTCP:LISTEN -n -P | grep mongo" then "kill <the pid id for mongo>"
#open third terminal and run mongo to start up db by typing in "mongo"
## in mongo client that pops up, write "use sdd"

# Run the React client only
npm run client
```

## App Info

### Author

PEAKE

### Version

1.0.0
