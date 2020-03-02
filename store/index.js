export const state = () => ({
  isHeaderHidden: false,
})

export const mutations = {
  SET_HEADER_STATUS(state, status) {
    state.isHeaderHidden = status
  },
}
