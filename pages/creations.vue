<template>
  <div class="creation p-6 md:p-8 lg:p-10 transition">
    <ul class="creation-list">
      <li
        v-for="({ img, title, description, github, preview }) in creations"
        :key="title"
        class="creation-list__item"
      >
        <div class="img-wrapper">
          <img
            :src="img"
            class="cover-img w-full h-full object-cover"
            alt="封面图片"
          >
        </div>

        <div class="text-content">
          <h3 class="text-lg font-bold truncate">{{ title }}</h3>
          <p class="desc my-2 text-sm">{{ description }}</p>
          <ul class="links flex items-center">
            <li
              v-if="github"
              class="link"
            >
              <a
                class="flex items-center"
                rel="noopener noreferrer"
                target="_blank"
                :href="github"
              >
                <i class="bx bxl-github icon"></i>
                GitHub
              </a>
            </li>
            <li
              v-if="preview"
              class="link"
            >
              <a
                class="flex items-center"
                rel="noopener noreferrer"
                target="_blank"
                :href="preview"
              >
                <i class="bx bx-chalkboard icon"></i>
                Preview
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import head from '~/mixins/head'

export default {
  mixins: [head({ title: '作品' })],

  data: () => {
    const creations = [
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_011.jpg',
        title: '意想社团 - 高校社团 APP',
        description: '在意想社团，你可以找到感兴趣的社团组织，也可以作为管理者来管理自己的组织。该应用可以用来宣传社团活动，加强社团间的交流。本项目使用 React Native 开发。',
        github: 'https://github.com/Chinesee/eason-club',
      },
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_004.jpg',
        title: '意想课表 - 教务信息查询助手',
        description: '微信小程序，在这里你可以查课表、查成绩、查考勤',
        github: 'https://github.com/Chinesee/eason-campus',
        preview: 'https://github.com/Chinesee',
      },
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_027.png',
        title: '乐享校园后台系统 - 校园二手交易平台',
        description: '我的毕业设计，是我使用 vue 做的第一个后台管理系统。',
        github: 'https://gitee.com/chinesee/love-share-admin',
        preview: '',
      },
      {
        img: 'https://gitee.com/chinesee/images/raw/master/img/img_028.png',
        title: '乐享校园客户端 - 校园二手交易平台',
        description: '我的毕业设计，一个可以发布和购买二手商品的交易平台，具有订单查询、在线沟通、商品评价等功能。',
        github: 'https://github.com/Chinesee/love-share-client',
        preview: '',
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
.creation {
  &-list {
    max-width: 1000px;
    margin: 0 auto;

    &__item {
      @apply mb-4 py-8 flex;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);

      .img-wrapper {
        @apply bg-gray-200 overflow-hidden;
        width: 350px;
        height: 200px;
        border-radius: 10px;
        box-shadow: $base-shadow;
      }

      .text-content {
        @apply ml-10 p-4 flex flex-col flex-1;
        min-height: 200px;

        .links {
          @apply text-gray-600;
          margin-top: auto;

          .link {
            position: relative;
            padding: 0 0.8rem;
            &:first-child {
              padding-left: 0;
            }
            &:not(:last-child):after {
              @apply bg-gray-400;
              content: "";
              position: absolute;
              top: 50%;
              right: 0;
              width: 1px;
              height: 15px;
              transform: translateY(-50%);
            }

            .icon {
              @apply mr-1 text-2xl;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 800px) {
  .creation {
    &-list {
      margin: 0 auto;

      &__item {
        @apply mb-4 py-8 flex-col;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        .img-wrapper {
          width: 100%;
        }

        .text-content {
          margin: 10px 0 0 0;
          min-height: auto;

          .desc {
            @include text-overflow-lines;
          }
        }
      }
    }
  }
}
</style>
