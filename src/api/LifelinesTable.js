// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const DB = require('./DatabaseConnection.js');

class LifelinesTable {
// ========================================= CREATE =======================================
    // Create lifelines for a certain player
    create(playerID)
    {
        return DB.getQueryPromise(`INSERT INTO lifelines( idPlayer ) values (${playerID})`);
    }

// ========================================= READ =========================================
   // Select lifelines of a player by player id
    readLifelinesByPlayerID(playerID)   
    {
        return DB.getQueryPromise(`SELECT * FROM lifelines WHERE idPlayer=${playerID}`);
    }
   // Select lifelines of a player by user id
    readLifelinesByUserID(userID)   
    {
        return DB.getQueryPromise(`SELECT * FROM lifelines WHERE idUser=${userID}`);
    }

// ========================================= UPDATE =======================================
    // Update player lifelines by username
    updateLifelinesByUsername(data)
    {
        return DB.getQueryPromise(`UPDATE lifelines 
                                   INNER JOIN players ON players.idPlayer = lifelines.idPlayer
				                   INNER JOIN users ON users.idUser = players.idUser
				                   INNER JOIN sessions ON sessions.idSession = players.idSession
				                   SET lifelines.fiftyFifty =  ${data.lifelines.fiftyFifty},  lifelines.doubleDip =   ${data.lifelines.doubleDip}, 
                                       lifelines.askAudience = ${data.lifelines.askAudience}, lifelines.jumpQuestion = ${data.lifelines.jumpQuestion}
                                   WHERE users.username = '${data.username}' AND sessions.idsession = ${data.sessionID}`);
    }
// ========================================= DELETE =======================================
}

module.exports = new LifelinesTable;