<template>
<div>
  <h1>Hi,vue</h1>
  <h2>{{ count }}</h2>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: "Test",
  computed: {
    ...mapGetters([
      'count'
    ])
  },
}
</script>

<style scoped>

</style>
