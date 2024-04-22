<template>
    <div class="container-fluid ps-5 pe-5 pt-5 pb-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <form>
                    <h1 class="text-primary">User Registration</h1>
                    <div class="form-group">
                        <label>Firstname</label> 
                        <input class="form-control" type="text" required v-model="firstName">
                    </div>
                    <div class="form-group mt-3">
                        <label>Middlename</label> 
                        <input class="form-control" type="text" v-model="middleName">
                    </div>
                    <div class="form-group mt-3">
                        <label>Lastname</label> 
                        <input class="form-control" type="text" v-model="lastName">
                    </div>
                    <div class="form-group mt-3">
                        <label>Birthdate</label> 
                        <input class="form-control" type="date" v-model="birthDate">
                    </div>
                    <div class="form-group mt-3">
                        <label>Present Address</label> 
                        <input class="form-control" type="text" v-model="presentAddress">
                    </div>
                    <div class="form-group mt-3">
                        <label>Contact Number</label> 
                        <input class="form-control" type="text" v-model="contactNumber">
                    </div>
                    <div class="form-group mt-3">
                        <label>Email Address</label> 
                        <input class="form-control" type="text" v-model="emailAddress">
                    </div>
                    <button class="btn btn-primary mt-3 mb-3 form-control" @click.prevent="addUser">
                        {{updateMode ? 'Update' : 'Register'}}
                    </button>
                </form>
            </div>
            <UsersList :users="usersList" @setuser="setUser" @delete="deleteUser"/>
        </div>
    </div>
</template>

<script>

import UsersList from '../components/UsersList.vue'
import axios from '../axios'

    export default {
        components: {
            UsersList
        },
        mounted (){
            this.getUsers()
        },
        data() {
            return {
                firstName       : '',
                middleName      : '',
                lastName        : '',
                birthDate       : '',
                presentAddress  : '',
                contactNumber   : '',
                emailAddress    : '',
                usersList       : [],
                updateMode      : false,
                userID          : null,
            }
            
        },
        methods: {
            getUsers() {
                axios.get('get_users').then(response=>{
                    this.usersList = response.data
                }).catch(error=>{
                    console.log(error)
                })
            },
            async addUser() {
                if(this.updateMode === true){

                    axios.put(`update_user/${this.userID}`,this.usertoJSON())
                    .then(response=>{
                        alert(response.data.message);
                        this.getUsers()
                        this.resetFields()
                    }).catch(error=>{
                        console.log(error)
                    })

                }else{
                    axios.post('users',this.usertoJSON()).then(response=>{
                        alert(response.data.message);
                        this.getUsers()
                        this.resetFields()
                    }).catch(error=>{
                        console.log(error)
                    })
                }
            },
            resetFields(){
                this.firstName          = null
                this.middleName         = null
                this.lastName           = null
                this.birthDate          = null
                this.presentAddress     = null
                this.contactNumber      = null
                this.emailAddress       = null
                
                this.updateMode         = false
                this.userID             = null
            },
            setUser(user, user_id) {
                this.userID         = user_id
                this.firstName      = user.firstname
                this.middleName     = user.middlename
                this.lastName       = user.lastname
                this.birthDate      = user.birthdate
                this.presentAddress = user.present_address
                this.contactNumber  = user.contact_number
                this.emailAddress   = user.email_address
                this.updateMode     = true
            },
            deleteUser(userID){
                let prompt = confirm("Are you sure you want to delete this user?")
                if(prompt){
                    this.userID = userID
                    axios.delete(`delete_user/${this.userID}`)
                    .then(response=>{
                        alert(response.data.message);
                        this.getUsers()
                    }).catch(error=>{
                        console.log(error)
                    })  
                }
            },
            usertoJSON(){
                return {
                    firstname           : this.firstName,
                    middlename          : this.middleName,
                    lastname            : this.lastName,
                    birthdate           : this.birthDate,
                    present_address     : this.presentAddress,
                    contact_number      : this.contactNumber,
                    email_address       : this.emailAddress
                }
            }
        }
    }
</script>

  