<template>
  <div id="modalEditFeature">
    <!-- Side Modal Top Right -->
    <mdb-modal fullHeight position="right" class="modal_editfeature" direction="right" :show="showUpdate" v-if="FeatureSelected != null" @close="closeModal">
        <mdb-modal-header>
            <mdb-modal-title>
              <p>Cập nhật thông tin cây thứ {{FeatureSelected.attributes.OBJECTID}} </p>
              <p>Cây {{FeatureSelected.attributes.MaTenCX}} - Số hiệu: {{FeatureSelected.attributes.SoHieu}} </p>
            </mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
           <mdb-input label="Số hiệu" v-model="FeatureSelected.attributes.SoHieu"  />
           
           <mdbInput label="Chiều cao" :value="FeatureSelected.attributes.ChieuCao"  />
           <mdbInput label="Độ rộng tán" :value="FeatureSelected.attributes.DoRongTan" />
           <mdbInput label="Đường kính" :value="FeatureSelected.attributes.DuongKinh" />
           <mdbInput label="Kinh độ" :value="FeatureSelected.attributes.KinhDo" disabled/>
           <mdbInput label="Vĩ độ" :value="FeatureSelected.attributes.ViDo" disabled/>
            <select class="browser-default custom-select" id="select-tinhtrang" v-model="FeatureSelected.attributes.MaTinhTrang">
                <option value="null"> Trạng Thái Cây Xanh </option>
                <option v-for="(tt,index) in tinhtrang" :key="index" :value="tt.matinhtrang" > {{tt.tinhtrang}} </option>
            </select>
           <mdbInput label="Thuộc tính"  v-model="FeatureSelected.attributes.ThuocTinh "/>
           <mdbInput label="Ngày trồng"  v-model="FeatureSelected.attributes.NgayTrong "/>
           <select class="browser-default custom-select" id="select-tuyenduong" v-model="FeatureSelected.attributes.TuyenDuong ">
               <option value="null"> Tuyến Đường </option>
              <option v-for="(td,index) in tuyenduong" :key="index" :value="td.maduong" > {{td.tenduong}} </option>
           </select>
           <mdbInput label="Ngày cập nhật" v-model="FeatureSelected.attributes.NgayCapNhat" disabled/>
           <mdbInput label="Người cập nhật" v-model="FeatureSelected.attributes.NguoiCapNhat"  disabled/>
           <mdbInput type="textarea" label="Ghi chú"  v-model="FeatureSelected.attributes.GhiChu" />
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="primary" @click="updateFeature(FeatureSelected)">Save changes</mdb-btn>
            <mdb-btn id="button-delete" >Delete </mdb-btn>
            <mdb-btn id="button-cancel" @click="closeModal">Cancel</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbContainer } from 'mdbvue'
  import {mapGetters, mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'update-feature',
    components: {
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbBtn,
      mdbInput,
      mdbContainer
    },
    computed:
    {
       ...mapGetters(["showUpdate","FeatureSelected","tuyenduong","tinhtrang","alert"]) 
    },
    data() {
      return {
          modal_local: false,
          selectedfeature: null,
          sloption: 2,  
          sloption2: 3
      }
    },

    methods:
    {
     ...mapActions(["alertSuccessUpdate","updateFeature","view"]),
      closeModal(){
        this.$store.dispatch('showUpdate',false)
       
      },
      deleteFeature(){
        alert("bạn vừa xóa 1 cây")
      },
    },
    
   };
</script>
<style>
  .modal-title p{
    width: 100%;
    color: #fff;
    margin: auto;
    margin-bottom: 2px;
    padding-left: 10px;
    display: inline-block;
    font-size: 17px;
  }

  .modal-header{
    background-color: #0166b4;
    padding: 0 !important;
    padding-top: 3px;
  }

  .modal-header a{
    margin-right: 0 !important;
    color: #000 !important;
  }

  .modal-footer button{
    font-size: 12px;
    padding: 10px;
    margin: 0px;
  }
  
  .modal .modal-dialog.modal-right{
    width:25% !important;
  }

  .modal-body{
    padding-top:0 !important;
  }

  #button-delete{
    background-color: #DC2326 !important;
  }
  #select-chungloai, #select-tuyenduong, #select-tinhtrang{
    padding: 0;
    border-left: none;
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: unset;
  }

  .custom-select{
    background: url('http://127.0.0.1:8080/drop-down-arrow.svg') no-repeat right .75rem center/8px 10px !important;
  }

  .custom-select:focus{
    border: 2px solid #4285f4;
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: unset;
    outline: none !important;
    box-shadow: none !important;
  }
</style>