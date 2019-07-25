<template>
  <section id="dashboard" style="padding-left:50px">
    <!-- <mdb-card class="mb-4">
      <mdb-card-body class="d-sm-flex justify-content-between">
        <h4 class="mb-sm-0 pt-2">
          <a href="https://mdbootstrap.com/material-design-for-bootstrap/" target="_blank">Home Page</a><span>/</span><span>Dashboard</span>
        </h4>
        <form class="d-flex md-form justify-content-center" style="margin:0;">
          <input aria-label="Search" class="form-control" placeholder="Type your query" type="search" />
          <mdb-btn color="primary" size="sm" class="my-0" type="submit"><i class="fa fa-search"></i></mdb-btn>
        </form>
      </mdb-card-body>
    </mdb-card> -->
    <section class="mt-lg-5">
      <mdb-row>
        <mdb-col xl="4" md="4" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
                <mdb-icon icon="tree" class="primary-color" />
              <!-- <mdb-icon icon="tree" far /> -->
              <div class="data">
                <p style="font-size:14px; text-transform: uppercase;">SỐ LƯỢNG CÂY PHÁT TRIỂN TỐT</p>
                <h4>
                  <strong>
                      {{TreesGood.length}} / {{dataTrees.length}}
                   </strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="progress">
                <div aria-valuemax="100" aria-valuemin="0" :aria-valuenow="TreesGood.length/dataTrees.length*100" class="progress-bar bg-primary" role="progressbar"
                  :style="'width: ' + TreesGood.length/dataTrees.length*100 + '%' "></div>
              </div>
              
            </mdb-card-body>

          </mdb-card>
        </mdb-col>
         <mdb-col xl="4" md="4" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
                <mdb-icon icon="tree" class="warning-color" />
              <!-- <mdb-icon icon="tree" far /> -->
              <div class="data">
                <p style="font-size:14px; text-transform: uppercase;">SỐ LƯỢNG CÂY SÂU BỆNH</p>
                <h4>
                  <strong>
                      {{TreesBad.length}} / {{dataTrees.length}}
                   </strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="progress">
                <div aria-valuemax="100" aria-valuemin="0" :aria-valuenow="TreesBad.length/dataTrees.length*100" class="progress-bar bg-warning" role="progressbar"
                  :style="'width: ' + TreesBad.length/dataTrees.length*100 + '%' "></div>
              </div>
            
            </mdb-card-body>

          </mdb-card>
        </mdb-col>
        <mdb-col xl="4" md="4" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
                <mdb-icon icon="tree" class="pink-color" />
              <!-- <mdb-icon icon="tree" far /> -->
              <div class="data">
                <p style="font-size:14px; text-transform: uppercase;">SỐ LƯỢNG CÂY TÌNH TRẠNG KHÁC</p>
                <h4>
                  <strong>
                      {{TreeOther.length}} / {{dataTrees.length}}
                   </strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="progress">
                <div aria-valuemax="100" aria-valuemin="0" :aria-valuenow="TreeOther.length/dataTrees.length*100" class="progress-bar pink-color" role="progressbar"
                  :style="'width: ' + TreeOther.length/dataTrees.length*100 + '%' "></div>
              </div>
            
            </mdb-card-body>

          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
    <section>
      <mdb-row class="mt-3">


        <!-- <mdb-col md="12" lg="4" class="mb-4">
          <mdb-card class="mb-4">
            <mdb-card-header> Doughnut chart </mdb-card-header>
            <mdb-card-body>
              <div style="display: block">
                <mdb-doughnut-chart :data="doughnutChartData" :options="doughnutChartOptions" :height="300"/>
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col> -->
      </mdb-row>
    </section>
  </section>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import { mdbRow, mdbCol, mdbBtn, mdbCard, mdbCardBody, mdbCardHeader, mdbCardText, mdbIcon, mdbTbl, mdbBarChart, mdbPieChart, mdbLineChart, mdbRadarChart, mdbDoughnutChart, mdbListGroup, mdbListGroupItem, mdbBadge, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue'
export default {
  name: 'Dashboard',
  components: {
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardText,
    mdbIcon,
    mdbTbl,
    mdbBarChart,
    mdbPieChart,
    mdbLineChart,
    mdbRadarChart,
    mdbDoughnutChart,
    mdbListGroup,
    mdbListGroupItem,
    mdbBadge,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
  },
  data () {
    return {

      doughnutChartData: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
        datasets: [
          {
            data: [300, 50, 100, 40, 120],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774']
          }
        ]
      },
      doughnutChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      dataChart: [],
      dataTrees: '',
      TreesGood: [],
      TreesBad: [],
      TreeOther: [],
      style: []
    }
  },
  computed:
  {
    ...mapGetters(["Features","tinhtrang"]),
  },
  methods:
  {
      ApiCayXanh()
      {
        axios.get('http://113.161.225.252:8001/cay-xanh/',
        {
          headers:{
            Authorization: 'Token ' + this.$session.get('token')
          }
        }
        ).then((ressponse) => {
          this.dataTrees = ressponse.data
          ressponse.data.forEach((tree) => {
            if(tree.matinhtrang == 1)
            {
              this.TreesGood.push(tree)
              
            }
            else if(tree.matinhtrang == 2)
            {
              this.TreesBad.push(tree)
            }
            else
            {
              this.TreeOther.push(tree)
            }
          })
        }).catch((error) => {
          this.dataTrees = []
        })
        const width =  this.TreesGood.length / this.dataTrees.length * 100
        const style = 'width: '+ width + '%'
        this.style.push(style)
        console.log(this.style[0])
      }
  },
  created()
  {
    this.ApiCayXanh()
    // console.log('data',this.dataTrees)
   
    // this.TreesGood = this.dataTrees.filter((value,index,array) => {
    //   return array[index].matinhtrang == 1
    // })
    // this.TreesBad =  this.dataTrees.filter((value,index,array) => {
    //   return array[index].matinhtrang == 2
    // })
    // this.TreeOther =  this.dataTrees.filter((value,index,array) => {
    //   return array[index].matinhtrang != 1 && array[index].matinhtrang != 2
    // })
  },
  mounted()
  {
    
    console.log('dashboard',this.Features)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 12px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
.pink-color {background: #faa4aa}
</style>