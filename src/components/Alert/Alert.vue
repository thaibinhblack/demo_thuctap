<template>
  <div>
    <!-- Frame Modal Bottom -->
    <mdb-modal class="Alert" frame position="top" direction="top" :show="alert.show" @close="alert.show = false">
        <mdb-modal-body class="text-center">
            <mdb-alert :color="alert.color">
                {{alert.message}}
            </mdb-alert>
        </mdb-modal-body>
    </mdb-modal>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import { mdbModal, mdbModalBody, mdbBtn } from 'mdbvue';
  export default {
    name: 'alert',
    components: {
      mdbModal,
      mdbModalBody,
      mdbBtn
    },
    computed:{
        ...mapGetters(["alert"])
    },
    data() {
      return {
        modal: false
      };
    }
  };
</script>
<style>
.Alert {
    z-index: 10000 !important;
    }
.Alert .modal-content {
    width: 50% !important;
    padding-top: 10px;
    border-radius: 5px;
    margin: auto;
    top:15px
}
</style>
