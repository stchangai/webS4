<template>
  <div class="header">
    <h1 id="title">{{ nameSite }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    nameSite: String
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
.header{
    width:100%;
    top:0;
    position:absolute;
    color:white;
    z-index: 5;
    transition:top 5s ease;
}
</style>
