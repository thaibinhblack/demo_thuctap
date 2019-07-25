<template>
  <form v-if="userLocal != null" v-on:submit.prevent="updateuserLocal">
    <!-- Side Modal Top Right -->

    <mdb-modal fullHeight  position="right" direction="right" :show="edit" @close="closemodal">
        <mdb-modal-header>
            <mdb-modal-title>Chỉnh sửa thông tin userLocal: {{user.last_name}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <mdb-input v-model="user.first_name" label="Họ" size="sm"  />
            <mdb-input v-model="user.last_name" label="Tên" size="sm"  />
            <mdb-input v-model="user.email" label="email" size="sm" />
            <mdb-input v-model="userLocal.username" label="username" size="sm"  />
            <label>Quyền</label>
            <div class="custom-control custom-checkbox" >
                <input type="checkbox" class="custom-control-input"  id="defaultChecked1" v-model="user.is_active" :checked="user.is_active" >
                <label class="custom-control-label" for="defaultChecked1">Quyền truy cập hệ thống</label>
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultChecked2" v-model="user.is_staff" checked disabled />
                <label class="custom-control-label" for="defaultChecked2">Quyền user</label>
            </div>
            <!-- <mdb-input v-model="userLocal.address" type="textarea" label="Address" size="sm" required />
            <mdb-input v-model="userLocal.userLocalname" label="userLocalname" size="sm" required />
            <mdb-input v-model="userLocal.password" label="Password" size="sm" required />    -->
        </mdb-modal-body>
        <mdb-modal-footer>

            <mdb-btn type="submit" color="secondary">Cập nhật</mdb-btn>

        </mdb-modal-footer>
    </mdb-modal>
  </form>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbIcon,
  mdbListGroup, mdbListGroupItem, mdbBadge} from 'mdbvue'
import Vue from 'vue'
import { async } from 'q'
export default {
  name: 'edit-user',
  props: {
    user: {
      type: Object,
      required: true
    },
    edit:{
      type:Boolean,
      required: true
    }
  },
  watch: {
    async user (newVal, oldVal) {
      if (newVal !== '') {
        this.userLocal = newVal
        // this.showLocal = true
        console.log(newVal)
      }
    },
    async edit(newVal,oldVal)
    {
      this.showLocal = newVal
    }
  },
  data () {
    return {
      showLocal: false,
      userLocal: null
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
      this.$emit('edited', null)
      this.showLocal = false
    },
    updateuserLocal () {
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