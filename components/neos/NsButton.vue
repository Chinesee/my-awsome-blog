<template>
  <button
    type="button"
    class="ns-button block px-5 py-2 text-sm text-gray-100 md-radius bg-primary transition cursor-pointer"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'NsButton',
}
</script>

<style lang="scss" scoped>
.ns-button {
  user-select: none;
  &:hover {
    box-shadow: 0 10px 20px -10px rgba(var(--ns-primary), 0.8);
    transform: translateY(-3px);
  }
}
</style>
