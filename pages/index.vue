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
          <NsButton @click.native="$router.push('/creations')">查看我的作品</NsButton>
        </div>
        <img
          class="hidden sm:inline-block"
          style="width: 500px;"
          src="~/assets/images/img.png"
          alt="首页图片"
        >
      </div>
      <LogoNuxt />
    </div>
  </div>
</template>

<script>
import { LogoNuxt } from '~/components/logo/LogoNuxt.vue'

export default {
  components: { LogoNuxt },

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
