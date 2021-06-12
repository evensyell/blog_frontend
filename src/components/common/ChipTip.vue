<template>
  <q-tooltip
    id="chiptip"
    :delay="delay"
    :offset="offset"
    class="bg-grey-12 text-black shadowonly"
    transition-show="jump-up"
    transition-hide="jump-down"
    >{{ tip }}</q-tooltip
  >
</template>

<script setup="porps" lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  tip: { type: String },
  delay: {
    type: Number,
    default: 100,
  },
  offset: {
    type: Array,
    default: () => {
      return [0, 8]
    },
  },
})
</script>
