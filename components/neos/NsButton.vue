<template>
  <button
    type="button"
    class="ns-button block text-gray-100 md-radius transition cursor-pointer"
    :class="[size, btnColor]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'NsButton',

  props: {
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'medium',
    },
  },

  computed: {
    btnColor() {
      return `ns-button--${this.color}`
    },
  },
}
</script>

<style lang="scss" scoped>
.ns-button {
  user-select: none;

  &.medium {
    @apply px-5 py-2 text-sm;
  }

  &.large {
    @apply text-base;
    padding: 0.6rem 1.35rem;
  }

  @each $color in primary, success, warning, danger {
    &.ns-button--#{$color} {
      background-color: rgba(var(--ns-#{$color}), 1);
    }
  }

  &:hover {
    box-shadow: 0 10px 20px -10px rgba(var(--ns-primary), 0.8);
    transform: translateY(-3px);
  }
}
</style>
