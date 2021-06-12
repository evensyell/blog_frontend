<template>
  <q-page class="row justify-center">
    <q-img
      src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/articles.jpg"
      style="height: 62vh; width: 100vd; opacity: 0.95"
    />

    <!-- 容器 -->
    <div
      class="col-md-9 col-12 q-px-md ztop2 justify-center"
      style="margin: -30px 0 0 0"
    >
      <!-- 标题 -->
      <div class="shadowonly bg-white text-center q-pa-md q-mb-md">
        <div class="text-h5 text-bold text-blue-grey-8">文章</div>
      </div>
      <!-- 内容块 -->
      <div class="row q-px-sm">
        <!-- 标签云过滤器 -->
        <div class="col-md-3 col-lg-3 col-sm-3 col-12 q-mt-md q-pl-sm q-pr-md">
          按标签索引:（当前索引下共有 {{ state.count }} 篇）
          <br />
          <q-chip
            class="tag_btn q-ml-none q-mr-sm q-mt-sm"
            dense
            clickable
            @click="tagSelect('')"
            >所有标签</q-chip
          >
          <br />

          <q-chip
            class="tag_btn q-ml-none q-mr-sm"
            v-for="tag in state.total_tags"
            dense
            clickable
            @click="tagSelect(tag.tag_name)"
            >{{ tag.tag_name }}</q-chip
          >
          <!-- <q-separator class="q-my-xs" /> -->
        </div>

        <!-- 文章列表 -->
        <q-list class="col-md-9 col-lg-9 col-sm-9 col-12 q-pr-sm">
          <q-card v-for="article in state.articles" class="shadowhover q-my-lg">
            <!-- 卡片内容 -->
            <q-card-section horizontal class="row" style="height: 200px">
              <q-img
                class="col-4 q-qa-none q-ma-none"
                @click="toArticle(article.id)"
                :src="article.img"
              />

              <q-card-section class="col-8 q-pt-sm q-pb-none q-px-sm">
                <q-card-section
                  class="q-py-none q-ma-none"
                  @click="toArticle(article.id)"
                >
                  <div
                    class="q-ma-none q-pa-none text-h5 text-bold ellipsis"
                    :title="article.title"
                  >
                    {{ article.title }}
                  </div>
                </q-card-section>

                <q-separator inset class="q-mt-xs line-1px" color="orange" />

                <!-- 标签 -->
                <q-card-section class="q-pt-sm q-pl-md q-pb-none q-px-sm">
                  <q-icon
                    class="q-pr-xs"
                    size="xs"
                    color="purple"
                    name="sell"
                  />
                  <q-btn-group flat v-for="tag in article.tags" class="inline">
                    <q-btn
                      class="card_action q-pb-none text-purple"
                      no-caps
                      @click="tagSelect(tag)"
                      :label="tag"
                    />
                  </q-btn-group>
                </q-card-section>
                <!-- 时间戳 -->
                <q-card-actions
                  class="q-ml-md items-center"
                  @click="toArticle(article.id)"
                >
                  <div
                    class="
                      absolute-bottom-right
                      q-pt-sm q-pb-xs q-pr-none q-mr-xs
                    "
                  >
                    <q-chip
                      dense
                      color="white"
                      text-color="positive"
                      icon="chat"
                      class="q-pt-sm q-pb-xs q-pr-none q-mr-none"
                      :label="'(' + article.comments.length + ')'"
                    />
                    <q-chip
                      square
                      outline
                      class="card_action q-pb-xs q-pr-md q-mr-sm"
                    >
                      <q-icon
                        class="q-pr-sm"
                        size="xs"
                        color="orange"
                        name="update"
                      />
                      {{ hmsFormat(article.update) }}
                    </q-chip>
                  </div>
                </q-card-actions>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-list>
      </div>
      <pagination :count="state.count" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Pagination from 'src/components/common/Pagination.vue'

import { reactive, onMounted, watch } from 'vue'
import { api } from 'boot/axios'

import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

import { hmsFormat } from 'assets/js/filters.js'
// import ChipTip from 'components/common/ChipTip.vue'

const state = reactive({
  total_tags: [],
  articles: [],
  count: 0,
  toc: {
    position: 'relative',
  },
})

watch(
  () => $route.query,
  () => {
    console.log('article watch route:')
    console.log($route)
    updateData()
  }
)

// **1 获取tag列表 2 根据tag更新文章列表
const getData = () => {
  api
    .get('/api/tag')
    .then((response) => {
      const total = response.data.results
      state.total_tags = total.filter((tag) => tag.article_set.length !== 0)
    })
    .then(() => {
      updateData()
    })
}

onMounted(() => {
  getData()
  console.log('Articles getData')
})

// **根据路由参数查询文章
const updateData = () => {
  // 监听路由改变，重新获取数据
  const params: any = {
    page: $route.query.page || 1,
  }
  // 判断是否有tag筛选
  if ($route.query.tag) {
    const tagObj = state.total_tags.filter((t) => {
      return t.tag_name == $route.query.tag
    })
    params.tags = tagObj[0].id
  }
  // axios请求筛选数据
  api.get('/api/article', { params: params }).then((response) => {
    state.articles = response.data.results
    state.count = response.data.count
    console.log('tag selectd - count:' + response.data.count)
  })
}

// **跳转到文章详情页
const toArticle = (id: any) => {
  $router.push({
    name: `article`,
    params: {
      id: id,
    },
  })
}

// **tag筛选 改变路由
const tagSelect = (t) => {
  // // 只改变路由
  $router.push({
    // query: merge($route.query, { tag: t, page: 1 }),
    query: { tag: t, page: 1 },
  })
}
</script>

<style scoped lang="sass">
.card_action
  color: grey
  font-size: 0.7em
  border: none
</style>
