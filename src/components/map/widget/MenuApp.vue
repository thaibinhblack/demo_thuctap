<template>
  <div id="menu-app">
    <radial-menu
      style="margin: auto; margin-top: 300px; background-color: white"
      :itemSize="50"
      :radius="120"
      :angle-restriction="180">
        <radial-menu-item 
          v-for="(item, index) in items" 
          :key="index" 
          style="background-color: white" 
          @click="() => handleClick(item)">
          <span v-html="item.icon" :title="item.title"></span>
        </radial-menu-item>
      </radial-menu>
     
  </div>
</template>

<script>
import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
import {mdbIcon} from 'mdbvue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'menu-app',
  components: {
    RadialMenu,
    RadialMenuItem,
    mdbIcon
  },
  data () {
    return {
      items: [
                {
                    title: 'Thêm cây xanh mới',
                    icon: '<i class="fas fa-pen"></i>',
                    id: 'addFeature'
                }
          ],
      lastClicked: ''
    }
  },
  methods: {
    ...mapActions(["show"]),
    handleClick (item) {
        console.log(item)
        this.$store.dispatch("show",item.id)
    }
  }
}
</script>
<style>
#menu-app {position:fixed;bottom: 50px;right: 130px;z-index:998;}
</style>
