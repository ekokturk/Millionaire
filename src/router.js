// Vue Router
// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict';

import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Host from './views/Host.vue'
import Player from './views/Player.vue'
import Board from './views/GameBoard.vue'

Vue.use( Router );

export default new Router({
    mode: 'history',
    routes: [
        { path: "/", name: "Login", component: Login },
        { path: "/host", name: "Host", component: Host },
        { path: "/board", name: "Board", component: Board },
        { path: "/player", name: "Player", component: Player },
    ]
});