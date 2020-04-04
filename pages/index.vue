<template>
  <div class="index pt-6 px-5">
    <div>
      <div class="py-10 flex justify-center items-center">
        <div class="md:mr-20 flex flex-col justify-center xs:items-center sm:items-start">
          <p class="text-gray-700 xs:text-xl sm:text-2xl md:text-3xl font-bold xs:text-center sm:text-left whitespace-pre-line">
            生命相承，殊途同归
            世事变幻，但时间从不作答
          </p>
          <p class="mt-4 mb-10 text-gray-600 text-sm xs:text-center sm:text-left sm:whitespace-pre-line">
            朽骨已在掩埋的宅邸中躺了多久，但纪念碑将于此山谷中永垂不朽。
            孤勇之后，世界尽在眼前。
          </p>
          <div>
            <ns-button @click="$router.push('/creations')">查看我的作品</ns-button>
          </div>
        </div>
        <img
          class="cover"
          src="https://gitee.com/chinesee/images/raw/master/img/img_029.png"
          alt="首页图片"
        >
      </div>

      <div class="flex xs:flex-col sm:flex-row justify-center items-center select-none">
        <div
          v-for="({ comp, title, desc, link }, i) in logos"
          :key="i"
          class="mx-12 xs:mb-4 md:mb-0 flex items-center"
        >
          <component
            :is="comp"
            class="xs:w-8 sm:w-12 mr-4"
          ></component>
          <div>
            <p class="mb-1 xs:text-sm sm:text-lg text-gray-600 font-bold ">
              <a
                target="_blank"
                :href="link"
              >{{ title }}</a>
            </p>
            <p class="w-40 text-xs text-gray-500">{{ desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoNuxt from '~/components/logo/LogoNuxt.vue'
import LogoNetlify from '~/components/logo/LogoNetlify.vue'
import LogoGitee from '~/components/logo/LogoGitee.vue'

const logos = [
  {
    comp: 'LogoNuxt',
    title: '由Nuxt提供技术支持',
    desc: '本博客使用了 Nuxt 框架生成静态页面',
    link: 'https://zh.nuxtjs.org/guide',
  },
  {
    comp: 'LogoNetlify',
    title: '部署于Netlify',
    desc: '优秀的内容管理网站，能实现网页快速部署',
    link: 'https://www.netlify.com/',
  },
  {
    comp: 'LogoGitee',
    title: '源码已开源',
    desc: '所有代码已托管至码云仓库，欢迎交流学习',
    link: 'https://gitee.com/chinesee/blog-nuxt',
  },
]

export default {
  components: { LogoNuxt, LogoNetlify, LogoGitee },

  asyncData() {
    const resolve = require.context('~/contents/', true, /\.md$/)
    const blogs = resolve.keys().map(key => {
      const { attributes, meta } = resolve(key)
      return { attributes, meta }
    })

    return { blogs }
  },

  data: () => ({
    logos,
  }),
}
</script>

<style lang="scss" scoped>
// 封面图
.cover {
  transition: $transition;

  @media (max-width: 820px) {
    display: none;
  }

  @media (min-width: 821px) {
    width: 45%;
  }

  @media (min-width: 1040px) {
    width: 50%;
  }

  @media (min-width: 1160px) {
    width: 60%;
  }

  @media (min-width: 1280px) {
    width: 700px;
  }
}
</style>
