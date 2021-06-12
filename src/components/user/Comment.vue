<template>
  <div>
    <div class="text-h6 text-bold q-pb-md">
      {{ state.comments.length }} 评论
    </div>
    <q-form @submit="postComment" class="row flex">
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
            发布
            <br />评论
          </div>
        </q-btn>
      </div>
    </q-form>

    <!-- 评论列表 -->
    <div v-if="aid == 0" class="text-bold text-h5 q-mt-md">暂无评论</div>

    <div v-else class="q-gutter-xs q-mt-xl">
      <div class="q-mt-lg row">
        <span class="inline_ text-h6 text-bold">历史评论：</span>
        <q-space />

        <q-toggle
          class="text-body2 text-grey q-mr-md"
          color="primary"
          keep-color
          v-model="state.reverse"
          label="倒序查看"
        />
      </div>

      <q-card square flat v-for="(comment, index) in state.comments">
        <q-card-section class="row items-center q-pl-sm">
          <!-- 头像 -->
          <q-avatar size="lg" class="on-left">
            <q-img
              :src="comment.user_avatar || 'img/akari.jpg'"
              ratio="1"
              :img-style="{ width: '2em', height: '2em' }"
            />
          </q-avatar>
          <!-- 昵称 -->
          <div class="text-bold text-blue-grey-9">
            {{ comment.user_nickname ? comment.user_nickname : '友人A' }}
          </div>
          <q-space />
          <div class="text-subtitle2 text-grey">
            {{ goneTimeFormat(comment.created) }} &nbsp;&nbsp;

            <span v-if="state.reverse" class="text-grey-7"
              >{{ state.comments.length - index }}楼</span
            ><span v-else class="text-grey-7">{{ index + 1 }}楼</span>
          </div>
          <!-- 评论正文 -->
        </q-card-section>

        <q-card-section
          id="comment_card"
          class="inline_ q-pl-xl q-py-none q-ml-xs"
          >{{ comment.content }}</q-card-section
        >
        <q-separator class="line-1px q-mt-none q-mb-md" inset />
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineProps, watch } from 'vue'
import { api } from 'boot/axios'

import { useStore } from 'src/store/index'
const $store = useStore()

import { useQuasar } from 'quasar'
const $q = useQuasar()

import { hmsFormat, goneTimeFormat } from 'assets/js/filters.js'

const state = reactive({
  comments: [],
  reverse: false,
  edit_comment: '',
})

const props = defineProps({
  aid: {
    type: String || Number,
    default: 0,
  },
})

// **初始化
const getData = () => {
  api('/api/comment?article=' + props.aid).then((res) => {
    state.comments = res.data.results
  })
}

watch(
  () => state.reverse,
  () => {
    state.comments = state.comments.reverse()
  }
)

onMounted(() => {
  getData()
})

// **发布评论
const postComment = () => {
  let data = {
    article: props.aid,
    content: state.edit_comment,
    user: $store.getters.getUid,
  }
  api
    .post('api/comment/', data)
    .then((res) => {
      $q.notify('评论发布成功！')
      state.edit_comment = ''
      getData()
    })
    .catch((err) => {
      $q.notify({ message: '评论发布失败！', color: 'red' })
    })
}
</script>
