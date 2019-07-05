<template>
<div>
    <sidebar-menu :menu="menu" :width="width" />
    <router-view></router-view>
</div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import { queryFeatures, decodeValues } from '@esri/arcgis-rest-feature-layer';
import {mapActions} from 'vuex'
export default {
    name: "page-system",
    components: {
        SidebarMenu
    },
    data()
    {
        return{
            menu: [
                {
                    header: true,
                    title: 'Hệ Thống Quản Lý Cây Xanh',    
                },
                {
                        href: '/quanly/dashboard',
                        title: 'Dashboard',
                        icon: 'fas fa-tachometer-alt',
                },
                {
                   
                    title: 'Quản lý người dùng',
                    icon: 'fas fa-user',
                    child: [
                        {
                            href: '/quanly/users',
                            title: 'Tất cả người dùng'
                        },
                        {
                            href: '/quanly/users/lichthicong',
                            title: 'Quản lý lịch thi công'
                        }
                    ]
                }
            ],
            width: "250px"
        }
    },
    methods:
    {
        ...mapActions(["Features"]),
        ApiFeatures()
        {
            const url = "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0"
            queryFeatures({ url })
            .then(queryResponse => {
                decodeValues({
                url,
                queryResponse
                })
                .then((response) => {
                    this.Features(response.features)
                })
            })
        }
    },
    created()
    {
        this.ApiFeatures()
    }
}
</script>

<style>

</style>
