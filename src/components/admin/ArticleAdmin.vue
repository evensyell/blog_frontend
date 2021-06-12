<template>
  <div class="row">
    <!-- 文章管理列表 -->
    <div>
      <q-table
        flat
        :rows="state.articles"
        :columns="articles_columns"
        row-key="id"
        :pagination.sync="pagination"
      >
        <template v-slot:top class="row">
          <div class="text-h5 text-bold q-mb-sm">
            文章列表 （共{{ state.count }}篇）
          </div>
          <q-space />
          <div class>
            <q-btn
              flat
              dense
              :disable="state.prepage == null"
              color="primary"
              icon="arrow_back_ios"
              @click="getData(state.prepage)"
            >
              <ChipTip tip="上一页"></ChipTip>
            </q-btn>
            <q-btn
              flat
              dense
              :disable="state.nextpage == null"
              color="primary"
              icon="arrow_forward_ios"
              @click="getData(state.nextpage)"
            >
              <ChipTip tip="下一页"></ChipTip>
            </q-btn>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props" @click="toArticleById(props.row.id)">
              <q-badge color="primary">{{ props.row.id }}</q-badge>
            </q-td>
            <q-td
              key="title"
              :props="props"
              @click="toArticleById(props.row.id)"
              >{{ props.row.title }}</q-td
            >
            <q-td key="img" :props="props" @click="toArticleById(props.row.id)">
              <q-img v-if="props.row.img" :src="props.row.img" />
            </q-td>
            <q-td
              key="tags"
              :props="props"
              @click="toArticleById(props.row.id)"
            >
              {{ props.row.tags ? props.row.tags.toString() : null }}
            </q-td>
            <q-td
              key="update"
              :props="props"
              @click="toArticleById(props.row.id)"
            >
              {{ hmsFormat(props.row.update) }}
            </q-td>
            <q-td key="option">
              <q-btn
                round
                flat
                dense
                color="green"
                icon="create"
                @click="state.put_id = props.row.id"
              />
              <q-btn
                round
                dense
                flat
                color="red"
                icon="delete_forever"
                @click="delete_dialog(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom></template>
      </q-table>
    </div>
    <q-separator
      vertical
      inset
      color="primary"
      class="q-mx-xl"
      style="width: 2px"
    />

    <!-- 新文章表单 -->
    <div class="q-pr-md q-pt-xs col-3">
      <q-form @reset="onReset" @submit="submitArticle" class="row clear">
        <div class="text-h5 text-bold q-mb-xl q-pt-sm col-12">文章增改</div>
        <div v-if="state.put_id !== 0" class="col-12 row q-ma-none q-pb-md">
          <q-btn
            flat
            no-caps
            dense
            color="red"
            class="text-bold q-mr-md q-pl-none"
            label="[Click to Remove]  PUT_ID:"
            @click="state.put_id = 0"
          >
            <q-badge
              class="q-ml-sm"
              text-color="white"
              color="primary"
              :label="state.put_id"
            />
          </q-btn>
        </div>
        <!-- 表单输入框 -->
        <div class>
          <div class="col-12 q-pb-md">
            <q-uploader
              label="Image"
              ref="imgUp"
              class="shadowhover"
              accept="image/*"
              @added="(files) => (state.img = files[0])"
              @removed="() => (state.img = null)"
            />
          </div>
          <div class="col-12">
            <q-uploader
              label="Markdown"
              ref="mkdUp"
              class="shadowhover"
              accept=".md"
              @added="(files) => (state.markdown = files[0])"
              @removed="() => (state.markdown = null)"
            />
          </div>
          <q-input
            class="q-pt-sm"
            v-model="state.str_tags"
            style="min-width: 320px"
            label="Tags"
            clearable
            debounce="500"
            clear-icon="close"
          />
        </div>

        <!-- 提交按钮 -->
        <div class="col-12 q-pt-md">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            flat
            class="shadowhover"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="grey-13"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>

    <!-- 删除确认弹窗 -->
    <q-dialog v-model="state.del_confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >确认删除【 {{ state.del_article.title }}】？</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="grey" v-close-popup />
          <q-btn
            flat
            label="删除"
            color="primary"
            @click="deleteArticle(state.del_article.id)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import ChipTip from '../common/ChipTip.vue'

import { ref, reactive, onMounted } from 'vue'

import { useRouter } from 'vue-router'
const $router = useRouter()

import { useQuasar, LocalStorage } from 'quasar'
const $q = useQuasar()

import { api } from 'boot/axios'
import { hmsFormat } from 'assets/js/filters.js'

const state = reactive({
  str_tags: '',
  markdown: null,
  img: null,
  count: 0,
  articles: [{}],
  prepage: '',
  nextpage: '',
  put_id: 0,
  del_article: {} as any,
  del_confirm: false,
  user: 0,
})

const articles_columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row: { id: any }) => row.id,
    format: (val: any) => `${val}`,
    sortable: true,
    style: 'width: 15px',
  },
  {
    name: 'title',
    required: true,
    label: '标题',
    align: 'left',
    field: (row: { title: any }) => row.title,
    format: (val: any) => `${val}`,
    sortable: true,
    style: 'width: 200px',
  },
  {
    name: 'img',
    required: true,
    label: '标题图',
    align: 'center',
    field: (row: { img: any }) => row.img,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'tags',
    required: false,
    label: '标签',
    align: 'left',
    field: (row: { tags: any }) => row.tags,
    format: (val: any) => `${val}`,
    sortable: true,
    style: 'width: 200px',
  },
  {
    name: 'update',
    required: true,
    label: '更新时间',
    align: 'left',
    field: (row: { update: any }) => row.update,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'option',
    label: '操作栏',
    align: 'left',
  },
]

const pagination = {
  // sortBy: 'update',
  descending: false,
  page: 1,
  rowsPerPage: 12,
}

// **初始化文章列表
onMounted(() => {
  getData()
})

const getData = (page_url?: string | null) => {
  if (page_url) {
    api.get(page_url).then((response) => {
      state.articles = response.data.results
      state.count = response.data.count
      state.prepage = response.data.previous
      state.nextpage = response.data.next
    })
  } else {
    api.get('/api/article').then((response) => {
      state.articles = response.data.results
      state.count = response.data.count
      state.prepage = response.data.previous
      state.nextpage = response.data.next
    })
  }
}

// **提交文章
const submitArticle = (event: any) => {
  // 打包data参数
  const data: any = { author: LocalStorage.getItem('uid') }
  if (state.str_tags !== '') {
    if (state.str_tags.indexOf('、') == -1) {
      data.tag = state.str_tags
    } else {
      data.tag = state.str_tags.split('、')
    }
  }

  if (state.img !== null) {
    data.img = state.img
  }
  if (state.markdown !== null) {
    data.markdown = state.markdown
  }
  // 判断新增还是修改
  if (state.put_id == 0) {
    api
      .post('api/article/', data)
      .then((res) => {
        $q.notify('文章 - 成功发布')
        onReset()
        setTimeout(() => {
          getData()
        }, 100)
      })
      .catch((err) => {
        $q.notify({
          message: '发布失败！ ' + err,
          color: 'red',
        })
      })
  } else {
    console.log('PUT data' + data)
    api
      .put('api/article/' + state.put_id, data)
      .then((res) => {
        $q.notify('文章已成功修改')
        state.put_id = 0
        onReset()
        setTimeout(() => {
          getData()
        }, 100)
      })
      .catch((err) => {
        $q.notify({
          message: '修改失败！ ' + err,
          color: 'red',
        })
      })
  }
}

// **清空表单输入框
const mkdUp = ref()
const imgUp = ref()

const onReset = (event?: any) => {
  state.str_tags = ''
  state.img = null
  state.markdown = null
  mkdUp.value.reset()
  imgUp.value.reset()
}

// **删除文章
const deleteArticle = (aid: number) => {
  api
    .delete('api/article/' + aid)
    .then((res) => {
      console.log(res.data)
      $q.notify('文章已删除！')
    })
    .catch((err) => {
      $q.notify({
        message: '删除失败！ ' + err,
        color: 'red',
      })
    })
  setTimeout(() => {
    getData()
  }, 100)
}

const delete_dialog = (del_article) => {
  state.del_confirm = true
  state.del_article = del_article
}

const toArticleById = (id: any) => {
  $router.push({
    name: `article`,
    params: {
      id: id,
    },
  })
}
</script>

<style scoped lang="sass">
.q-table__card
  color: #304455
  background: none
  box-shadow: none
  border-radius: 0
  cursor: pointer
</style>
