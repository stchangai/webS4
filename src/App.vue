<template>
  <div id="app">
    <Header nameSite="Moodboard" />
    <div class="homePage">
      <MenuChoice href="#moodboard" msg="Generate your moodboard" :image="url1" id="title1" @click="GetToMoodboard" v-on:MoodBoardIsClicked="GetToMoodboard" eventTriggeredOnClick="MoodBoardIsClicked"/>
      <MenuChoice msg="Find inspirations" :image="url2" id="title2" v-on:click="GetToInspirations" v-on:InspirationsIsClicked="GetToInspirations" eventTriggeredOnClick="InspirationsIsClicked"/>
    </div> 
    <moodboardPage id="moodboard" v-if="isMoodboardClicked" style="transition: z-index 1s ease;" class="putForward" msg="GENERATE YOUR MOODBOARD"/>
    <InspirationsPage id="inspirations" v-if="isInspirationsClicked" style="transition: z-index 1s ease;" class="putForwardInspirations" msg="FIND INSPIRATIONS"/>
  </div>
</template>

<script>
import MenuChoice from './components/MenuChoice.vue'
import Header from './components/Header.vue'
import moodboardPage from './components/moodboardPage.vue'
import InspirationsPage from './components/InspirationsPage.vue'
import axios from 'axios'
import {getImageRandom} from '@/services/api/pixabayApi.js'
export default {
  name: 'App',
  components: {
    MenuChoice,
    Header,
    moodboardPage,
    InspirationsPage
  },
  data() {
        return {
          infos: null,
          url1 : null || localStorage.getItem("url1"),
          url2: null || localStorage.getItem("url2"),
          urls:[],
          isMoodboardClicked:false,
          isInspirationsClicked:false,
        }
      },
  created() {
    this.retrieveImageRandom()
  },
  mounted(){
  },
  methods: {
    async retrieveImageRandom(){
        this.colorsImages=[]
        this.imageData = await getImageRandom(axios)
        this.url1 = this.imageData.data[0].urls.full
        this.url2 = this.imageData.data[1].urls.full
        console.log(this.imageData.data[0].color)
        localStorage.setItem("colorImg1", this.imageData.data[0].color)
        localStorage.setItem("colorImg2", this.imageData.data[1].color)
        localStorage.setItem("url1", this.url1)
        localStorage.setItem("url2", this.url2)
    },
    GetToMoodboard : function(){
      this.isMoodboardClicked = true;

      document.getElementsByClassName("card")[0].classList.add("hideHomePage");
      document.getElementsByClassName("homePage")[0].classList.add("hideHomePage");
      document.getElementsByClassName("header")[0].classList.add("hideTitle");
    },
    GetToInspirations : function(){
      this.isInspirationsClicked = true;

      document.getElementsByClassName("card")[0].classList.add("hideHomePage");
      document.getElementsByClassName("homePage")[0].classList.add("hideHomePage");
      document.getElementsByClassName("header")[0].classList.add("hideTitle");

    },
    addIndex:function(value){
      console.log("addIndex", value)
      document.getElementById("moodboard").classList.add("putForward");
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Magilio";
  src: local("Magilio"),   url(./assets/fonts/Magilio.ttf) format("truetype");
}
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap');

.hideHomePage{
  height:0vw !important;
}

.hideTitle{
  top:-10vh !important;
}

#app {
  font-family: "Raleway", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-transform:uppercase;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
}
.homePage{
  height:100vh;
  display:flex;
  transition: height 4s ease 4s;
  z-index:105;
}
.putForward{
  z-index:10 !important;
}

.putForwardInspirations{
  z-index:110 !important;
}
@media screen and (max-width:640px){
  #app{
    font-size:1rem;
  }
  .homePage{
    flex-direction: column;
    transition:none;
    width:100vw;
  }
}
</style>
