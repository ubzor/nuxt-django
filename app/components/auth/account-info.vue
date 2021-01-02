<template lang="pug">
    div.account-info
        h1.mb-5 Account

        v-form(@submit.prevent="updateCurrentUser")
            v-simple-table
                template(v-slot:default)
                    tbody.account-info__tbody
                        tr
                            td.text-left.account-info__first-column-label Id
                            td.text-left {{ user.id }}
                        tr
                            td.text-left First name
                            td.text-left
                                template(v-if="!(editedField === 'first_name')")
                                    span(v-if="user && user.first_name")
                                        | {{ user.first_name }}
                                        span.text--disabled.ml-4
                                            a(href="#" @click.prevent="editField('first_name')") (edit)
                                    span.text--disabled(v-else) Empty
                                v-row(v-else align="center")
                                    v-text-field.mr-2(
                                        label="First name"
                                        name="first_name"
                                        type="text"
                                        autocomplete="first-name"
                                        v-model="user.first_name"
                                        hint="Enter your first name"
                                    )
                                    v-btn.mr-2(depressed color="green" dark small @click="updateCurrentUser")
                                        v-icon(v-text="'mdi-check'")
                                    v-btn.mr-2(depressed color="grey" dark small @click="editCancel")
                                        v-icon(v-text="'mdi-close'")
                        tr
                            td.text-left Last Name
                            td.text-left 
                                template(v-if="!(editedField === 'last_name')")
                                    span(v-if="user && user.last_name")
                                        | {{ user.last_name }}
                                        span.text--disabled.ml-4
                                            a(href="#" @click.prevent="editField('last_name')") (edit)
                                    span.text--disabled(v-else) Empty
                                v-row(v-else align="center")
                                    v-text-field.mr-2(
                                        label="Last name"
                                        name="last_name"
                                        type="text"
                                        autocomplete="last-name"
                                        v-model="user.last_name"
                                        hint="Enter your last name"
                                    )
                                    v-btn.mr-2(depressed color="green" dark small @click="updateCurrentUser")
                                        v-icon(v-text="'mdi-check'")
                                    v-btn.mr-2(depressed color="grey" dark small @click="editCancel")
                                        v-icon(v-text="'mdi-close'")
                        tr
                            td.text-left Email
                            td.text-left 
                                span {{ user.email }}
            v-btn.mt-5(
                depressed 
                color="primary" 
                x-large 
                to="/auth/change-password" 
            ) Change password
</template>

<script>
    export default {
        data() {
            return {
                editedField: null,
                user: {}
            }
        },

        async mounted() {
            this.editCancel()
        },

        methods: {
            async updateCurrentUser() {
                const errors = await this.$store.dispatch('auth/updateCurrentUser', this.user)
                
                // todo: error
                this.editCancel()
            },

            editCancel() {
                this.editedField = null
                this.user = { ...this.$store.state.auth.user }
            },

            editField(field) {
                this.editedField = field
            },
        }
    }
</script>

<style lang="sass" scoped>
    .account-info

        &__first-column-label
            width: 40%

        &__tbody
            tr
                td
                    line-height: 96px
</style>
