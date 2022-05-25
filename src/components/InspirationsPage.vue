<template>
  <div :id="id" class="InspirationsPage">
    <div id="headerOfInspirations">
      <div id="overlay"></div>
      <span id="backHome" v-on:click="GoBackHome">Retour</span>
       <h2 id="title">{{msg}}</h2>
       <ImagesOptions :imagesSortType.sync="imagesSortType" />
    </div>
    <Inspirations :title="msg" :color="colorBg" :ImagesDataSorted="imagesOrganizedData" />
  </div>
</template>

<script>
import Inspirations from './Inspirations.vue'
import ImagesOptions from './ImagesOptions.vue'
import axios from 'axios';
import {GetAllImages} from '@/services/api/pixabayApi.js'
export default {
  name: 'InspirationsPage',
  props: {
    msg: String,
    id: String,
  },
  components: {
    Inspirations,
    ImagesOptions
  },
  created(){
      this.retrieveImagesData(axios)
      // this.colorBg = localStorage.getItem("colorImg1");
  },
  computed:{
    imagesOrganizedData: function(){
      console.log("in imagesOrganizedData", this.imagesSortType)
      //tri par la plus récente ou par la plus likée
      const field = ["mostLiked"].includes(this.imagesSortType) ? 'likes' : '';

      if(field == ''){ //filtrage par défaut de l'API par le plus récent
        return this.imagesData
      }
      // copie de imagesData que je vais pouvoir ranger par nombre de likes
      let data = [...this.imagesData]
      const comparator = (a,b) => a[field] - (b[field])
      return data.sort(comparator)
    }
  },
  data() {
        return {
          imagesData:[],
          url:null,
          colorBg:null || localStorage.getItem("colorImg2"),
          imagesSortType: localStorage.getItem("imagesSortType") || "lastestUpdated"
        }
      },
  mounted(){
      let root = document.documentElement;
      console.log(root)
      root.style.setProperty('--bg', this.colorBg);
  },
  methods: {
    async retrieveImagesData(){
        this.imagesData = await GetAllImages(axios)
      },
    GoBackHome: function(){
      window.location.reload();
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --bg: rgba(139,146,155, 42%);
  --mouse-y: 0px;
}
h2 {
  margin: 40px 0 0;
}

.InspirationsPage {
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height:auto;
  font-family: 'Raleway';
  color:white;
  z-index: 0;
}

#headerOfInspirations{
  z-index: -2;
  width: 100vw;
  height:40vh;
  background-color:var(--bg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position:relative;
}

#overlay{
  position:absolute;
  background:rgba(0,0,0,0.2);
  width:100vw;
  height:100%;
  z-index:-2;
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
  display:flex;
  justify-content: flex-start;
  text-align:left;
}

#backHome{
  position:absolute;
  top:3vh;
  left:2vw;
  padding:1vh;
}
#backHome:hover{
  cursor: pointer;
}
</style>
