<template>
  <div id="input">
      <!-- <input class="search" type="text" v-model="height" placeholder="height">
      <span>x</span>
      <input class="search" type="text" v-model="width" placeholder="width">
       <button v-on:click="UseSize" class="submitSearch"><img src="../assets/img/loupe.png" alt="icone loupe de recherche"></button> -->
      <div>
        <label for="height">height : </label>
        <input type="range" id="height" v-on:change="SendNewSize" name="height" v-model="height" :min="maxSize.minH-(maxSize.minH%100)+100" :max="maxSize.maxH-(maxSize.maxH%100)" step="200">
        <output name="heightChosen">{{height}}</output>       
      </div>
      <div>
        <label for="width">width : </label>
        <input type="range" id="width" v-on:change="SendNewSize" name="width" v-model="width" :min="maxSize.minW-(maxSize.minW%100)" :max="maxSize.maxW-(maxSize.maxW%100)" step="200">
        <output name="widthChosen">{{width}}</output>       
      </div>
       <!-- <input type="range" id="width" name="width" v-model="width" :min="maxSize.minW" :max="maxSize.maxW" step="100"> -->
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    height:{type:[String, Number]},
    width: {type:[String, Number]}
  },
  data(){
    return{
      // height : '',
      // width:'',
      maxSize:[],
      heightData:this.height,
      widthData: this.width,
    }
  },
  mounted(){
    this.$root.$on('SendMaxSize', data => {
      this.maxSize=data
      // this.heightData=this.maxSize.minH;
      // this.widthData=this.maxSize.minW;
      console.log("maxSize", this.maxSize)
    })
  },
  methods:{
    UseSize: function(){
      
      this.$root.$emit('SendSize', {"height":this.height, "width":this.width});
      this.height='';
      this.width='';
    },
    SendNewSize: function(){
      this.$emit("SendNewHeight", {"height":this.height, "width":this.width});
    },
    SendNewWidth: function(){
      this.$emit("SendNewWidth", this.width)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#input{
  display:flex;
  flex-direction:column;
  justify-content: flex-start;
  height:auto;
  width:100%;
  margin: 2vh 0;
  align-items: center;
}
#input div{
  display:flex;
  justify-content: flex-end;
}
output{
  margin:auto 1vw;
}
label{
  margin:auto 1vw;
  text-transform:lowercase;
  width:max-content;
}
input{
  width:auto;
  opacity:0.8;
  height: fit-content;
  margin:1vh 0;
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
