<template>
    <div>
        <form v-on:submit.prevent="addUser">
            <!-- Side Modal Top Right -->

            <mdb-modal fullHeight  position="right" direction="right" :show="showLocal" @close="closemodal">
                <mdb-modal-header>
                    <mdb-modal-title>Thêm mới user</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body>
                    <mdb-input v-model="user.first_name" label="Họ" size="sm"  required/>
                    <mdb-input v-model="user.last_name" label="Tên" size="sm" required />
                  
                    <!-- <mdb-input label="Gender" size="sm" /> -->
                    <!-- <mdb-input v-model="user.mobile" label="Mobile" size="sm" required />
                    <mdb-input v-model="user.address" type="textarea" label="Address" size="sm" required /> -->
                    <mdb-input v-model="user.email" label="Email" size="sm" required />
                    <mdb-input v-model="user.username" label="Username" size="sm" required />
                    <mdb-input v-model="user.password" label="Password" size="sm" required />
                    <label>Quyền</label>
                    <div class="custom-control custom-checkbox" >
                      <input type="checkbox" class="custom-control-input"  id="defaultChecked1" v-model="user.is_active" >
                      <label class="custom-control-label" for="defaultChecked1">Quyền truy cập hệ thống</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="defaultChecked2" v-model="user.is_staff" checked disabled />
                      <label class="custom-control-label" for="defaultChecked2">Quyền user</label>
                    </div>
                    

                </mdb-modal-body>
                <mdb-modal-footer>

                    <mdb-btn type="submit" color="secondary">Thêm mới</mdb-btn>

                </mdb-modal-footer>
            </mdb-modal>
        </form>
        <!--  -->
    </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbIcon,
  mdbListGroup, mdbListGroupItem, mdbBadge } from 'mdbvue'
import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
export default {
  name: 'add-user',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    async show (newVal, oldVal) {
      this.showLocal = newVal
    }
  },
  data () {
    return {
      user: {
       
      },
      showLocal: false
    }
  },
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput,
    mdbIcon,
    mdbListGroup,
    mdbListGroupItem,
    mdbBadge
  },
  methods: {
    closemodal () {
      this.$emit('updateshow', false)
      this.showLocal = false
    },
    addUser () {
      axios.post('http://113.161.225.252:8001/user/',this.user,{
        headers: {
             Authorization: 'Token ' + this.$session.get('token')
          }
        }).then((response) => {
          this.closemodal()
      }).catch((error) => {
        alert("Tạo tài khoản mới không thành công! xin vui lòng thử lại!")
      })
        
    }
  },
  created () {
  }
}
</script>
<style>
p{margin-bottom: 0 !important;font-size: 15px;}
span{font-size: 15px}
li.custom-item {display:inline-block !important}
.btn-goto {margin-left:10px; cursor: pointer; transition: cubic-bezier(0.075, 0.82, 0.165, 1);transition-duration: 1s;padding:15px 0}
.btn-goto:hover {color: skyblue;margin-left: 20px;}
</style>