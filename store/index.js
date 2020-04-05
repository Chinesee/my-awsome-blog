export const state = () => ({
  isHeaderShow: false,
  isBackTopShow: false,
})

export const mutations = {
  SET_HEADER_STATUS(state, status) {
    state.isHeaderShow = status
  },

  SET_BACK_TOP_STATUS(state, status) {
    state.isBackTopShow = status
  },
}
