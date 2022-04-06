<template>
  <div id="filters">
    <div id="keywords">
      <span>Rechercher un mot-clé</span>
      <div>
        <input class="search" type="text" v-model="keywords">
        <button v-on:click="UseKeyword" class="submitSearch"><img src="../assets/img/loupe.png" alt="icone loupe de recherche"></button>
      </div>
      <div class="keywords">
            <span v-for="keyword in words" :key="keyword" class="keyword">{{keyword}}<span v-on:click="deleteKeyword(keyword)">X</span></span>
        </div>
    </div>
    <Filtre title='couleur' idElement='colorfilter' />
    <!--<div id="colorfilter">
      <span>couleur</span>
          <ColorChip />
    </div>-->
    <Filtre idElement="typefilter" title="size of images" />
    <!--<div id="typefilter">
      <span>type</span>
    </div>-->
    <Filtre idElement="nbImagesfilter" title="nombre d'images" />
    <!--<div id="typefilter">
      <span>type</span>
    </div>-->
    <div class="resetfilter">
      <button v-on:click="resetFilter" class="reset">RESET</button>
    </div>
  </div>
</template>

<script>
import Filtre from './Filtre.vue'
export default {
  name: 'filters',
  props: {
    // msg: String
  },
  components: {
    Filtre
  },
  data(){
    return{
      keywords:"",
      words : [],

    }
  },
  methods:{
    UseKeyword:function(){
      this.words.push(this.keywords);
      this.$root.$emit('SendKeywords', this.keywords);
      this.keywords='';
    },
    resetFilter:function(){
      this.$root.$emit("ResetFilters", '');
      this.keywords='';
      this.words=[];
    },
    deleteKeyword:function(value){
      this.words.splice(this.words.findIndex(element => element == value),1);
      this.RefreshAfterDeleting();
    },
    RefreshAfterDeleting:function(){
      this.$root.$emit('RefreshKeywords', this.words);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filters{
  height:75vh;
  width:20vw;
  margin-bottom: 10vh;
  font-family: "Raleway";
  font-weight:400;
  color: #545459;
  display: flex;
  flex-direction: column;
  margin-right:2vw;
}

div{
  height: 30%;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

#keywords div{
  flex-direction: row;
  align-items: center;
}
.search{
  border-bottom: solid 1px gray !important;
  border: none;
  background: transparent;
}

.submitSearch{
  height:2vw;
  margin:0 1vh;
  border:none;
  background:transparent;
}
.submitSearch img{
  height:100%;
  opacity:50%;
}
.keywords{
  display:flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  height:30vh;
}

.keyword{
  margin:1vh;
}

.keyword span{
  margin:0 0 0 1vw;
  color:#545459;

}

#colorfilter{
  justify-content: space-evenly;
}
span{
  text-transform: uppercase;
}

.resetfilter{
  flex-direction: row;
  justify-content: center;
}
.reset, .keyword{
  width:fit-content;
  height:fit-content;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 15px;
  background: transparent;
  color:white;
  font-weight: 400;
}
</style>
