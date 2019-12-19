
<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
    <div class="flx flx-col">
        <div class="player-list-title">PLAYERS</div>
        <ul class="players-list" size="15" none>
            <!-- List that will contain all the players that are in the game -->
            <li  class="hide" disabled selected>PLAYERS</li>
            <li  v-for="(item,index) in players" :key="index"> 
                <!-- Change player list item background color depending on the player state -->
                <div :class="[ 'player-list-item', {'player-ready'   : item.answer != undefined && isQuestionDisplayed,    
                                                    'player-correct' : item.answer == 1 && !isQuestionDisplayed,
                                                    'player-wrong'   : item.answer == 0 && !isQuestionDisplayed,
                                                    'player-over'    : item.playing == 0}]">
                    {{ item.username}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    const viewModel = {
    };

    const computed = {
        players()              { return this.$store.getters.players },
        isQuestionDisplayed()  { return this.$store.getters.isQuestionDisplayed },
    };

    export default 
    {
        data() { return viewModel },
        computed,
    }
</script>

<style >

.players-list{
    margin: 20px;
    margin-top: 6px;
    width: 300px;
    height: 550px;
    overflow: auto;
    list-style-type: none;
    padding: 0;
    border: none;
    outline: var(--col-blue-dark) 6px solid;
    align-self: center;
    background: radial-gradient(#001e46 20%,rgb(0, 0, 0));
    
}
.player-list-title{
    outline: var(--col-blue-dark) 6px solid;
    background: radial-gradient(#1c314e 20%,rgb(0, 0, 0));
    width: 280px;
    align-self: center;
    padding: 10px;
    color: var(--col-blue-light);
}

.player-list-item{

    background: radial-gradient(#001e46 20%,rgb(0, 0, 0));
    background-size: 100% 100%;
    padding: 5px;
    align-self: center;
    pointer-events: none;
}

.player-ready{
    background: radial-gradient(#cea903 20%,rgb(0, 0, 0));
}

.player-correct{
    background: radial-gradient(#03944c 20%,rgb(0, 0, 0));
}

.player-wrong{
    background: radial-gradient(#aa0404 20%,rgb(0, 0, 0));
}

.player-over{
    background: radial-gradient(#a39c9c 20%,rgb(0, 0, 0));
}

</style>