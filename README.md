# **MILLIONAIRE**

A multiplayer Who Wants To Be A Millionaire web game developed with **Vue.js**, **Express** and **MySQL** with three different player types as host, player and viewer. This game is selected as the **Best Mobile Application** by Vancouver Film School. It was developed with a team of three programmers and I worked mostly on backend functionality.

## **My Role**
- Implemented Nodejs Express server that interfaces with a MySQL database which can read/write game state data. 
- Created game host player functionality with capability of session creation and game flow control.
- Setup database with MySQL queries

## **How To Use**
- Requires MySQL database and Node.js to be installed
- Use 'npm install' command to download the required packages
- Run 'Database.sql' (or 'Millionaire.mwb') queries to create the database and 'TestData.sql' to fill it with sample data
- MySQL connection that has the database should match LOCALHOST variable in 'src/api/DatabaseConnection.js'
- To display the app use 'npm run serve' once node packages are installed
- Run 'node src/server.js' from project folder to start the server which will listen for requests
- There are sample users added with test data called 'host' and 'viewer' who can be used for the game

---

## Screenshots

Login
[Login](/screenshots/1.jpg)

Millionaire @copyright (C) 2019, Eser Kokturk, Alejandro Silva Torres, and Diego Montoya Martinez. All Rights Reserved.
