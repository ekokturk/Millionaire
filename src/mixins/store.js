// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'

// Models
import User from '../models/User.js'
import Session from '../models/Session.js'
import Question from '../models/Question.js'

const SERVER_URL = '//localhost:3000'

Vue.use( Vuex )

export default new Vuex.Store({
//---------------------------------------------- STATE ----------------------------------------------
//===================================================================================================
    state: {
        user:    User,
        session: Session,
        rewards: [
            100,
            200,
            300,
            500,
            1000,
            2000,
            4000,
            8000,
            16000,
            32000,
            64000,
            125000,
            250000,
            500000,
            1000000,],
    },
//---------------------------------------------- GETTERS ----------------------------------------------
//=====================================================================================================
    getters: {
        // User
        userRole:        state => state.user.role,
        userName:        state => state.user.username,
        userID:          state => state.user.id,
        userIsLoggedIn:  state => state.user.isLoggedIn,
        userPermissions: state => state.user.permissions,
        // Session
        sessionState:         state => state.session.state,
        sessionHostID:        state => state.session.hostID,
        questionIndex:        state => state.session.questionIndex,
        isQuestionDisplayed:  state => state.session.isQuestionDisplayed,
        // Players
        players : state => state.session.players,
        // Questions
        questions : state => state.session.questions,
        // Rewards
        rewards: state => state.rewards,
    },
//--------------------------------------------- MUTATIONS ---------------------------------------------
//=====================================================================================================
    mutations: {
        // Refresh user object with payload data
        refreshUser(state, payload)
        {    
            state.user = {...state.user,...payload};    
        },      
        // Refresh session object with payload data
        refreshSession(state, payload)
        {
            state.session = {...state.session,...payload};
        }
    },
//---------------------------------------------- ACTIONS ----------------------------------------------
//=====================================================================================================
    actions: {
    // ===================================== UPDATE SESSION ================================
        // Update current session according to active session
        updateSession({commit,state}, context ) {
            // console.log(this.state.session)
            Axios.post(`${SERVER_URL}/api/sessions/read/active`).then( resp => {
                if (resp.data.length == 0)                                          // Reset current session if 
                {
                    commit('refreshSession', Session );
                    return;
                }
                // Set default state if there are no states
                let session = resp.data[0];
                commit('refreshSession', session);
                let payload  = {sessionID: state.session.id}                            // Data to create a session 
                Axios.post( `${SERVER_URL}/api/players/read/currentsession`, payload)   // Make request the get players of the current session
                        .then(playersResp => { 
                        commit('refreshSession', {players:playersResp.data});           // Refresh session with players
                    })      
            })
        },

    // ========================================= USER =======================================
        setDefaultUser({commit}) { commit('refreshUser', User )},
        setUserRole({commit}, userRole){ commit('refreshUser', {role:userRole} )},

        // Get user and user permissions from the database to store
        fetchUser({commit},username)
        {
            return new Promise((resolve, reject)=>{
                Axios.post( `${SERVER_URL}/api/user/read/username`, username).then(userResp => {
                    if(userResp.data.length > 0)
                    {
                        let user = userResp.data[0];                // Fetched user data
                        Axios.post( `${SERVER_URL}/api/permissions/read/id`, {userID: user.idUser})
                            .then(permissionsResp => {
                                commit('refreshUser', {
                                        id         :user.idUser, 
                                        username    :user.username, 
                                        permissions :permissionsResp.data[0],
                                        isLoggedIn  : true});
                                resolve({result: "Login successful"});
                            })
                    }
                    else
                        resolve({result: "User does not exists"})       // Throw error
                })
                .catch(error => { reject(error) })
            });
        },

        // Get user and user permissions from the database to store
        createUser({commit}, user)
        {
            return new Promise((resolve, reject)=>{
                // Get user to check if it already exists                
                Axios.post( `${SERVER_URL}/api/user/read/username`, {username:user.username}).then(userResp => {
                    if(userResp.data.length == 0)                   // User does not exist
                    {
                        // Make a request to create a new user
                        Axios.post( `${SERVER_URL}/api/user/create`, {username:user.username}).then(newUserResp => {
                            if(newUserResp.data.error == 0)             // User creation is successful
                            {
                                // Update user permissions
                                let permissionsPayload = {idUser:newUserResp.data.response.insertId, permissions:user.permissions}
                                Axios.post( `${SERVER_URL}/api/permissions/create`, permissionsPayload)
                                .then((newPermissions) => {
                                    resolve({result: `User ${user.username} created successfully`}) // Success
                                })
                            }
                            else
                                resolve({result: `Error registering user ${user.username}`})    // Error
                        }).catch(error => { reject(error) });
                    }
                    else
                        resolve({result: "User already exists"}) // Error - Same user
                })
                .catch(error => { reject(error) })
            });
        },

    // ========================================= SESSION =======================================
        // Clear session by creating a new one
        setDefaultSession({commit}) { commit('refreshSession', Session )},
        // Create a new session (STOPS OTHER SESSIONS)
        createSession({commit,state})
        {
            // TODO Stop all sessions and reset sessions data
            return new Promise((resolve, reject)=>{
                let payload  = {hostID:state.user.id}                              // Data to create a session 
                Axios.post( `${SERVER_URL}/api/sessions/create`, payload)          // Make request to create a new session
                     .then(sessionResp => {   resolve(sessionResp) })              // Session creation response  
            });
        },
        // Change current session state by state id
        updateCurrentSessionStateByID({state}, stateID)
        {
            return new Promise((resolve, reject)=>{
                let payload  = {id : state.session.id, idSessionState: stateID}     
                Axios.post( `${SERVER_URL}/api/sessions/update/state/id`, payload)  
                     .then(sessionResp => {   resolve(sessionResp) })               
            });
        },
        // Increment current question index and show question to everyone
        incrementCurrentQuestionIndex({state})
        {
            return new Promise((resolve, reject)=>{
                let payload  = {id : state.session.id}                                   // Data to increment question index
                Axios.post( `${SERVER_URL}/api/sessions/update/questionindex`, payload)  // Make request to server
                     .then(sessionResp => {   resolve(sessionResp) })                     
            });         
        },
        // Set question display state for the current session
        updateIsQuestionDisplayed({state}, isQuestionDisplayed)
        {
            return new Promise((resolve, reject)=>{
                let payload  = {id : state.session.id, isQuestionDisplayed: isQuestionDisplayed}    
                Axios.post( `${SERVER_URL}/api/sessions/update/questiondisplayed`, payload)  
                     .then(sessionResp => {   resolve(sessionResp) })                     
            });         
        },
        // Set state of the current session to finished
        finishCurrentSession({commit,state})
        {
            return new Promise((resolve, reject)=>{
                let payload  = {id : state.session.id}                             
                Axios.post( `${SERVER_URL}/api/sessions/end/id`, payload)         
                     .then(sessionResp => {   resolve(sessionResp) })              
            });
        }
        ,
        // ========================================= PLAYERS =======================================
        createPlayer({commit,state})
        {
            return new Promise((resolve, reject)=>{
                let payload  = {userID:state.user.id, sessionID: state.session.id}   
                Axios.post( `${SERVER_URL}/api/players/create`, payload)             
                     .then(playerResp => { resolve(playerResp) })                    
            });            
        },
        fetchPlayerByID({state}, playerID)
        {
            return new Promise((resolve, reject)=>{
                let payload  = {userID:playerID, sessionID: state.session.id}   
                Axios.post( `${SERVER_URL}/api/players/read/userid`, payload)             
                     .then(playerResp => { resolve(playerResp) })                    
            });       
        },
        updateLostPlayersBySessionID({state}, questionIndex)
        {
            return new Promise((resolve, reject)=>{
                let payload  = {questionIndex:state.session.questionIndex, sessionID: state.session.id}   
                Axios.post( `${SERVER_URL}/api/players/update/lost`, payload)             
                     .then(playerResp => { resolve(playerResp) })                    
            });       
        },

        updateCurrentPlayerAnswer({state},answer)
        {
             return new Promise((resolve, reject)=>{
                let payload  = {answer:answer, userID: state.user.id, sessionID: state.session.id}   
                Axios.post( `${SERVER_URL}/api/players/update/answer`, payload)             
                     .then(playerResp => { resolve(playerResp) })                    
            });                  
        },

        // ========================================= QUESTIONS =======================================
        fetchCurrentQuestionsWithAnswers({commit,state})
        {
              return new Promise((resolve, reject)=>{
                let payload  = {setID: state.session.questionSet}
                Axios.post( `${SERVER_URL}/api/questions/read/questionset`, payload)             
                     .then(questionsResp => {                                               // Get questions and answers
                         let questions = questionsResp.data.questions;                      // Create a questions object
                         for (let i = 0; i < questions.length; i++) {                       // Parse answers into that object
                             questions[i].answers = {};
                             questions[i].answers.A = questionsResp.data.answers[i*4];
                             questions[i].answers.B = questionsResp.data.answers[i*4+1];
                             questions[i].answers.C = questionsResp.data.answers[i*4+2];
                             questions[i].answers.D = questionsResp.data.answers[i*4+3];
                         }
                         questions.unshift(Question);
                         commit('refreshSession', {questions:questions});
                         resolve(questionsResp) 
                    })                    
            });              
        },

        // =========================================== LIFELINES =========================================
        updateCurrentPlayerLifelines({state, commit}, lifelines)
        {
            return new Promise((resolve, reject)=>{
                let payload  = {lifelines:lifelines, username: state.user.username, sessionID: state.session.id}   
                Axios.post( `${SERVER_URL}/api/lifelines/update/username`, payload)             
                     .then(playerResp => { resolve(playerResp) })                    
            });     
        }
        
    },


})