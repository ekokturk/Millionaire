// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const DB = require('./DatabaseConnection.js');

class PermissionsTable {
// ========================================= CREATE =======================================
    // Create user permission by a user id
    create({idUser, permissions})
    {
        return DB.getQueryPromise(`INSERT INTO permissions(idUser, viewer, player, host) 
                                   values(${idUser},${permissions.viewer},${permissions.player},${permissions.host})`)
    }

// ========================================= READ =========================================
    // Get permissions from user ID
    readByUserID(userID)   
    {
        return DB.getQueryPromise(`SELECT viewer, player, host FROM permissions WHERE idUser='${userID}'`)
    }

// ========================================= UPDATE =======================================
    // updateByUserID(userID){}
// ========================================= DELETE =======================================
}

module.exports = new PermissionsTable;