<template>
  <div class="p-2 sm:p-4 md:p-6 lg:p-8 transition">
    <ul class="creation-list">
      <li
        v-for="({ img, title, link }, i) in creations"
        :key="i"
        class="creation-item lg-radius base-shadow"
      >
        <a
          :href="link"
          target="_blank"
        >
          <div style="height: 15rem;">
            <img
              :src="img"
              class="cover-img w-full h-full object-cover"
              alt="封面图片"
            >

            <div class="absolute bottom-0 w-full px-3 py-2">
              <h3 class="relative z-50 text-sm font-bold">{{ title }}</h3>
              <div class="absolute top-0 left-0 z-40 w-full h-full bg-white opacity-75"></div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
const creations = [
  {
    img: 'https://gitee.com/chinesee/images/raw/master/img/img_011.jpg',
    title: '意想社团 - 高校社团小程序',
    link: 'https://gitee.com/chinesee/hr-clubs',
  },
  {
    img: 'https://gitee.com/chinesee/images/raw/master/img/img_004.jpg',
    title: '意想课表 - 教务信息查询助手',
    link: 'https://gitee.com/chinesee/mpvue-hr',
  },
  {
    img: 'https://gitee.com/chinesee/images/raw/master/img/img_027.png',
    title: '乐享校园后台系统 - 校园二手交易平台',
    link: 'https://hrspider.top/admin',
  },
  {
    img: 'https://gitee.com/chinesee/images/raw/master/img/img_028.png',
    title: '乐享校园客户端 - 校园二手交易平台',
    link: 'https://holdme.top/client',
  },
]
export default {
  data: () => ({
    creations,
  }),
}
</script>

<style lang="scss" scoped>
.creation-list {
  display: grid;
  grid-template-columns: 1fr;

  $gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: $gap * 1.5;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: $gap * 1.6;
  }
  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: $gap * 1.4;
  }

  .creation-item {
    @apply relative flex justify-center items-center overflow-hidden cursor-pointer;
    transition: $transition;
    .cover-img {
      transition: $transition;
    }
    &:hover {
      box-shadow: $heavy-shadow;
      .cover-img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
