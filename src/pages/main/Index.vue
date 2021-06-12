<template>
  <q-page class="row justify-center">
    <q-img
      class="gt-xs"
      src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/index.png"
      style="height: 100vh; width: 100vd; opacity: 0.95"
    />
    <q-img
      class="xs"
      src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/index_mobile.png"
      style="height: 74vh; width: 100vd; opacity: 0.95"
    />
    <!-- 容器 -->
    <div
      class="col-md-9 col-12 ztop2 q-px-md q-pb-lg justify-center items-center"
      style="margin: -44.5px"
    >
      <!-- 标题 -->
      <div class="shadowonly bg-white text-center q-pa-sm q-mb-md">
        <div class="text-h4 text-bold text-blue-grey-8 q-mb-sm">Evensyell's blog</div>
        <div>兴趣使然的个人博客</div>
      </div>
      <!-- 内容块 -->
      <div class="row q-mt-md">
        <div class="col-12 row q-my-md q-px-sm justify-between">
          <!-- <div class="col-12 q-pa-sm"> -->
          <hitokoto class="col-12 q-pa-sm shadowonly text-black" style="height: 280px" />
          <!-- </div> -->
          <!-- <div class="col-md-6 col-xs-12 q-pa-sm">
            <hito-img class="shadowonly text-black" style="height:200px" />
          </div>-->
        </div>
        <latest class="col-12 q-my-sm q-px-sm" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Hitokoto from 'components/Hitokoto.vue'
import Latest from 'components/Latest.vue'
import { ref } from 'vue'

const index_img = ref('')
</script>
<style lang="sass" scoped>
// .hito
  // opacity: 0.85
</style>
