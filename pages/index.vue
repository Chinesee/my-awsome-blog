<template>
  <div class="index pt-6 px-5">
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
          <ns-button
            size="large"
            @click="$router.push('/creations')"
          >
            查看我的作品
          </ns-button>
        </div>
      </div>
      <img
        class="cover"
        src="https://gitee.com/chinesee/images/raw/master/img/img_029.png"
        alt="首页图片"
      >
    </div>

    <banner class="my-16"></banner>

    <recent-articles
      class="pt-10"
      :articles="filterArticles"
    ></recent-articles>
  </div>
</template>

<script>
import head from '~/mixins/head'

import Banner from '~/components/home/Banner'
import RecentArticles from '~/components/home/RecentArticles'

export default {
  components: { Banner, RecentArticles },

  mixins: [head({ headTitle: '首页' })],

  asyncData() {
    const resolve = require.context('~/contents/', true, /\.md$/)
    const articles = resolve.keys().map(key => {
      const { attributes: { title, description, time }, meta: { resourcePath } } = resolve(key)
      const paths = resourcePath.split('\\')
      const path = paths.slice(paths.indexOf(`${process.env.blogRoot}`) + 1).join('/').replace('.md', '')
      const timestamp = new Date(time.replace(/[(年)|(月)|(日)]/g, '/')).getTime()
      return { path, title, description, time, timestamp }
    })
    const filterArticles = articles
      .sort((a, b) => {
        return a.timestamp > b.timestamp ? -1 : 1
      })
      .slice(0, 4)
    return { filterArticles }
  },

  data: () => ({
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
