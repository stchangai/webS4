<template>
  <div id="board">
    <div class="moodboardImg" v-for="image in ImagesDataSorted" :key="image.id" >
      <img ref="img" :src="image.urls.small" :alt="image.alt_description" >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inspirations',
  props: {
    title: String,
    color : String,
    ImagesDataSorted : Array,
  },
  data(){
    return{
      imagesData:[],
      
    }
  },
  mounted(){
    let root = document.documentElement;
    root.style.setProperty('--bg', this.color);
  },
  
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#board{
  height: 100%;
  width: 100vw;
  background-color: rgba(139,146,155, 42%);
  background-color: var(--bg);
  z-index: -2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
  column-gap: 10px;
  row-gap: 15px;
}

img{
  /* height:auto;
  width:100%; */
   /* align-self: stretch; */
   z-index:12;
   /* height: 120%; */
   height: 100%;
  width: fit-content;
  /* box-shadow: 7px 4px 1px rgba(0, 0, 0, 0.5); */
}

img:hover{
  cursor: pointer;
}

.moodboardImg{
  position:relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
}

@media screen and (max-width:640px){
  #board{
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (min-width:550px) and (max-width:750px){
  #board{
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>