<template lang="html">
  <v-row v-if="!float">
    <v-col class="col-12 col-md-6 offset-md-3">
      <slot></slot>
    </v-col>
  </v-row>
  <div v-else :class="`ma-2 float-${float}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:"VParagraphImgs",
  props:{
    float:String
  }
}
</script>

<style lang="css" scoped>
</style>
