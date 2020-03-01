<template>
  <div>
    <ul>
      <li
        v-for="({ title }, i) in articles"
        :key="i"
      >
        {{ title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  asyncData() {
    const resolve = require.context('~/contents/', true, /\.md$/)
    const articles = resolve.keys().map(key => {
      const { attributes, meta } = resolve(key)
      return { attributes, meta }
    })
    console.log(articles)
    return { articles }
  },
}
</script>
