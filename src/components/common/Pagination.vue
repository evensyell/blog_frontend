<template>
  <div class="q-pa-md q-mb-lg flex flex-center">
    <q-pagination
      class="q-pt-lg q-my-lg"
      v-model="state.current_page"
      color="primary"
      :max="page_max"
      :max-pages="5"
    ></q-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

const state = reactive({
  current_page: 1,
  per: 12,
})

const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
})

const page_max = computed(() => {
  return Math.ceil(props.count / state.per)
})

watch(
  () => $route.query,
  () => {
    if ($route.query.page) {
      state.current_page = parseInt($route.query.page.toString())
    } else {
      state.current_page = 1
    }
  }
)

watch(
  () => state.current_page,
  () => {
    $router.push({ query: { page: state.current_page } })
  }
)

// const pageTo = () => {
// state.current_page = p
// console.log('pageto:' + p)
// if (p === undefined) {
//   p = 1
// }
// else {
// $router.push({ query: { page: state.current_page } })
// }
</script>
