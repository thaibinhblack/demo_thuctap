
<template>

    <mdb-modal :show="showMedia" @close="ytmodal = false">
      <mdb-modal-body class="p-0">
          <vue-easy-lightbox
            :visible="visible"
            :imgs="imgs"
            @hide="handleHide"
          ></vue-easy-lightbox>
      </mdb-modal-body>
      
    </mdb-modal>

</template>



<script>
import { mdbContainer, mdbBtn, mdbIcon, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter } from 'mdbvue';
import VueEasyLightbox from 'vue-easy-lightbox'
import { mapGetters } from 'vuex'
export default {
  name: 'media-feature',
  components: {
    VueEasyLightbox,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter,
  },
  computed:
  {
      ...mapGetters(["showMedia"])
  },
  data() {
    return {
      imgs:  ['http://via.placeholder.com/350x150', 'http://via.placeholder.com/350x150'],  // Img Url , string or Array
      visible: false,
      index: 0   // default
    }
  },
  methods: {
    showSingle() {
      this.imgs = 'http://via.placeholder.com/350x150'
      this.show()
    },
    showMultiple() {
      this.imgs = ['http://via.placeholder.com/350x150', 'http://via.placeholder.com/350x150']
      this.index = 1  // index of imgList
      this.show()
    },
    show() {
      this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  },
  mounted()
  {
    // console.log('mounted media',this.showMedia)
    if(this.showMedia == true)
    {   console.log(this.showMedia)
          this.show()
    }
  },
  created()
  {
    this.show()
    //  console.log('mounted media',this.$sotre.state.show)
    if(this.showMedia == true)
    {   console.log(this.showMedia)
          this.show()
    }
  }
}
</script>
