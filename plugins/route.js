export default ({ app: { router } }) => {
  router.afterEach((to, from, next) => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  })
}
