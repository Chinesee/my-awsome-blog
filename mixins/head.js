export default ({ headTitle, headDesc = '令狐少侠的个人空间' }) => {
  return {
    head: {
      title: `${headTitle}-${headDesc}`,
    },
  }
}
