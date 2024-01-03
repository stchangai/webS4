<template>
  <div id="inspiration_options">
    <label for="image-sort">Sort by : </label>
    <select :value="imagesSortType" name="imageSort" id="imageSort" v-on:input="onImagesSortTypeChanged">
      <option value="popular">Most Popular</option>
      <option value="lastest">Latest Updated</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ImagesOptions',
  props: {
    imagesSortType:String
  },
  methods:{
    onImagesSortTypeChanged(event) {
      localStorage.setItem("imagesSortType", event.target.value)
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
  
}
label{
  line-height: 4vh;
  margin-right:2vw;
}
</style>
