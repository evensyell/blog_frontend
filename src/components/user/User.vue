<template>
  <q-avatar size="34px" class="avatar cursor-pointer q-px-xs">
    <q-img
      v-if="store_uid"
      :src="userpro.avatar || 'img/akari.jpg'"
      :ratio="1"
      class="clear"
      :img-style="{ width: '34px', height: '34px' }"
    >
      <chip-tip :tip="userpro.nickname || '登录/注册'" :offset="[0, 20]" />
    </q-img>
    <q-img
      v-else
      src="img/akari.jpg"
      :img-style="{ width: '2em', height: '2em' }"
    >
      <chip-tip tip="登录/注册" :offset="[0, 20]" />
    </q-img>

    <q-menu
      v-model="state.is_user_menu"
      :offset="[20, 1]"
      content-style="width:100px"
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <q-list v-if="$store.getters.isLogged">
        <q-item clickable v-close-popup @click="state.is_profile_dialog = true">
          <q-item-section>个人资料</q-item-section>
        </q-item>

        <!--  -->
        <q-item
          clickable
          v-close-popup
          @click="$router.push('/admin')"
          v-if="userpro.is_superuser"
        >
          <q-item-section>后台管理</q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="logOut">
          <q-item-section>退出登录</q-item-section>
        </q-item>
      </q-list>
      <q-list v-else>
        <q-item clickable v-close-popup @click="state.is_login_dialog = true">
          <q-item-section>登录</q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="state.is_register_dialog = true"
        >
          <q-item-section>注册</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <!-- 登录弹窗 -->
    <q-dialog v-model="state.is_login_dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="q-pb-none">
          <div
            class="text-h5 text-bold text-grey-blue text-center"
            @click="state.is_allow_to_edit_pwd = true"
          >
            登录
          </div>
        </q-card-section>

        <q-form @submit="logIn">
          <q-card-section class="q-pt-none">
            <q-input
              class="q-pt-sm"
              v-model="state.username"
              style="min-width: 320px"
              label="用户名"
              stack-label
              clearable
              rounded
              debounce="500"
              clear-icon="close"
              lazy-rules
            />
            <q-input
              class="q-pt-sm"
              v-model="state.password"
              :disable="!state.is_allow_to_edit_pwd"
              type="password"
              style="min-width: 320px"
              stack-label
              label="密码"
              clearable
              rounded
              debounce="500"
              clear-icon="close"
              lazy-rules
            />
            <q-icon name="mood" color="green-6" class="q-pr-xs" />
            <span class="text-subtitle2 text-green-6"
              >“用户名”为私密的唯一登录凭证，注意其与“昵称”的区别</span
            >
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              id="login_cancel_btn"
              flat
              label="取消"
              color="grey-13"
              v-close-popup
            />
            <q-btn type="submit" flat label="登录" class="shadowhover" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- 注册弹窗 -->
    <q-dialog v-model="state.is_register_dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="q-pb-none">
          <div
            class="text-h5 text-bold text-grey-blue text-center"
            @click="state.is_allow_to_edit_pwd = true"
          >
            注册
          </div>
        </q-card-section>
        <q-form @submit="register">
          <q-card-section class="q-pt-none">
            <q-input
              class="q-pt-sm"
              v-model="state.username"
              style="min-width: 320px"
              label="用户名"
              stack-label
              clearable
              rounded
              maxlength="20"
              @keyup="state.username = state.username.replace(/[^\w\/]/gi, '')"
              debounce="500"
              clear-icon="close"
              lazy-rules
            />
            <q-input
              class="q-pt-sm"
              v-model="state.password"
              :disable="!state.is_allow_to_edit_pwd"
              type="password"
              style="min-width: 320px"
              stack-label
              label="密码"
              clearable
              rounded
              debounce="500"
              clear-icon="close"
              lazy-rules
            />
            <q-icon name="mood" color="green-6" class="q-pr-xs" />
            <span class="text-subtitle2 text-green-6"
              >“用户名”为私密的唯一登录凭证，注意其与“昵称”的区别</span
            >
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="取消" color="grey-13" v-close-popup />
            <q-btn
              flat
              label="注册"
              type="submit"
              class="shadowhover"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- 编辑个人资料弹窗 -->
    <q-dialog
      v-model="state.is_profile_dialog"
      @hide="state.is_edit_expansion = false"
    >
      <q-card style="width: 320px">
        <!-- <q-card-section class="q-pb-md">
          <div class="text-h5 text-bold text-grey-blue text-center">个人资料</div>
        </q-card-section>-->
        <q-card-section class="q-pb-md q-pt-lg text-center">
          <q-img
            v-if="userpro.avatar !== null"
            :src="userpro.avatar || 'img/akari.jpg'"
            style="width: 150px; height: 150px; border-radius: 50%"
          />

          <q-img
            v-else
            src="img/akari.jpg"
            ratio="1"
            style="width: 150px; height: 150px; border-radius: 50%"
          />
          <div class="text-h5 text-bold text-center q-pt-md">
            {{ userpro.nickname ? userpro.nickname : '友人A' }}
            <chip-tip tip="昵称"></chip-tip>
          </div>
          <div class="text-subtitle2 text-blue-grey-12 text-center">
            # {{ userpro.username }}
            <chip-tip tip="用户名"></chip-tip>
          </div>
        </q-card-section>
        <!-- 修改个人资料 -->
        <q-expansion-item
          dense
          v-model="state.is_edit_expansion"
          icon="edit"
          label="更改资料"
        >
          <q-card-section
            class="q-pt-none q-pb-xs text-center row justify-center"
          >
            <q-uploader
              v-model="edit.avatar"
              flat
              no-warps
              color="white"
              label="选择图片"
              class="uploader col-12 q-ma-xs q-mt-md"
              accept="image/*"
              @added="(files) => (edit.avatar = files[0])"
              @removed="() => (edit.avatar = null)"
            >
              <!-- header插槽 -->
              <template v-slot:header="scope">
                <div
                  v-if="scope.canAddFiles"
                  no-warps
                  id="upload_header"
                  class="column items-center justify-center q-pa-sm"
                  clickable
                >
                  <q-icon name="add_box" size="lg" color="primary" />
                  <span class="text-subtitle text-bold text-primary q-pt-xs"
                    >上传新头像</span
                  >
                  <q-uploader-add-trigger class="q-mb-xs" />
                </div>
              </template>
              <!-- 文件插槽 -->
              <template v-slot:list="scope" no-warps>
                <div v-for="file in scope.files">
                  <q-img :src="file.__img.src" ratio="1" class="uploader_file">
                    <q-btn
                      size="12px"
                      color="grey-4"
                      class="absolute-top-right z-top"
                      round
                      flat
                      text-color="white"
                      unelevated
                      icon="clear"
                      @click="scope.removeFile(file)"
                    />
                  </q-img>
                </div>
              </template>
            </q-uploader>
            <div class="col-12">
              <q-icon name="mood" color="green-6" class="q-pr-xs" />
              <span class="text-subtitle2 text-grey-6"
                >上传图片以1:1比例为佳</span
              >
            </div>
            <q-input
              class="q-pt-sm col-12"
              v-model="edit.nickname"
              style="width: 150px"
              label="新的昵称："
              clearable
              rounded
              debounce="500"
              clear-icon="close"
              lazy-rules
            />

            <!-- <q-input
            class="q-pt-sm"
            v-model="state.username"
            stack-label
            style="min-width:320px"
            label="用户名 (非公开 | 唯一身份标识、登录凭证)"
            clearable
            rounded
            debounce="500"
            clear-icon="close"
            lazy-rules
            />-->
            <q-card-actions
              align="right"
              class="text-primary q-pt-sm q-pb-none q-px-none col-12"
            >
              <q-btn flat label="取消" color="grey-13" v-close-popup />
              <q-btn
                flat
                label="更新"
                class="shadowhover"
                v-close-popup
                @click="putUserpro"
              />
            </q-card-actions>
          </q-card-section>
        </q-expansion-item>
      </q-card>
    </q-dialog>
  </q-avatar>
</template>

<script setup lang="ts">
import ChipTip from 'components/common/ChipTip.vue'

import { reactive, onMounted, computed } from 'vue'
import { useStore } from 'src/store/index'
import { useRouter } from 'vue-router'
const $store = useStore()
const $router = useRouter()

import { api } from 'boot/axios'

import { useQuasar } from 'quasar'
const $q = useQuasar()

const state = reactive({
  is_register_dialog: false,
  is_login_dialog: false,
  is_profile_dialog: false,
  is_user_menu: false,
  is_allow_to_edit_pwd: false,
  is_edit_expansion: false,
  username: '',
  password: '', //不能注释掉，自动填充密码要用
})
const userpro = reactive({} as any)
const edit = reactive({
  avatar: null,
  nickname: '',
})

onMounted(() => {
  getData()
})

// const store_username = computed(() => $store.getters.getUsername)
const store_uid = computed(() => $store.getters.getUid)

const getData = () => {
  if (store_uid.value) {
    api('/api/userpro/' + store_uid.value).then((res) => {
      const userpro_data = res.data
      for (let key in userpro_data) {
        userpro[key] = userpro_data[key]
      }
    })
  }
}

const logIn = () => {
  let data = {
    username: state.username,
    password: state.password,
  }
  if (data.password == '') {
    data.password = 'qingxi2158'
  }
  api
    .post('/api/token/', data)
    .then((response) => {
      $store.commit('setTokens', {
        access: response.data.access,
        refresh: response.data.refresh,
      })
      $store.commit('setUsername', data.username)
      api.get('/api/userpro?user__username=' + data.username).then((res) => {
        console.log(res.data)
        $store.commit('setUid', res.data.results[0].user)
        document.getElementById('login_cancel_btn').click()
        $q.notify('登录成功！')
        getData()
      })
    })
    .catch((err) => {
      $q.notify({
        message: '登录失败！用户名输入有误！',
        color: 'red',
      })
    })
}

const logOut = () => {
  $store.dispatch('logout')
  $q.notify('退出登录！')
  for (let key in userpro) {
    userpro[key] = null
  }
}

const register = () => {
  let data = {
    username: state.username,
    password: state.password,
  }
  if (data.password == '') {
    data.password = 'qingxi2158'
  }
  api
    .post('/api-register/', data)
    .then((res) => {
      if (res.data.code == 'ok') {
        $q.notify('注册成功！正在自动登入，请牢记用户名！')
        logIn()
      } else {
        $q.notify({
          message: '注册失败！该用户名已存在！',
          color: 'red',
        })
      }
    })
    .catch((err) => {
      $q.notify({
        message: '注册失败！',
        color: 'red',
      })
    })
}

const putUserpro = () => {
  let data: any = { user: store_uid.value }
  if (edit.avatar) {
    data.avatar = edit.avatar
  }
  if (edit.nickname && edit.nickname != userpro.nickname) {
    data.nickname = edit.nickname
  }
  api
    .put('api/userpro/' + store_uid.value.toString(), data)
    .then((res) => {
      $q.notify('修改成功！')
      getData()
      state.is_profile_dialog = false
    })
    .catch((err) => {
      $q.notify({
        message: '修改失败！',
        color: 'red',
      })
    })
}
</script>

<style lang="sass" scoped>
.avatar
  transition: 0.2s ease-out

  &:hover
    // margin-bottom: -42px
    padding-top: 12px
    transform: scale(1.5)
    transition: 0.1s ease-in

.uploader
  width: 150px
  height: 150px
  border-radius: 50%

.uploader_file
  width: 134px
  height: 134px
  border-radius: 50%

#upload_header
  width: 150px
  height: 150px
  border-radius: 50% !important
  border: dashed #eee 3.5px

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    border-radius: 50%
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3)
    opacity: 0
    border: solid 3.5px

  &::after
    // box-shadow 0 2px 4px rgba(0, 0, 0, 0.3)
    // border-radius 20px
    // border 0

  &:hover::before
    opacity: 1

  &:hover::after
    opacity: 0
</style>
