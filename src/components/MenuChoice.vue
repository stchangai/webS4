<template>
  <div :id="id" class="card" style="position:relative" @click="GetToPage(id, eventTriggeredOnClick)">
    <div class="card" style="position:absolute; top:0;"><h1 class="title" :class="{onepage:isClicked}">{{ msg }}</h1></div>
    
    
   <img :src="image" class="background">
  </div>
</template>

<script>
export default {
  name: 'MenuChoice',
  props: {
    msg: String,
    image: String,
    id: String,
    eventTriggeredOnClick:String,
  },
  components: {
  },
  data() {
        return {
          imageData:[],
          url:null,
          isClicked : false,
        }
      },
  mounted(){
    let hello = document.querySelectorAll('.card .card')[1];
    let elem = document.getElementsByClassName('title')[0];
    hello.addEventListener("mouseover", function(){
      //console.log(hello)
      elem.style.opacity = "0";
    })
    document.querySelectorAll('.card .card')[0].addEventListener("mouseover", function() {
      elem.style.opacity = "1";
    })

    document.querySelectorAll('.card .card')[1].addEventListener("mouseleave", function() {
      elem.style.opacity = "1";
    })
  },
  methods: {
    GetToPage : function(id, eventCliked){       
        this.isClicked = true;
        if(eventCliked == "MoodBoardIsClicked")this.$emit("MoodBoardIsClicked", this.isClicked);
        if(eventCliked == "InspirationsIsClicked")this.$emit("InspirationsIsClicked", this.isClicked);
        let element = document.getElementById(id);
        element.classList.add("onepage");
        document.getElementById('app').classList.add('home');
        
        if(id == "title1"){
           document.getElementById("title2").classList.add("disabled");
        }else{
          document.getElementById("title1").classList.add("disabled");
        }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
    height:100vh;
    width:50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: width 4s ease, height 4s ease 4s;
}

.card:hover{
  width:300vw;
}

.onepage{
  width:100vw; 
}

.disabled{
  width:0vw;
}

.disabledHover{
  width:100vw;
  height: 200vh;
  align-items: start;
  flex-direction: column;
}

.background{
  flex-shrink: 0;
  width: 120vw;
}
.title{
  /*position:absolute;*/
  color:white;
  background-color:rgba(0, 0, 0, 0.2);
  padding: 1vh;
  opacity:1;
  transition: opacity 2s ease;
  max-width:max-content;
  text-shadow: black 0.1em 0.1em 0.2em
}


.card:hover ~ div.card .title{
  opacity:0;
}

@media screen and (max-width:640px){
  .card {
    height: 50vh;
    width: 100vw;
    transition:none;
  }
  .homePage .card:hover{
    width:100vw;
    height:50vh;
  }
  /* .homePage > .card:hover .card{
    height:100%;
  } */
  .onepage{
    height:100vh;
  }
  .disabled{
    height:0vh;
    width:100vw;
  }
  .background{
    object-fit: cover;
    height: 50vh;
    width:100vw;
  }
}
</style>
