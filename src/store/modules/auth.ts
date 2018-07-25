export default {
  state: {
    authenticated: false,
    code: null,
    accessToken: null,
    user: null
  },
  mutations: {
    setAuthenticated (state: any, bool: boolean) {
      state.authenticated = bool
    },
    setCode (state: any, code: string) {
      state.code = code
    },
    setToken (state: any, token: string) {
      state.accessToken = token
    },
    setUser (state: any, user: string) {
      state.user = user
    }
  }
}
