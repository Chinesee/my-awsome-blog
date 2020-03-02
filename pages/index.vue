<template>
  <div class="index pt-6">
    <div>
      <div class="py-10 flex justify-center items-center">
        <div class="md:mr-20">
          <p class="text-gray-700 text-3xl font-bold">
            生命相承，殊途同归 <br>
            世事变幻，但时间从不作答
          </p>
          <p class="mt-4 mb-10 text-gray-600 text-sm">
            朽骨已在掩埋的宅邸中躺了多久，但纪念碑将于此山谷中永垂不朽。<br>
            孤勇之后，世界尽在眼前。
          </p>
          <ns-button @click="$router.push('/creations')">查看我的作品</ns-button>
        </div>
        <img
          class="hidden sm:inline-block"
          style="width: 500px;"
          src="~/assets/images/img.png"
          alt="首页图片"
        >
      </div>

      <div class="flex justify-center items-center">
        <div
          v-for="({ comp, title, desc, link }, i) in logos"
          :key="i"
          class="mx-12 flex items-center"
        >
          <component
            :is="comp"
            class="w-12 mr-4"
          ></component>
          <div>
            <p class="mb-1 text-lg text-gray-600 font-bold ">
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
    title: '源代码已开源',
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
