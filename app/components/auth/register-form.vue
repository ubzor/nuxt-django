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
                        :error="!!errors.email || !!errors.detail"
                        :messages="getErrorsText('email')"
                        @input="hideErrors('email')"
                    )
                    v-text-field(
                        label="Password"
                        name="password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="new-password"
                        v-model="form.password"
                        hint="Enter new password"
                        :error="!!errors.password"
                        :messages="getErrorsText('password')"
                        @input="hideErrors('password')"
                    )
                    v-text-field(
                        label="Confirm password"
                        name="re_password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="new-password"
                        v-model="form.re_password"
                        hint="Enter new password"
                        :error="!!errors.re_password || !!errors.non_field_errors"
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
                    v-btn.mt-10(color="primary" @click.prevent="register" block x-large type="submit" depressed) Register

        p.text-center.pt-6 Already a member? #[nuxt-link(to="/auth/login") Log In]
</template>

<script>
    export default {

        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    re_password: '',
                    accept: false,
                },
                errors: {}
            }
        },

        methods: {

            async register() {
                // todo: vee validate

                if (!this.form.accept) {
                    this.errors = {
                        ...this.errors,
                        accept: ['You must accept terms.']
                    }
                } else {
                    const errors = await this.$store.dispatch('auth/register', this.form)
                    
                    if (await !errors) {
                        this.errors = {}
                        this.$router.push({ path: '/auth/activate' })
                    } else {
                        this.errors = errors
                    }

                    // this.clearForm()
                    // this.$router.push({ path: '/auth/verify-account' })
                }
            },

            getErrorsText(field) {
                if (this.errors[field] && this.errors[field][0])
                    return this.errors[field][0]
                if (field === 'email' && this.errors.detail)
                    return this.errors.detail
                if (field === 're_password' && this.errors.non_field_errors)
                    return this.errors.non_field_errors
                return null
            },

            hideErrors(field) {
                this.errors[field] = undefined
                if (field === 'email')
                    this.errors.detail = undefined
                if (field === 're_password')
                    this.errors.non_field_errors = undefined
            },

            clearForm() {
                this.form = {
                    email: '',
                    password: '',
                    re_password: '',
                    accept: false,
                }
            }
        },
    }
</script>
