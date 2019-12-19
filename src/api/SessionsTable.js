// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const DB = require('./DatabaseConnection.js');

class SessionsTable {
// ========================================= CREATE =======================================
    // Create a new session with a random or a specified question set
    create(data)   
    {
        let questionSet = data.questionSetID == undefined ? '(SELECT idQuestionSet FROM QuestionSets ORDER BY RAND() LIMIT 1)'
                                                          :  data.questionSetID
        return DB.getQueryPromise(`INSERT INTO Sessions(idQuestionSet,idUserHost) 
                                   VALUES(${questionSet}, ${data.hostID})`)
    }

// ========================================= READ =========================================
    // Get session information of the existing active session
    readActiveSession()
    {
        return DB.getQueryPromise(`SELECT idSession AS id, s.idSessionState AS state, idQuestionSet AS questionSet,
                                   idUserHost AS hostID, questionIndex, questionDisplayed AS isQuestionDisplayed, updateTime
                                   FROM Sessions AS s, SessionStates AS st 
                                   WHERE s.idSessionState = st.idSessionState and st.name != 'finished'  
                                   ORDER BY createTime DESC`)
    }
    // Get a specific session data by session id
    readBySessionID(sessionID)   
    {
        return DB.getQueryPromise(`SELECT * FROM sessions WHERE idSession=${sessionID}`)
    }
// ========================================= UPDATE =======================================
    // End all active game sessions by changing their states to finished
    updateAllStatesToFinished()
    {
        return DB.getQueryPromise(`UPDATE sessions  INNER JOIN sessionstates
                                   ON sessions.idSessionState = sessionstates.idSessionState 
                                   SET sessions.idSessionState = (SELECT idSessionState from sessionstates WHERE name = 'finished'),
                                   sessions.updateTime = CURRENT_TIMESTAMP  
                                   WHERE sessionstates.name != 'finished';`)
    }
    // Change game state of a session to finished by ID
    updateStateToFinishedByID(data)
    {
        return DB.getQueryPromise(`UPDATE sessions  INNER JOIN sessionstates
                                   ON sessions.idSessionState = sessionstates.idSessionState 
                                   SET sessions.idSessionState = (SELECT idSessionState from sessionstates WHERE name = 'finished'),
                                   sessions.updateTime = CURRENT_TIMESTAMP  
                                   WHERE sessions.idSession= ${data.id}`)        
    }
    // Update session state for a specific session with session state id
    updateSessionStateByStateID(data)
    {
        return DB.getQueryPromise(`UPDATE sessions SET idSessionState = ${data.idSessionState},
                                   updateTime = CURRENT_TIMESTAMP  WHERE idSession=${data.id}`)
    }
    // Update session state for a specific session with session state name
    updateSessionStateByName(data)
    {
        return DB.getQueryPromise(`UPDATE sessions  INNER JOIN sessionstates
                                   ON sessions.idSessionState = sessionstates.idSessionState 
                                   SET sessions.idSessionState = (SELECT idSessionState from sessionstates WHERE name = '${data.stateName}') ,
                                   sessions.updateTime = CURRENT_TIMESTAMP 
                                   WHERE sessions.idSession= ${data.id}`)
    }
    // Go to the next question by incrementing the index and setting question displayed state
    updateQuestionIndexToNext(data)
    {
        return DB.getQueryPromise(`UPDATE sessions SET questionIndex = questionIndex + 1, questionDisplayed = 1,
                                   sessions.updateTime = CURRENT_TIMESTAMP  WHERE idSession=${data.id}`)
    }
    // Change question displayed state of a session by session id
    updateQuestionDisplayed(data)
    {
        return DB.getQueryPromise(`UPDATE sessions SET questionDisplayed = ${data.isQuestionDisplayed},
                            sessions.updateTime = CURRENT_TIMESTAMP  WHERE idSession=${data.id}`)
    }
// ========================================= DELETE =======================================
}

module.exports = new SessionsTable;