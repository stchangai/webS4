<template>
  <div class="imageCard">
    <img class="picture" src="https://my-best-kennel.com/pictures/45.png"/>
  </div>
</template>

<script>
	export default {
	  name: 'ImageCard',
    props:{
      pictureUrl:{type:String, default:"https://my-best-kennel.com/pictures/45.png"}
    }
	}
</script>

<style>
	.imagecard {
	  display: flex;
	}

	h2 {
		 font-size: 20px;
	}
</style>