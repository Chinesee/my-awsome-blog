<template>
  <div
    class="flex flex-col justify-center items-center"
    style="min-height: 500px;"
  >
    <h2 class="text-xl font-bold">
      页面找不到了 (｡•́︿•̀｡)
    </h2>
    <ns-button
      class="mt-3"
      @click="$router.replace('/')"
    >
      返回首页
    </ns-button>
  </div>
</template>
