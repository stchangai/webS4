<template>
    <div :id="idElement" class="filter">
      <span>{{title}}</span>
          <ColorChip v-if="title=='couleur'" />
          <Input v-if="title=='size of images'" />
    </div>
</template>

<script>
import ColorChip from './ColorChip.vue'
import Input from './Input.vue'
export default {
  name: 'Filtre',
  props: {
    title: String,
    idElement : String
  },
  components: {
    ColorChip,
    Input,
  },
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
</style>
