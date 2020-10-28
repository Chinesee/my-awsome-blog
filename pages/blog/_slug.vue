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
        >
          {{ types[type].text }}
        </div>
        <span
          title="本文作者"
          class="mr-4"
        >{{ author || '佚名' }}</span>
        <a
          v-if="from"
          rel="noopener noreferrer"
          title="文章来源"
          target="_blank"
          class="mr-4 primary opacity-75 cursor-pointer"
          :href="from_url"
        >{{ from }}</a>
        <div
          title="发布时间"
          class="text-gray-500"
        >
          {{ time }}
        </div>
      </div>

      <!-- 正文内容 -->
      <article>
        <component
          id="markdown-content"
          class="sm:w-full"
          :is="singlePostComponent"
        />
      </article>

      <!-- 导航目录 -->
      <div class="nav"></div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce'
import { IMG_SCROLL_VIEW } from '~/config'
import { getPosition } from "~/utils/dom"

const repeat = function (str, num) {
  return new Array(num + 1).join(str)
}
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
      },
    }
  },

  mounted() {
    // this.onScroll()
    this.setImgEvent()
    // this.generateTOC()

    this.$once('hook:beforeDestroy', function () {
      $(window).off('scroll.navScroll')
      $(window).off('scroll.imgScroll')
    })
  },

  methods: {
    // 给文章的所有图片加上预览事件
    setImgEvent() {
      const _this = this
      $('#markdown-content img').each(function () {
        $(this).on('click', function () {
          if ($(this).hasClass('zoom-in')) {
            _this.openImgPreview(this)
          } else {
            _this.closeImgPreview(this)
          }
        })
      })
    },

    openImgPreview(el) {
      $(el).removeClass('zoom-in')
      $(el).css('transform', '')
      $('.markdown-container:first').removeClass('bg-blur')
      $(window).off('scroll.imgScroll')
    },

    closeImgPreview(el) {
      $(el).addClass('zoom-in')
      $(el).css('transform', getPosition(el))
      $('.markdown-container:first').addClass('bg-blur')
      $(window).on(
        'scroll.imgScroll',
        { el, previousTop: $(window).scrollTop() },
        this.onImgScroll
      )
    },

    onScroll() {
      const _this = this
      $(window).on('scroll.navScroll', _debounce(function (e) {
        const { scrollTop } = e.target

        $('article h1, article h2, article h3').each(function () {
          const el = $(this)
          const offsetTop = el.offset().top
          if (offsetTop <= 50 && offsetTop >= -100) {
            const id = el.attr('id')
            _this.setNavActive(id)
            return false
          }
        })

        if (scrollTop >= 0 && scrollTop <= 200) {
          $('nav a.active').removeClass('active')
        }
      }, 250))
    },

    onImgScroll(e) {
      const scrollTop = $(window).scrollTop()

      // 如果图片滚动距离超过规定范围，则关闭图片预览
      const abs = Math.abs(scrollTop - e.data.previousTop)
      if (abs > IMG_SCROLL_VIEW) {
        this.openImgPreview(e.data.el)
      }
    },

    // 为文章生成导航目录
    generateTOC() {
      const _this = this

      let toc = `<nav role='navigation' class='table-of-contents'><ul>`

      var newLine, el, title, link, level, baseLevel

      $('article h1, article h2, article h3').each(function (idx) {
        const id = `heading-${idx}`
        el = $(this)
        el.attr('id', id)
        title = el.text()
        link = `#${id}`

        const prevLevel = level || 0
        level = this.nodeName.substr(1)
        if (!baseLevel) {
          baseLevel = level
        }

        if (prevLevel === 0) {
          newLine = '<li>'
        } else if (level === prevLevel) {
          newLine = '</li><li>'
        } else if (level > prevLevel) {
          newLine = repeat('<ul><li>', level - prevLevel)
        } else if (level < prevLevel) {
          newLine = `${repeat('</li></ul>', prevLevel - level)}</li><li>`
        }
        newLine = `${newLine}<a data-id='${link}'>${title}</a>`

        toc += newLine
      })

      toc += `${repeat('</li></ul>', level - baseLevel)}</li></ul></nav>`

      $('.nav').prepend(toc)

      $('nav a').click(function (e) {
        const { id } = e.target.dataset
        document.querySelector(id).scrollIntoView({
          behavior: 'smooth'
        })
        _this.setNavActive(id)
      })
    },

    setNavActive(id) {
      $('nav a.active').removeClass('active')
      $(`nav a[data-id='#${id}']`).addClass('active')
    },
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

article {
  padding-top: 2rem;

  h1,
  h2,
  h3 {
    &::before {
      content: "";
      height: 1rem;
      margin-top: -1rem;
      display: block;
    }
    &:target {
      animation: highlight 2s ease;
    }
  }

  @keyframes highlight {
    from {
      background: $primary;
      color: $primary;
    }
    to {
      color: inherit;
    }
  }
}

$indent: 12px;
$dot-space: 2rem;

$level1-size: 8px;
$level2-size: 6px;
$level3-size: 4px;
$level1-color: #7184a4;
$level2-color: $primary;
$level3-color: $primary;

.nav {
  @apply fixed text-sm text-gray-600;
  top: 150px;
  right: 100px;
  width: 220px;
  li {
    padding: 0 0.5rem;
  }
  a {
    @include text-overflow;
    @apply mb-1 py-1 pr-1 block rounded cursor-pointer;
    position: relative;
    padding-left: $dot-space;
    transition: $transition;

    &::before {
      content: "";
      position: absolute;
      left: 0.5rem;
      top: 50%;
      border-radius: 50%;
      background: $level1-color;
      transform: translateY(-50%);
    }

    &.active {
      background: rgba(var(--ns-primary), 0.05);
      color: rgba(var(--ns-primary), 0.8);
      &::before {
        background: rgba(var(--ns-primary), 0.8);
      }
    }
  }
  nav > ul {
    position: relative;
    & > li {
      & > a {
        font-weight: bold;
        &::before {
          width: $level1-size;
          height: $level1-size;
        }
      }

      & > ul {
        padding-left: $indent;
        & > li {
          & > a {
            &::before {
              width: $level2-size;
              height: $level2-size;
            }
          }

          & > ul {
            padding-left: $indent;
            & > li {
              & > a {
                &::before {
                  width: $level3-size;
                  height: $level3-size;
                }
              }
            }
          }
        }
      }
    }

    &::before {
      @apply bg-gray-300;
      content: "";
      position: absolute;
      top: 50%;
      left: 20px;
      width: 2px;
      height: calc(100% - 18px);
      transform: translateY(-50%);
      opacity: 0.35;
    }
  }
}
</style>
