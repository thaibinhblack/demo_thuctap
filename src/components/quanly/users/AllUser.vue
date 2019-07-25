<template>
<div id="table-wrapper" class="ui" style="padding-left:55px;padding-top:25px;">
    <div class="row top-bar" >
        <select class="col-md-2 form-control" v-model="actionUser">
            <option value="-1">Tác Vụ</option>
            <option value="1">Xóa</option>
            <option value="2">Thêm mới</option>
            <option value="3">Xuất file</option>
        </select>
        <button class="btn btn-info custom" @click="btnAction">Áp dụng</button>
        
    </div>
     <!-- :sort-order="sortOrder" -->
     <!-- pagination-path="" -->
    <!-- :per-page="15" -->
  <vuetable ref="vuetable"
    :data="data"
    :fields="fields"
   
    :css="css.table"
    
    @vuetable:pagination-data="onPaginationData"
    @vuetable:loading="onLoading"
    @vuetable:loaded="onLoaded"
  >
    <template slot="actions" scope="props">
      <div class="table-button-container">
          <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
            <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
          <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
            <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
      </div>
    </template>
    </vuetable>
    <vuetable-pagination ref="pagination"
      :css="css.pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
    <add-user v-bind:show="show"  @updateshow="updateshow" />
   <edit-user v-bind:edit="edit" v-bind:user="user" @edited="edited" />
</div>
    <!-- <ModalDelete v-bind:dlete="dlete" v-bind:user="user" @deleted="deleted" /> --> 
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import moment from "moment"
import AddUser from './AddUser.vue'
import EditUser from './EditUser.vue'
// import ModalDelete from './User/MdDelete.vue'
import axios from 'axios'
export default {
    name: 'all-user',
    components: {
    Vuetable,
    VuetablePagination,
    AddUser,
    EditUser
  },
  data () {
    return {
      fields: [
        {
          name: '__sequence',
          title: '#',
          titleClass: 'text-right',
          dataClass: 'text-right'
        },
        {
            name: '__checkbox',
            titleClass: 'text-center check',
            dataClass: 'text-center check',
        },
        {
          name: 'first_name',
          title: 'Họ',
        //   sortField: 'name'
        },
        {
          name: 'last_name',
          title: 'Tên',
        //   sortField: 'email'
        },

        {
          name: 'email',
          title: 'Email',
        //   sortField: 'gender'
        },
        {
            name: "is_staff",
            title: 'User',
            titleClass: 'text-center',
            dataClass: 'text-center',
            callback: 'formatStaff',
        },
        {
            name: "is_active",
            title: 'System',
            titleClass: 'text-center',
            dataClass: 'text-center',
            callback: 'formatStaff',
        },
        {
          name: 'date_joined',
          title: 'Ngày Tạo',
          titleClass: 'text-center',
          dataClass: 'text-center',
          callback: 'formatDate',
        //   sortField: 'gender'
        },
       
        '__slot:actions'
      ],
    //   sortOrder: [
    //     { field: 'name', direction: 'asc' }
    //   ],
      css: {
        table: {
          tableClass: 'table table-striped table-bordered table-hovered',
          loadingClass: 'loading',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down',
          handleIcon: 'glyphicon glyphicon-menu-hamburger'
        },
        pagination: {
          infoClass: 'pull-left',
          wrapperClass: 'vuetable-pagination pull-right',
          activeClass: 'btn-primary',
          disabledClass: 'disabled',
          pageClass: 'btn btn-border',
          linkClass: 'btn btn-border',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: ''
          }
        }
      },
      showpage: '10',
      actionUser: -1,
      show: false,
      data: null,
      user: {},
      edit: false,
      dlete: false
    }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    edited (val) {
      this.user = null
      this.edit = false
    },
    deleted(val)
    {
      this.user = null
      this.dlete = val
    },
    editRow (rowData) {
      this.edit = true
      this.user = rowData
      // alert("You clicked edit on"+ JSON.stringify(rowData))
    },
    deleteRow (rowData) {
      this.dlete = true
      this.user = rowData
      // alert('You clicked delete on' + JSON.stringify(rowData))
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    btnAction () {
      if (this.actionUser == 2) {
        this.show = true
      }
    },
    updateshow (val) {
      this.show = val
    },
    apiData () {
      axios.get('http://113.161.225.252:8001/user/',{
          headers: {
                Authorization: 'Token '+  this.$session.get('token')
            }
      }).then((response) => {
        this.data = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    formatStaff: function(value)
    {
        return value === true ? '<input type="checkbox" checked disabled />' : '<input type="checkbox" disabled />'
    },
    formatDate: function(value)
    {
        return value === null ? '' : moment(value, 'YYYY-MM-DDThh:mm').format('hh:mm, DD-MM-YYYY')
    }
  },
  created () {
    this.apiData()
    console.log(this.$session.get('token'))
  }
}
</script>

<style scope="css">
   
    .top-bar {margin-left:0px !important;margin-bottom:15px !important;}
    .btn-info.custom {padding: .375rem 1rem !important;margin:0 0 0 15px !important;}
    .check {display: none}
</style>