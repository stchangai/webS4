<template>
  <div :id="id" class="InspirationsPage">
    <div id="headerOfInspirations">
      <div id="overlay"></div>
      <span id="backHome" v-on:click="GoBackHome">Retour</span>
       <h2 id="title">{{msg}}</h2>
       <ImagesOptions :imagesSortType.sync="imagesSortType" />
    </div>
    <Inspirations :title="msg" :color="colorBg" :imagesData="imagesData" :scrollPosition="scrollPosition" :loading="loading" @getNextPage="getNextPageImages" @isLoading="setLoadingValue" />
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
  watch:{
    imagesSortType : function(newImagesSortType){
      this.sortBy(newImagesSortType);
    }
  },
  created(){
      this.retrieveImagesData(axios)
  },
  data() {
        return {
          imagesData:[],
          url:null,
          colorBg:null || localStorage.getItem("colorImg2"),
          imagesSortType: localStorage.getItem("imagesSortType") || "lastest",
          pageCount: 1,
          scrollPosition: 0,
          loading: false,
        }
      },
  mounted(){
      let root = document.documentElement;
      console.log(root)
      root.style.setProperty('--bg', this.colorBg);
  },
  methods: {
    async retrieveImagesData(){
        this.imagesData.push(...await GetAllImages(axios, this.pageCount, this.imagesSortType))
      },
    async getNextPageImages(pageCount){
      this.pageCount = pageCount;
      this.retrieveImagesData(axios);
      this.scrollPosition = window.scrollY; // for the infinite scrolling to continue to visualize the images' list without glitch to the top
      window.resizeTo(window.innerWidth, document.body.scrollHeight); // extendes the size of the page
      window.scrollTo(0, this.scrollPosition);
      this.loading = false;
    },
    setLoadingValue(){
      this.loading = true;
    },
    sortBy(){
      // reset the infinite scrolling to begin the visualisation with new order from the top of the page
      this.imagesData = [];
      this.scrollPosition = 0;
      this.retrieveImagesData(axios, this.pageCount, this.imagesSortType);
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
  width: fit-content;
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
