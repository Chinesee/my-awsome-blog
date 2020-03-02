<template>
  <div class="error h-full">
    <ErrorNotFound v-if="error.statusCode === 404" />
    <h1 v-else>应用发生错误异常</h1>
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
