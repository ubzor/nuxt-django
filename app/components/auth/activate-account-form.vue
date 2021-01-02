<template lang="pug">
    div(v-if="!success")
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Activate account
            v-card-text.pt-10.px-8.pb-0
                v-form.py-10(@submit.prevent="activateAccount")
                    p.mb-0 Click on the activation link in Email or
                    p.mb-10 Enter Uid and Token from Email by hand
                    v-text-field(
                        label="Uid from Email"
                        name="uid"
                        prepend-inner-icon="mdi-lock"
                        type="text"
                        autocomplete="off"
                        v-model="form.uid"
                        hint="Enter Uid from Email"
                        :error="!!errors.uid || !!errors.detail"
                        :messages="getErrorsText('uid')"
                        @input="hideErrors('uid')"
                    )
                    v-text-field(
                        label="Token from Email"
                        name="token"
                        prepend-inner-icon="mdi-lock"
                        type="text"
                        autocomplete="off"
                        v-model="form.token"
                        hint="Enter Token from Email"
                        :error="!!errors.token"
                        :messages="getErrorsText('token')"
                        @input="hideErrors('token')"
                    )
                    v-btn.mt-10(color="primary" @click.prevent="activateAccount" block x-large type="submit" depressed) Activate
        
        p.text-center.pt-6 Already a member? #[nuxt-link(to="/auth/login") Log In]

    div(v-else)
        v-toolbar(color="primary" dark flat)
            v-toolbar-title Success
        v-card
            v-card-text.py-10.px-8
                div.py-10
                    p Your account is successfully activated. 
                    p 
                        | You will be redirected to #[nuxt-link(to="/auth/login") login page] in 
                        countdown.d-inline-block(
                            :end-time="new Date().getTime() + 5000"
                            @finish="redirect"
                        )
                            span(slot="process" slot-scope="{ timeObj }") {{ timeObj.ceil.s }}
                            span(slot="finish") 0
                        | seconds.
                    v-btn.mt-10(color="primary" to="/auth/login" block x-large type="submit" depressed) Redirect
</template>

<script>
    export default {
        props: {
            uidString: { type: String, required: false, default: '' },
            tokenString: { type: String, required: false, default: '' },
        },

        data() {
            return {
                form: {
                    uid: '',
                    token: '',
                },
                errors: {},
                success: false,
            }
        },

        async mounted() {
            if (this.uidString)
                this.form = { ...this.form, uid: this.uidString }
            if (this.tokenString)
                this.form = { ...this.form, token: this.tokenString }
            if (this.uidString && this.tokenString)
                this.activateAccount()
        },

        methods: {
            async activateAccount() {
                const errors = await this.$store.dispatch('auth/activateAccount', this.form)
            
                if (await !errors) {
                    this.errors = {}
                    this.success = true
                } else {
                    this.errors = errors
                }
            },

            async redirect() {
                this.$router.push({ path: '/auth/login' })
            },

            getErrorsText(field) {
                if (this.errors[field] && this.errors[field][0])
                    return this.errors[field][0]
                if (field === 'uid' && this.errors.detail)
                    return this.errors.detail
                return null
            },

            hideErrors(field) {
                this.errors[field] = undefined
                if (field === 'uid')
                    this.errors.detail = undefined
            },
        }
    }
</script>
