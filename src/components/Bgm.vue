<template>
  <div class="q-ml-sm">
    <q-btn
      flat
      round
      icon="music_note"
      @click="bgmClick"
      :id="state.styleid"
    >
      <chip-tip tip="BGM"></chip-tip>
    </q-btn>

    <!-- H5-audio标签 -->
    <audio
      :src="state.music.music"
      :loop="state.is_loop"
      ref="music_player"
      @onPause="state.is_onplay = false"
    />

    <!-- 弹出音乐控制窗口 -->
    <q-dialog v-model="state.showmusic" seamless position="right">
      <q-card class="bgm_dialog" style="width: 350px">
        <q-linear-progress :value="state.music_process" color="pink" />

        <q-card-section class="row items-center no-wrap q-pr-xs q-gutter-xs">
          <div>
            <div class="text-bold text-subtitle2 ellipsis">
              {{ state.music.title }}
            </div>
            <div class="text-grey text-subtitle2 ellipsis">
              {{ state.music.artist }}
            </div>
          </div>

          <q-space />
          <q-btn
            round
            flat
            size="sm"
            class="q-ml-sm"
            :text-color="state.repeat_color"
            icon="repeat_one"
            @click="repeatChange"
          >
            <chip-tip tip="单曲循环" />
          </q-btn>
          <!-- 播放/暂停 -->
          <q-btn
            round
            color="pink"
            class="q-ma-xs"
            :icon="state.is_onplay ? 'pause' : 'play_arrow'"
            @click="playOrPause"
          />

          <q-btn
            round
            flat
            size="sm"
            class="q-ml-sm"
            icon="skip_next"
            @click="nextMusic"
          >
            <chip-tip tip="下一首" />
          </q-btn>
          <q-btn flat round size="md" icon="close" v-close-popup>
            <chip-tip tip="收起" />
          </q-btn>
          <!-- <q-slider v-model="volume" :min="0" :max="1" :step="0.1" /> -->
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import ChipTip from 'components/common/ChipTip.vue'
import { ref, reactive } from 'vue'
import { api } from 'boot/axios'

const state = reactive({
  showmusic: false,
  is_onplay: false,
  is_loop: false,
  repeat_color: 'grey-13',
  music_process: 0,
  music: { id: 0, artist: 'Artist', title: 'Title', music: '' },
  musics: [{ id: 0, artist: 'Artist', title: 'Title', music: '' }],
  count: 1,
  styleid: '',
})

// **开关播放器面板
const bgmClick = () => {
  state.showmusic = !state.showmusic

  if (state.music.title == 'Title') {
    api.get('/api/music').then((response) => {
      state.musics = response.data.results
      state.count = response.data.count
      state.music = response.data.results[0]
      console.log('获取到BGM数量:' + state.count)
    })
  }
}

// **播放控制
const music_player = ref()
const changeProgress = (): void => {
  const bgm = music_player.value
  const timer = setInterval((): void => {
    const numbers = bgm.currentTime / bgm.duration
    state.music_process = numbers
    if (numbers >= 1) {
      bgm.currentTime = 0
      state.music_process = 0
      // playOrPause()
      nextMusic()
      clearInterval(timer)
    }
  }, 30)
}

// **点击事件
const playOrPause = () => {
  state.is_onplay = !state.is_onplay
  if (state.is_onplay === true) {
    music_player.value.volume = 0.6
    music_player.value.play()
    changeProgress()
    state.styleid = 'myrotation'
  } else {
    music_player.value.pause()
    state.styleid = ''
  }
}
const repeatChange = () => {
  if (state.repeat_color == 'grey-13') {
    state.repeat_color = 'pink'
    state.is_loop = true
  } else {
    state.repeat_color = 'grey-13'
    state.is_loop = false
  }
}
const nextMusic = () => {
  if (state.music.id === state.musics[state.count - 1].id) {
    state.music = state.musics[0]
  } else {
    let mid = state.musics.indexOf(state.music) + 1
    state.music = state.musics[mid]
  }
  music_player.value.load()
  const time = setTimeout(() => {
    if (state.is_onplay) {
      music_player.value.play()
    } else {
      playOrPause()
      clearTimeout(time)
    }
  }, 100)
}
</script>

<style scoped lang="sass">
.bgm_dialog
  border-top-left-radius: 0px
  border-bottom-left-radius: 3px
</style>
