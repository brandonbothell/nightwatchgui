export default {
  state: {
    desktop: null
  },
  mutations: {
    setDesktop (state: any, desktop: boolean) {
      state.desktop = desktop
    }
  }
}
