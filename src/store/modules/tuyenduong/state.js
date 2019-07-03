import axios from 'axios'
import Vue from 'vue'
export const tuyenduong = axios.get("http://113.161.225.252:8001/tuyen-duong/",{
    headers: {
        Authorization: 'Token '+ Vue.$session.get('token')
    }
}).then((response) => {
    return response.data
})

