export const state = () => ({
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    user: null,
})

export const mutations = {

    login(state, { token, refreshToken }) {
        state.token = token
        state.refreshToken = refreshToken
        state.isAuthenticated = true
    },

    logout(state) {
        state.token = null
        state.refreshToken = null
        state.isAuthenticated = false
        state.user = null
    },

    setUser(state, user) {
        state.user = { ...user }
    }
}
