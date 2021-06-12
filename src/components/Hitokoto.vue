<template>
  <q-parallax
    class="q-pa-none"
    :speed="1"
    src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/hitokoto.png"
  >
    <q-card
      padding
      bordered
      id="hito_card"
      class="absolute-full text-center flex flex-center q-pa-xl"
    >
      <q-chip square size="xs" color="grey-3" class="absolute-top-left z-top">
        <q-avatar
          class="cursor-pointer"
          @click="openHitokotoPage"
          icon="bubble_chart"
          color="primary"
          text-color="white"
        />
        <div class="cursor-pointer" @click="openHitokotoPage">一言</div>

        <chip-tip tip="有时是一颦一簇，有时是一字一句。" />
      </q-chip>

      {{ hitokoto.hitokoto }}
      <div
        v-if="hitokoto.from_who !== null"
        class="
          absolute-bottom-right
          text-grey-9 text-caption
          q-mb-sm q-ml-lg q-mr-sm
        "
      >
        —— {{ hitokoto.from_who }} /《{{ hitokoto.from }}》
      </div>

      <div
        v-else
        class="
          absolute-bottom-right
          text-grey-9 text-caption
          q-mb-sm q-ml-lg q-mr-sm
        "
      >
        —— 《{{ hitokoto.from }}》
      </div>
    </q-card>
  </q-parallax>
</template>

<script setup lang="ts">
import ChipTip from 'components/common/ChipTip.vue'

import { reactive, onMounted } from 'vue'
import { api } from 'boot/axios'

const hitokoto: any = reactive({
  hitokoto: '给岁月以文明，而不是给文明以岁月',
  from: '三体II · 黑暗森林',
  from_who: '罗辑',
})

onMounted(() => {
  getData
  console.log('hitokoto getData')
  const getDataInterval = setInterval(getData, 8000)
  // $once('hook:beforeDestroy', () => {
  //   clearInterval(getDataInterval)
  // })
})

const getData = () => {
  api.get('https://v1.hitokoto.cn?encode=json').then((response) => {
    hitokoto.hitokoto = response.data.hitokoto
    hitokoto.from = response.data.from
    hitokoto.from_who = response.data.from_who

    console.log('get 1 Hitokoto; type = ' + response.data.type)
  })
}

const openHitokotoPage = () => {
  window.open('https://hitokoto.cn/')
}
</script>

<style scoped lang="sass">
#hito_card
  background-color: rgba(0, 0, 0, 0)
  text-color: black
</style>
