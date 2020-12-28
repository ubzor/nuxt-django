<template lang="pug">
    v-app
        top-menu(:menuItems="menuItems" :project-title="projectTitle")

        v-main(app)
            v-container
                nuxt

        bottom-footer(:menuItems="menuItems" :contactEmail="contactEmail")
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                isAuthenticated: false,

                projectTitle: 'Project title',

                menuItems: [
                    {
                        icon: 'mdi-home',
                        text: 'Home',
                        link: '/',
                    },
                    {
                        icon: 'mdi-bookmark-check-outline',
                        text: 'Todo',
                        link: '/todo',
                    },
                ],

                contactEmail: 'forubz@gmail.com',
            }
        },

        mounted() {
            this.isAuthenticated = !!this.$apolloHelpers.getToken()
        },
    })
</script>

<style lang="sass" scoped>
    
</style>
