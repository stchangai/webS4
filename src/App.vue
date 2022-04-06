<template>
  <div id="app">
  <!--<ul id="example-1">
    <li v-for="item in infos.data.hits" :key="item.id">
      <img :src="item.previewURL" alt="exemple">
    </li>
  </ul>-->
  <!--{{infos.data.hits}}-->
    <Header nameSite="Moodboard" />
    <div class="homePage">
      <MenuChoice href="#moodboard" msg="Generate your moodboard" :image="url1" id="title1" @click="GetToMoodboard" v-on:MoodBoardIsClicked="GetToMoodboard" />
      <MenuChoice msg="Find inspirations" :image="url2" id="title2" v-on:click="GetToMoodboard()"/>
    </div> 
    <moodboardPage id="moodboard" v-if="isMoodboardClicked" style="transition: z-index 1s ease;" class="putForward" msg="GENERATE YOUR MOODBOARD"/>
  </div>
</template>

<script>
import MenuChoice from './components/MenuChoice.vue'
import Header from './components/Header.vue'
import moodboardPage from './components/moodboardPage.vue'
import axios from 'axios'
import {getImageRandom} from '@/services/api/pixabayApi.js'
export default {
  name: 'App',
  components: {
    MenuChoice,
    Header,
    moodboardPage,
  },
  data() {
        return {
          infos: null,
          url1 : null,
          url2: null,
          urls:[],
          isMoodboardClicked:false,
        }
      },
  created() {
    this.retrieveImageRandom()
    // axios
    //     .get(
    //         'https://api.unsplash.com/photos/random/?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg')
    //     .then(response => (this.url = response.data.urls.full));
  },
  mounted(){
  },
  methods: {
    async retrieveImageRandom(){
        this.imageData = await getImageRandom(axios)
        this.url1 = this.imageData.data[0].urls.full
        this.url2 = this.imageData.data[1].urls.full
        // console.log(this.url1)
        // console.log(this.url2)
    },
    GetToMoodboard : function(event){
      console.log(event)
      this.isMoodboardClicked = true;
      this.$root.$emit("MoodboardTrue", '')
      // console.log(this.isMoodboardClicked);
      document.getElementsByClassName("card")[0].classList.add("hideHomePage");
      document.getElementsByClassName("homePage")[0].classList.add("hideHomePage");
      document.getElementsByClassName("header")[0].classList.add("hideTitle");
      
      // const href = event.target.getAttribute("href");
      // const offsetTop = document.querySelector(href).offsetTop;
      // console.log(offsetTop)

      // scroll({
      //   top: offsetTop,
      //   behavior: "smooth"
      // });
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

.home{
  /* height:200vh; */
}

.hideHomePage{
  height:0vw !important;
}

.hideTitle{
  top:-10vh !important;
}

#app {
  font-family: "Magilio", Avenir, Helvetica, Arial, sans-serif;
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
  z-index:5;
}
.putForward{
  z-index:10;
}
</style>
