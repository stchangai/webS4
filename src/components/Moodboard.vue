<template>
  <div id="board" v-on:SendKeywords="addKeyword">
    <div class="moodboardImg" v-for="image in selectedUrls" :key="image">
      <img ref="img" :src="image" alt="image du moodboard">
    </div>
  </div>
</template>

<script>

import axios from 'axios';
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
      colors:[],
      stringColor:'',
      selectedUrls:[],
      nbImg:'6',
    }
  },
  mounted(){
    this.$root.$on('SendKeywords', data => {
      console.log("hello");
      this.keywords.push(data);
      console.log(this.keywords)
     
      this.retrieveImageByKeywords(this.stringColor);      
    });
    this.$root.$on('SendColors', data => {
      this.colors.push(data);
      console.log(this.colors)

      if(this.stringColor !== ''){this.stringColor = '';}
      this.stringColor += this.colors[this.colors.length-1];
      console.log(typeof this.stringColor);
      this.retrieveImageByKeywords(this.stringColor);
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

    this.$root.$on('SendNbImg', data => {
      console.log(data);
      this.nbImg =data;
      console.log(this.nbImg)
      this.GetImages();
    });
  },
  methods: {
      GetImages : function(){
        this.selectedUrls = this.GetASelectionFromArray(this.reception, this.nbImg)
      },
      async retrieveImageByKeywords(color){
          this.reception = await getImagesByKeywords(axios, this.keywords, color);
          this.imagesData = this.reception.data.results;
          console.log(this.imagesData);
          this.imagesUrls = this.imagesData.map(x => x.urls.full)

          console.log(this.imagesUrls);
          this.selectedUrls = this.GetASelectionFromArray(this.reception, this.nbImg);
      },
      addKeyword: function(value){
        console.log(value)
      },
      GetASelectionFromArray: function(images, limitOfImages) {
        let randomArray = [];
        let selectedImages = [];
        let found = -1;
        let urls = Object.values(this.imagesUrls);

        // console.log("size", this.size)

        if(this.imagesUrls.length >= Number(limitOfImages)){
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
          
          console.log("url = ", urls[0])
          for (let i = 0; i < randomArray.length; i++) {
            selectedImages[i] = urls[randomArray[i]]
          }
          return selectedImages;
        }else{
          return urls;
        }
      },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#board{
  height: 95vh;
  width: 78vw;
  background: repeat center/20% url(../assets/img/grid2.jpg);
  margin-bottom: 1vh;
  z-index: -2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  position:relative;
  /* opacity:0.7; */
  column-gap: 10px;
  row-gap: 15px;
  margin-left: 2vw;
}

img{
  /* height:auto;
  width:100%; */
   /* align-self: stretch; */
   z-index:12;
   /* height: 120%; */
   height: 100%;
  width: fit-content;
  box-shadow: 7px 4px 1px rgba(0, 0, 0, 0.5);
}

img:hover{
  cursor: pointer;
}

.moodboardImg{
  position:relative;
  /* width:fit-content;
  height:fit-content; */
  overflow: hidden;
  /* border: solid 20px white;
  border-left: solid 10px white; */
  margin: 1vh;
  /* box-shadow: 7px 4px 1px rgba(0, 0, 0, 0.5); */
  /* background:white; */
  height: 100%;
  display: flex;
  justify-content: center;
}

@media screen and (max-width:640px){
  #board{
    width: 85%;
    background: repeat center/30% url(../assets/img/grid2.jpg);
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5px;
    row-gap: 5px;
    overflow: hidden;
  }

}
</style>