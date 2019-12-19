// @copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.

'use strict'

const SQL = require('promise-mysql');

const LOCALHOST = {
    host: 'localhost',                  // pgwm.vfs.local
    user: 'root',                       //quizshow
    password: '',
    database: 'quizshow_millionaire'
}

const PGWM = {
    host: 'pgwm.vfs.local',                 // pgwm.vfs.local
    user: 'quizshow',                       //quizshow
    password: '',
    database: 'quizshow_millionaire'
}

class DatabaseConnection {

    constructor(port = 3306) // default port for mysql
    {
        this.port = port;
        this.connection = null;
        this.options = LOCALHOST;
    }
    
    connect( options = this.options ) 
    {
        return new Promise( (resolve, reject ) => {
           SQL.createConnection(options)
            .catch(error => { reject ( error)})
            .then( conn => {
                console.log(`Connected to db @${options.host}`);
                this.connection = conn;
                resolve( conn )
            })
        })
    }

    disconnect()
    {
        console.log("Disconnected from db")
        this.connection.end();
    }

    getQueryPromise(query)
    {
        return new Promise((resolve, reject) => {
            this.connect()
                .catch( error => { reject ( error ); this.disconnect();})
                .then( db => {
                    db.query(query)
                    .then((results) => {
                        console.log(results)
                        resolve( results );
                    })
                    this.disconnect();
                })
            
        });
    }
}

module.exports = new DatabaseConnection();