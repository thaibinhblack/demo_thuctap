<template>
    <mdb-card class="col-md-4" style="margin:auto;margin-top:50px;">

        <mdb-card-body class="mx-4">
            <div class="text-center">
                <h3 class="dark-grey-text mb-5"><strong>VNPT Cây Xanh</strong></h3>
            </div>
            <mdb-input label="Your username" type ="text" v-model="user.username"/>
            <mdb-input label="Your password" type="password" v-model="user.password"   containerClass="mb-0"/>   
            <div id="recaptcha-container"></div>
            <div class="text-center mb-3">
                <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a"  @click="login">Đăng Nhập</mdb-btn>
              
            </div>
            <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2" > or Sign in with:</p>
            <div class="row my-3 d-flex justify-content-center">
                <!-- <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon fab icon="facebook" class="blue-text text-center"/></mdb-btn>
                <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon fab icon="twitter" class="blue-text"/></mdb-btn> -->
                <mdb-btn type="button" color="white" rounded class="z-depth-1a"><mdb-icon fab icon="google-plus" class="blue-text"/></mdb-btn>
            </div>
        </mdb-card-body>
        <mdb-modal-footer class="mx-5 pt-3 mb-1">
            <p class="font-small grey-text d-flex justify-content-end">Bạn đã quên mật khẩu? <a href="#" class="blue-text ml-1"> xác thực qua điện thoại</a></p>
        </mdb-modal-footer>
    </mdb-card>
</template>

<script>
import {mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbModalFooter, mdbIcon } from 'mdbvue';
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
export default {
    name: 'Login',
    components: 
    {
            mdbInput,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            mdbModalFooter,
            mdbIcon,
    },
    computed:{...mapGetters(["user"])},
    methods:{
        login()
        {
           
            axios.post('http://113.161.225.252:8001/rest-auth/login/',{
                username: this.user.username,
                password: this.user.password
            }).then((response) => {
                this.$store.dispatch("token",response.data.key)
                this.$session.set('token',response.data.key)
                this.$router.push('/')
                // console.log(response.data)
            })
        },
        checkLogin()
        {
            if(this.$session.has('token'))
            {
                this.$router.push('/')
            }
        }
    
    },
    mounted()
    {
        this.checkLogin()
    }


}
</script>

<style>

</style>
