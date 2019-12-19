<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
    <div class="hostview-containter flx flx-col">
        <div class="hostview-title">HOST VIEW</div>
        <div class="flx flx-row">
            <div class=" flx flx-col full-width">
                <!-- Host session state control buttons -->
                <div class="btn btn-host" @click="hostGame()" :disabled="sessionState != 1">Host Session</div>
                <div class="btn btn-host" @click="startGame()" :disabled="sessionState != 2">Start Session</div>
                <div class="btn btn-host" @click="endGame()" >End Session</div>
                <!-- Question Rewards -->
                <rewards v-bind:currentReward="questionIndex"></rewards>
                <!-- Skip to the next question -->
                <div class="btn btn-host"  @click="nextQuestion()" 
                     :disabled="!(sessionState == 3 && !(isNextPressed || isQuestionDisplayed) && questionIndex < 15)">
                     Next Question</div>
            </div>
            <div class="flx flx-col full-width">
                <!-- Game Question and Answers depending on the current index -->
                <div  class="flx flx-col full-height">
                    <!-- Question Timer -->
                    <div class="timer-container">
                        <timer class="timer-component"  :show="isQuestionDisplayed" :duration="30"></timer>
                    </div>
                    <!-- Question -->
                    <div class="container-box question-container flx">
                        <div class="question-text" v-if="questionIndex != 0">{{questions[questionIndex].text}}</div>
                    </div>
                    <!-- Answers -->
                    <div class="">
                        <div class="flx flx-row">
                            <!-- A -->
                             <div :class="['container-box answer flx',{'answer-correct': !isQuestionDisplayed &&
                                      questions[questionIndex].answers.A.correct == 1}]">
                                <div class="answer-text" v-if="questionIndex != 0">
                                    A: {{questions[questionIndex].answers.A.text}}</div>
                            </div>
                            <!-- B -->
                            <div :class="['container-box answer flx',{'answer-correct': !isQuestionDisplayed &&
                                      questions[questionIndex].answers.B.correct == 1}]">
                                <div class="answer-text" v-if="questionIndex != 0">
                                    B: {{questions[questionIndex].answers.B.text}}</div>
                            </div>
                        </div>
                        <div class="flx flx-row">
                            <!-- C -->
                            <div :class="['container-box answer flx',{'answer-correct': !isQuestionDisplayed &&
                                      questions[questionIndex].answers.C.correct == 1}]">
                                <div class="answer-text" v-if="questionIndex != 0">
                                    C: {{questions[questionIndex].answers.C.text}}</div>
                            </div>
                            <!-- D -->
                            <div :class="['container-box answer flx',{'answer-correct': !isQuestionDisplayed &&
                                      questions[questionIndex].answers.D.correct == 1}]">
                                <div class="answer-text" v-if="questionIndex != 0">
                                D: {{questions[questionIndex].answers.D.text}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <player-list class="full-width full-height"></player-list>
        </div>
    </div>
</template>

<script>

    import PlayerList from '../components/PlayerList.vue'
    import Rewards from '../components/Rewards.vue'
    import Timer from '../components/Timer.vue'

    const viewModel = {
        isNextPressed : 0,          // Makes next question button unclickable until timer ends
        timer: 30,                   // Question timer
    }

    const computed = {
        userRole()             { return this.$store.getters.userRole },                 // User login role (host, viewer, player)
        userName()             { return this.$store.getters.userName },                 // Username
        userIsLoggedIn()       { return this.$store.getters.userIsLoggedIn },           // User logged in or not
        sessionState()         { return this.$store.getters.sessionState },             // State of the session (initialized: 1, hosting: 2, started: 3, finished: 4)
        questionIndex()        { return this.$store.getters.questionIndex },            // Question that current session is at
        isQuestionDisplayed()  { return this.$store.getters.isQuestionDisplayed },      // If the question is displayed or not for the active session
        questions()            { return this.$store.getters.questions },                // Questions and answers of a session
    }

    const methods = {

        // Host game by accepting players 
        hostGame(event)
        {
            this.$store.dispatch('updateCurrentSessionStateByID', 2);           // Update session state to hosting
        },
        // Start the game with first question
        startGame(event)
        {
            this.$store.dispatch('updateCurrentSessionStateByID', 3)                           // Update session state to started
            .then(() =>{this.$store.dispatch("fetchCurrentQuestionsWithAnswers");});           // Get questions for the session
        },
        // Skip to the next question until last question, if so end the game
        nextQuestion()
        {
            viewModel.isNextPressed = true;                                         // Disable the button so host can click it
            this.$store.dispatch('updateLostPlayersBySessionID').then( () =>{       // Remove lost players from the game
                this.$store.dispatch('incrementCurrentQuestionIndex')               // Go to the next question by changing the index on the database
                    .then(  resp  => { this.questionTimer(); } )                    // start a timeout for the next question
                    .catch( error => { viewModel.isNextPressed = false} );          // Active next question button once the timeout is over
            })
        },
        // Timeout to wait for a question to be answered by the players
        questionTimer()
        {
            setTimeout(() => {
                // Show the question for the duration of the timeout by changing it questionDisplayed parameter of the session
                this.$store.dispatch('updateIsQuestionDisplayed', 0).then(  resp  => {  
                    viewModel.isNextPressed = false                                 // Activeate next question button
                });
            }, 1000 * viewModel.timer);                                             // Timeout duration
        },
        // End the current session
        endGame()
        {
            this.$store.dispatch('updateLostPlayersBySessionID').then( () =>{       // Set play playing states 
                this.$store.dispatch('finishCurrentSession').then(()=>{             // End the current active game session
                    this.$router.push('/');
                });
            });
        }
    }

    export default {
        name: 'GameshowHost',
        data: () => { return viewModel },
        computed,
        methods,
        created() {this.$store.dispatch("fetchCurrentQuestionsWithAnswers")},       // Get questions when the view is created
        components: {
            PlayerList, 
            Rewards,
            Timer
        }
    }

</script>

<style scoped>

.question-text{
    margin: auto;
    padding: 0 10px;
    font-size: 35px;
}

.question-container{
    width: 670px;
    height: 180px;
}

.answer{
    width: 300px;
    height: 40px;
    margin: 25px;
    text-align: left;
    font-size: 20px;
}

.answer-text{
    margin: auto;
}

.answer-correct{
    background-color: green;
}

.answer-false{
    background-color: darkred;
}

.hostview-containter{
    border: 3px var(--col-blue-indigo) solid;
    padding: 20px;
}

.hostview-title{
    font-size: 50px;
    padding-bottom: 25px;
    color: var(--col-blue-light);
}

.btn-host{
    align-self: center;
    margin: 3px 0;
    padding: 10px 30px;
    width: 270px;
}

.timer-container{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
    height: 170px;
    text-align: center;
}

.timer-component{
    position: relative;
    width: 100%;
    align-self: center;
}

</style>