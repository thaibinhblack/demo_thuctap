import { getFeature, getLayer, deleteFeatures, updateFeatures  } from '@esri/arcgis-rest-feature-layer'

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
    },
    FeatureAdd: {
        geometry:
        {

        },
        attributes:
        {

        }
    }
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
    FeatureAdd: state => {
        return state.FeatureAdd
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
        }
        else if(payload == "esri-icon-media")
        {
            console.log('vuex',payload)
            state.show.MediaModal = true
        }
        else if(payload == "addFeature")
        {
            state.show.AddModal = true
        }

    },
    showUpdate: (state,payload) => {
        state.show.UpdateModal = payload
    },
    showAdd: (state,payload) => {
        state.show.AddModal = payload
    },
    updateFeature: (state,payload) => {
        console.log(payload)
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
    
}

export default {
    state,
    getters,
    mutations,
    actions
}