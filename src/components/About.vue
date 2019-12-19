<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
    <div v-bind:class="classList">
        <div>About {{name}} Vue {{appType}}</div>
    </div>
</template>

<script>
import Controller from '../mixins/Controller.js'
const viewModel = {
    appType: "Demo",
    classList: "about half-width"
}

class AboutController extends Controller {
    constructor(name){
        super(name);
        this.vm = {
            appType : "Demo",
            classList: "about half-width"
        };

        // this.$store.player = new Player();
    }
    doIt() {
        this.appType = "Release"
    }
}

export default new AboutController("GameshowAbout");

</script>

<style>
.about {
    background-color: teal;
    color: white;
    font-size: 24px;
    font-weight: bold;
}

</style>
