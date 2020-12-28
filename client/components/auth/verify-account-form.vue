<template lang="pug">
    //- todo: client-side validation

    div
        v-card
            v-toolbar(color="primary" dark flat)
                v-toolbar-title Verify Account
            v-card-text.py-10.px-8
                v-form.py-10(@submit.prevent="validateAccount")
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
</template>

<script>
    import Vue from 'vue'
    import { AUTH_VERIFY_ACCOUNT } from '~/plugins/graphql'

    export default Vue.extend({

        data() {
            return {
                form: {
                    token: '',
                },
                errors: {}
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
                        // todo: to login
                        console.log(data)
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
