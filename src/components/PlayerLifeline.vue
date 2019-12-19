<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
    <div v-if="players[index].playing" style="margin: 10px;">
        <!-- Name of the player inside cirlce (before showing answers) -->
        <div v-if="show" style="margin-bottom: 5px;">
            <div class="circle" :class="{answered: players[index].answer != undefined}">
                <div class="circle-text">{{players[index].username}}</div>
            </div>
        </div>
        <!-- Name of the player inside cirlce (after showing answers) -->
        <div v-if="!show" style="margin-bottom: 5px;">
            <div v-if="questionIndex != 0">
                <div class="circle" :class="{right: players[index].answer == 1, wrong: players[index].answer == 0 || players[index].answer == undefined}">
                    <div class="circle-text">{{players[index].username}}</div>
                </div>
            </div>
            <div v-else>
                <div class="circle">
                    <div class="circle-text">{{players[index].username}}</div>
                </div>
            </div>
        </div>
        <!-- Lifelines -->
        <div class="flx-around flx-row">            
            <div class="life_line_1" :class="{used: !players[index].askAudience}" style="width: 25px; height: 25px; margin: 1px;"></div>
            <div class="life_line_2" :class="{used: !players[index].doubleDip}" style="width: 25px; height: 25px; margin: 1px;"></div>
            <div class="life_line_3" :class="{used: !players[index].fiftyFifty}" style="width: 25px; height: 25px; margin: 1px;"></div>            
            <div class="life_line_4" :class="{used: !players[index].jumpQuestion}" style="width: 25px; height: 25px; margin: 1px;"></div>
        </div>
    </div>
</template>

<script>
const viewModel = {
};

const props = {
    show: Number,           // Indicates if the question is being displayed or not
    index: Number,          // Player index
    questionIndex: Number   // Question index
};

const computed = {
    players()              { return this.$store.getters.players },
}

export default {
    data() { return viewModel },
    props,
    computed
};
</script>

<style>
.circle {
    width: 140px;
    height: 40px;
    border-radius: 64px;
    border: #40507d solid 5px;
}

.circle-text {    
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 1vw;
}

.answered{
    background-color:  #bc4800;    
}

.right{
    background-color:  #006b0a;
}

.wrong{
    background-color:  #871200;    
}

.mini-lifeline {
    width: 20px;
    height: 20px;
}
.flx-around {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
}
.used{
    opacity: 0.35;
}
</style>