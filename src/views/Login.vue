<!-- 
@copyright (C) 2019, Alejandro Silva Torres, Diego Montoya Martinez and Eser Kokturk. All Rights Reserved.
-->

<template>
    <div class="flx flx-col ">
        <div class="logo logo-lg"></div>
        <!-- Login Form -->
        <div v-if="userIsLoggedIn == false" class="flx flx-col login-container">
            <div class="username">PLEASE ENTER USERNAME</div>
            <!-- Login Input -->
            <input type="text" value=""  autocomplete="off" v-model="usernameInput">
            <div class="flx flx-row full-width">
                <div @click="login()" class="btn full-width">LOGIN</div>
                <div @click="register()" class="btn full-width">REGISTER</div>
            </div>
            <div class="debug-error">{{debug.login}}</div>
        </div>
        <!-- Login Popup -->
        <div v-if="userIsLoggedIn == true" class="popup-background" >
            <div class="popup">
                <!-- Welcome Message -->
                <div class="popup-title">WELCOME {{userName}}</div>
                <!-- User permissions - show if user role is not decided -->
                <div v-if="!userRole">
                    <div>Login As</div>
                    <!-- Login as Host to enter or create a session-->
                    <div class="btn" @click="setRole('host')" 
                         :disabled="!checkPermission('host')">HOST</div>
                    <!-- Login as Player if there is a session and you are not hosting it-->
                    <div class="btn" @click="setRole('player')" 
                         :disabled="!checkPermission('player') || sessionHostID == userID 
                         || sessionState > 2 || sessionState == 0">PLAYER</div>
                    <!-- Login as Viewer if there is a session-->
                    <div class="btn" @click="setRole('viewer')" 
                         :disabled="!checkPermission('viewer') || sessionState == 0">VIEWER</div>
                </div>
                <!-- User Sessions - show if user role is decided -->
                <div v-if="userRole">
                    <div>{{userRole}}</div>
                    <div class="btn" @click="goView()"  :disabled="sessionState < 2" >ENTER SESSION</div>
                    <div class="btn" @click="createSession()" v-if="userRole == 'host'" >CREATE SESSION</div>
                </div>
                <div @click="logout()" class="btn btn-alert">Cancel</div>
                <!-- User permissions -->
                <div class="login-message" v-if="sessionState == 0">
                    {{debug.popup = 'No Game Session Available. Waiting For A Host...'}}
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    const viewModel = {
        debug: { login : "", popup: ""},            // Debug text
        usernameInput: "",                          // Username input in the inputfield
        defaultPermissions: {                       // Default permissions granted to a registered user
            viewer  :   1, 
            player  :   1, 
            host    :   0
        },
    }

    const computed = {
        // Get from store
        userRole()        { return this.$store.getters.userRole },              // User login role (host, viewer, player)
        userName()        { return this.$store.getters.userName },              // Username
        userID()          { return this.$store.getters.userID },                // UserID
        userPermissions() { return this.$store.getters.userPermissions },       // User permissions
        userIsLoggedIn()  { return this.$store.getters.userIsLoggedIn },        // User logged in or not
        sessionState()    { return this.$store.getters.sessionState },          // State of the session (initialized: 1, hosting: 2, started: 3, finished: 4)
        sessionHostID()   { return this.$store.getters.sessionHostID },         // ID of the session host
    }

    const methods = {
        // register user to the database with the provided username and default user permissions
        register()
        {
            if(this.validifyUserInput() == true)                                                    // Check if user input is valid
            {
                this.$store.dispatch("createUser", { username:    viewModel.usernameInput,
                                                     permissions: viewModel.defaultPermissions})    // Server request for user registration
                .then(  data  => {viewModel.debug.login = data.result;})                            // Operation result
                .catch( error => { viewModel.debug.login ='Error Registering User'});
            }
        },
        login()                                                                             
        {
            if(this.validifyUserInput() == true) 
            {
                this.$store.dispatch("fetchUser", {'username': viewModel.usernameInput})
                .then(  data  => { viewModel.debug.login = data.result} )
                .catch( error => { viewModel.debug.login ='Error Logging In'} );
            }
        },
        // Log user out by reseting existing data
        logout()
        {
            this.$store.dispatch("setDefaultUser")              // Reinitialize user with default usermodel
            viewModel.debug.login = "Logout successful"         // Logout message
        },
        // Create new session and change screen to host view
        createSession()
        {
            this.$store.dispatch("createSession").then(() =>{
                this.goView();
            });
        },
        // Use router to change view depending on user login role
        goView()
        {
            this.$store.dispatch("fetchCurrentQuestionsWithAnswers").then(()=>{
                if(this.userRole == 'host')         
                    this.$router.push('/host')
                else if(this.userRole == 'player')
                {
                    this.$store.dispatch('fetchPlayerByID',this.userID).then(resp => {      // Check if player exist
                        if(resp.data.length == 0) this.$store.dispatch('createPlayer')      // Create a new player if it doesnt
                        this.$router.push('/player');
                    })
                }
                else if(this.userRole == 'viewer')
                    this.$router.push('/board')
            })
        },
        // Set user role
        setRole(userRole)
        {
            this.$store.dispatch('setUserRole', userRole)
        },
        // Use regex to validify username input
        validifyUserInput()
        {
            if((/^[a-zA-Z]{3,30}$/).test(viewModel.usernameInput) == false)                 // Check if username is valid
            {
                viewModel.debug.login = "Letter characters between 3-30 for username";      // Show error message
                return false;
            }
            else
            {
                viewModel.debug.login = "";                                                 // Clear error message
                return true;
            }
        },
        // Return true if userRole parameter matches with the user permission
        checkPermission(userRole)
        {
            return this.userPermissions[userRole] == true;
        },
    }

    export default {
        name: 'Login',
        data: () => { return viewModel },
        created() { this.logout() },
        methods,
        computed,
    }
</script>

<style scoped>

    .username{
        size: 30px;
        padding: 10px;
    }

    .login-message{
        color: gray;
        padding: 3px;
    }

    .login-container{
        width: 50%;
        align-self: center;
    }

</style>