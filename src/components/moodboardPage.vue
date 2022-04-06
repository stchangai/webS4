<template>
  <div :id="id" class="moodboardPage">
    <div id="background">
       <h2 id="title">{{msg}}</h2>
    </div>
    <Filters />
    <Moodboard />
    <!--<div id="board"></div>-->

  </div>
</template>

<script>
// import axios from 'axios'
// import {getImageRandom} from '@/services/api/pixabayApi.js'
import Moodboard from './Moodboard.vue'
import Filters from './filters.vue'
export default {
  name: 'moodboardPage',
  props: {
    msg: String,
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
.moodboardPage {
  display:flex;
  justify-content: space-between;
  align-items: flex-end;
  height:98vh;
  padding:1vh 2vw;
  z-index: 0;
  /* background-color:pink; */
}

#background{
  width:85vw;
  height:100vh;
  background-color: rgba(139,146,155, 42%);/*#A4ABB5;*/
  position:absolute;
  top:0;
  left:0;
  z-index: -2;
}

#title{
  color: white;
  /* background: gray; */
  width: fit-content;
  /*margin: 3vh auto;*/
  margin:3vh;
  padding:2vh;
  font-family: 'Raleway';
  font-weight:300;
  font-size: 1.75rem;
  opacity:100%;
}

/* #board{
  height: 75vh;
  width: 75vw;
  background: repeat center/30% url(../assets/img/grid2.jpg);
  margin-bottom: 10vh;
  z-index: -2;
} */
</style>
