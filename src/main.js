// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

import Vue from 'vue'
import Store from './mixins/store.js'
import Router from './router.js'
import App from './App.vue'
import './assets/css/style_base.css'
import './assets/css/style.css'


Vue.config.productionTip = false

class MillionaireGame {
  constructor()
  {
      this.view = new Vue({
          store:  Store,
          router: Router,
          render: h => h(App),
        }).$mount('#app')
  }
}

document.addEventListener("DOMContentLoaded", ()=>{

  new MillionaireGame();

})