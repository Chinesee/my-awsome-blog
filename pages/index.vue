<template>
  <div class="index">
    <div>
      <div class="py-10 flex justify-center items-center">
        <div>
          <p class="md:mr-48 text-gray-700 text-3xl font-bold">
            令狐少侠的个人空间
          </p>
          <p class="mt-2 mb-8 text-gray-600">你好呀，等你很久了</p>
          <NsButton>查看我的作品</NsButton>
        </div>
        <img
          style="width: 500px;"
          src="~/assets/images/img.png"
          alt="首页图片"
        >
      </div>

      <BlogSection
        class=""
        :blogs="blogs"
      />
    </div>
  </div>
</template>

<script>

import BlogSection from '~/components/blog/BlogSection.vue'

export default {
  components: { BlogSection },

  asyncData() {
    const resolve = require.context('~/contents/', true, /\.md$/)
    const blogs = resolve.keys().map(key => {
      const { attributes, meta } = resolve(key)
      return { attributes, meta }
    })

    return { blogs }
  },
}
</script>
