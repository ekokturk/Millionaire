// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const DB = require('./DatabaseConnection.js');

class AnswersTable {
// ========================================= CREATE =======================================
    //create(){}
// ========================================= READ =========================================
    readAnswersBySetID(setID)   
    {
        return DB.getQueryPromise(`SELECT answers.idAnswer AS id, answers.text AS text, answers.correct AS correct FROM questions 
                                   INNER JOIN answers ON answers.idQuestion = questions.idQuestion 
                                   INNER JOIN questionSets ON questionSets.idQuestionSet = questions.idQuestionSet 
                                   WHERE questionSets.idQuestionSet = ${setID} ORDER BY difficulty`)
    }

// ========================================= UPDATE =======================================
    //updateByAnswerID(answerID) {}
// ========================================= DELETE =======================================
}

module.exports = new AnswersTable;