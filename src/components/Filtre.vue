<template>
    <div :id="idElement" class="filter">
          <ColorChip v-if="title=='couleur'" />
           <div v-if="idElement=='nbImagesfilter'" v-show="DesktopScreenSize">
            <label for="nbImg">images : </label>
            <input type="range" id="nbImg" name="nbImg" v-model="nbImg" min="5" max="9" step="1">
            <output name="nbChosen">{{nbImg}}</output>       
          </div>
    </div>
</template>

<script>
import ColorChip from './ColorChip.vue'
export default {
  name: 'Filtre',
  props: {
    title: String,
    idElement : String,
  },
  components: {
    ColorChip,
  },
  data(){
    return{
      nbImg:'6',
      Screenwidth: window.innerWidth,
      DesktopScreenSize:true,
    }
  },
  
  created(){
    window.addEventListener("resize", this.onResize);
  },
  updated(){
    this.$root.$emit('SendNbImg', this.nbImg);
  },
  methods:{
    onResize() {
      this.Screenwidth = window.innerWidth;
      if(this.Screenwidth < 640){
          this.DesktopScreenSize=false;
      }else{this.DesktopScreenSize=true}
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter{
  justify-content: space-evenly;
}
#colorfilter{
  justify-content: space-evenly;
}
span{
  text-transform: uppercase;
}

div{
  display:flex;
  justify-content: flex-start;
}
label{
  margin-right: 0.5vw;
  text-transform:uppercase;
  width:max-content;
}
output{
  margin:auto 1vw;
}
</style>
