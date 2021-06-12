<template>
  <div
    class="bg-blue text-white text-center flex flex-center"
    style="height: 100vh; "
  >
    <div>
      <div id="errdiv">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404',
})
</script>

<style lang="sass" scoped>
#errdiv
  font-size: 30vh

</style>
