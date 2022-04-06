<template>
  <div id="board" v-on:SendKeywords="addKeyword">
    <div class="moodboardImg" v-for="image in selectedUrls" :key="image" v-on:click="putForward">
      <img ref="img" :src="image" alt="image du moodboard" @load="getColorsFromImage" >
    </div>
  </div>
</template>

<script>

import axios from 'axios';
// import ColorThief from "colorthief";
import {getImagesByKeywords} from '@/services/api/pixabayApi.js'
export default {
  name: 'Moodboard',
  props: {
    msg: String
  },
  data(){
    return{
      imagesData:[],
      reception:[],
      imagesUrls:[],
      keywords:[],
      stringKeywords:'',
      urls:[],
      draggable:null,
      colors:[],
      stringColor:'',
      selectedUrls:[],
      palette:[],
      size:[],
      submittedSize:[]
    }
  },
  mounted(){
    this.$root.$on('SendKeywords', data => {
      console.log("hello");
      this.keywords.push(data);
      console.log(this.keywords)
      // for( let i=0; i<this.keywords.length-2;i++){
      //   this.stringKeywords+= this.keywords[i];
      // }
      // this.stringKeywords += this.keywords[this.keywords.length-1];
      //this.retrieveImageByKeywords(this.stringKeywords, this.stringColor);
      this.retrieveImageByKeywords(this.stringColor);
      //this.keywords += ',';
      
    });
    this.$root.$on('SendColors', data => {
      this.colors.push(data);
      console.log(this.colors)
      // for( let i=0; i<this.colors.length-1;i++){
      //   this.stringColor+= this.colors[i];
      // }
      if(this.stringColor !== ''){this.stringColor = '';}
      this.stringColor += this.colors[this.colors.length-1];
      console.log(typeof this.stringColor);
      this.retrieveImageByKeywords(this.stringColor);
      //this.keywords += ',';
    });
    this.$root.$on('ResetFilters', data => {
      console.log(data)
      this.keywords = [];
      this.stringColor = '';
      this.retrieveImageByKeywords(this.stringColor);
    });
    this.$root.$on('RefreshKeywords', data => {
      this.keywords=[];
      data.forEach( element => this.keywords.push(element)
      );
      this.retrieveImageByKeywords(this.stringColor);
    });
    // this.$nextTick(() => {
    //   const colorThief = new ColorThief()
    //   this.palette = colorThief.getPalette(this.$refs.img)
    // })
    this.$root.$on('SendSize', data => {
      console.log(data);
      this.submittedSize.push(data);
      console.log(this.submittedSize)
      this.FilterBySize(data);
    });
  },
  created(){
    // this.retrieveImageByKeywords(this.keywords);
    //this.colorThief = require('colorthief');
  },
  methods: {
      async retrieveImageByKeywords(color){
          this.reception = await getImagesByKeywords(axios, this.keywords, color);
          //console.log(this.reception);
          this.imagesData = this.reception.data.results;
          //this.imagesData = this.GetASelectionFromArray(this.reception, 5);
          console.log(this.imagesData);
          this.imagesUrls = this.imagesData.map(x => x.urls.full)
          this.size = this.imagesData.map(x => {var obj = {}; obj.url = x.urls.full; obj.height = x.height; obj.width = x.width; return obj;});
          console.log(this.size)
          // this.url1 = this.imageData.data[0].urls.full
          // this.url2 = this.imageData.data[1].urls.full
          //console.log(typeof this.imagesData.map(x => x.tags));
          console.log(this.imagesUrls);
          this.selectedUrls = this.GetASelectionFromArray(this.reception, 5);
          // console.log(this.url1)
          // console.log(this.url2
      },
      addKeyword: function(value){
        console.log(value)
      },
      GetASelectionFromArray: function(images, limitOfImages) {
        let randomArray = [];
        let selectedImages = [];
        let found = -1;
        let foundSize = -1;
        let urls = Object.values(this.size);
        let urlsFilterBySize = [];
        console.log("size", this.size)
        if(this.height != '' && this.width != ''){
          foundSize = urls.findIndex(element => element.height > this.height && element.width > this.width)
          urlsFilterBySize.push(foundSize)
        }
        console.log(urlsFilterBySize)
        if(this.imagesUrls.length >= limitOfImages){
          for (let i = 0; i < limitOfImages; i++) {
            let rand = Math.floor(Math.random() * this.imagesUrls.length);
            // console.log("rand", rand);
            found = randomArray.findIndex(element => element == rand);
            // console.log("found", found);
            if (found != -1) {
              i--
            } else {
              randomArray.push(rand);
            }
          }
          // console.log(randomArray)
          // console.log(Object.values(this.reception.data.results))
          
          console.log("url = ", urls[0].url)
          for (let i = 0; i < randomArray.length; i++) {
            selectedImages[i] = urls[randomArray[i]].url
          }
          return selectedImages;
        }else{
          return urls;
        }
      },
      putForward:function(event){
        console.log("doubleclick hehe", event)
        event.target.parentElement.style.zIndex = "4";
        this.getColor();
      },
      getColorsFromImage:function(event){
        //const colorThief = new ColorThief()
        console.log(event.target)
        //this.palette = colorThief.getPalette(this.$refs.img)
      },
      FilterBySize:function(size){
        console.log("enter in FilterBySize")
        const filterFunc = (a) => a.height > size.height && a.width > size.width;
        let data = this.size.filter(filterFunc)
        console.log(data)
        
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#board{
  height: 95vh;
  width: 70vw;
  background: repeat center/20% url(../assets/img/grid2.jpg);
  margin-bottom: 1vh;
  z-index: -2;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-auto-flow: column;
  position:relative;
  opacity:0.7;
}

img{
  height:auto;
  width:100%;
   /* align-self: stretch; */
   z-index:12;
}

img:hover{
  cursor: pointer;
}

.moodboardImg{
  position:relative;
  width:fit-content;
  height:fit-content;
  overflow: hidden;
  /* border: solid 20px white;
  border-left: solid 10px white; */
  margin: 1vh;
  box-shadow: 7px 4px 1px rgba(0, 0, 0, 0.5);
  background:white;
}
/* .moodboardImg:before{
  content:"";
  position:absolute;
  z-index:-4;
  background-color:white;
  width:100%;
  height:100%;
  top:0;
  left:0;
} */
.moodboardImg:nth-child(1){
  /* grid-column: 1 / span 3;
  grid-row: 1 / span 3; */
  position: absolute;
  width: 307px;
  max-height: 373.23px;
  left: 56.03px;
  top: 19px;
}
.moodboardImg:nth-child(2){
  /* grid-column: 6 / span 3;
  grid-row: 1 / span 3;
  z-index:1; */
  position: absolute;
  width: 357px;
  max-height: 337.28px;
  left: 459.91px;
  top: 5px;
}
.moodboardImg:nth-child(3){
  /* grid-column: 4 / span 3;
  grid-row: 2 / span 3;
  z-index:1; */
  position: absolute;
  width: 350px;
  /* max-height: 203.71px; */
  max-height: 90%;
  left: 85.5px;
  /* top: 355px; */
  bottom:-10px;


}
.moodboardImg:nth-child(4){
  /* grid-column: 7 / span 3;
  grid-row: 4 / span 3;
  z-index:1; */
  position: absolute;
  width: 304px;
  max-height: 459.33px;
  left: 693.41px;
  top: 200.5px;
}
.moodboardImg:nth-child(5){
  /* grid-column: 2 / span 4;
  grid-row: 4 / span 4; */
  position: absolute;
  width: 310px;
  /*height: 266.16px;*/
  max-height: 90%;
  left: 394.79px;
  /* top: 400.3px; */
  bottom:0;
}
.forward{
  z-index: 4 !important;
}
</style>
