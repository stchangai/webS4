<template>
  <div class="moodboardPage">
    <h2>Generate your moodboard</h2>
    
  </div>
</template>

<script>
// import axios from 'axios'
// import {getImageRandom} from '@/services/api/pixabayApi.js'
import Moodboard from './components/moodboard.vue'
import Filters from './components/filters.vue'
export default {
  name: 'moodboardPage',
  props: {
    msg: String,
    image: String,
    id: String
  },
  components: {
    Moodboard,
    Filters
  },
  data() {
        return {
          imageData:[],
          url:null,
        }
      },
  // created() {
  //   this.retrieveImageRandom()
  //   // axios
  //   //     .get(
  //   //         'https://api.unsplash.com/photos/random/?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg')
  //   //     .then(response => (this.url = response.data.urls.full));
  // },
  // methods: {
  //   async retrieveImageRandom(){
  //       this.imageData = await getImageRandom(axios)
  //       this.url = this.imageData.data.urls.full
  //   }
  // }
  mounted(){
  },
  methods: {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 40px 0 0;
}
</style>
