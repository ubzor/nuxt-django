<template lang="pug">
    div
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Reset password
            v-card-text.py-10.px-8
                v-form.py-10(@submit.prevent="resetPassword")
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
                    v-btn.mt-10(color="primary" @click.prevent="resetPassword" block x-large type="submit" depressed) Reset
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: ''
                },
                errors: {},
                success: false,
            }
        },

        methods: {
            async resetPassword() {
                const errors = await this.$store.dispatch('auth/resetPassword', this.form)
                
                if (await !errors) {
                    this.errors = {}
                    this.$router.push({ path: '/auth/confirm-reset-password' })
                } else {
                    this.errors = errors
                }
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
        }
    }
</script>
