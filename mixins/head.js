export default ({ title, desc = '令狐少侠的个人空间', script = [] }) => {
  return {
    head: {
      title: `${title} - ${desc}`,
      script,
    },
  }
}
