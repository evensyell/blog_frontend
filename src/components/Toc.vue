<template>
  <ol class="toc">
    <q-chip v-if="props.toc_tree.length" class="text-black q-ml-none q-mb-sm">
      <q-avatar class="glossy" icon="toc" color="primary" text-color="white" />
      目录
    </q-chip>
    <li v-for="(h1, index) in props.toc_tree">
      <!-- 1级有子目录 -->
      <ol v-if="h1.children != 0">
        <a
          @click="toHeading(h1.id)"
          :class="active_id == h1.id ? 'current_toc' : ''"
          >{{ index + 1 }}.&ensp;{{ decodeURIComponent(h1.id) }}</a
        >

        <!-- 2级目录 -->
        <ol v-for="(h2, index2) in h1.children">
          <a
            @click="toHeading(h2.id)"
            :class="active_id == h2.id ? 'current_toc' : ''"
            >{{ index + 1 }}.{{ index2 + 1 }}&ensp;{{
              decodeURIComponent(h2.id)
            }}</a
          >
        </ol>
      </ol>

      <!-- 1级目录无子目录 -->
      <ol v-else>
        <a
          @click="toHeading(h1.id)"
          :class="active_id == h1.id ? 'current_toc' : ''"
          >{{ index + 1 }}&ensp;{{ decodeURIComponent(h1.id) }}</a
        >
      </ol>
    </li>
  </ol>
</template>

<script setup="{ emit }" lang="ts">
const instance = getCurrentInstance()
import {
  ref,
  watch,
  defineProps,
  getCurrentInstance,
  onMounted,
  onUnmounted,
} from 'vue'
// import { throttle, debounce } from 'quasar'

const active_id = ref('')

const props = defineProps({
  toc_tree: { type: [] as any },
})

// watch(
//   () => active_id.value,
//   () => {
//     instance.emit('tocscroll')
//   }
// )

const toHeading = (id) => {
  instance.emit('anchorto', id)
}

// 滚动监听
const onScroll = () => {
  const navContents = document.querySelectorAll('h2,h3')

  // 所有锚点元素的 offsetTop
  const offsetTopArr = []
  navContents.forEach((item) => {
    offsetTopArr.push(item.offsetTop)
  })
  // 获取当前文档流的 scrollTop
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  // 定义当前点亮的导航下标
  let navIndex = 0
  for (let n = 0; n < offsetTopArr.length; n++) {
    // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
    // 那么此时导航索引就应该是 n 了
    if (scrollTop + 50 >= offsetTopArr[n]) {
      navIndex = n
    }
  }
  if (navIndex != 0) {
    active_id.value = navContents[navIndex].id
  }
}
// const onScroll_2 = debounce(onScroll, 100)

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped lang="sass">
.toc
  padding: 0
  font-size: 14px
  font-weight: 300
  list-style: none !important

  li
    padding-bottom: 10px
    // list-style: none !important


    >ol
      padding: 0
      cursor: pointer
      list-style: none

      a
        padding: 0
        color: #82858a
        text-decoration: none !important
        cursor: pointer

        &:hover
          color: $primary !important
          text-decoration: underline !important

      >ol
        padding: 0 0 2px 1.5em
        cursor: pointer
        // list-style: none !important

.current_toc
  color: $primary !important
  text-decoration: underline !important
</style>
