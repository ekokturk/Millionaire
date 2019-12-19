<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
    <div>
        <div class="flx timer-bg timer ">
            <div v-if="show" class="timer-text">{{counter}}</div>
            <div v-if="!show" class="timer-text">...</div>
        </div>
    </div>
</template>

<script>
    const viewModel = {
        interval: {},         // Interval object
        counter: 0,           // Counter which decreases based on the interval object
        max: 0                // Max duration of the counter
    };

    const methods = {
      runTimer()
      {
          viewModel.max = this.$props.duration;             // Get the duration value into data
          viewModel.counter = this.$props.duration;         // Set the counter as the duration
          viewModel.interval = setInterval( ()=>            // Start interval for the timer
          {
              viewModel.counter--;                          // Decrement count
              if( viewModel.counter < 0)                    // Set it to zero if it is lower than zero
              {
                  viewModel.counter = 0;
              }
          } , 1000 );                                       // 1 second interval
      }
    }

    const props = {
        duration : Number,              // Duration of the counter
        show: Number,                   // State of the timer - Display or not (1 or 0)
    }

    export default {
        name: 'Timer',
        data() { return viewModel },
        props,
        watch:{
            show: (val) => {
                if(val == 1) viewModel.counter = viewModel.max;     // Whenever show value is changed reset counter
            },
        },
        methods,
        created() {this.runTimer()},                                // Start timer when component is created
        beforeDestroy() { clearInterval( viewModel.interval )}      // Stop timer when component is destroyed
    }
</script>

<style>
.timer{

    position: relative;
    width: 130px;
    height: 130px;
    margin: auto;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
}
.timer-text{
    color: var(--col-orange-dark);
    font-size: 2em;
}
</style>