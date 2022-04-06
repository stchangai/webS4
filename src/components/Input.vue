<template>
  <div id="input">
      <input class="search" type="text" v-model="height" placeholder="height">
      <span>x</span>
      <input class="search" type="text" v-model="width" placeholder="width">
       <button v-on:click="UseSize" class="submitSearch"><img src="../assets/img/loupe.png" alt="icone loupe de recherche"></button>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    // msg: String
  },
  data(){
    return{
      height : '',
      width:''
    }
  },
  mounted(){
    
  },
  methods:{
    UseSize: function(){
      
      this.$root.$emit('SendSize', {"height":this.height, "width":this.width});
      this.height='';
      this.width='';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#input{
  display:flex;
  justify-content: flex-start;
  height:auto;
  width:100%;
  flex-direction: row;
  margin: 2vh 0;
  align-items: center;
}

input{
  width:5vw;
  opacity:0.8;
  height: fit-content;
}
span{
  text-transform: lowercase;
}
.search{
  border-bottom: solid 1px gray !important;
  border: none;
  background: transparent;
  margin : 0 2vh;
}
.submitSearch{
  height:2vw;
  /* margin:0 1vh; */
  border:none;
  background:transparent;
}
.submitSearch img{
  height:80%;
  opacity:50%;
}

</style>
