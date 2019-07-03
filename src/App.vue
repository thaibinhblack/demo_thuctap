<template>
  <div id="app">
      <alert />
      <router-view></router-view>
  </div>
</template>

<script>
import Alert from './components/Alert/Alert'
import { mapActions,mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'App',
  components:
  {
    Alert
  },
  data()
  {
    return {
      token: null
    }
  },
  methods:
  {
    ...mapActions(["tinhtrang","tuyenduong","cayxanh"]),
    checkToken()
    {
      if(!this.$session.has('token'))
      {
        this.$router.push('/login')
      }
      else
      {
        this.token = this.$session.get('token')
      }
     
    },
    ApiTuyenDuong()
      {
        if(this.$store.state.tuyenduong == null && this.token != null)
        {
            axios.get("http://113.161.225.252:8001/tuyen-duong/",{
                headers: {
                        Authorization: 'Token '+  this.token
                    }
                }).then((response) => {
                   this.$store.dispatch("tuyenduong",response.data)
            })
        }
      },
      ApiTinhTrang()
      {
          if(this.$store.state.tinhtrang == null  && this.token != null)
          {
               axios.get("http://113.161.225.252:8001/trang-thai-cay-xanh/",{
                    headers: {
                            Authorization: 'Token '+  this.token
                        }
                    }).then((response) => {
                    console.log(response.data)
                    this.$store.dispatch("tinhtrang",response.data)
                })
          }
      },
    ApiCayXanh()
    {
       if(this.$store.state.cayxanh == null  && this.token != null)
          {
            axios.get("http://113.161.225.252:8001/ten-cay-xanh/",
            {
              headers: {
                  Authorization: 'Token '+  this.token
              }
            }).then((response) => {
              console.log(response.data)
                this.$store.dispatch("cayxanh",response.data)
            })
          }
    }
  },
  mounted()
  {
    this.checkToken()
    
  },
  created()
  {
    this.checkToken()
    this.ApiTuyenDuong()
    this.ApiTinhTrang()
    this.ApiCayXanh()
  }
}
</script>

<style>

</style>

