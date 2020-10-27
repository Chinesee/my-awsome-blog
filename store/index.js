export const state = () => ({
  isMobile: false,
  isHeaderShow: false,
  isBackTopShow: false,
  isMenuCollapse: false,
})

export const mutations = {
  // 控制导航栏的展开和收起
  SET_DEVICES(state, status) {
    state.isMobile = status
  },

  // 控制导航栏的展开和收起
  SET_HEADER_STATUS(state, status) {
    state.isHeaderShow = status
  },

  // 控制菜单是否折叠：适配移动端
  SET_HEADER_MENU_STATUS(state, status) {
    state.isMenuCollapse = status
  },

  // 控制回到顶部按钮的显隐
  SET_BACK_TOP_STATUS(state, status) {
    state.isBackTopShow = status
  },
}
