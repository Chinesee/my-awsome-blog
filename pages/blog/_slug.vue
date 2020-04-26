<template>
  <div class="markdown-container">
    <div class="markdown-wrapper">
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
    
    return {
      title: attr.title,
      year: attr.year,
      description: attr.description,
      extraComponent: attr.extraComponent,
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
  @apply px-5 py-6;
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
