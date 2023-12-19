<template>
  <div id="filters">
    <div id="keywords">
      <span>Rechercher un mot-clé</span>
      <div>
        <input class="search" type="text" v-model="keywords" @keyup.enter="UseKeyword">
        <button v-on:click="UseKeyword" class="submitSearch"><img src="../assets/img/icon-white-loupe.svg" alt="icone loupe de recherche"></button>
      </div>
      <div class="keywords">
            <span v-for="keyword in words" :key="keyword" class="keyword">{{keyword}}<span v-on:click="deleteKeyword(keyword)">X</span></span>
        </div>
    </div>
    <Filtre title='couleur' idElement='colorfilter' />
    <Filtre idElement="nbImagesfilter" title="nb images" />
  
    <div class="resetfilter">
      <button v-on:click="resetFilter" class="reset">RESET</button>
    </div>
  </div>
</template>

<script>
import Filtre from './Filtre.vue'
export default {
  name: 'filters',
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
      if(this.keywords){
        this.words.push(this.keywords);
        this.$root.$emit('SendKeywords', this.keywords);
        this.keywords='';
      }
    },
    resetFilter:function(){
      this.$root.$emit("ResetFilters", '');
      this.keywords='';
      this.words=[];
      this.heightData="0";
      this.widthData="0";
      console.log(this.heightData)
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
  /* width:20vw; */
  width:268px;
  margin-bottom: 10vh;
  font-family: "Raleway";
  font-weight:400;
  /* color: #545459; */
  color:white;
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
  color:white;
}

.submitSearch{
  height:2vw;
  margin:0 1vh;
  border:none;
  background:transparent;
  cursor: pointer;
}
.submitSearch img{
  height:80%;
}
.keywords{
  display:flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  height:fit-content;
}

.keyword{
  margin:1vh;
}

.keyword span{
  margin:0 0 0 1vw;
  color:#545459;
  cursor: pointer;
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

@media screen and (max-width:640px){
  .submitSearch{
    height: 3vh;
  }
}
</style>
