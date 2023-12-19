<template>
  <div id="window">
   <span id="backHome" v-on:click="GoBackHome">Retour</span>
    <div id="background">
      <div id="overlay"></div>
       <h2 id="title">{{msg}}</h2>
       <span id="OpenWindow" v-on:click="OpenWindow">></span>
    </div>
     
    <Filters/>
  </div>
</template>

<script>
import Filters from './filters.vue'
export default {
  name: 'Window',
  props: {
    msg: String
  },
  components:{
    Filters,
  },
  methods: {
    GoBackHome: function(){
      window.location.reload();
    },
    OpenWindow:function(){
      document.getElementById('window').classList.toggle('open');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#background{
  /* width:85vw; */
  width:500px;
  height:100vh;
  background-color: rgba(139,146,155, 42%);/*#A4ABB5;*/
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
  /* background: gray; */
  width: fit-content;
  /*margin: 3vh auto;*/
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
  /* background-color:rgba(0,0,0,0.2) */
}
#backHome:hover{
  cursor: pointer;
}

#OpenWindow{
  display: none;
}

@media screen and (max-width:640px){

  #background{
    z-index: -1;
    width:400px;
  }

  .open{
    left:0 !important;
  }
  #OpenWindow{
    display: block;
    position:absolute;
    bottom:2vh;
    right:2vw;
    color:white;
    font-size: 2rem;
    cursor:pointer;
    transition: 2s right ease;
  }
}
</style>
