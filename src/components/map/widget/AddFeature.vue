<template>
<form v-on:submit.prevent="addFeature">
  <mdb-modal removeBackdrop  :scrollable="true" fullHeight  position="right" direction="right" :show="showAdd" @close="closeModalAddFeature(false)">
      
    <mdb-modal-header>
        <mdb-modal-title style="color:#fff;padding:7px">Thêm cây xanh mới</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      
          
          <mdb-input label="Số Hiệu" size="sm"  required v-model="feature.attributes.SoHieu" />
          <select class="browser-default custom-select"  id="select-tuyenduong"  >
              <option>Chủng loại cây xanh</option>
              <option v-for="(cx, index) in cayxanh" :key="index" :value="cx.matencx">{{cx.tencx}}</option>
          </select>
          <select class="browser-default custom-select"  id="select-tuyenduong"  >
              <option v-for="(td, index) in tuyenduong" :key="index" :value="td.maduong">{{td.tenduong}}</option>
          </select>
          <select class="browser-default custom-select" id="select-tinhtrang" style="margin-top:15px;">
              <option v-for="(tt, index) in tinhtrang" :key="index" :value="tt.matinhtrang">{{tt.tinhtrang}}</option>
          </select>
          
          <mdb-input size="sm" lang="Kinh Độ" v-model="feature.attributes.KinhDo" disabled />
          <mdb-input label="Vĩ Độ" size="sm" v-model="feature.attributes.ViDo" disabled />    
          <mdb-input label="Đường Kính" size="sm" v-model="feature.attributes.DuongKinh"  />    
          <mdb-input label="Chiều Cao" size="sm" v-model="feature.attributes.ChieuCao"  />    
          <mdb-input  label="DoRongTan" size="sm" v-model="feature.attributes.DoRongTan" />
          <input type="date" class="form-control"  id="select-tuyenduong" /> 
          <mdb-input label="Thuộc Tính" size="sm"  v-model="feature.attributes.ThuocTinh"/>
          <mdb-input type="textarea" label="Ghi Chú" size="sm" v-model="feature.attributes.GhiChu" />
            <!-- <mdb-input type="textarea" label="Material textarea" :rows="5"/> -->
         
       
      </mdb-modal-body>
      <mdb-modal-footer>
         <button type="submit" class="btn btn-info">Thêm Cây Xanh Mới</button>
        <!-- <mdb-btn color="secondary" @click.native="showLocal = false">Close</mdb-btn>
        <mdb-btn color="primary" @click="resetFeature">Reset</mdb-btn> -->
      </mdb-modal-footer>
      
  </mdb-modal>
</form>

</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn , mdbInput, mdbIcon,
mdbListGroup, mdbListGroupItem, mdbBadge} from 'mdbvue'
import { addFeatures } from '@esri/arcgis-rest-feature-layer'
import { loadModules } from 'esri-loader'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import { async, isPromise } from 'q';

  export default {
    name: 'add-feature',
    computed:{
        ...mapGetters(["showAdd","tuyenduong","tinhtrang","cayxanh","map","view","featurelayer","FeatureAdd"])
    },
    components:
    {
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
    watch:
    {
        view(newVal,oldVal)
        {
            console.log('view 4',newVal,oldVal)
        }
    },
    data()
    {
        return{
          feature: {
            geometry:{

            },
            attributes: {

            }
          }
        }
    },
    methods:{
      ...mapActions(["closeModalAddFeature"]),
      setPointFeature()
        {
           loadModules([
          "esri/Graphic"
        ],
        {
          url: "https://js.arcgis.com/4.11/",
        }).then(async ([Graphic]) => {
             this.$store.state.view.on("click",async (event) => {
              console.log(event)
              var point = {
                type: "point",  // autocasts as new Point()
                geometry: event.mapPoint
              };

              var markerSymbol = {
               type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    color: [35, 102, 169],
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 0.5
                    }
              };

              this.$store.state.view.graphics.removeAll()
             
              var pointGraphic = new Graphic({
                    geometry: event.mapPoint,
                    symbol: markerSymbol
                });
              this.feature.geometry = await event.mapPoint
              this.feature.attributes.ViDo = await event.mapPoint.latitude
              this.feature.attributes.KinhDo = await event.mapPoint.longitude
              console.log('envent',this.showAdd)
              if(this.showAdd == true)
              {
                this.$store.state.view.graphics.add(pointGraphic)
              }
            })
        })
           
      },
      addFeature()
      {
          addFeatures({
            url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
            features: [this.feature]
          })
          .then((response) => {
            alert("thêm cây mới thành công!")
            this.$store.state.featurelayer.refresh()
            this.$store.state.view.graphics.removeAll()
          }).catch((error) => {
            alert("thêm cây mới thất bại!, xin vui lòng thử lại")
          })
      },
      
    },
    updated()
    {
      console.log('updateed',this.showAdd)
      if(this.showAdd == true)
      {
          this.setPointFeature()
      }  
    }
  }
</script>

