<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import GameshowAbout from './components/About.vue'
import GameshowBoard from './views/GameBoard.vue'
import GameshowHost from './views/Host.vue'
import GameshowPlayer from './views/Player.vue'


    const viewModel = {
        UPDATE_FREQ : 3000,   // Main loop update deltatime
        mainLoop: {},         // Interval
    };

    const methods = {
      // Run main polling loop
      run()
      {
        viewModel.mainLoop = setInterval( ()=> 
            this.$store.dispatch('updateSession'), 
          viewModel.UPDATE_FREQ );
      }
    };

export default {
  name: 'app',
  data: () => { return viewModel },
  components: {
    GameshowAbout,
    GameshowBoard,
    GameshowHost,
    GameshowPlayer
  },
  methods,
  created() {this.run()},
  beforeDestroy() { clearInterval( viewModel.mainLoop )}
}

</script>

<style>


#app {
  font-family: Copperplate;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-size: 24px;
  margin-top: 60px;
  margin-left: 10%;
  margin-right: 10%;
  height:90vh;
}



</style>
