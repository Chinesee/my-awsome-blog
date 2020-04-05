<template>
  <div class="error h-full">
    <error-not-found v-if="error.statusCode === 404" />
    <error-exception v-else />
  </div>
</template>

<script>
import ErrorNotFound from '~/components/error/ErrorNotFound.vue'
import ErrorException from '~/components/error/ErrorException.vue'

export default {
  components: { ErrorNotFound, ErrorException },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
