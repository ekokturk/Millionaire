<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
    <div class="rewards-container container-box flx flx-col">
        <!-- Money reward each of the question and current question is highlighted -->
        <div v-for="(item, index) in rewards.slice().reverse()" :key="index" 
             :class="['flx flx-row full-width', {'highlight' : (rewards.length - index) == questionIndex}]">
            <div class="reward-index" >{{rewards.length - index}}</div>
            <div class="reward-amount">${{item}}</div>
        </div>
    </div>
</template>

<script>

    const viewModel = {}

    // Getters from store
    const computed = {
        rewards()        { return this.$store.getters.rewards },            // Question rewards from the store
        questionIndex()  { return this.$store.getters.questionIndex },      // Question index of the current session from the store
    }

    const methods = {}

    export default {
        data() { return viewModel },
        methods,
        computed,
    }

</script>

<style scoped>
    .highlight{
        background-color: var(--col-orange-dark);
    }

    .rewards-container{
        width: 250px;
        height: 400px;
        margin: 10px 0;
    }
    .reward-amount{
        text-align: left;
        width: 100%;
    }

    .reward-index{
        text-align: right;
        margin-right: 30px;
        width: 50%;
    }

    .reward-normal{
        color: var(--col-orange-dark);
    }
    
</style>