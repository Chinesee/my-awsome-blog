<template>
  <div class="error h-full">
    <ErrorNotFound v-if="error.statusCode === 404" />
    <div
      v-else
      class="h-full flex flex-col justify-center items-center"
    >
      <h1 class=" text-xl font-bold">应用发生错误异常 (๑°ㅁ°๑)ᵎᵎᵎ</h1>
      <ns-button
        class="mt-5"
        @click="$router.replace('/')"
      >
        返回主页
      </ns-button>
    </div>
  </div>
</template>

<script>
import ErrorNotFound from '~/components/error/ErrorNotFound.vue'

export default {
  components: { ErrorNotFound },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
