<template>
  <div class="markdown-container">
    <div class="markdown-wrapper">
      <component
        id="markdown-content"
        class="sm:w-full"
        :is="singlePostComponent"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const content = await import(`~/${process.env.blogRoot}/${params.slug}.md`)
    const { attributes: attr } = content
    return {
      title: attr.title,
      year: attr.year,
      description: attr.description,
      extraComponent: attr.extraComponent,
      singlePostComponent: content.vue.component,
    }
  },
}
</script>

<style lang="scss">
.markdown-container {
  @apply w-full flex flex-col items-center;
}

.markdown-wrapper {
  @apply px-5 py-6;
  max-width: 1000px;
}
</style>
