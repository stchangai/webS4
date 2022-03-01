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
      <MenuChoice msg="Generate your moodboard" :image="url1" id="title1"/>
      <MenuChoice msg="Find inspirations" :image="url2" id="title2"/>
    </div>  
  </div>
</template>

<script>
import MenuChoice from './components/MenuChoice.vue'
import Header from './components/Header.vue'
import axios from 'axios'
import {getImageRandom} from '@/services/api/pixabayApi.js'
export default {
  name: 'App',
  components: {
    MenuChoice,
    Header
  },
  data() {
        return {
          infos: null,
          url1 : null,
          url2: null,
          urls:[]
        }
      },
  created() {
    this.retrieveImageRandom()
    // axios
    //     .get(
    //         'https://api.unsplash.com/photos/random/?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg')
    //     .then(response => (this.url = response.data.urls.full));
  },
  methods: {
    async retrieveImageRandom(){
        this.imageData = await getImageRandom(axios)
        this.url1 = this.imageData.data[0].urls.full
        this.url2 = this.imageData.data[1].urls.full
        console.log(this.url1)
        console.log(this.url2)
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Magilio";
  src: local("Magilio"),   url(./assets/fonts/Magilio.ttf) format("truetype");
}

#app {
  font-family: "Magilio", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-transform:uppercase;
}
.homePage{
  height:100vh;
  display:flex;
}

</style>
