<template>
  <div :id="id" class="moodboardPage">
    <!-- <span id="backHome" v-on:click="GoBackHome">Retour</span>
    <div id="background">
      <div id="overlay"></div>
       <h2 id="title">{{msg}}</h2>
    </div>
    <Filters/> -->
    <Window class="window"/>
    <Moodboard />
  </div>
</template>

<script>
import Moodboard from './Moodboard.vue'
// import Filters from './filters.vue'
import Window from './Window.vue'
export default {
  name: 'moodboardPage',
  props: {
    msg: String,
    id: String,
  },
  components: {
    Moodboard,
    // Filters,
    Window
  },
  data() {
        return {
          imageData:[],
          url:null,
          colorBg:null,
        }
      },
  created() {
    this.colorBg = localStorage.getItem("colorImg1");
  },
  mounted(){
      let root = document.documentElement;
      root.style.setProperty('--bg', this.colorBg);
  },
  methods: {
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
.moodboardPage {
  display:flex;
  justify-content: space-between;
  align-items: flex-end;
  height:98vh;
  padding:1vh 2vw;
  z-index: 0;
  position:relative;
  /* background-color:pink; */
}
/* 
#background{
  // width:85vw; 
  width:500px;
  height:100vh;
  background-color: rgba(139,146,155, 42%);
  background-color:var(--bg);
  position:absolute;
  top:0;
  left:0;
  z-index: -10012;
}
#overlay{
  position:absolute;
  background:rgba(0,0,0,0.2);
  width:100%;
  height:100vh;
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
  bottom:2vh;
  left:2vw;
  font-family: 'Raleway', serif;
  color:white;
  padding:1vh;
}
#backHome:hover{
  cursor: pointer;
} */

@media screen and (max-width:640px){
  .moodboardPage{
    background-color:var(--bg);
    justify-content: end;
  }
  .window{
    position:absolute;
    top:0;
    left:-40vh;
    width: 400px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:10;
    transition: 2s left ease;
  }
}
</style>
