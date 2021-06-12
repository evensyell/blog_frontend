<template>
  <q-page class="row justify-center">
    <q-img
      src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/about.jpg"
      style="height: 44vh; width: 100vd; opacity: 0.85"
    />

    <!-- 容器 -->
    <div
      class="
        col-xs-12 col-sm-12 col-md-9 col-lg-8 col-xl-7
        q-px-md
        ztop2
        justify-center
      "
      style="margin: -30px 0 0 0"
    >
      <!-- 标题 -->
      <div class="shadowonly bg-white text-center q-pa-md q-mb-md">
        <div class="text-h5 text-bold text-blue-grey-8">关于本站</div>
      </div>

      <!-- 内容块 -->
      <div class="row">
        <!-- 左侧 -->

        <!-- 欢迎语 -->
        <div class="col-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
          <div class="shadowonly text-grey text-center bg-white q-pa-md">
            欢迎来到
            <p class="text-bold text-h5 text-primary">Evensyell's blog</p>
            <p class="q-pa-sm text-bold">
              「那石上，不是空身无物，分明有溪流，有风有云，亦有花枝藤海。但石不动，洒洒天地，自有心中日月；石不语，空山寂静，水自流，云自飘，花自绰约，藤自窈窕。」
            </p>
            <p>繁复的生活里，愿你我皆能自在欣现</p>
          </div>

          <!-- 聊天框 -->
          <div class="shadowonly bg-white q-pa-md q-mt-lg">
            <div class="text-center text-bold">Evensyell</div>
            <div class="text-center text-sbtitle2 q-mb-lg">
              <span class="text-green-12 q-pr-xs">●</span>在线
            </div>
            <q-chat-message
              class="q-my-md"
              avatar="img\avatar.png"
              :text="['你好，欢迎来此！']"
              text-color="white"
              bg-color="primary"
            />
            <q-chat-message
              class="q-mb-lg q-pb-none cursor-pointer"
              :text="['你是谁? 是怎样的一个人？']"
              sent
              bg-color="amber-5"
              @click="state.a1 = true"
            />

            <q-chat-message
              v-show="state.a1"
              avatar="img\avatar.png"
              :text="[
                '一名心理学学习者，自学了网络编程技术的皮毛',
                '除开专业之外，特别喜爱的有计算机、科幻、日语、动物和“故事”',
                '我是一个倾向于亲近这些要素的人',
              ]"
              text-color="white"
              bg-color="primary"
              transition-show="scale"
            />
            <q-chat-message
              v-show="state.a1"
              class="q-mb-lg q-pb-none cursor-pointer"
              :text="['Evensyell 这个 ID 是什么来头？']"
              sent
              bg-color="amber-5"
              @click="state.a2 = true"
            />
            <q-chat-message
              v-show="state.a2"
              avatar="img\avatar.png"
              :text="[
                'Evens 来自三体，yell 形同冰菓',
                '最重要的是，我极其欣赏 Evensyell 这个字符串本身的工整美',
              ]"
              text-color="white"
              bg-color="primary"
            />
            <q-chat-message
              v-show="state.a2"
              class="q-mb-lg q-pb-none cursor-pointer"
              :text="['你打算在这个网站里做些什么？']"
              sent
              bg-color="amber-5"
              @click="state.a3 = true"
            />
            <q-chat-message
              v-show="state.a3"
              avatar="img\avatar.png"
              :text="[
                '初心只是想要做个简单的个人网站看看，实践一下自学的成果罢了，没有什么雄图霸业的设想',
                '我还需要在与年龄的的对话中逐渐给这个网站下些定义，总结来说就是一时狂热的产物，前路未卜，因而也一切皆有可能',
              ]"
              text-color="white"
              bg-color="primary"
            />
            <q-chat-message
              v-show="state.a3"
              class="q-mb-lg q-pb-none cursor-pointer"
              :text="['噢...']"
              sent
              bg-color="amber-5"
              @click="state.a4 = true"
            />
            <q-chat-message
              v-show="state.a4"
              avatar="img\avatar.png"
              :text="[
                '右上角的音乐按钮可以打开一个简单的播放器，都是不扰民的纯音乐，要不要听听看？',
                '然后，请随意探索  (✿◠‿◠)',
              ]"
              text-color="white"
              bg-color="primary"
            />
          </div>
        </div>

        <!-- 右侧 -->
        <div class="col-xs-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
          <div class="shadowonly text-grey text-center bg-white">
            <q-img
              class="shadowonly"
              src="https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/about.jpg"
            ></q-img>
          </div>
          <!-- 更新日志 -->
          <div class="shadowonly flex text-body1 bg-white q-pa-xs q-mt-lg">
            <!-- 角标标签 -->
            <q-chip
              square
              size="xs"
              color="grey-3"
              class="relative-top-left q-ma-xs"
              style="cursor: default"
            >
              <q-avatar
                icon="bubble_chart"
                color="primary"
                text-color="white"
              />Release Note
              <chip-tip tip="更新日志" />
            </q-chip>
            <!-- 日志正文 -->
            <q-timeline
              class="q-py-sm q-px-lg"
              layout="dense"
              color="secondary"
            >
              <q-timeline-entry
                v-for="(note, index) in state.notes"
                :subtitle="note.date"
                class="text-blue-grey-8"
              >
                <template v-slot:title>
                  <p class="text-bold text-blue-grey-7">{{ note.title }}</p>
                </template>

                <template v-slot>
                  <p
                    v-for="(body, index) in note.bodys"
                    class="text-blue-grey-7"
                    style="display: block"
                  >
                    <span class="text-bold text-orange">—</span> {{ body }}
                  </p>
                </template>
              </q-timeline-entry>
            </q-timeline>
            <a
              class="q-px-xs text-blue-grey-12"
              href="https://evensyell.github.io"
              >附：基于 Hexo + Github Pages的初版站点</a
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ChipTip from 'components/common/ChipTip.vue'
import { reactive } from 'vue'

const state = reactive({
  a1: false,
  a2: false,
  a3: false,
  a4: false,
  notes: [
    {
      title: '赴生者的少年意气',
      date: '2021.6',
      bodys: [
        'Vue3 的发布扬起我的热情 —— 我总是为进步的东西痴狂，恰巧服务器的杂乱迫亟待整理，借重置服务器的机会我下定决心要把网站做的更好；',
        '也开始留心 UI 和 UX，整体风格开始统一；',
        '最后用户系统的补完也让我也有了将其分享出去的理由，也许这会是一个值得打上标记的转折点。',
      ],
    },
    {
      title: '搁置后的回头一瞥',
      date: '2020.9',
      bodys: [
        '也许是酝酿效应，当顺利毕业工作稳定之后再来看半年前写的玩意，实在惊讶我居然写了那么多繁复纠缠的垃圾代码；',
        '从那时起真正重视代码的复用和组织，当后台管理系统登场之后，它终于算得上合格。',
      ],
    },
    {
      title: '热情下的全新构建',
      date: '2020.3',
      bodys: [
        '疫情在家不写论文写网站，那是一段焦虑转化创造力的任性的好时光；',
        '通过学习前后端技术写出了这个网站的雏形，当时的模样要简陋得多，热情熄灭的也快，也没有和几个人分享。',
      ],
    },
    {
      title: '懵懂中的初次尝试',
      date: '2019.4',
      bodys: [
        '第一版以 Hexo 博客框架 + Github Pages 的方式构建，简单、快速、足够好,但不够自由；',
        '诸如配色、响应式效果等内容沿用至今；',
        '已弃用，不过 Github 还在免费托管，有空可以去怀旧。',
      ],
    },
  ],
})
</script>

<style scoped lang="sass">
.slide-fade-enter-active
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1)

.slide-fade-leave-active
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1)

.slide-fade-enter,
.slide-fade-leave-to
  transform: translateX(10px)
  opacity: 0
</style>
