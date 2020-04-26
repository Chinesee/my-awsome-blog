<template>
  <div class="markdown-container">
    <div class="markdown-wrapper">
      <h1 class="mt-3 mb-4 text-4xl text-gray-700 font-bold">{{ title }}</h1>
      <div class="mb-4 flex items-center cursor-default">
        <div
          class="mr-4 px-2 py-1 rounded-md text-sm"
          :class="types[type].classObj"
        >{{ types[type].text }}</div>
        <span
          title="本文作者"
          class="mr-4"
        >{{ author }}</span>
        <div
          title="发布时间"
          class="text-gray-500"
        >{{ time }}</div>
      </div>
      <p class="mb-6 text-gray-600">
        {{ description }}
      </p>
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
    const { title, author, time, description, type } = attr
    
    return {
      title,
      author,
      time,
      description,
      type,
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
      }
    }
  },

  mounted() {
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

  beforeDestroy() {
    this.scrollArea.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll({ target: { scrollTop } }) {
      const { img, wrapper, scrollArea, scrollAreaTop } = this
      const abs = Math.abs(scrollTop - scrollAreaTop)
      console.log('scroll')
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
  max-width: 1000px;

  img {
    @apply cursor-pointer;
    transform-origin: 50% 50%;
    transition: transform 300ms cubic-bezier(0.2, 0, 0.2, 1);
    &.zoom-in {
      @apply relative z-50;
    }
  }
}
</style>
