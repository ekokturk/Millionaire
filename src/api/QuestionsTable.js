// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const DB = require('./DatabaseConnection.js');

class QuestionsTable {
// ========================================= CREATE =======================================
    // create(){}
// ========================================= READ =========================================
    // Select all questions from a dataset
    readQuestionsBySetID(setID)   
    {
        return DB.getQueryPromise(`SELECT questions.idQuestion AS id, questions.text AS text FROM questions 
                                   INNER JOIN answers ON answers.idQuestion = questions.idQuestion 
                                   INNER JOIN questionSets ON questionSets.idQuestionSet = questions.idQuestionSet 
                                   WHERE questionSets.idQuestionSet = ${setID} GROUP BY questions.idQuestion 
                                   ORDER BY difficulty`)
    }

// ========================================= UPDATE =======================================
    // updateByQuestionID(questionID){}
// ========================================= DELETE =======================================
}

module.exports = new QuestionsTable;