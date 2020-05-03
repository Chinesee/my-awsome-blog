<template>
  <div class="markdown-container">
    <div class="markdown-wrapper">
      <!-- 文章标题 -->
      <h1 class="mt-3 mb-4 text-4xl text-gray-800 font-bold">{{ title }}</h1>

      <!-- 文章信息 -->
      <div class="mb-4 flex items-center cursor-default">
        <div
          v-if="types[type]"
          class="w-12 h-6 mr-4 flex justify-center items-center rounded-md text-sm select-none"
          :class="types[type].classObj"
        >{{ types[type].text }}</div>
        <span
          title="本文作者"
          class="mr-4"
        >{{ author || '佚名' }}</span>
        <a
          v-if="from"
          title="文章来源"
          target="_blank"
          class="mr-4 primary opacity-75 cursor-pointer"
          :href="from_url"
        >{{ from }}</a>
        <div
          title="发布时间"
          class="text-gray-500"
        >{{ time }}</div>
      </div>

      <!-- 文章描述 -->
      <p
        v-if="description"
        class="mb-6 text-gray-600"
      >
        {{ description }}
      </p>

      <!-- 正文内容 -->
      <component
        id="markdown-content"
        class="sm:w-full"
        :is="singlePostComponent"
      />
    </div>
  </div>
</template>

<script>
import head from '~/mixins/head'
import { IMG_SCROLL_VIEW } from '~/config/config'
import { getPosition } from "~/util/dom"

export default {
  async asyncData({ params }) {
    const content = await import(`~/${process.env.blogRoot}/${params.slug}.md`)
    const { attributes: attr } = content
    const { title, author, from, from_url, time, description, type } = attr
    
    return {
      title, author, from, from_url, time, description, type,
      singlePostComponent: content.vue.component,
    }
  },

  head() {
    return {
      title: this.title,
      scrollAreaTop: null,

      img: null,
      wrapper: null,
      scrollArea: null,
    }
  },

  data() {
    return {
      types: {
        original: {
          text: '原创',
          classObj: ['bg-primary', 'text-white'],
        },
        reprint: { 
          text: '转载',
          classObj: ['bg-gray-200', 'text-gray-600'],
        },
        translate: { 
          text: '翻译',
          classObj: ['bg-success', 'text-white'],
        },
        undefined: { 
          text: '文章',
          classObj: ['bg-gray-200', 'text-gray-600'],
        },
      }
    }
  },

  mounted() {
    this.injectEventOnImg()
  },

  beforeDestroy() {
    this.scrollArea.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    injectEventOnImg() {
      this.wrapper = document.getElementsByClassName('markdown-container')[0]
      this.scrollArea = document.getElementsByClassName('scroll-area')[0]

      const imgs = document.getElementById('markdown-content').getElementsByTagName('img')

      if (imgs.length > 0) {
        for(let i = 0; i < imgs.length; i += 1) {
          imgs[i].onclick = (e) => {
            const { target } = e
            const { idx } = target.dataset

            this.img = imgs[idx]
            const { img: el, wrapper, scrollArea } = this

            if (imgs[idx].classList.contains('zoom-in')) {
              el.style.cssText = ''
              el.classList.remove('zoom-in')
              wrapper.classList.remove('bg-blur')
              scrollArea.removeEventListener('scroll', this.onScroll)
              this.scrollAreaTop = null
            } else {
              el.style.cssText = getPosition(el)
              el.classList.add('zoom-in')
              wrapper.classList.add('bg-blur')
              scrollArea.addEventListener('scroll', this.onScroll)
              this.scrollAreaTop = scrollArea.scrollTop
            }
          }
          imgs[i].dataset.idx = i
        }
      }
    },

    onScroll({ target: { scrollTop } }) {
      const { img, wrapper, scrollArea, scrollAreaTop } = this

      // 如果图片滚动距离超过规定范围，则关闭图片预览
      const abs = Math.abs(scrollTop - scrollAreaTop)
      if (abs > IMG_SCROLL_VIEW) {
        img.style.cssText = ''
        img.classList.add('zoom-out')
        img.classList.remove('zoom-in')
        wrapper.classList.remove('bg-blur')
        scrollArea.removeEventListener('scroll', this.onScroll)
      }
    }
  },
}
</script>

<style lang="scss">
.markdown-container {
  @apply relative w-full flex flex-col items-center;
  &.bg-blur::after {
    @apply absolute top-0 left-0 z-10 w-full h-full;
    content: "";
    background: rgba(255, 255, 255, 0.8);
    background-color: hsla(0, 0%, 100%, 0.8);
    backdrop-filter: saturate(180%) blur(3px);
    transition: $transition;
  }
}

.markdown-wrapper {
  @apply px-5 py-10;
  max-width: $article-content-width;

  img {
    @apply cursor-pointer;
    transform-origin: 50% 50%;
    transition: transform 300ms cubic-bezier(0.2, 0, 0.2, 1);
    &.zoom-in {
      @apply relative z-50;
    }
  }
}

#markdown-content {
  padding-top: 2rem;
}
</style>
