// expose the store, axios client and redirect method from the Nuxt context
// https://nuxtjs.org/api/context/
export default function ({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
        // check if the user is authenticated
        if (store.state.auth.token) {
            // set the Authorization header using the access token
            config.headers.Authorization = 'JWT ' + store.state.auth.token
        }
    
        return config
    })
}
