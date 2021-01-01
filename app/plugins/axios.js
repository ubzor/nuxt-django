// expose the store, axios client and redirect method from the Nuxt context
// https://nuxtjs.org/api/context/
export default function ({ store, app: { $axios }, redirect }) {
    // const IGNORED_PATHS = ['/auth/login', '/auth/logout', '/auth/refresh']
  
    $axios.onRequest((config) => {
      // check if the user is authenticated
      if (store.state.auth.token) {
        // set the Authorization header using the access token
        config.headers.Authorization = 'JWT ' + store.state.auth.token
      }
  
      return config
    })
  
    $axios.onError((error) => {
      return new Promise(async (resolve, reject) => {
        // ignore certain paths (i.e. paths relating to authentication)
        // const isIgnored = IGNORED_PATHS.some(path => error.config.url.includes(path))
        
        // get the status code from the response
        const statusCode = error.response ? error.response.status : -1

        if ([400, 401].indexOf(statusCode === -1)) {
            return resolve(error.response)
        }
  
        // // only handle authentication errors or errors involving the validity of the token
        // if (statusCode === 400 || statusCode === 401 || statusCode === 422 /*&& !isIgnored*/) {
        //   // API should return a reason for the error, represented here by the text_code property
          
        //   // Example API response: 
        //   // { 
        //   //   status: 'failed', 
        //   //   text_code: 'TOKEN_EXPIRED',
        //   //   message: 'The JWT token is expired',
        //   //   status_code: 401
        //   // }

        //   console.log(error.response)
          
        //   // retrieve the text_code property from the response, or default to null
        //   const { data: { text_code } = { text_code: null } } = error.response || {}
          
        //   console.log(text_code)

        //   // get the refresh token from the state if it exists
        //   const refreshToken = store.state.auth.refreshToken
          
        //   // determine if the error is a result of an expired access token
        //   // also ensure that the refresh token is present
        //   if (text_code === 'TOKEN_EXPIRED' && refreshToken) {
            
        //     // see below - consider the refresh process failed if this is a 2nd attempt at the request
        //     if (error.config.hasOwnProperty('retryAttempts')) {
        //       // immediately logout if already attempted refresh
        //       await store.dispatch('auth/logout')
              
        //       // redirect the user home
        //       return redirect('/')
        //     } else {
        //       // merge a new retryAttempts property into the original request config to prevent infinite-loop if refresh fails
        //       const config = { retryAttempts: 1, ...error.config }
  
        //       try {
        //         // attempt to refresh access token using refresh token
        //         await store.dispatch('auth/refresh')
  
        //         // re-run the initial request using the new request config after a successful refresh
        //         // this response will be returned to the initial calling method
        //         return resolve($axios(config))
        //       } catch (e) {
        //         // catch any error while refreshing the token
        //         await store.dispatch('auth/logout')
  
        //         // redirect the user home
        //         return redirect('/')
        //       }
        //     }
        //   } else if (text_code === 'TOKEN_INVALID') {
        //     // catch any other JWT-related error (i.e. malformed token) and logout the user
        //     await store.dispatch('auth/logout')
            
        //     // redirect the user home
        //     return redirect('/')
        //   } else {
        //     return resolve(undefined)
        //   }
        // }
        
        // ignore all other errors, let component or other error handlers handle them
        return reject(error)
      })
    })
  }
