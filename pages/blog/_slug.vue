<template>
  <div>
    <div class="markdown-wrapper">
      <component
        id="markdown-content"
        :is="singlePostComponent"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const content = await import(`~/${process.env.blogRoot}/${params.slug}.md`)
    const attr = content.attributes
    return {
      name: params.slug,
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
.markdown-wrapper {
  max-width: 1000px;
}
</style>
