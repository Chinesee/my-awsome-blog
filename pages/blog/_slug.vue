<template>
  <div>
    <component
      class="markdown-content"
      :is="singlePostComponent"
    />
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
      trans: attr.trans,
      year: attr.year,
      id: attr.id,
      cardAlt: attr.cardAlt,
      noMainImage: attr.noMainImage,
      description: attr.description,
      extraComponent: attr.extraComponent,
      singlePostComponent: content.vue.component,
      image: {
        main: attr.image && attr.image.main,
        og: attr.image && attr.image.og
      }
    }
  },
}
</script>
