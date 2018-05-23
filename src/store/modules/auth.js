export default {
  state: {
    authenticated: false,
    code: null,
    accessToken: null,
    user: null,
    natsukiUser: null
  },
  mutations: {
    setAuthenticated (state, bool) {
      state.authenticated = bool
    },
    setCode (state, code) {
      state.code = code
    },
    setToken (state, token) {
      state.accessToken = token
    },
    setUser (state, user) {
      state.user = user
    },
    setNatsukiUser (state, natsukiUser) {
      state.natsukiUser = natsukiUser
    }
  },
  actions: {

  }
}
