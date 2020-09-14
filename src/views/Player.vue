<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
  <div class="flx flx-col full-width full-height">
    <div v-if=" isQuestionDisplayed && playing && !isAnswered">
      <div class="flx flx-row full-width half-height">
        <div class="flx flx-col" style="width: 35%">
          <div
            @click="doAskAudience()"
            class="life_line_1 lifeline btn btn_ll"
            :disabled="!lifeLines.askAudience"
          ></div>
          <div
            @click="doFiftyFifty()"
            class="btn life_line_3 lifeline btn_ll"
            :disabled="!lifeLines.fiftyFifty"
          ></div>
        </div>

        <div class="half-width" style="width: 30%">
          <div class="full-width" style=" font-size: 100%; width: 100%">{{userName}}</div>
          <div class="quarter-height"></div>
          <timer
            class="timer-component"
            style="width: 100"
            :show="isQuestionDisplayed"
            :duration="30"
          ></timer>
        </div>

        <div class="flx flx-col" style="width: 35%">
          <div
            @click="doDoubleDip()"
            class="btn life_line_2 lifeline btn_ll"
            :disabled="!lifeLines.doubleDip"
          ></div>
          <div
            @click="doJumpQuestion()"
            class="btn life_line_4 lifeline btn_ll"
            :disabled="!lifeLines.jumpQuestion"
          ></div>
        </div>
      </div>
      <div class="full-width flx flx-col">
        <div>{{questions[questionIndex].text}}</div>
      </div>
      <div class="flx flx-row">
        <div class="flx flx-col">
          <div
            @click="saveUserAnswer(0)"
            class="btn"
            id="answerA"
            :disabled="!answer.answerA"
          >{{questions[questionIndex].answers.A.text}}</div>
          <div
            @click="saveUserAnswer(2)"
            class="btn"
            id="answerC"
            :disabled="!answer.answerC"
          >{{questions[questionIndex].answers.C.text}}</div>
        </div>
        <div class="flx flx-col">
          <div
            @click="saveUserAnswer(1) "
            class="btn"
            id="answerB"
            :disabled="!answer.answerB"
          >{{questions[questionIndex].answers.B.text}}</div>
          <div
            @click="saveUserAnswer(3) "
            class="btn"
            id="answerD"
            :disabled="!answer.answerD"
          >{{questions[questionIndex].answers.D.text}}</div>
        </div>
      </div>
    </div>

    <div v-if="!isQuestionDisplayed || !playing || isAnswered">
      <div class="flx flx-row">
        <div class="flx flx-col half-width" style="width: 35%">
          <div
            class="life_line_1 lifeline btn_ll2"
            :disabled="!lifeLines.askAudience"
          ></div>
          <div
            class="life_line_3 lifeline btn_ll2"
            :disabled="!lifeLines.fiftyFifty"
          ></div>
        </div>

        <div style="width: 30%">
          <div style="height: 25%"></div>
          <div
            v-if="questionIndex >= 1"
            style="font-size: 100%; height: 50%"
          >REWARD: {{rewards[questionIndex - 1]}}</div>
          <div v-else style="font-size: 100%; height: 50%"></div>
          <div style="height: 25%"></div>
        </div>

        <div class="flx flx-col half-width" style="width: 35%">
          <div
            class="life_line_2 lifeline btn_ll2"
            :disabled="!lifeLines.doubleDip"
          ></div>
          <div
            class="life_line_4 lifeline btn_ll2"
            :disabled="!lifeLines.jumpQuestion"
          ></div>
        </div>
      </div>

      <div v-if="sessionState == 3 && questionIndex >= 1 && playing">
        <div class="full-width" style="border: 2px solid #0e3f8e">{{questions[questionIndex].text}}</div>
        <div
          v-if="!isQuestionDisplayed"
          class="full-width"
          style="border: 2px solid #0e3f8e"
        >CORRECT ANSWER: {{rightAnswer.text}}</div>
        <div v-if="playerAnswer != null && doubleRight == null" class="full-width" style="border: 2px solid #0e3f8e">YOUR ANSWER: {{playerAnswer.text}}</div>
        <div v-else-if="playerAnswer != null && doubleRight != null" class="full-width" style="border: 2px solid #0e3f8e">YOUR ANSWER: {{firstRight.text}}</div>
        <div v-else class="full-width" style="border: 2px solid #0e3f8e">YOUR ANSWER: Not Answered</div>
      </div>

      <div v-if="questionIndex >= 1 && playing" class="flx flx-row">
        <div @click="logOut()" class="btn" style="font-size: 100%">WITHDRAW</div>
      </div>
    </div>
  </div>
</template>

<script>
import Rewards from "../components/Rewards.vue";
import Timer from "../components/Timer.vue";

const viewModel = {
  doubleChecked: false,
  firstRight: null,
  doubleRight: null,
  answeredQuestions: 0,
  rightAnswered: false,
  isDoubleDipBeingUsed: false,
  first: true,
  divRightAnsw: undefined,
  rightAnswer: null,
  isAnswered: false,
  isWrong: false,
  playing: true,
  mainMenu: true,
  playerAnswer: null,
  lifeLines: {
    fiftyFifty: true,
    askAudience: true,
    jumpQuestion: true,
    doubleDip: true
  },
  answer: {
    answerA: true,
    answerB: true,
    answerC: true,
    answerD: true
  }
};

const computed = {  //Using computed we get all the info we need to play the game
  rewards() {
    return this.$store.getters.rewards;
  },
  userName() {
    return this.$store.getters.userName;
  },
  sessionState() {
    return this.$store.getters.sessionState;
  },
  questionIndex() {
    return this.$store.getters.questionIndex;
  },
  isQuestionDisplayed() {
    return this.$store.getters.isQuestionDisplayed;
  },
  questions() {
    return this.$store.getters.questions;
  }
};
const methods = {
  logOut() {                      //this logOut function will set values needed back to the default ones to allow the user plays another round without refreshing
                                  //the page
      viewModel.doubleRight = null;
      viewModel.firstRight = null;
      viewModel.isDoubleDipBeingUsed = false;
      viewModel.doubleChecked = false;
      viewModel.rightAnswered = false;
      viewModel.answeredQuestions = 0;

      viewModel.first = true;
      viewModel.lifeLines.fiftyFifty = true;
      viewModel.lifeLines.doubleDip = true;
      viewModel.lifeLines.jumpQuestion = true;
      viewModel.lifeLines.askAudience = true;
      viewModel.isWrong = false;
      this.$router.push("/");   //with this we call the router and send "/" as paremeter send it the user to the log in screen
  },
  sendLogIn() {
    if (viewModel.playerAnswer == null && !viewModel.first) { //if its not the first time in the screen and the answer is null
      this.logOut();            //this is made to check if the user didnt choose any answer
      return;
    }
    if (viewModel.isWrong) {    //if the user clicked and its wrong 
      this.logOut();        ///call log out
      return;
    }
    viewModel.playerAnswer = null;    //setting the answer to null in case the user answers one question and it doesnt answer the next one
    viewModel.first = false;          //and setting to false that is not the first time he gets a question
  },

  updating() {    //this function gets called everytime the host changes the question to set values to what they should be
  ////////////////////////////////////////////////////////////////////////////
    if (this.questions[this.questionIndex].answers.A.correct == 1) {         
      viewModel.rightAnswer = this.questions[this.questionIndex].answers.A;
      viewModel.divRightAnsw = "A";
    } else if (this.questions[this.questionIndex].answers.B.correct == 1) {
      viewModel.rightAnswer = this.questions[this.questionIndex].answers.B;
      viewModel.divRightAnsw = "B";                                             //this piece of code gets the correct answer of each question to 
    } else if (this.questions[this.questionIndex].answers.C.correct == 1) {     //compare with the user answer
      viewModel.rightAnswer = this.questions[this.questionIndex].answers.C;
      viewModel.divRightAnsw = "C";
    } else if (this.questions[this.questionIndex].answers.D.correct == 1) {
      viewModel.rightAnswer = this.questions[this.questionIndex].answers.D;
      viewModel.divRightAnsw = "D";
    }
    ////////////////////////////////////////////////////////////////////////////
    viewModel.answer.answerA = true;                                          //we set all the answers to active in case the user used a life-line
    viewModel.answer.answerB = true;
    viewModel.answer.answerC = true;
    viewModel.answer.answerD = true;


    if (this.isQuestionDisplayed == 1) {              //if the question is displayed
      this.sendLogIn();                               //checking if the user needs to be sent to the log in menu

      ////////////////////////////////////////////////////////////////////////////
      viewModel.doubleRight = null;
      viewModel.firstRight = null;      //this variables will set the info of the double dip life line to not be able to use again
      viewModel.isAnswered = false;
      viewModel.doubleChecked = false;          
      ////////////////////////////////////////////////////////////////////////////
    }
  },
  sendAnswer() {        //we send the answer to the server
    this.$store.dispatch(
      "updateCurrentPlayerAnswer",
      viewModel.playerAnswer.correct
    );
  },

  stopPlaying(event) {
    viewModel.playing = false;    
  },
  
  exitBoardOnNoSession()
  {
    if(this.sessionState == 0) this.$router.push('/');  //when there is no sesion the user will get logged out
  },

  doAskAudience(event) {      //ask audience life line
    viewModel.lifeLines.askAudience = false;
    this.$store.dispatch("updateCurrentPlayerLifelines", viewModel.lifeLines);  //we upodate the lifelines to the server
    var aux;
    var aux2;
    var aux3;
    var aux4;
    ////////////////////////////////////////////////////////////////////////////
    if (viewModel.divRightAnsw == "A") {        
      aux = document.getElementById("answerA");
      aux2 = document.getElementById("answerB");
      aux3 = document.getElementById("answerC");
      aux4 = document.getElementById("answerD");
    } else if (viewModel.divRightAnsw == "B") {
      aux = document.getElementById("answerB");
      aux2 = document.getElementById("answerA");
      aux3 = document.getElementById("answerC");
      aux4 = document.getElementById("answerD");
    } else if (viewModel.divRightAnsw == "C") {     //we get the ids of the divs, each case is different because we dont know wich div contains the right answer
      aux = document.getElementById("answerC");
      aux2 = document.getElementById("answerB");
      aux3 = document.getElementById("answerA");
      aux4 = document.getElementById("answerD");
    } else if (viewModel.divRightAnsw == "D") {
      aux = document.getElementById("answerD");
      aux2 = document.getElementById("answerB");
      aux3 = document.getElementById("answerC");
      aux4 = document.getElementById("answerA");
    }
    ////////////////////////////////////////////////////////////////////////////
    var num = Math.floor(Math.random() * 3);                    //create a random number

    if (num == 0) {                 
      aux.classList.add("chosenOne");   //the var aux will always have the correct answer so if the number is 0 we highlit the correct answer
    }
    if (num != 0) {           //if its not
      var num2 = Math.floor(Math.random() * 3);

      switch (num2) {           //we make another random number between the wrong answers and highlit the chosen one
        case 0:
          aux2.classList.add("chosenOne");
          break;

        case 1:
          aux3.classList.add("chosenOne");
          break;

        case 2:
          aux4.classList.add("chosenOne");
          break;
      }
    }
  },
  doFiftyFifty(event) {   //this function will disable 2 answers but not the right one
    viewModel.lifeLines.fiftyFifty = false;
    this.$store.dispatch("updateCurrentPlayerLifelines", viewModel.lifeLines);
    var aux;
    if (viewModel.divRightAnsw == "A") {
      aux = 0;
    } else if (viewModel.divRightAnsw == "B") {
      aux = 1;
    } else if (viewModel.divRightAnsw == "C") {   //we keep track of wich div has the right answer
      aux = 2;
    } else if (viewModel.divRightAnsw == "D") {
      aux = 3;
    }
    do {
      var num = Math.floor(Math.random() * 4);        //we get two random numbers from 0 to 3
      var num2 = Math.floor(Math.random() * 4);
    } while (num == num2 || num == aux || num2 == aux); //they must be differents and cant be the div with the correct answer

    switch (num) {    //depending on which one got elected in the first number we disable it
      case 0:
        viewModel.answer.answerA = false;
        break;
      case 1:
        viewModel.answer.answerB = false;
        break;
      case 2:
        viewModel.answer.answerC = false;
        break;

      case 3:
        viewModel.answer.answerD = false;
        break;
    }
    switch (num2) {   //depending on which one got elected in the second number we disable it
      case 0:
        viewModel.answer.answerA = false;
        break;

      case 1:
        viewModel.answer.answerB = false;
        break;

      case 2:
        viewModel.answer.answerC = false;
        break;

      case 3:
        viewModel.answer.answerD = false;
        break;
    }
  },

  doJumpQuestion(event) {   //this will automatically give you a right answer
    viewModel.lifeLines.jumpQuestion = false;
    this.$store.dispatch("updateCurrentPlayerLifelines", viewModel.lifeLines).then(()=>{
      this.$store.dispatch("updateCurrentPlayerAnswer", 1); //we send 1 because it will always be true
    });


    viewModel.playerAnswer = viewModel.rightAnswer; //we set the user answer to the correct one
    viewModel.isAnswered = true;
  },
  doDoubleDip(event) {//Scott dont judge double dip code, it was hard
    viewModel.lifeLines.doubleDip = false;
    this.$store.dispatch("updateCurrentPlayerLifelines", viewModel.lifeLines);
    viewModel.isDoubleDipBeingUsed = true;

  },
  saveUserAnswer(answer) {//this function will get called every time the user clicks an answer recieving the number of the div that got clicked

    switch (answer) {
      case 0:
        viewModel.playerAnswer = this.questions[this.questionIndex].answers.A;
        break;

      case 1:
        viewModel.playerAnswer = this.questions[this.questionIndex].answers.B;    //setting the user answer to the one on the correspondant div
        break;

      case 2:
        viewModel.playerAnswer = this.questions[this.questionIndex].answers.C;
        break;

      case 3:
        viewModel.playerAnswer = this.questions[this.questionIndex].answers.D;
        break;
    }
      
    if(viewModel.isDoubleDipBeingUsed)  //if th user is using the double dip life-line
    {
      viewModel.answeredQuestions++;  //increase the ammount of divs clicked
      viewModel.doubleRight = viewModel.playerAnswer; //set the answer to a temp variable
    }

    if (viewModel.playerAnswer != viewModel.rightAnswer && !viewModel.doubleChecked) {//if the answer is different that the correct one and it hasnt been checked
      viewModel.isWrong = true;                                                       //by the double dip life line it mwans its wrong
    }

    if(viewModel.doubleRight != null) //if doubleright is null it means that the user is not using the life-line
    {
      if(viewModel.doubleRight.text == viewModel.rightAnswer.text)  //if its correct
      {
        viewModel.isWrong = false;
        viewModel.doubleChecked = true;   //we set this to true because it doesnt matter if its the first one or the second one, it will be correct
      }
    }

    if (!viewModel.isDoubleDipBeingUsed)//if the user its not using double dip
    {
      this.sendAnswer();//we send the answer to the server
      viewModel.isAnswered = true;//and set this to true to get called to the next screen
    } 

    if (viewModel.isDoubleDipBeingUsed && viewModel.answeredQuestions <= 1)//if its being used and the user hasnt clicked before
    {
      if(!viewModel.isWrong)//if its not wrong
      {
        this.sendAnswer();//we send the answer to the server
        viewModel.rightAnswered = true;
        viewModel.firstRight = viewModel.playerAnswer;//we keep track of the right answer because the user has to press another one
      }
    }
    else if (viewModel.isDoubleDipBeingUsed && viewModel.answeredQuestions > 1 && !viewModel.rightAnswered)
    {
      console.log("answered on the second try");
      viewModel.firstRight = viewModel.playerAnswer;//this checks if the user got it right on the second try
      this.sendAnswer();  //we send the answer
    }

    if(viewModel.answeredQuestions > 1 )//if it clicked the first one
    {
      console.log("finished using the bonus");
       viewModel.isDoubleDipBeingUsed = false;  //we ar enot using the life line anymore
        viewModel.isAnswered = true;    //we set it to true to get to the next screen
    }
   }
};

export default {
  name: "GameshowPlayer",
  data: () => {
    return viewModel;
  },
  props: {},
  methods,
  created() {
    this.$store.dispatch("fetchCurrentQuestionsWithAnswers"); //we dispatch the questions with answets
  },
  computed,
  watch: {
    isQuestionDisplayed: function() { //if the screen changes
      console.log("Updated");
      this.updating();
    },
    sessionState: function(){   //if the session changed the state
      this.exitBoardOnNoSession();
    }
  },
  components: {
    Rewards,
    Timer
  }
};
</script>

<style scoped>
.question-box {
  width: 600px;
  height: 180px;
  text-align: center;
  align-self: center;
  vertical-align: middle;
  line-height: 150px;
}

.answer {
  width: 300px;
  height: 40px;
  margin: 25px;
}

.answer-correct {
  background-color: green;
}

.answer-false {
  background-color: darkred;
}

.half-width {
  width: 50%;
}

.half-height {
  height: 50%;
}
.quarter-height {
  height: 25%;
}
.full-height {
  height: 100%;
}

.lifeline {
  background-size: 100% 100%;
  width: 200px;
  height: 200px;
  margin: 20px;
  align-self: center;
}

.lifeline[disabled] {
  outline: solid var(--col-blue-dark) 3px;
  color: gray;
  background: linear-gradient(rgba(0, 0, 0, 0.082) 10%, gray);
  pointer-events: none;
  cursor: default;
}

.chosenOne {
  background: linear-gradient(
    rgba(0, 0, 0, 0.01),
    var(--col-orange-dark),
    rgba(0, 0, 0, 0.05)
  );
  outline: outset var(--col-orange-light) 3px;
}
.btn_ll2 {
  /* background: linear-gradient(rgba(0, 0, 0, 0.171) 0%, var(--col-blue-light) 30%,rgba(0, 0, 0, 0.123) 100%) ; */
  border-radius: 8px;
  color: white;
  padding: 1em;
  margin: 0.5em;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  user-select: none;
}

/* .btn_ll:hover {
  background: linear-gradient(
    rgba(0, 0, 0, 0.01),
    var(--col-orange-dark),
    rgba(0, 0, 0, 0.05)
  );
  outline: outset var(--col-orange-light) 3px;
} */

.btn_ll2[disabled] {
  opacity: 0.35;
  /* outline: solid var(--col-blue-dark) 3px;
  color: gray;
  background: linear-gradient(rgba(0, 0, 0, 0.082) 10%, gray); */
  pointer-events: none;
  cursor: default;
}
</style>