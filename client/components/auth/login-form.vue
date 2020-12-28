<template lang="pug">
    div
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Login
            v-card-text.pt-10.px-8.pb-0
                v-form.py-10(@submit.prevent="login")
                    v-text-field(
                        label="Email"
                        name="email"
                        prepend-inner-icon="mdi-email"
                        type="email"
                        autocomplete="email"
                        v-model="form.email"
                        hint="Enter your email"
                        :error="!!errors.email"
                        :messages="getErrorsText('email')"
                        @input="hideErrors('email')"
                    )
                    v-text-field(
                        label="Password"
                        name="password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="current-password"
                        v-model="form.password"
                        hint="Enter your password"
                        :error="!!errors.password"
                        :messages="getErrorsText('password')"
                        @input="hideErrors('password')"
                    )
                    v-btn.mt-10(color="primary" @click.prevent="login" block x-large type="submit") Login
            v-card-actions.px-8.pb-6.pt-10.justify-center
                nuxt-link.d-inline-block(to="/auth/forgot") Forgot your password?
        p.text-center.pt-6 Not a member? #[nuxt-link(to="/auth/register") Create an account]
</template>

<script>
    import Vue from 'vue'
    import { AUTH_TOKEN_AUTH } from '~/plugins/graphql'

    export default Vue.extend({

        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                errors: {}
            }
        },

        methods: {

            async login() {
                const res = await this.$apollo.mutate({
                    mutation: AUTH_TOKEN_AUTH,
                    variables: this.form,
                    update(store, data) {
                        // todo: update store
                    },
                }).then((data) => {
                    this.errors = data.data.tokenAuth.errors 
                    ? 
                        { 
                            email: [{ message: data.data.tokenAuth.errors.nonFieldErrors[0].message }],
                            password: [{ message: data.data.tokenAuth.errors.nonFieldErrors[0].message }]
                        } 
                    : 
                        {}
                    
                    if (data.data.tokenAuth.success) {
                        this.$apolloHelpers.onLogin(data.data.tokenAuth.token)
                        this.$router.push({ path: '/' })
                    }
                });
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
