To Install and Run ShutUp!:

1) git clone https://github.com/AbigailMedina/sdd.git
  - This will give you all of the source code for ShutUp!.

2) Install NodeJS and MongoDB
  - The frontend uses NodeJS, and the backend uses MongoDB.
  - To get these, use a package manager (homebrew, apt-get), or download from their
    official sites

3) ./Install_ShutUp.sh
  - This will install all of the dependencies and required Node packages.

4) Create an account on Mailgun and get a secret key. Insert it into config.js.
  - The free version of Mailgun only allows you to send emails to 5 email addresses
    that you must specify.

5) Create a Pusher/ChatKit account and get an instance locator key and test token provider
   from your dasboard. Insert them into config.js.

6) To start the app, ./ShutUp start

7) To stop the app, ./ShutUp stop

8) To run backend and client seperately:
  - Backend: nodemon backend/server.js
  - Client: npm run client
