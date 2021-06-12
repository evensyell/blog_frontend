<template>
  <div class="q-gutter-y-lg row">
    <div class="col-12 text-center q-my-md text-h5 text-bold">最新文章</div>
    <div
      class="col-12 col-sm-6 col-md-6 col-lg-6 q-px-md"
      v-for="la in la_articles.all"
      :key="la.id"
    >
      <q-card class="shadowhover" @click="toArticle(la.id)">
        <q-card-section class="q-pa-none">
          <q-img :src="la.img" class="card_img" :ratio="16 / 9" />
        </q-card-section>

        <q-card-section class="text-h6 ellipsis">{{ la.title }}</q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  reactive, onMounted } from 'vue'
import { api } from 'boot/axios'
const la_articles = reactive({ all: [] })

onMounted(() => {
  getData()
})

const getData = () => {
  api.get('/api/article').then((response) => {
    la_articles.all = response.data.results.slice(0, 4)
  })
}

import { useRouter } from 'vue-router'
const $router = useRouter()
const toArticle = (id) => {
  $router.push({
    path: `/article/${id}`,
    params: {
      id: id,
    },
  })
}
</script>

<style scoped lang="sass">
.card_img
  border-top-left-radius: 10px
  border-top-right-radius: 10px
</style>
