<template>
  <q-page class="row justify-center">
    <q-img :src="state.article.img" style="height: 54vh; width: 100vd">
      <!-- <div class="q-my-sm text-h4 absolute-center transparent">{{article.title}}</div> -->
    </q-img>

    <!-- 容器 -->
    <div
      class="
        col-lg-9 col-md-10 col-sm-12 col-xs-12
        q-px-sm
        ztop2
        justify-center
      "
      style="margin: -50px 0 0 0"
    >
      <!-- 内容块 -->
      <div class="row">
        <!-- 大屏幕toc -->
        <!-- <div class="col-3 q-pt-xl q-pr-md gt-xs"> -->
        <div class="col-3 q-pt-xl q-pr-md " style="position: relative ">
          <!-- <q-scroll-area class="q-py-lg toc-sticky tocarea"> -->
          <toc
            :toc_tree="state.toctree"
            @anchorto="toAnchor"
            class="q-pt-lg tocarea toc-sticky"
          />
          <!-- </q-scroll-area> -->
        </div>

        <!-- 右侧主体 -->
        <div
          class="
            col-md-9 col-lg-9 col-xl-9 col-sm-9 col-12
            bg-white
            shadowonly
            q-px-lg q-pt-sm q-pb-xl
          "
        >
          <!-- 标签栏 -->
          <!-- <div class="justify-between"> -->
          <div class="flex">
            <q-icon
              size="xs"
              color="purple"
              name="sell"
              class="q-mt-sm q-mr-md"
            >
              <chip-tip tip="标签" />
            </q-icon>
            <q-btn
              class="q-py-none"
              flat
              no-caps
              dense
              type="a"
              v-for="tag in state.article.tags"
              @click="toArticlesByTag(tag)"
              :label="tag"
            />
            <q-space />

            <!-- 时间戳 -->
            <q-chip
              square
              outline
              class="relative-top-right q-pr-none q-mr-none card_action"
            >
              <q-icon class="q-pr-sm" size="xs" color="orange" name="update" />
              {{ hmsFormat(state.article.update) }}
              <chip-tip tip="最后更新时间" />
            </q-chip>
          </div>

          <q-separator class="q-my-sm bg-blue-grey-3" />

          <!-- Markdown正文 -->
          <markdown :mkd="state.mkd" @toctree="getTocData" />

          <div class="q-mb-md q-mt-xl text-center text-blue-grey-5">
            — 全文结束，感谢阅读 —
          </div>

          <comment class="q-pt-lg" :aid="$route.params.id.toString()" />
        </div>
      </div>
    </div>

    <!-- toc小屏幕侧栏 -->
    <q-drawer
      v-model="state.is_show_toc_sider"
      width="50vw"
      side="right"
      overlay
      class="tocsider shadowonly"
      @click="state.is_show_toc_sider = false"
    >
      <toc
        :toc_tree="state.toctree"
        @anchorto="toAnchorBySider"
        class="toc-sticky q-mx-md"
      />
    </q-drawer>

    <!-- toc小屏幕侧栏菜单按钮 -->
    <q-page-sticky
      class="lt-sm"
      position="bottom-right"
      style="z-index: 10"
      :offset="[28, 80]"
    >
      <q-btn
        round
        color="purple"
        icon="toc"
        class="shadow-1"
        @click="state.is_show_toc_sider = !state.is_show_toc_sider"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import Toc from 'components/Toc.vue'
import Comment from 'src/components/user/Comment.vue'
import ChipTip from 'components/common/ChipTip.vue'
import Markdown from 'src/components/Markdown.vue'

import { ref, reactive, onMounted } from 'vue'
import { api } from 'boot/axios'

import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

// import { useQuasar } from 'quasar'
// const $q = useQuasar()

import { hmsFormat } from 'assets/js/filters.js'
// import { createLogger } from 'vuex'
// import { debounce } from 'quasar'

// const qm = ref(null)

const state = reactive({
  is_show_toc_sider: false,
  toctree: [],
  article: {} as any,
  mkd: 'Markdown file is Loading...',
})

const tocarea = ref()
// const tocarea_height = 600

// **初始化
const getData = (id) => {
  // new Promise((resolve, reject) => {
  api
    .get('api/article/' + id)
    .then((res) => {
      state.article = res.data
    })
    .then(() => {
      api.get(state.article.markdown).then((res) => {
        state.mkd = res.data
      })
    })
  // })
}
onMounted(() => {
  getData($route.params.id)
  // const tocarea_height = parseInt(tocarea.value.$attrs.style.height)
})

const getTocData = (toc) => {
  // setTimeout(() => {
  state.toctree = toc
  // }, 100)
}

const toArticlesByTag = (tag) => {
  $router.push({
    path: `/articles`,
    query: {
      tag: tag,
    },
  })
}

const toAnchor = (id) => {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
  })
}

// let lasttop = ref(0)

// const tocScroll = () => {
//   // 获取当前文档流的 scrollTop
//   const persent =
//     (document.documentElement.scrollTop - lasttop.value) /
//     document.body.scrollHeight
//   console.log('------------------***************')
//   console.log(persent*600)
//   console.log(lasttop.value)
//   console.log('------------------***************')
//   // debounce(
//   tocarea.value.setScrollPosition('vertical', persent * 600, 200)
//   // , 200)
//   lasttop.value = document.documentElement.scrollTop
// }

const toAnchorBySider = (id) => {
  setTimeout(() => {
    toAnchor(id)
  }, 10)
}
</script>

<style scoped lang="sass">
.card_action
  color: grey
  font-size: 1em
  border: none
  margin-bottom: 1px

.toc-sticky
  position: sticky
  top: 200px

.tocsider
  background: rgba(0,0, 0, 0.1 )

// .tocarea
//   height: 400px
</style>
