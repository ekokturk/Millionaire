// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

export default class Controller {
    constructor( name = 'component-name'){
        this.name = name;
        this.vm = {};
        this.data = () => {return this.vm};
        this.props = {};
        this.components = { /*we'll override this with our sub-components */};

        // Magic fallows...
        // VUE wants a methods attrib with local methods, we want to generate it
        // from the methods in "this"
        let localMethods = Object.getPrototypeOf( this );
        delete localMethods.constructor;
        let methodNameList = Object.getOwnPropertyNames( localMethods );

        this.methods = {};
        for (let name in methodNameList)
        {
            this.methods[ methodNameList[name]] = localMethods[methodNameList[name]]
        }
    }
}