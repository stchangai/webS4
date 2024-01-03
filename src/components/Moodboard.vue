<template>
  <div id="board">
    <div v-drag @click="putFront($event)" class="moodboardImg" v-for="image in selectedUrls" :key="image">
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
      zIndexCount: 13,
    }
  },
  mounted(){
    this.$root.$on('SendKeywords', data => {
      this.keywords.push(data);     
      this.retrieveImageByKeywords(this.stringColor);      
    });
    this.$root.$on('SendColors', data => {
      this.colors.push(data);
      if(this.stringColor !== ''){this.stringColor = '';}
      this.stringColor += this.colors[this.colors.length-1];
      this.retrieveImageByKeywords(this.stringColor);
    });
    this.$root.$on('ResetFilters', () => {
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
      this.nbImg =data;
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
          this.imagesUrls = this.imagesData.map(x => x.urls.full)

          this.selectedUrls = this.GetASelectionFromArray(this.reception, this.nbImg);
      },
      GetASelectionFromArray: function(images, limitOfImages) {
        let randomArray = [];
        let selectedImages = [];
        let found = -1;
        let urls = Object.values(this.imagesUrls);

        if(this.imagesUrls.length >= Number(limitOfImages)){
          for (let i = 0; i < limitOfImages; i++) {
            let rand = Math.floor(Math.random() * this.imagesUrls.length);
            found = randomArray.findIndex(element => element == rand);
            if (found != -1) {
              i--
            } else {
              randomArray.push(rand);
            }
          }
          
          for (let i = 0; i < randomArray.length; i++) {
            selectedImages[i] = urls[randomArray[i]]
          }
          return selectedImages;
        }else{
          return urls;
        }
      },
      putFront: function(event){
        event.target.style.zIndex = this.zIndexCount;
        this.zIndexCount++;
      }
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
  column-gap: 10px;
  row-gap: 15px;
  margin-left: 2vw;
}

img{
   z-index:12;
   height: 100%;
  width: fit-content;
  box-shadow: 7px 4px 1px rgba(0, 0, 0, 0.5);
}

img:hover{
  cursor: pointer;
}

.moodboardImg{
  position:relative;
  overflow: hidden;
  margin: 1vh;
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