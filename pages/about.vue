<template>
  <div class="about">
    <h2 class="mb-5 text-xl font-bold">令狐聪 LeoKu</h2>
    <p class="mb-10">
      我是一名前端开发工作者，目前在广东东莞工作和生活。我毕业于广州大学华软软件学院的软件工程专业，在 2020 年开始正式参加工作。
      <br>
      作为一名前端开发者，我特别欣赏那些别具一格的网站，并且我最大的爱好就是收集这些网站，以便于在我构思自己的作品时能带给我启发。我热爱设计，无论是在我的作品还是我的生活空间，我都会努力让它们拥有最佳的体验。
    </p>

    <h2 class="mb-5 text-xl font-bold">怎么联系我</h2>
    <ul class="text-gray-600">
      <li class="mb-1">微信：leoku_new</li>
      <li class="mb-1">
        新浪微博：<a
          href="https://weibo.com/leoku4"
          target="_blank"
          rel="noopener noreferrer"
        >令狐聪Leoku</a>
      </li>
      <li class="mb-1">邮箱：czc12580520@gmail.com</li>
    </ul>
  </div>
</template>

<script>
import head from '~/mixins/head'

export default {
  mixins: [head({ title: '关于' })],

  data: () => ({
  }),
}
</script>

<style lang="scss" scoped>
.about {
  width: 90%;
  max-width: 650px;
  margin: 0 auto;
  padding: 80px 0;
}
</style>
