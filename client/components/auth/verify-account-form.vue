<template lang="pug">
    //- todo: client-side validation

    div(v-if="!verified")
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Verify Account
            v-card-text.py-10.px-8
                v-form.py-10(@submit.prevent="verifyAccount")
                    v-text-field(
                        label="Code from email"
                        name="code"
                        prepend-inner-icon="mdi-email"
                        type="text"
                        autocomplete="off"
                        v-model="form.token"
                        hint="Enter code from email"
                        :error="!!errors.token"
                        :messages="getErrorsText('token')"
                        @input="hideErrors('token')"
                    )
                    v-btn.mt-10(color="primary" @click.prevent="verifyAccount" block x-large type="submit") Verify

        p.text-center.pt-6 Already a member? #[nuxt-link(to="/auth/login") Log In]

    div(v-else)
        v-toolbar(color="primary" dark flat)
                v-toolbar-title Success
        v-card
            v-card-text.py-10.px-8
                div.py-10
                    p Your account is successfully verified. 
                    p 
                        | You will be redirected to #[nuxt-link(to="/auth/login") login page] in 
                        countdown.d-inline-block(
                            :end-time="new Date().getTime() + 5000"
                            @finish="redirect"
                        )
                            span(slot="process" slot-scope="{ timeObj }") {{ timeObj.ceil.s }}
                            span(slot="finish") 0
                        | seconds.
                    v-btn.mt-10(color="primary" to="/auth/login" block x-large type="submit") Redirect
</template>

<script>
    import Vue from 'vue'
    import { AUTH_VERIFY_ACCOUNT } from '~/plugins/graphql'

    export default Vue.extend({

        props: {
            tokenString: { type: String, required: false, default: '' }
        },
        
        data() {
            return {
                form: {
                    token: '',
                },
                errors: {},
                verified: false,
            }
        },

        async mounted() {
            if (this.tokenString) {
                this.form = { ...this.form, token: this.tokenString }
                this.verifyAccount()
            }
        },

        methods: {

            async verifyAccount() {
                this.$apollo.mutate({
                    mutation: AUTH_VERIFY_ACCOUNT,
                    variables: this.form,
                    update(store, data) {
                        // todo: update store
                    },
                }).then((data) => {
                    this.errors = data.data.verifyAccount.errors 
                    ? 
                        { token: [{ message: data.data.verifyAccount.errors.nonFieldErrors[0].message }] } 
                    : 
                        {}
                    
                    if (data.data.verifyAccount.success) {
                        this.verified = true
                    }
                });
            },

            async redirect() {
                this.$router.push({ path: '/auth/login' })
            },

            getErrorsText(field) {
                if (this.errors[field] && this.errors[field][0]) {
                    return this.errors[field][0].message
                }
                return null
            },

            hideErrors(field) {
                this.errors[field] = undefined
            },
        },
    })
</script>
