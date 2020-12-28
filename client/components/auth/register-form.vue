<template lang="pug">
    //- todo: client-side validation

    div
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Register
            v-card-text.py-10.px-8
                v-form.py-10(@submit.prevent="register")
                    v-text-field(
                        label="Username"
                        name="username"
                        prepend-inner-icon="mdi-account"
                        type="text"
                        autocomplete="username"
                        v-model="form.username"
                        hint="Enter your username"
                        :error="!!errors.username"
                        :messages="getErrorsText('username')"
                        @input="hideErrors('username')"
                    )
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
                        name="password2"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="new-password"
                        v-model="form.password2"
                        hint="Enter new password"
                        :error="!!errors.password2"
                        :messages="getErrorsText('password2')"
                        @input="hideErrors('password2')"
                    )
                    v-checkbox(
                        v-model="form.accept"
                        label="I accept some terms"
                        :error="!!errors.accept"
                        :messages="getErrorsText('accept')"
                        @mouseup="hideErrors('accept')"
                    )
                    v-btn.mt-10(color="primary" @click.prevent="register" block x-large type="submit") Register

        p.text-center.pt-6 Already a member? #[nuxt-link(to="/account/login") Log In]
</template>

<script>
    import Vue from 'vue'
    import { AUTH_REGISTER } from '~/plugins/graphql'

    export default Vue.extend({

        data() {
            return {
                form: {
                    username: '',
                    email: '',
                    password1: '',
                    password2: '',
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
                    this.$apollo.mutate({
                        mutation: AUTH_REGISTER,
                        variables: this.form,
                        update(store, data) {
                            // todo: update store
                        },
                    }).then((data) => {
                        this.errors = data.data.register.errors ?? {}

                        if (data.data.register.success) {
                            this.clearForm()
                            this.$router.push({ path: '/auth/verify-account' })
                        }
                    });
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
                    password2: '',
                    accept: false,
                }
            }
        },
    })
</script>
