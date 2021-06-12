<template>
  <q-page class="row">
    <q-img
      src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/about.jpg"
      style="height: 50px; width: 100vd; opacity: 0.85"
    />

    <!-- 导航栏 -->

    <!-- 业务面板 -->
    <div class="col-12 justify-left admin_planels">
      <div class="col-12 justify-left q-pl-lg" style="height: 50px">
        <q-tabs align="left" class="text-teal" v-model="state.tab">
          <q-tab
            no-caps
            v-for="(tab, index) in state.tabs"
            class="text-bold"
            :name="tab"
            :label="tab"
          />
        </q-tabs>
      </div>

      <q-tab-panels
        class="shadowonly q-px-sm"
        v-model="state.tab"
        style="background: none; box-shadow: none"
        flat
      >
        <q-tab-panel name="Article">
          <article-admin />
        </q-tab-panel>
        <!-- <q-tab-panel name="Share">
          <share-admin />
        </q-tab-panel> -->

        <q-tab-panel name="Music">
          <music-admin />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ArticleAdmin from 'components/admin/ArticleAdmin.vue'
import MusicAdmin from 'components/admin/MusicAdmin.vue'

import { reactive } from 'vue'

const state = reactive({
  tab: 'Article',
  tabs: ['Article', 'Music'],
})
</script>
<style lang="sass" scoped>
.admin_planels
  min-height: 80vh
  margin-bottom: -100px
</style>
