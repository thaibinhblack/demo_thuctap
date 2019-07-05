<template>
    <mdb-modal removeBackdrop  :scrollable="true" fullHeight  position="right" direction="right" :show="showSearch" @close="closeModal">
      
    <mdb-modal-header>
        <mdb-modal-title style="color:#fff;padding:7px">Tìm kiếm cây xanh trên bản đồ</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
        <mdb-input label="Nhập số hiệu tìm kiếm" size="sm"  @change="searchSH" v-model="SoHieu" />
        <select class="browser-default custom-select"  id="select-tuyenduong" v-model="CayXanh" @change="searchCX"  >
            <option value="">Chủng loại cây xanh</option>
            <option v-for="(cx, index) in cayxanh" :key="index" :value="cx.matencx">{{cx.tencx}}</option>
        </select>
        <select class="browser-default custom-select"  id="select-tuyenduong" v-model="TuyenDuong" @change="searchTD">
            <option value="">Tuyến Đường</option>
            <option v-for="(td, index) in tuyenduong" :key="index" :value="td.maduong">{{td.tenduong}}</option>
        </select>
        <select class="browser-default custom-select" id="select-tinhtrang" style="margin-top:15px;" v-model="TinhTrang" @change="searchTT">
            <option value="">Tình Trạng</option>
            <option v-for="(tt, index) in tinhtrang" :key="index" :value="tt.matinhtrang">{{tt.tinhtrang}}</option>
        </select>
        <br/>
        <p style="padding:10px 0">Kết quả: {{ListSearch.length}}</p>
        <mdb-list-group>
            <mdb-list-group-item v-for="(value,index) in ListSearch" :key="index" class="itemSearch row">
                <div class="col-md-9">
                    OBJECTID: {{value.attributes.OBJECTID }} - SH: {{value.attributes.SoHieu }}
                </div>
                <div class="col-md-3 group-btn">
                    <span @click="goTo(value.attributes.OBJECTID)"><mdb-icon far icon="eye" /></span>
                    <span @click="deleteFeature(value.attributes.OBJECTID)"><mdb-icon far icon="trash-alt" /></span>
                </div>
            </mdb-list-group-item>
           
        </mdb-list-group>
         
       
    </mdb-modal-body>
    <mdb-modal-footer>
    </mdb-modal-footer>
      
  </mdb-modal>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbContainer, mdbListGroup, mdbListGroupItem, mdbBadge,mdbIcon } from 'mdbvue'
import {queryFeatures, decodeValues}  from '@esri/arcgis-rest-feature-layer'
export default {
    name: 'search-feature',
    components: {
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbBtn,
      mdbInput,
      mdbContainer,
      mdbListGroup,
      mdbListGroupItem,
      mdbBadge,
      mdbIcon
    },
    computed: {
        ...mapGetters(["showSearch","tinhtrang","tuyenduong","cayxanh","DeleteFeature"])
    },
    watch:
    {
        DeleteFeature(newVal,oldVal)
        {
            this.SearchFeture()
            this.$store.dispatch("DeleteFeature",false)
        }
    },
    data()
    {
        return{
            SoHieu: "",
            CayXanh: "",
            TuyenDuong: "",
            TinhTrang: "",
            array_SQL: [
                {sql: ""},
                {sql: ""},
                {sql: ""},
                {sql: ""}
            ],
            sql: "",
            ListSearch: []
        }
    },
    methods:
    {
        ...mapActions(["deleteFeature","goTo"]),
        searchSH(e)
        {
            
            if(e != "")
            {
                this.array_SQL[0].sql = "SoHieu Like '%"+e+"%'"
            }
            else
            {
                this.array_SQL[0].sql = ""
            }
            this.SearchFeture()
        },
        searchCX(e)
        {
           
            if(e.target.value != "")
            {
                this.array_SQL[1].sql = "MaTenCX = '" + e.target.value + "'"
            }
            else
            {
                this.array_SQL[1].sql = ""
            }
             this.SearchFeture()
        },
        searchTD(e)
        {
            if(e.target.value != "")
            {
                this.array_SQL[2].sql = "TuyenDuong = '"+ e.target.value + "'"
            }
            else
            {
                this.array_SQL[2].sql = ""
            }
             this.SearchFeture()
        },
        searchTT(e)
        {
            if(e.target.value != "")
            {
                this.array_SQL[3].sql = "MaTinhTrang = '"+ e.target.value + "'"
            }
            else
            {
                this.array_SQL[3].sql = ""
            }
             this.SearchFeture()
        },
        query(sql,val)
        {
            if(sql != "")
            {
                if(val != "")
                {
                    return sql += " AND " + val
                }
                return  sql
            }
            return sql += val
        },
        SearchFeture()
        {
            this.sql = ""
            this.array_SQL.forEach((value,index,array) => {
              
               this.sql = this.query(this.sql,value.sql)
            })
            queryFeatures({
                url:  "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
                where: this.sql
                })
                .then((response) => {
                    this.ListSearch = response.features
                    console.log(response.features)
            })
            this.$store.dispatch("searchFeature",this.sql)
                
        },
        closeModal()
        {
            this.$store.dispatch("showSearch",false)
        }
    },
    beforeUpdate()
    {
        // this.SearchFeture()
    },
    mounted()
    {
        console.log('Search',this.showSearch)
        
    },
}
</script>

<style>
.itemSearch {font-size: 12px !important;margin: 0 !important}
.group-btn {padding-right: 0 !important;}
.group-btn>span:first-child {margin-right: 10px;}
.group-btn>span {cursor: pointer;}
</style>
