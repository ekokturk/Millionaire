// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

module.exports = Session = {
    id: 0,
    state: 0,
    hostID: 0,
    players: [],
    questions: [{
        id: 0,
        text: "",
        answers: {
        A: {
            id: 0,
            text: "",
            correct: 0
        },
        B: {
            id: 0,
            text: "",
            correct: 0
        },
        C: {
            id: 0,
            text: "",
            correct: 0
        },
        D: {
            id: 0,
            text: "",
            correct: 0
        }
        },
    }],
    questionSet: 0,
    questionIndex: 0,
    isQuestionDisplayed: 0,
    updateTime: {}
}