<template>
  <div id="inspiration_options">
    <label for="image-sort">Sort by : </label>
    <select :value="imagesSortType" name="imageSort" id="imageSort" v-on:input="onImagesSortTypeChanged">
      <option value="mostLiked">Most Liked</option>
      <!-- <option value="mostDownloaded">Most Downloaded</option> -->
      <option value="lastestUpdated">Latest Updated</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ImagesOptions',
  props: {
    imagesSortType:String
  },
  watch:{
    imagesSortType : function(newImagesSortType){
      localStorage.setItem("imagesSortType", newImagesSortType)
    }
  },
  methods:{
    onImagesSortTypeChanged(event) {
			this.$emit('update:imagesSortType', event.target.value) 
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#inspiration_options{
  height:4vh;
  display: flex;
  justify-content: flex-start;
}
select{
  border-bottom: solid 1px gray !important;
  border: none;
  background: transparent;
  color:white;
  /* padding-bottom: 1vh; */
  
}
label{
  line-height: 4vh;
  margin-right:2vw;
}
</style>
