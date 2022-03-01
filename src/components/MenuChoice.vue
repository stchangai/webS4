<template>
  <div class="card" style="position:relative">
    <div class="card" style="position:absolute"><h1 class="title" :id="id">{{ msg }}</h1></div>
    
    
   <img :src="image" class="background">
  </div>
</template>

<script>
// import axios from 'axios'
// import {getImageRandom} from '@/services/api/pixabayApi.js'
export default {
  name: 'MenuChoice',
  props: {
    msg: String,
    image: String,
    id: String
  },
  data() {
        return {
          imageData:[],
          url:null,
        }
      },
  // created() {
  //   this.retrieveImageRandom()
  //   // axios
  //   //     .get(
  //   //         'https://api.unsplash.com/photos/random/?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg')
  //   //     .then(response => (this.url = response.data.urls.full));
  // },
  // methods: {
  //   async retrieveImageRandom(){
  //       this.imageData = await getImageRandom(axios)
  //       this.url = this.imageData.data.urls.full
  //   }
  // }
  mounted(){
    let hello = document.querySelectorAll('.card .card')[1];
    let elem = document.getElementsByClassName('title')[0];
    hello.addEventListener("mouseover", function(){
      console.log(hello)
      elem.style.opacity = "0";
    })
    document.querySelectorAll('.card .card')[0].addEventListener("mouseover", function() {
      console.log(document.querySelectorAll('.homePage .card')[0])
      elem.style.opacity = "1";
    })

    document.querySelectorAll('.card .card')[1].addEventListener("mouseleave", function() {
      console.log(document.querySelectorAll('.homePage .card')[1])
      elem.style.opacity = "1";
    })
  },
  methods: {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card{
    height:100vh;
    width:50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: width 5s ease;
}

.card:hover{
  width:300vw;
}
.background{
  flex-shrink: 0;
  width: 120vw;
}
.title{
  /*position:absolute;*/
  color:white;
  /*background-color:rgba(0, 0, 0, 0.41);*/
  padding-top: 1vh;
  opacity:1;
  transition: opacity 2s ease;
  max-width:max-content;
  text-shadow: black 0.1em 0.1em 0.2em
}

.card:hover ~ div.card .title{
  opacity:0;
}

/*#title1{
  max-width:25vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}*/
</style>
