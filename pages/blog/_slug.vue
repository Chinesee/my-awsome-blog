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
import { getPosition, getImgScale } from "~/util/dom.js"

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
      title: this.title
    }
  },

  mounted() {
    const wrapper = document.getElementsByClassName('markdown-container')[0]
    const imgs = document.getElementById('markdown-content').getElementsByTagName('img')
    if (imgs.length > 0) {
      for(let i = 0; i < imgs.length; i += 1) {
        imgs[i].onclick = (e) => {
          const { target } = e
          const { idx } = target.dataset

          const el = imgs[idx]
          const zoomIn = imgs[idx].classList.contains('zoom-in')

          if (zoomIn) {
            el.style.cssText = ''
            el.classList.add('zoom-out')
            el.classList.remove('zoom-in')
            wrapper.classList.remove('bg-blur')
          } else if (imgs[idx].classList.contains('zoom-out') || !zoomIn) {
            el.style.cssText = getPosition(el)
            el.classList.add('zoom-in')
            el.classList.remove('zoom-out')
            wrapper.classList.add('bg-blur')
          }
        }
        imgs[i].dataset.idx = i
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
    backdrop-filter: saturate(180%) blur(5px);
  }
}

.markdown-wrapper {
  @apply px-5 py-6;
  max-width: 1000px;

  img {
    @apply cursor-pointer;
    transition: transform 300ms cubic-bezier(0.2, 0, 0.2, 1);
    &.zoom-in {
      @apply relative z-50;
    }
    &.zoom-out {
      // transform: scale(1) translate(-1.15971px, -45.7577px);
    }
  }
}
</style>
