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
                        :error="!!errors.email || !!errors.detail"
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
    export default {

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

                let errors
                errors = await this.$store.dispatch('auth/login', this.form)

                if (await !errors)
                    this.errors = {}
                    if (this.$router.currentRoute.name === 'auth-login')
                        this.$router.replace({ path: '/auth/account' })
                else
                    this.errors = errors
            },

            getErrorsText(field) {
                if (this.errors[field] && this.errors[field][0])
                    return this.errors[field][0]
                if (field === 'email' && this.errors.detail)
                    return this.errors.detail
                return null
            },

            hideErrors(field) {
                this.errors[field] = undefined
                if (field === 'email')
                    this.errors.detail = undefined
            },
        },
    }
</script>
