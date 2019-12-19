
<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
  <div class="boardview-containter flx flx-col">
    <div class="boardview-title">BOARD VIEW</div>
    <div class="flx flx-row">        
        <div class=" flx flx-col">
            <!-- Question Timer -->
            <div class="timer-container">
                <timer class="timer-component"  :show="isQuestionDisplayed" :duration="30"></timer>
            </div>
            <!-- Rewards component -->
            <rewards v-bind:currentReward="questionIndex"></rewards>
            <div class="btn btn-host" @click="exitBoard()">Exit</div>
        </div>
        <div class=" flx flx-col full-width">
            
            <!-- Game Question and Answers depending on the current index -->
            <div class="flx flx-row" style="margin-bottom: 10px;">
                <!-- Question -->
                <div class="container-box question-box flx">
                    <div class="question-text" v-if="questionIndex != 0">{{questions[questionIndex].text}}</div>
                </div>
                <!-- Answers -->
                <div class="flx flx-col">
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

            <!-- Players w/ lifeline component -->
            <div class="flx-wrap flx-row full-height" style="justify-content: space-around">
                <player-lifeline v-for="(item,index) in players" :key="index" :show="isQuestionDisplayed" :questionIndex="questionIndex" :index="index"></player-lifeline>
            </div>

        </div>
    </div>
  </div>
</template>

<script>

    import PlayerLifeline from '../components/PlayerLifeline.vue'
    import Rewards from '../components/Rewards.vue'
    import Timer from '../components/Timer.vue'

const viewModel = {
};

const methods = {
    // Exits from the board to the login screen
    exitBoard(event){
        this.$router.push('/');
    },
    exitBoardOnNoSession()
    {
      if(this.sessionState == 0) this.$router.push('/');
    }
};

const computed = {
  sessionState()         { return this.$store.getters.sessionState },
  questionIndex()        { return this.$store.getters.questionIndex },
  questions()            { return this.$store.getters.questions },
  players()              { return this.$store.getters.players },
  isQuestionDisplayed()  { return this.$store.getters.isQuestionDisplayed },
}

export default {
  name: "GameshowBoard",
  data: () => { return viewModel; },
  methods,
  created() {},
  computed,
  components: {
    PlayerLifeline,
    Rewards,
    Timer
  },
  watch: {
    sessionState: function() {
      this.exitBoardOnNoSession();
    }
  }
};
</script>

<style>
.flx-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.question-box {
  width: 600px;
  height: 250px;
}

.question-text{
    margin: auto;
    padding: 0 10px;
    font-size: 35px;
}

.answer {
  width: 300px;
  height: 40px;
  margin: 5px;
}

.answer-correct {
  background-color: green;
}

.flx-around{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;    
}

.timer-container{
    width: 100%;
    margin-top: 10px;
    height: 170px;
    text-align: center;
}

.timer-component{
    position: relative;
    width: 100%;
    align-self: center;
}

.boardview-containter{
    border: 3px var(--col-blue-indigo) solid;
    padding: 20px;
}

.boardview-title{
    font-size: 50px;
    padding-bottom: 25px;
    color: var(--col-blue-light);
}
</style>