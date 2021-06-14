<template>
  <q-layout
    class="layout"
    id="layout"
    view="hHh LpR lff"
    @scroll="scrollFunc_2"
  >
    <!-- Header -->
    <q-header
      height-hint="56px"
      :style="header_bg"
      class="q-py-none items-center justify-between text-white"
      style="max-width: 1700px; margin: auto"
    >
      <q-toolbar class="q-my-none">

        <!-- 侧边栏按钮 -->
        <q-fab
          v-model="is_show_left"
          class="xs"
          flat
          hide-label
          external-label
          label-class="bg-grey-3 text-purple"
          vertical-actions-align="left"
          color="white"
          icon="menu"
          direction="down"
          type="button"
        >
          <q-fab-action
            type="button"
            v-for="link in links"
            :to="link.to"
            :icon="link.icon"
            :color="link.color"
            :label="link.label"
            :label-class="'bg-' + link.color + ' text-white shadowonly'"
            external-label
          />
        </q-fab>

        <!-- Logo  -->
        <q-toolbar-title class="cursor-pointer" @click="toIndex">
          <q-avatar size="md" class="logo on-left">
            <img src="icons/favicon-96x96.png" />
          </q-avatar>
          <span class="xs text-bold">花自绰约 藤自窈窕</span>
          <span class="sm text-bold">花自绰约</span>
          <span class="gt-sm text-bold">花自绰约 藤自窈窕</span>
        </q-toolbar-title>

        <!-- <q-separator class="line-1px-v" vertical inset /> -->
        <q-space class="gt-sm" />

        <!-- 导航栏 -->
        <q-btn-group
          flat
          spread
          stretch
          no-wrap
          class="gt-xs q-gutter-sm q-mr-md"
        >
          <q-btn
            dense
            v-for="link in links"
            :to="link.to"
            type="button"
            class="nav text-bold"
            :label="link.label"
            :icon="link.icon"
          >
            <!-- <q-icon
              :name="link.icon"
              style="font-size: 1.3em"
              class="q-mr-xs"
            /> -->
          </q-btn>
        </q-btn-group>

        <!-- 用户组件 -->
        <user />

        <!-- 背景音乐组件 -->
        <bgm />
      </q-toolbar>
    </q-header>

    <!-- 侧边栏 -->
    <!-- <q-drawer
      :width="220"
      v-model="is_show_left"
      behavior="mobile"
      bordered
      overlay
      style="width: 220px; height: 100%"
    >
      <sider :links="links" />
    </q-drawer> -->

    <!-- 主页面 -->
    <q-page-container class="bg-blue-grey-1" style="padding: 0">
      <!-- <q-scroll-observer @scroll="scrollFunc" /> -->
      <router-view />

      <!-- 回到顶部 -->
      <q-page-sticky
        v-show="is_show_back2upBtn"
        position="bottom-right"
        style="z-index: 10"
        :offset="[28, 28]"
      >
        <q-btn
          round
          glossy
          color="primary"
          icon="expand_less"
          class="shadow-1"
          @click="back2up"
        >
          <chip-tip tip="回到顶部" :offset="[10, 10]" />
        </q-btn>
      </q-page-sticky> </q-page-container
    ><!-- 页脚 -->
    <div class="bg-grey-11 text-center q-py-sm footer">
      <p class="q-my-none text-grey">
        Evensyell
        <q-icon name="copyright" color="primary" /> 2019 - 2021
        <span>|</span> Powered by
        <a class="text-blue-grey-4" href="https://cn.vuejs.org/">Vue</a> and
        <a class="text-blue-grey-4" href="https://www.djangoproject.com/"
          >Django</a
        >
      </p>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
// import Sider from 'components/Sider.vue'
import User from 'src/components/user/User.vue'
import Bgm from 'components/Bgm.vue'
import ChipTip from 'components/common/ChipTip.vue'

import { ref, reactive } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { debounce } from 'quasar'

import { useQuasar } from 'quasar'
const $q = useQuasar()
$q.addressbarColor.set('#a2e3fa')

// **Header
const header_bg = reactive({
  background: 'transparent',
  color: '#e9e9e9',
  boxShadow: '',
})

const links = [
  { icon: 'home', label: '首页', to: '/index', color: 'primary' },
  { icon: 'library_books', label: '文章', to: '/articles', color: 'purple' },
  { icon: 'bathtub', label: '树洞', to: '/posts', color: 'positive' },
  // { icon: 'code', label: '软件', to: '/softwares' ,color:'primary'},
  { icon: 'accessible_forward', label: '关于', to: '/about', color: 'pink-12' },
]

// import { getCurrentInstance } from 'vue';
// const  proxy  = getCurrentInstance()

// **Router
const toIndex = (): void => {
  void router.push({
    path: '/index',
  })
  return
}

// **Sider
const is_show_left = ref(false)

// **Header
const headerColorShow = (pos: number) => {
  if (pos <= 20) {
    header_bg.background = 'transparent'
    // header_bg.color = 'white'
    header_bg.boxShadow = ''
  } else {
    header_bg.background =
      // 'linear-gradient(to top right, #00c8e6,#00cccc,#12dfdf)'
      '#0cc'
    // header_bg.color = 'white'
    header_bg.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)'
  }
}

// **滚动监听
const scrollFunc = (info) => {
  console.log(info.position)

  headerColorShow(info.position)
  back2upShow(info.position)
}

const scrollFunc_2 = debounce(scrollFunc, 50)

// **Back2Up
const is_show_back2upBtn = ref(false)
const back2upShow = (pos: number) => {
  if (pos <= 401) {
    is_show_back2upBtn.value = false
  } else {
    is_show_back2upBtn.value = true
  }
}
const back2up = () => {
  const scrollIntoViewOptions: object = {
    block: 'start',
    inline: 'nearest',
    behavior: 'smooth',
  }
  document.querySelector('#layout').scrollIntoView(scrollIntoViewOptions)
}
</script>

<style lang="sass" scoped>

.layout
  margin: 0 auto
  max-width:1700px
  // box-shadow:0 2px 10px 2px rgba(0, 0, 0, 0.12)
  // box-shadow: 0 3px 6px rgb(0, 0, 0,0.1)


.logo
  animation: rotation 6s linear infinite


.footer
  font-size: 8px
  margin-top: 100px
  // width: inherit
//   position: absolute
//   bottom: 0
//   margin: 50px auto 0
//   padding:6px 30px
</style>
