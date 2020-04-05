<template>
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
</template>

<script>
import LogoNuxt from '~/components/logo/LogoNuxt.vue'
import LogoNetlify from '~/components/logo/LogoNetlify.vue'
import LogoGitee from '~/components/logo/LogoGitee.vue'

export default {
  components: { LogoNuxt, LogoNetlify, LogoGitee },

  data: () => ({
    logos: [
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
    ],
  }),
}
</script>
