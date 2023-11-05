To-Do-App

App features:

- Full crud operations
- Full authentication with JwT
- Restricted user access to CRUD operations based on JWT tokens
- error handling with express-validator

Tools:

- Node js
- Express jS
- MongoDB
- prisma
- Typescript

to install this project dependancy write this scripts:

- npm install or npm i yarn add
- before that you should have :
- node package maneger to install the packages
- install node and install all debendancy with npm install or yarn add and npm start
  or yarn start In the project directory, you can run: yarn start or npm start

to connect to database make these steps:

- create .env file in the project directory and put your configuration:
  - PORT=3000 or any other port
  - DATABASE_URL="mongodb+srv://username:password@cluster0.gsts9ro.mongodb.net/todos" 
  -JWT_SECRET_KEY="your secret key in a string" like ("this is a strong secret key")
