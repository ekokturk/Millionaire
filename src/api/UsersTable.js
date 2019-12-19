// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const DB = require('./DatabaseConnection.js');

class UsersTable {
// ========================================= CREATE =========================================
    // Create a new user with a username
    create( username ) 
    {
        return DB.getQueryPromise(`INSERT INTO users( username ) values ('${username}')`)
    }
// ========================================= READ =========================================
    // Get user data by the username
    readByUsername(username)   
    {
        return DB.getQueryPromise(`SELECT * FROM Users WHERE Username='${username}'`)
    }
    // Get user data by the id
    readById( id )   
    {
        return DB.getQueryPromise(`SELECT * from users WHERE idUser=${id}`)
    }
// ========================================= UPDATE =========================================

// ========================================= DELETE =========================================
}

module.exports = new UsersTable;