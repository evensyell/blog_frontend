<template>
  <q-page class="row justify-center">
    <q-img
      src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/20210618014415.jpg"
      style="height: 62vh; width: 100vd; opacity: 0.95"
    />

    <!-- 容器 -->
    <div
      class="col-md-9 col-12 q-px-md ztop2 justify-center"
      style="margin: -30px 0 0 0"
    >
      <!-- 标题 -->
      <div class="shadowonly bg-white text-center q-pa-md q-mb-md">
        <div class="text-h5 text-bold text-blue-grey-8">树洞</div>
      </div>
      <!-- 内容块 -->
      <div class="row q-px-sm">
        <q-list class="col-md-9 col-lg-9 col-sm-9 col-12">
          <q-card
            v-for="post in state.posts"
            class="shadowonly q-my-lg q-pt-sm q-pb-none q-px-sm"
          >
            <!-- 树洞标题行 -->
            <q-card-section class="q-py-sm q-ma-none">
              <div
                class="q-ma-none q-pa-none text-h5 text-bold ellipsis"
                :title="post.title"
              >
                {{ post.title }}
              </div>
            </q-card-section>
            <q-separator inset class="q-mt-xs line-1px" color="positive" />

            <!-- 头像 昵称 -->
            <q-card-section
              class="row items-center q-pl-md q-pt-md q-my-none text-subtitle2"
            >
              <!-- 头像 -->
              <q-avatar size="md" class="on-left">
                <q-img
                  :src="post.user_avatar || 'img/akari.jpg'"
                  ratio="1"
                  :img-style="{ width: '2em', height: '2em' }"
                />
              </q-avatar>
              <div class="text-bold text-blue-grey-9">
                {{ post.user_nickname ? post.user_nickname : '友人A' }}
              </div>
              <q-space />
              <div class="text-subtitle2 text-grey">
                {{ goneTimeFormat(post.created) }}
              </div>
            </q-card-section>

            <!-- <q-separator inset class="q-mt-xs line-1px" color="orange-3" /> -->

            <!-- 正文内容 -->
            <q-card-section class="q-pb-md q-mx-md q-pt-none">
              <div v-html="post.content" class="q-pb-md"></div>
              <q-img v-if="post.img" :src="post.img" />
            </q-card-section>

            <!-- 扩展卡片 -->
            <q-card-section>
              <q-expansion-item
                style="z-index: 999"
                expand-icon-toggle
                expand-separator
                :label="
                  post.replies.length
                    ? '查看回复(' + post.replies.length + ') '
                    : '暂无回复'
                "
                icon="chat"
                expand-icon-class="text-positive"
                :header-class="
                  post.replies.length ? 'text-positive' : 'text-grey'
                "
              >
                <template v-slot:header>
                  <q-item-section> </q-item-section>
                  <q-item-section side>
                    <q-chip
                      dense
                      color="white"
                      :text-color="post.replies.length ? 'positive' : 'grey-5'"
                      icon="chat"
                      class="q-pt-sm q-pb-xs q-pr-none q-mr-none"
                      :label="
                        post.replies.length
                          ? ' 回复(' + post.replies.length + ') '
                          : ' 暂无回复'
                      "
                    />
                  </q-item-section>
                </template>

                <!-- 写回复 -->
                <q-form
                  v-if="LocalStorage.getItem('uid')"
                  @submit="newReply(post.id)"
                  class="row flex q-pb-md"
                >
                  <div class="col-10">
                    <q-input
                      v-model="state.edit_comment"
                      autogrow
                      outlined
                      type="textarea"
                    />
                  </div>
                  <div class="col-2 q-px-sm row">
                    <q-btn
                      unelevated
                      no-wrap
                      align="evenly"
                      color="primary"
                      class="col-12 text-white shadowhover"
                      type="submit"
                    >
                      <div>
                        发送
                        <br />回复
                      </div>
                    </q-btn>
                  </div>
                </q-form>
                <div v-else class="text-center text-positive">
                  点击顶栏头像按钮登录以进行回复
                </div>

                <!-- 回复列表 -->
                <q-card square flat v-for="(reply, index) in post.replies">
                  <q-card-section
                    class="row items-center q-pl-sm text-subtitle2"
                  >
                    <!-- 头像 -->
                    <q-avatar size="md" class="on-left">
                      <q-img
                        :src="reply.user_avatar || 'img/akari.jpg'"
                        ratio="1"
                        :img-style="{ width: '2em', height: '2em' }"
                      />
                    </q-avatar>
                    <!-- 昵称 -->
                    <div class="text-bold text-blue-grey-9">
                      {{ reply.user_nickname ? reply.user_nickname : '友人A' }}
                    </div>
                    <q-space />
                    <div class="text-subtitle2 text-grey">
                      {{ goneTimeFormat(reply.created) }} &nbsp;&nbsp;

                      <!-- <span v-if="state.reverse" class="text-grey-7"
                      >{{ post.replies.length - index }}楼</span
                    > -->
                      <span class="text-grey-7">{{ index + 1 }}楼</span>
                    </div>
                    <!-- 回复正文 -->
                  </q-card-section>

                  <q-card-section
                    id="reply_card"
                    class="q-pl-xl q-py-none q-ml-xs"
                  >
                    <pre class="text-body">{{ reply.content }}</pre>
                  </q-card-section>
                  <q-separator class="line-1px q-mt-none q-mb-md" inset />
                </q-card>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </q-list>
        <!-- 右侧提示内容 -->
        <div class="col-3 gt-xs q-my-lg q-pt-sm q-pb-none q-pl-lg">
          <div class="fbi-sticky">
            <q-chip
              square
              flat
              size="md"
              class="q-mb-md q-ml-none text-white bg-red"
            >
              FBI WARNING</q-chip
            >
            <p class="text-grey-14" v-for="item in warnings">
              {{ item }}
            </p>
          </div>
        </div>
      </div>

      <pagination :count="state.count" />

      <!-- 发布新树洞 -->
      <div class="col-12 text-left q-mb-md text-h5 text-bold">发布一个树洞</div>

      <q-form
        v-if="LocalStorage.getItem('uid')"
        @submit="newPost()"
        class="row flex q-pb-md"
      >
        <div class="col-9 col-xs-12 q-gutter-sm">
          <q-input
            filled
            bg-color="white"
            v-model="state.edit_post.title"
            label=" 标题"
            clearable
            clear-icon="clear"
          />
          <q-editor
            flat
            v-model="state.edit_post.content"
            :definitions="editer_config"
            placeholder="正文（此区域内可使用键盘快捷键，如 CTRL+B）"
          />
          <q-file
            filled
            bg-color="white"
            v-model="state.edit_post.img"
            accept="image/*"
            clearable
            clear-icon="clear"
          >
            <template v-slot:prepend>
              <q-icon name="photo" />
            </template>
          </q-file>
          <q-btn
            unelevated
            no-wrap
            align="evenly"
            color="primary"
            class="col-12 text-white text-bold q-mt-md"
            type="submit"
          >
            发布
          </q-btn>
        </div>
        <!-- <div class="col-xs-12 col-2 q-gutter-sm row"></div> -->
      </q-form>
      <div v-else class="text-center text-positive">
        点击顶栏头像按钮登录以发布树洞
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Pagination from 'src/components/common/Pagination.vue'
// import ChipTip from 'components/common/ChipTip.vue'

import { reactive, onMounted, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

import { hmsFormat, goneTimeFormat } from 'assets/js/filters.js'
import { api } from 'boot/axios'

import { LocalStorage, useQuasar } from 'quasar'
const $q = useQuasar()

const state = reactive({
  posts: [],
  count: 0,
  edit_comment: '',
  edit_post: { title: null, content: null, img: null } as any,
})
const editer_config = {
  // bold: { label: null, icon: 'format_bold', tip: 'Bold' },
}
const warnings = [
  '1. 善意待人',
  '2. 任何人登陆后均可发布、回复树洞',
  '3. 发布内容时请留意个人隐私信息',
  '4. 回复仅支持换行和空格两种排版格式；树洞支持的排版格式见编辑器',
]

watch(
  () => $route.query,
  () => {
    console.log('post watch route:')
    console.log($route)
    getData()
  }
)

onMounted(() => {
  getData()
})

// **根据路由页码参数查询文章
const getData = () => {
  const params: any = {
    page: $route.query.page || 1,
  }

  api.get('/api/post', { params: params }).then((res) => {
    state.posts = res.data.results
    state.count = res.data.count
  })
}

// **发布评论
const newReply = (pid) => {
  let data = {
    post: pid,
    content: state.edit_comment,
    author: LocalStorage.getItem('uid'),
  }
  api
    .post('api/reply/', data)
    .then((res) => {
      $q.notify('回复已发送！')
      state.edit_comment = ''
      getData()
    })
    .catch((err) => {
      $q.notify({ message: '回复失败！', color: 'red' })
    })
}

// **发布树洞
const newPost = () => {
  let data = {
    // post: pid,
    title: state.edit_post.title,
    content: state.edit_post.content,
    author: LocalStorage.getItem('uid'),
    img: state.edit_post.img,
  }
  api
    .post('api/post/', data)
    .then((res) => {
      $q.notify('发布成功！')
      state.edit_post = { title: null, content: null, img: null }
      getData()
    })
    .catch((err) => {
      $q.notify({ message: '发布失败！', color: 'red' })
    })
}
</script>

<style scoped lang="sass">
.card_action
  color: grey
  font-size: 0.7em
  border: none

.fbi-sticky
  position: sticky
  top: 100px
</style>
