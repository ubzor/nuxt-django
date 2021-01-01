<template lang="pug">
    //- todo: client-side validation

    div
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Register
            v-card-text.py-10.px-8
                v-form.py-10(@submit.prevent="register")
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
                        name="password1"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="new-password"
                        v-model="form.password1"
                        hint="Enter new password"
                        :error="!!errors.password1"
                        :messages="getErrorsText('password1')"
                        @input="hideErrors('password1')"
                    )
                    v-text-field(
                        label="Confirm password"
                        name="re_password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="new-password"
                        v-model="form.re_password"
                        hint="Enter new password"
                        :error="!!errors.re_password"
                        :messages="getErrorsText('re_password')"
                        @input="hideErrors('re_password')"
                    )
                    v-checkbox(
                        v-model="form.accept"
                        label="I accept some terms"
                        :error="!!errors.accept"
                        :messages="getErrorsText('accept')"
                        @mouseup="hideErrors('accept')"
                    )
                    v-btn.mt-10(color="primary" @click.prevent="register" block x-large type="submit") Register

        p.text-center.pt-6 Already a member? #[nuxt-link(to="/auth/login") Log In]
</template>

<script>
    export default {

        data() {
            return {
                form: {
                    email: '',
                    password1: '',
                    re_password: '',
                    accept: false,
                },
                errors: {}
            }
        },

        methods: {

            async register() {
                if (!this.form.accept) {
                    this.errors = {
                        ...this.errors,
                        accept: [{ message: 'You must accept terms.' }]
                    }
                } else {
                    console.log('register')
                    // this.clearForm()
                    // this.$router.push({ path: '/auth/verify-account' })
                }
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

            clearForm() {
                this.form = {
                    username: '',
                    email: '',
                    password1: '',
                    re_password: '',
                    accept: false,
                }
            }
        },
    }
</script>
