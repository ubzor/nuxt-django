<template lang="pug">
    //- todo: fontawesome icons

    div(v-if="!success")
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Change password
            v-card-text.py-10.px-8
                v-form.py-10(@submit.prevent="changePassword")
                    v-text-field(
                        label="Current Password"
                        name="current_password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="off"
                        v-model="form.current_password"
                        hint="Enter current password"
                        :error="!!errors.current_password || !!errors.detail"
                        :messages="getErrorsText('current_password')"
                        @input="hideErrors('current_password')"
                    )
                    v-text-field(
                        label="New Password"
                        name="new_password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="off"
                        v-model="form.new_password"
                        hint="Enter new password"
                        :error="!!errors.new_password"
                        :messages="getErrorsText('new_password')"
                        @input="hideErrors('new_password')"
                    )
                    v-text-field(
                        label="Repeat new password",
                        name="re_new_password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="off"
                        v-model="form.re_new_password"
                        hint="Repeat new password"
                        :error="!!errors.re_new_password || !!errors.non_field_errors"
                        :messages="getErrorsText('re_new_password')"
                        @input="hideErrors('re_new_password')"
                    )
                    v-btn.mt-10(color="primary" @click.prevent="changePassword" block x-large type="submit" depressed) Change

    div(v-else)
        v-toolbar(color="primary" dark flat)
            v-toolbar-title Success
        v-card
            v-card-text.py-10.px-8
                div.py-10
                    p Your password is successfully changed. 
                    p 
                        | You will be redirected to #[nuxt-link(to="/auth/account") account page] in 
                        countdown.d-inline-block(
                            :end-time="new Date().getTime() + 5000"
                            @finish="redirect"
                        )
                            span(slot="process" slot-scope="{ timeObj }") {{ timeObj.ceil.s }}
                            span(slot="finish") 0
                        | seconds.
                    v-btn.mt-10(color="primary" to="/auth/account" block x-large type="submit" depressed) Redirect
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    current_password: '',
                    new_password: '',
                    re_new_password: '',
                },
                errors: {},
                success: false,
            }
        },

        methods: {

            async changePassword() {
                const errors = await this.$store.dispatch('auth/changePassword', this.form)

                if (await !errors) {
                    this.errors = {}
                    this.success = true
                } else {
                    this.errors = errors
                }
            },

            async redirect() {
                this.$router.push({ path: '/auth/account' })
            },

            getErrorsText(field) {
                if (this.errors[field] && this.errors[field][0])
                    return this.errors[field][0]
                if (field === 'current_password' && this.errors.detail)
                    return this.errors.detail
                if (field === 're_new_password' && this.errors.non_field_errors)
                    return this.errors.non_field_errors
                return null
            },

            hideErrors(field) {
                this.errors[field] = undefined
                if (field === 'current_password')
                    this.errors.detail = undefined
                if (field === 're_new_password')
                    this.errors.non_field_errors = undefined
            },
        }
    }
</script>
