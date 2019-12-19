// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const DB = require('./DatabaseConnection.js');

class PlayersTable {
// ========================================= CREATE =======================================
    // Create a new player with a user id and session id
    create(data)
    {
        return DB.getQueryPromise(`INSERT INTO players( idUser, idSession ) 
                                   values (${data.userID}, ${data.sessionID})`)
    }

// ========================================= READ =========================================
    // Select player with a certain player id
    readByPlayerByPlayerID(playerID)   
    {
        return DB.getQueryPromise(`SELECT * FROM players WHERE idPlayer=${playerID}`)
    }
    // select a player with a username and session id
    readByPlayerByUserID(data)   
    {
        return DB.getQueryPromise(`SELECT players.idPlayer AS id , users.username AS username, players.playing AS playing, answer, 
                                   askAudience, doubleDip, jumpQuestion, fiftyFifty FROM players 
                                   INNER JOIN lifelines ON lifelines.idPlayer = players.idPlayer
                                   INNER JOIN sessions ON sessions.idSession = players.idSession
                                   INNER JOIN users ON users.idUser = players.idUser
                                   WHERE users.idUser=${data.userID} AND players.idSession = ${data.sessionID}`)
    }
    // Select all players registered to a session
    readAllPlayersBySessionID(sessionID)
    {
        return DB.getQueryPromise(`SELECT players.idPlayer AS id, users.username AS username, players.playing AS playing, answer, 
                                   askAudience, doubleDip, jumpQuestion, fiftyFifty FROM players 
                                   INNER JOIN lifelines ON lifelines.idPlayer = players.idPlayer 
                                   INNER JOIN users ON users.idUser = players.idUser
                                   WHERE idSession=${sessionID}`)
    }

// ========================================= UPDATE =======================================
    // Reset answers of the players for a certain session to be used for the next question
    updateAllPlayerAnswersToNullBySessionID(data)
    {
        return DB.getQueryPromise(`UPDATE players INNER JOIN users ON players.idUser = users.idUser  
                                   INNER JOIN sessions ON sessions.idSession = players.idSession
                                   SET players.answer =  NULL
                                   WHERE sessions.idSession = ${data.id}`)
    }
    // Set all lost player playing states to false for a certain session
    updateAllLostPlayersBySessionID(data)
    {
        return DB.getQueryPromise(`UPDATE players INNER JOIN sessions ON sessions.idSession = players.idSession
                                   SET players.playing = 0, players.questionIndex = ${data.questionIndex}
                                   WHERE sessions.idSession = ${data.sessionID} AND players.answer IS NOT TRUE AND sessions.questionIndex != 0;`)
    }
    // Update answer of a player for a session by user id
    updatePlayerAnswerByUserID(data)
    {
        return DB.getQueryPromise(`UPDATE players INNER JOIN users ON players.idUser = users.idUser  
                                   INNER JOIN sessions ON sessions.idSession = players.idSession
                                   SET players.answer =  ${data.answer}
                                   WHERE sessions.idSession = ${data.sessionID}
                                   AND users.idUser = ${data.userID}`)
    }
    // Update players playing state for a session by user id
    updatePlayerStateByUserID(data)
    {
        return DB.getQueryPromise(`UPDATE players INNER JOIN users ON players.idUser = users.idUser  
                                   INNER JOIN sessions ON sessions.idSession = players.idSession
                                   SET players.playing = ${data.state}
                                   WHERE sessions.idSession = ${data.sessionID}
                                   AND users.idUser = ${data.id}`)
    }
// ========================================= DELETE =======================================
}

module.exports = new PlayersTable;