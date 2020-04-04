<template>
  <div class="h-full relative overflow-hidden">
    <div
      class="absolute z-50 left-0 bottom-0 ml-8 mb-10 py-4 px-8 lg-radius text-gray-600 font-bold text-xl"
      style="background: rgba(255,255,255,0.7);"
    >
      页面找不到了 (｡•́︿•̀｡)
      <NsButton
        class="mt-3"
        @click="$router.replace('/')"
      >
        返回首页
      </NsButton>
    </div>

    <img
      class="absolute top-0 left-0 h-full w-full object-cover"
      src="~/assets/images/404.jpg"
      alt="404图片"
    >
  </div>
</template>
