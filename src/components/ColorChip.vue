<template>
  <div id="colors">
      <div v-for="color in colors" :key="color.color" v-bind:style="{ 'background': color.value }" class="colorBlock" v-on:click="selectColor(color.color, $event)">

      </div>
  </div>
</template>

<script>
export default {
  name: 'ColorChip',
  props: {
    // msg: String
  },
  data(){
    return{
      colors : [
        {color : "black_and_white", value: "linear-gradient(#020024 39%, #ffffff 53%)"},
        {color : "black", value: "#000000"},
        {color : "white", value: "#FFFFFF"},
        {color : "yellow", value: "#FFEE59"},
        {color : "orange", value: "#ff7400"},
        {color : "red", value: "#A33426"},
        {color : "purple", value: "#7C5879"},
        {color : "magenta", value: "#FFBDBD"},
        {color : "green", value: "#80B86C"},
        {color : "teal", value: "#1489BE"},
        {color : "blue", value: "#30426E"}
      ],
      // colors : [
      //   {"black_and_white" : "url(../assets/img/black_and_white.png)"}, 
      //   {"black" : "#000000"}, 
      //   {"white" : "#FFFFFF"}, 
      //   {"yellow": "#FFEE59"}, 
      //   {"orange":"#ff7400"}, 
      //   {"red": "#A33426"}, 
      //   {"purple" : "#7C5879"}, 
      //   {"magenta" : "#FFBDBD"}, 
      //   {"green" : "#80B86C"}, 
      //   {"teal" : "#1489BE"}, 
      //   {"blue" : "#30426E"}
      // ]
    }
  },
  mounted(){
    console.log(this.colors);
    this.$root.$on('ResetFilters', data => {
      console.log(data)
      let selectedElements = document.querySelectorAll(".selected");
      if(selectedElements.length != 0){ selectedElements.forEach(element => element.classList.remove("selected"))}
    })
  },
  methods:{
    selectColor: function(colorname, event){
      let selectedElements = document.querySelectorAll(".selected");
      if(selectedElements.length != 0){ selectedElements.forEach(element => element.classList.remove("selected"))}
      event.target.classList.add("selected");
      this.$root.$emit('SendColors', colorname);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#colors{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height:auto;
  width:100%;
  flex-direction: row;
  margin: 2vh 0;
}

#colors div{
  margin:1vh;
}

.colorBlock{
  height:3vh;
  width:3vh;
  margin:1vh;
  border-radius: 6px;
  transition:height 1s ease, width 1s ease;
}

.selected{
  height:4vh;
  width:4vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
