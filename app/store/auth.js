export const AUTH_MUTATIONS = {
    SET_USER: 'SET_USER',
    SET_PAYLOAD: 'SET_PAYLOAD',
    LOGOUT: 'LOGOUT',
}
  
export const state = () => ({
    token: null, // JWT access token
    refreshToken: null, // JWT refresh token
    user: null,
})
  
export const mutations = {
    // store the logged in user in the state
    [AUTH_MUTATIONS.SET_USER] (state, user) {
        state.user = user
    },
  
    // store new or updated token fields in the state
    [AUTH_MUTATIONS.SET_PAYLOAD] (state, { access, refresh = null }) {
        state.token = access
    
        // refresh token is optional, only set it if present
        if (refresh) {
            state.refreshToken = refresh
        }
    },

    // clear our the state, essentially logging out the user
    [AUTH_MUTATIONS.LOGOUT] (state) {
        state.token = null
        state.refreshToken = null
        state.user = null
    },
}
  
export const actions = {
    async login ({ commit, dispatch }, { email, password }) {
        return new Promise(async (resolve, reject) => {
            // make an API call to login the user with an email address and password
            const payload = await this.$axios.post('/api/v1/auth/jwt/create/', { email, password })

            if (payload.status === 400 || payload.status === 401) {
                return resolve({ ...payload.data })
            }

            // commit the user and tokens to the state
            // commit(AUTH_MUTATIONS.SET_USER, user)
            await commit(AUTH_MUTATIONS.SET_PAYLOAD, payload.data)
            await dispatch('currentUser')

            return resolve(undefined)
        })
    },

    async currentUser ({ commit }) {
        const user = await this.$axios.get('/api/v1/auth/users/me/', {})
        commit(AUTH_MUTATIONS.SET_USER, user.data)
    },
  
    // todo - rework
    async register ({ commit }, { email, password, first_name, last_name }) {
        // make an API call to register the user
        await this.$axios.post('/api/v1/auth/users/', { email, password, first_name, last_name })
        
        // commit the user and tokens to the state
        // commit(AUTH_MUTATIONS.SET_USER, user)
        // commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
    },
  
    // given the current refresh token, refresh the user's access token to prevent expiry
    async refresh ({ commit, state }) {
        // make an API call using the refresh token to generate a new access token
        const payload = await this.$axios.post('/api/v1/auth/jwt/refresh/', { refresh: state.refreshToken })
    
        commit(AUTH_MUTATIONS.SET_PAYLOAD, payload.data)
    },
  
    // logout the user
    logout ({ commit, state }) {
        commit(AUTH_MUTATIONS.LOGOUT)
    },
}
  
export const getters = {
    // determine if the user is authenticated based on the presence of the access token
    isAuthenticated: (state) => {
        return state.token && (state.token !== '') ? true : false
    },
}
