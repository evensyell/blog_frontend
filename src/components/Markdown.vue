<template>
  <div class="markdwon">
    <vue3-markdown-it
      :source="props.mkd"
      breaks
      llinkify
      html
      :anchor="options.anchor"
      :highlight="options.highlight"
    />
  </div>
</template>
<script setup="{ emit }" lang="ts">
const instance = getCurrentInstance()

import Vue3MarkdownIt from 'vue3-markdown-it'
import { defineProps, onMounted, getCurrentInstance } from 'vue'

import 'highlight.js/styles/default.css'
// kimbie.light 黄色纸张

const props = defineProps({
  mkd: { default: '' },
})
// let toc_data = ref([])

const options = {
  anchor: {
    level: 2,
    slugify: (id) => encodeURIComponent(String(id).trim()),
    permalink: true,
    permalinkSpace: true,
    permalinkBefore: true,
    permalinkSymbol: '#',
    permalinkHref: (slug, state) => {
      return window.location.href + '#' + slug
    },
  },
  highlight: {
    // hljs: require('highlight.js'),
  },
}

const plugins = [
  {
    // plugin: MarkdownItStrikethroughAlt,
  },
]

onMounted(() => {
  setTimeout(() => {
    makeToc()
  }, 500)
})

const makeTree = (lever_2, lever_3) => {
  lever_3.forEach((h3) => {
    // console.log('【h3 ID】： ' + h3.id)

    for (let i = lever_2.length - 1; i > -1; i--) {
      // console.log('检索h2 ID：' + i)
      if (h3.top > lever_2[i].top) {
        // console.log('--------------插入h2 Index：' + i)

        lever_2[i].children.push(h3)
        break
      } else {
        continue
      }
    }
  })
}

const makeToc = () => {
  let h2_arry = []
  let h3_arry = []

  // 遍历h2标签
  document.getElementsByTagName('h2').forEach((h2e) => {
    h2_arry.push({
      id: h2e.getAttribute('id'),
      top: h2e.offsetTop,
      level: 2,
      children: [] as any,
    })
  })

  setTimeout(() => {
    document.getElementsByTagName('h3').forEach((h3e) => {
      h3_arry.push({
        id: h3e.getAttribute('id'),
        top: h3e.offsetTop,
        level: 3,
      })
    })
  }, 10)

  // 成树
  setTimeout(() => {
    makeTree(h2_arry, h3_arry)
  }, 200)

  setTimeout(() => {
    // toc_data.value = h2_arry
    instance.emit('toctree', h2_arry)
    // console.log('Emit toctree')
    // return h2_arry
  }, 200)
}
</script>
