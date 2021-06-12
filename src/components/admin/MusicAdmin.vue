<template>
  <div class="row">
    <q-table
      flat
      :rows="state.music_list"
      :columns="music_columns"
      row-key="id"
      :dense="$q.screen.lt.md"
      :pagination="pagination"
      table-style="background:none;box-shadow:none"
    >
      <template v-slot:top class="row">
        <div class="text-h5 text-bold q-mb-sm">
          音乐列表 （共{{ state.count }}首）
        </div>
        <q-space />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <q-badge color="primary">{{ props.row.id }}</q-badge>
          </q-td>
          <q-td key="title" :props="props">{{ props.row.title }}</q-td>
          <q-td key="artist" :props="props">{{ props.row.artist }}</q-td>
          <q-td key="option">
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
    <q-separator
      vertical
      inset
      color="primary"
      class="q-mx-xl"
      style="width: 2px"
    />

    <q-form
      @submit="submitMusic"
      @reset="onReset"
      class="q-gutter-md"
      style="min-height: 500px"
    >
      <div class="text-h5 text-bold q-mb-xl q-pt-sm">音乐新增</div>
      <!-- <q-separator class="q-mb-md" /> -->

      <q-uploader
        label="Music"
        multiple
        class="shadowhover"
        ref="music_up"
        accept="audio/*"
        @added="(files) => (state.musics = files)"
        @removed="
          (files) =>
            (state.musics = state.musics.filter((a) => !files.includes(a)))
        "
      />
      <!-- 提交按钮 -->
      <div class="q-mt-lg">
        <q-btn
          label="Submit"
          flat
          type="submit"
          color="primary"
          class="shadowhover"
        />
        <q-btn
          label="Reset"
          flat
          type="reset"
          color="grey-13"
          class="q-ml-sm"
        />
      </div>
    </q-form>

    <!-- 删除音乐确认弹窗 -->
    <q-dialog v-model="state.del_confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >确认删除【 {{ state.del_music.title }} -
            {{ state.del_music.artist }}】？</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="grey" v-close-popup />
          <q-btn
            flat
            label="删除"
            color="primary"
            @click="deleteMusic(state.del_music.id)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { api } from 'boot/axios'

import { useQuasar } from 'quasar'
const $q = useQuasar()

const state = reactive({
  musics: null,
  music_list: [{}],
  count: 0,
  del_confirm: false,
  del_music: {} as any,
})

const music_columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row: { id: any }) => row.id,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'title',
    required: true,
    label: '歌名',
    align: 'left',
    field: (row: { title: any }) => row.title,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'artist',
    required: true,
    label: '歌手',
    align: 'left',
    field: (row: { title: any }) => row.title,
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
  rowsPerPage: 999,
}

// **初始化
const getData = () => {
  api.get('/api/music').then((response) => {
    state.music_list = response.data.results
    state.count = response.data.count
  })
}

onMounted(() => {
  getData()
})

// **删除音乐
const deleteMusic = (mid: number | undefined) => {
  api
    .delete('api/music/' + mid)
    .then((res) => {
      console.log(res.data)
      $q.notify('音乐 - 成功删除')
      onReset()
      setTimeout(() => {
        getData()
      }, 100)
    })
    .catch((err) => {
      $q.notify({
        message: '删除失败！ ' + err,
        color: 'red',
      })
    })
}
const delete_dialog = (del_music) => {
  state.del_confirm = true
  state.del_music = del_music
}

// **提交音乐
const submitMusic = (event: any) => {
  for (let i in state.musics) {
    const data = {
      music: state.musics[i],
    }
    api
      .post('api/music/', data)
      .then((res) => {
        console.log(res.data)
        $q.notify('音乐 - 成功添加')
        onReset()
        setTimeout(() => {
          getData()
        }, 100)
      })
      .catch((err) => {
        $q.notify({
          message: '添加失败！ ' + err,
          color: 'red',
        })
      })
  }
}

// **重置表单
const music_up = ref()
const onReset = () => {
  state.musics = null
  music_up.value.reset()
}
</script>

<style scoped lang="sass">
.q-table__card
  color: #304455
  background: none
  box-shadow: none
  border-radius: 0
</style>
