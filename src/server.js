// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const Express    = require('express')
const Path       = require('path')
const BodyParser = require('body-parser')
const CORS       = require('cors')

const App = Express();

App.use( Express.static('public'));     // Where the static files are located
App.use( BodyParser.json() );           // We want json formatted data
App.use( CORS() );                      // CORS Policy

const UsersTable        = require('./api/UsersTable.js')
const PermissionsTable  = require('./api/PermissionsTable.js')
const SessionsTable     = require('./api/SessionsTable.js')
const PlayersTable      = require('./api/PlayersTable.js')
const LifelinesTable    = require('./api/LifelinesTable.js')
const QuestionsTable    = require('./api/QuestionsTable.js')
const AnswersTable      = require('./api/AnswersTable.js')

// ========================================= USERS TABLE =========================================
// Get user data
App.post('/api/user/read/username', (request, response) => {
    let username = request.body.username;
    UsersTable.readByUsername( username )
        .then(  userData =>  {response.json(userData); })
        .catch( error    =>  {console.log('Error reading by username')});
});
// Create a new user
App.post('/api/user/create', (request, response) => {
    let username = request.body.username;
    UsersTable.create( username )
        .then(  responseData => { response.json({error: 0, response: responseData}); })
        .catch( error        => { console.log('Error creating new user') });
});

// ====================================== PERMISSIONS TABLE ======================================
// Get permissions of a user by user id
App.post('/api/permissions/read/id', (request, response) => {
    let userID = request.body.userID;
    PermissionsTable.readByUserID( userID )
        .then(  permissionsData => { response.json(permissionsData); })
        .catch( error           => { console.log('Error reading by permission id')});
});
// Create permissions for a user by user id
App.post('/api/permissions/create', (request, response) => {
    PermissionsTable.create( request.body )
        .then(  permissionsData  => { response.json(permissionsData);})
        .catch( error            => { console.log('Error creating new permission')});
});

// ====================================== SESSIONS TABLE ======================================
// Get session
App.post('/api/sessions/read/id', (request, response) => {
    SessionsTable.readBySessionID(request.body.sessionID).then( sessionResp => {
        response.json(sessionResp);
    })
    .catch( error => {console.log('Error reading by session id')});
});

App.post('/api/sessions/read/active', (request, response) => {
    SessionsTable.readActiveSession()
        .then(  sessionResp => { response.json(sessionResp); })
        .catch( error       => { console.log('Error reading by session id')} );
});

// Create Session
App.post('/api/sessions/create', (request, response) => {
    SessionsTable.updateAllStatesToFinished()                                                   // End all session
        .then(resp => {
            SessionsTable.create(request.body)                                                  // Cerate a new session
                .then(  sessionResp => { response.json({error: 0, response: sessionResp});})
                .catch( error       => {console.log('Error creating new session')});
        })
});

// End session by ID
App.post('/api/sessions/end/id', (request, response) => {
    SessionsTable.updateStateToFinishedByID(request.body)
        .then(  sessionResp  => { response.json(sessionResp); })
        .catch( error        => {console.log('Error ending session by id')});
});

// Update session state by ID
App.post('/api/sessions/update/state/id', (request, response) => {
    SessionsTable.updateSessionStateByStateID(request.body)
        .then(  sessionResp  => { response.json(sessionResp); })
        .catch( error        => {console.log('Error updating session state by id')});
});

// Update session state by state name
App.post('/api/sessions/update/state/name', (request, response) => {
    SessionsTable.updateSessionStateByName(request.body)
        .then(  sessionResp  => { response.json(sessionResp); })
        .catch( error        => {console.log('Error updating session state by name')});
});

// Update question index by one integer and set display question to true
App.post('/api/sessions/update/questionindex', (request, response) => {
    PlayersTable.updateAllPlayerAnswersToNullBySessionID(request.body)                  // Reset player answers for the session
    .then(()  => { 
        SessionsTable.updateQuestionIndexToNext(request.body)                           // Go to next question
            .then(  sessionResp  => { response.json(sessionResp); })
            .catch( ()           => {console.log('Error updating question index')});    
    })
    .catch( () => {console.log('Error updating player answers')});
});

// Change question display of a session
App.post('/api/sessions/update/questiondisplayed', (request, response) => {
    SessionsTable.updateQuestionDisplayed(request.body)
        .then(  sessionResp  => { response.json(sessionResp); })
        .catch( error        => {console.log('Error updating question index')});
});

// Update Session
App.post('/api/sessions/update', (request, response) => {
    PlayersTable.updateSessionStateByID(request.body)
    .then(  sessionResp  => { response.json({error: 0, response: sessionResp}); })
    .catch( error        => {console.log('Error updating session')});
});

// ====================================== PLAYERS TABLE =====================================
// Create Player
App.post('/api/players/create', (request, response) => {
    PlayersTable.create(request.body)
    .then(  playerResp  => {                                                                                    // Create Player
        LifelinesTable.create(playerResp.insertId)                                                              // Create lifelines for player
        .then( lifelinesResp => { response.json({error: 0, player: playerResp, lifelines: lifelinesResp}); })
        .catch(() => {console.log('Error creating new lifelines')})
    })
    .catch( () => {console.log('Error creating new session')});
});

// Get player data by user id
App.post('/api/players/read/userid', (request, response) => {
    PlayersTable.readByPlayerByUserID(request.body)
    .then(  playersResp  => { response.json(playersResp); })
    .catch( error        => {console.log('Error reading by user ID')});
});

// Get all player data of a session by session id
App.post('/api/players/read/currentsession', (request, response) => {
    PlayersTable.readAllPlayersBySessionID(request.body.sessionID)
    .then(  playersResp  => { response.json(playersResp); })
    .catch( error        => {console.log('Error reading players')});
});

// Update player playing states for all lost players
App.post('/api/players/update/lost', (request, response) => {
    PlayersTable.updateAllLostPlayersBySessionID(request.body)
    .then(  playersResp  => { response.json(playersResp); })
    .catch( error        => {console.log('Error updating lost players')});
});

// Update player answer by user id
App.post('/api/players/update/answer', (request, response) => {
    PlayersTable.updatePlayerAnswerByUserID(request.body)
    .then(  playersResp  => { response.json(playersResp); })
    .catch( error        => {console.log('Error updating player answer')});
});

// ============================== QUESTIONS AND ANSWERS TABLE ===============================
// Get questions and answers from the databse
App.post('/api/questions/read/questionset', (request, response) => {
    QuestionsTable.readQuestionsBySetID(request.body.setID)                                                     // Questions
        .then(  questionsResp  => { 
          AnswersTable.readAnswersBySetID(request.body.setID)                                                   // Answers
            .then(  answersResp  => { response.json({questions: questionsResp, answers: answersResp}); })       // Return both answers and questions
            .catch( ()  => {console.log('Error getting answers')});
        })
        .catch( () => {console.log('Error getting questions')});
});

// ==================================== LIFELINES TABLE =====================================
// Update player lifelines
App.post('/api/lifelines/update/username', (request, response) => {
    LifelinesTable.updateLifelinesByUsername(request.body)
    .then(  playersResp  => { response.json(playersResp); })
    .catch( error        => {console.log('Error updating player lifelines')});
});

// ====================================== SERVER START ======================================
// Always start server at the end
const port = process.env.PORT || 3000;  // bind server to port
App.listen( port, () =>{
    console.log(`Server running on port ${port}`)
})