<template>
  <div id="board">
    <div class="moodboardImg" v-for="image in imagesData" :key="image.id" >
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
    imagesData : Array,
    scrollPosition: Number,
    loading: Boolean,
  },
  emits: ['getNextPage'],
  data(){
    return{
      pageCount: 1,    
      requestApiLimit: 15, 
    }
  },
  mounted(){
    let root = document.documentElement;
    root.style.setProperty('--bg', this.color); // get the main color of the random image to put it in color background of the page
    // infinite scroll
    window.addEventListener('scroll', () => {
      // last condition --> restraint the number of requests to reach the API (50 requests/h on Unsplash)
      if (this.scrollPosition + window.innerHeight + window.scrollY >=  this.scrollPosition + document.body.offsetHeight && !this.loading && this.pageCount < this.requestApiLimit) {
        this.pageCount++;
        this.$emit('isLoading', true);
        this.$emit('getNextPage', this.pageCount)
      }
    })
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
   z-index:12;
   height: 100%;
  width: fit-content;
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