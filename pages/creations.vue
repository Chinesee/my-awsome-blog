<template>
  <div class="p-4 md:p-8 lg:p-10 transition">
    <ul class="creation-list">
      <li
        v-for="({ img, title, links }, i) in creations"
        :key="i"
        class="creation-item lg-radius base-shadow"
      >
        <div style="height: 15rem;">
          <img
            :src="img"
            class="cover-img w-full h-full object-cover"
            alt="封面图片"
          >

          <div class="absolute bottom-0 w-full px-3 py-2">
            <div class="relative z-50 ">
              <h3 class="text-sm font-bold">{{ title }}</h3>
              <ul class="flex justify-end items-center">
                <template v-for="(key, index) in Object.keys(links)">
                  <li
                    :key="index"
                    :title="icons[key].label"
                    class="ml-1 text-lg cursor-pointer"
                    @click.stop.prevent="linkTo(links[key])"
                  >
                    {{ icons[key].icon }}
                  </li>
                </template>
              </ul>
            </div>
            <div class="absolute top-0 left-0 z-40 w-full h-full bg-white opacity-75"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import head from '~/mixins/head'

export default {
  mixins: [head({ headTitle: '作品' })],

  data: () => {
    const creations = [
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_011.jpg',
        title: '意想社团 - 高校社团小程序',
        links: {
          repository: 'https://gitee.com/chinesee/hr-clubs',
        },
      },
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_004.jpg',
        title: '意想课表 - 教务信息查询助手',
        links: {
          repository: 'https://gitee.com/chinesee/mpvue-hr',
        },
      },
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_027.png',
        title: '乐享校园后台系统 - 校园二手交易平台',
        links: {
          online: 'https://hrspider.top/admin',
          repository: 'https://gitee.com/chinesee/love-share-admin',
        },
      },
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_028.png',
        title: '乐享校园客户端 - 校园二手交易平台',
        links: {
          online: 'https://holdme.top/client',
          repository: 'https://gitee.com/chinesee/love-share-client',
        },
      },
    ]
    const icons = {
      online: {
        icon: '🎨', label: '在线地址',
      },
      repository: {
        icon: '🎉', label: '项目仓库',
      },
    }
    return {
      creations,
      icons,
    }
  },

  methods: {
    linkTo(link) {
      window.open(link)
    },
  },
}
</script>

<style lang="scss" scoped>
.creation-list {
  $gap: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: $gap;

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
    @apply relative flex justify-center items-center overflow-hidden;
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
