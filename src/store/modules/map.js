import { getFeature, getLayer, deleteFeatures, updateFeatures, queryFeatures, decodeValues   } from '@esri/arcgis-rest-feature-layer'
import { stat } from 'fs';
const state = {
    map: null,
    view: null,
    featurelayer: null,
    objectid: null,
    FeatureSelected: null,
    show:
    {
        UpdateModal: false,
        AddModal: false,
        MediaModal: false,
        SearchModal: false
    },
    FeatureAdd: {
        geometry:
        {

        },
        attributes:
        {

        }
    },
    FeatureSearch: null,
    OpenSearch: false,
    DeleteFeature: false
}

const getters = {
    map: state => {
        return state.map
    },
    view: state => {
        return state.view
    },
    featurelayer: state => {
        return state.featurelayer
    },
    objectid: state => {
        return state.objectid
    },
    FeatureSelected: state => {
        return state.FeatureSelected
    },
    showUpdate: state => {
        return state.show.UpdateModal
    },
    showAdd: state =>
    {
        return state.show.AddModal
    },
    showMedia: state => {
        return state.show.MediaModal
    },
    showSearch: state => {
        return state.show.SearchModal
    },
    FeatureAdd: state => {
        return state.FeatureAdd
    },
    //search
    FeatureSearch: state => {
        return state.FeatureSearch
    },
    OpenSearch: state => {
         return state.OpenSearch
    },
    DeleteFeature: state => {
        return state.DeleteFeature
    }
}

const mutations = {
    map: (state,payload) => {
        state.map = payload
    },
    view: (state,payload) => {
        state.view = payload
    },
    objectid: (state, payload) => {
        state.objectid = payload
        const url = "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0"
        getFeature({
            url,
            id: payload
            }).then(async (feature) => {
           state.FeatureSelected = feature
            
            // this.$store.dispatch("showUpdate",true)
            
        })
    },
    featurelayer: (state,payload) => {
        state.featurelayer = payload
    },
    FeatureSelected: (state,payload) => {
        state.FeatureSelected = payload
    },
    show: (state,payload) => {
        
        if(payload == "esri-icon-edit")
        {
            state.show.UpdateModal = true
            state.show.SearchModal = false
        }
        else if(payload == "esri-icon-media")
        {
            
            state.show.MediaModal = true
        }
        else if(payload == "addFeature")
        {
            state.show.AddModal = true
        }
        else if(payload == "esri-icon-trash")
        {
            deleteFeatures({
                url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
                objectIds: [state.objectid]
            }).then((response) => {
                   
                    alert("Bạn vừa xóa 1 cây xanh trên bản đồ")
                    state.featurelayer.definitionExpression = ""
                    state.featurelayer.refresh()
                    state.view.popup.close()
            });
        }
        else if(payload == "searchFeature")
        {
           
            state.show.SearchModal = true
            state.OpenSearch = true
        }

    },
    showUpdate: (state,payload) => {
        state.show.UpdateModal = payload
    },
    showAdd: (state,payload) => {
        state.show.AddModal = payload
    },
    updateFeature: (state,payload) => {
     
        var myDate = new Date();
        var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
        var date = ('0' + myDate.getDate()).slice(-2);
        var year = myDate.getFullYear();
        var DayUpdate = year + '/' + month + '/' + date;
        payload.attributes.NgayCapNhat = DayUpdate
        updateFeatures({
            url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
            features: [
                payload
            ]
          }).then((response) => {
           alert("Cập nhật thành công!")
          }).catch((erorr) => {
            alert("Cập nhật thất bại, xin vui lòng thử lại!")
        })
        state.featurelayer.refresh()
    },
    //Search Feature
    showSearch: (state,payload) => {
        state.show.SearchModal = payload
        if(payload == false)
        {
            state.featurelayer.definitionExpression = ""
        }
    },
    searchFeature: (state,payload) =>
    {
        
        if(payload != '')
        {
            state.featurelayer.definitionExpression = payload
            
        }
        else
        {
            state.featurelayer.definitionExpression = ""
        }
        
    },
    deleteFeature: (state,payload) =>
    {
        deleteFeatures({
            url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
            objectIds: [payload]
        }).then((response) => {
               
                alert("Bạn vừa xóa 1 cây xanh trên bản đồ")
                state.DeleteFeature = true
                state.featurelayer.refresh()
                state.view.popup.close()
        });
    },
    goTo: (state,payload) => {
        const url = "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0";
        getFeature({
            url,
            id: payload
          }).then(feature => {
            if(feature.geometry != undefined)
            {
                state.view.goTo({
                    target: {
                        geometry: {
                            x: feature.geometry.x,
                            y: feature.geometry.y,
                            spatialReference: { wkid: 102100 }
                        }
                    },
                    zoom: 12,
                })
                state.view.popup.open({
                    location: {
                        x: feature.geometry.x,
                        y: feature.geometry.y,
                        spatialReference: { wkid: 102100 }
                    },
                    features: feature,
                    outFields: ["*"],
                    title: "Cây "+feature.attributes.SoHieu+" - "+feature.attributes.MaTenCX+"",
                    content:"<table class='esri-widget__table'> " +
                    "<tr><th>Số Hiệu </th><td>" + feature.attributes.SoHieu + "</td></tr> " +
                    "<tr><th>Tên Cây Xanh</th><td>" + feature.attributes.MaTenCX + "</td></tr> " +
                    "<tr><th>Kinh độ </th><td>" + (feature.attributes.KinhDo != null ? parseFloat(feature.attributes.KinhDo) : '(Rỗng)') + "</td></tr> " +
                    "<tr><th>Vĩ độ </th><td>" + (feature.attributes.ViDo != null ? parseFloat(feature.attributes.ViDo) : '(Rỗng)') + "</td></tr> " +
                    "<tr><th>Đường Kính </th><td>" + parseFloat(feature.attributes.DuongKinh) + "</td></tr> " +
                    "<tr><th>Chiều Cao </th><td>" + parseFloat(feature.attributes.ChieuCao) + "</td></tr> " +
                    "<tr><th>Độ Rộng Tán </th><td>" + parseFloat(feature.attributes.DoRongTan != null ? feature.attributes.DoRongTan : '(Rỗng)') + "</td></tr> " +
                    "<tr><th>Ngày Trồng </th><td>" + (feature.attributes.NgayTrong != null ? feature.attributes.NgayTrong : '(rỗng)') + "</td></tr> " +
                    "<tr><th>Ngày Cập Nhật </th><td>" + feature.attributes.NgayCapNhat + "</td></tr> " +
                    "<tr><th>Thuộc Tính </th><td>" + (feature.attributes.ThuocTinh != null ? feature.attributes.ThuocTinh : '(rỗng)') + "</td></tr> " +
                    "<tr><th>Ghi Chú </th><td>" + feature.attributes.GhiChu + "</td></tr> " +
                    "<tr><th>Tuyến Đường </th><td>" + feature.attributes.TuyenDuong + "</td></tr> " +
                    "<tr><th>NVKS_X </th><td>" + (feature.attributes.NVKS_X != null ? feature.attributes.NVKS_X : '(rỗng)') + "</td></tr> " +
                    "<tr><th>NVKS_Y </th><td>" + (feature.attributes.NVKS_Y != null ? feature.attributes.NVKS_Y : '(rỗng)') + "</td></tr> " +
                    "<tr><th>Người Cập Nhật </th><td>" + (feature.attributes.NguoiCapNhat != null ? feature.attributes.NguoiCapNhat : '(rỗng)') + "</td></tr> " +
                    "</table> ",
                })
                state.show.SearchModal = false
                state.objectid = payload
                state.show.UpdateModal = true
                state.FeatureSelected = feature
                state.OpenSearch = true
            }
            else
            {
                alert("Cây xanh không có nằm trong bản đồ! Để tránh sai sót xin vui lòng xóa dữ liệu này!")
            }
               
          });
    },
    DeleteFeature: (state,payload) => {
        state.DeleteFeature = payload
    }
   
    
}

const actions = {
    map: ({commit}, payload) => {
        commit("map",payload)
    },
    view: ({commit}, payload) => {
        commit("view",payload)
    },
    objectid: ({commit},payload) => {
        commit("objectid",payload)
    },
    show: ({commit}, payload) => {
        commit("show",payload)
    },
    closeModalAddFeature({commit},payload)
    {
        commit("showAdd",payload)
    },
    featurelayer: ({commit}, payload) => {
        commit("featurelayer",payload)
    },
    FeatureSelected: ({commit},payload) => {
        commit("FeatureSelected",payload)
    },
    showUpdate: ({commit}, payload) => {
        commit("showUpdate",payload)
    },
    updateFeature: ({commit}, payload) => {
        commit("updateFeature",payload)
    },
    //search
    showSearch: ({commit},payload) => {
        commit("showSearch",payload)
        if(payload == false)
        {
            commit("DeleteFeature",false)
            commit("OpenSearch",false)
            commit("objectid",null)
            commit("FeatureSelected",null)

        }
    },
    searchFeature: ({commit},payload) => {
        commit("searchFeature",payload)
    },
    FeatureSearch: ({commit},payload) => {
        commit("FeatureSearch",payload)
    },
    deleteFeature: ({commit},payload) => {
        commit("deleteFeature",payload)
    },
    goTo: ({commit},payload) => {
        commit("goTo",payload)
        commit("showUpdate",true)
    },
    DeleteFeature: ({commit},payload) => {
        commit("DeleteFeature",payload)
    }
    
}

export default {
    state,
    getters,
    mutations,
    actions
}