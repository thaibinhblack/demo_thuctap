<template>
  <div id="mapView">
      <update-feature />
      <media-feature />
      <menu-app />
      <add-feature />
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
import { getFeature, getLayer  } from '@esri/arcgis-rest-feature-layer'
import { mapActions,mapGetters } from 'vuex'
import UpdateFeature from '@/components/map/widget/UpdateFeature'
import MediaFeature from '@/components/map/widget/MediaFeature'
import MenuApp from '@/components/map/widget/MenuApp'
import AddFeature from '@/components/map/widget/AddFeature'
export default {
  name: 'mapView',
  components:
  {
    UpdateFeature,
    MediaFeature,
    MenuApp,
    AddFeature
  },
  computed:
  {
    ...mapGetters(["showUpdate","showMedia"])
  },
  watch:
  {
    showMedia(newVal,oldVal)
    {
      console.log('media',newVal,oldVal)
    }
  },
  data()
  {
    return{
      show: false
    }
  },
  methods:
  {
    ...mapActions(["OpenPopup"]),
    loadMap()
    {
      loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer",
        ],
        {
          url: "https://js.arcgis.com/4.11/",
        }).then(async ([Map, MapView, FeatureLayer]) => {
          const map = await new Map({
              basemap: "osm",
              // layers: this.features.features
          });
          const view = await new MapView({
            container: "mapView",
            map: map,
            center:   [106.366362, 10.360622],
            zoom: 13
          });
          const featureLayer = await new FeatureLayer({
              url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
              
              title: "Cây Xanh",
              outFields: ["*"],
              popupTemplate: {
                  title: "Cây {SoHieu} - {MaTenCX}",
                  content:  [
                          {
                              type: "fields",
                              fieldInfos: [
                                  {
                                  fieldName: "SoHieu",
                                  label: "Số Hiệu"
                                  },
                                  {
                                  fieldName: "MaTenCX",
                                  label: "MÃ CÂY XANH"
                                  },
                                    {
                                  fieldName: "KinhDo",
                                  label: "Kinh Độ"
                                  },
                                  {
                                  fieldName: "ViDo",
                                  label: "Vĩ Độ"
                                  },
                                  {
                                  fieldName: "DuongKinh",
                                  label: "Đường Kính"
                                  },
                                  {
                                  fieldName: "ChieuCao",
                                  label: "Chiều Cao"
                                  },
                                  {
                                  fieldName: "DoRongTan",
                                  label: "Độ Rộng Tán"
                                  },
                                  {
                                  fieldName: "NgayTrong",
                                  label: "Ngày Trồng"
                                  },
                                  {
                                  fieldName: "NgayCapNhat",
                                  label: "Ngày Cập Nhật"
                                  },
                                  {
                                  fieldName: "ThuocTinh",
                                  label: "Thuộc Tính"
                                  },
                                  {
                                  fieldName: "GhiChu",
                                  label: "Ghi Chú"
                                  },
                                  {
                                  fieldName: "MaTinhTrang",
                                  label: "Mã Tình Trạng"
                                  },
                                  {
                                  fieldName: "TuyenDuong",
                                  label: "Tuyến Đường"
                                  },
                                  {
                                  fieldName: "NVKS_X",
                                  label: "NVKS_X"
                                  },
                                  {
                                  fieldName: "NVKS_Y",
                                  label: "NVKS_Y"
                                  },
                                  
                              ]
                          }
                      ],
                  actions: [{
                      id: "showImg",
                      title: "Xem hình ảnh",
                      className: "esri-icon-media"
                  }, {
                      id: "update-infor-tree",
                      title: "Cập nhật thông tin cây xanh",
                      className: "esri-icon-edit"
                  }, {
                      id: "edit",
                      title: "Tới trang chỉnh sửa",
                      className: "esri-icon-home"
                  }]
              }
          });
          map.add(featureLayer)

          view.popup.viewModel.on("trigger-action", async(event) => {
            
            // if(event.action.id == "edit")
            // {
                const objecid = await event.target.selectedFeature.attributes.OBJECTID
                this.$store.dispatch("objectid",objecid)

                // console.log(event.action.id, event.action.className)
                this.$store.dispatch("show",event.action.className)
            // }
            // console.log(this.show)
            
          })

          // this.$store.dispatch('map',map)
          // this.$store.dispatch('view',view)
          // this.$store.dispatch('featurelayer',featureLayer)
          this.$store.state.view = await view
          this.$store.state.map = await map
          this.$store.state.featureLayer = await featureLayer
          console.log('view map',this.$store.state.view)
      })
      this.$store.dispatch("view",this.$store.state.view)
    }
  },
  created()
  {
    this.loadMap()
  },
  mounted()
  {
    this.loadMap()
    console.log('map view',this.showMedia)
    
  },
  updated()
  {

  }
}
</script>
