<template lang="pug">
    v-app
        v-main
            v-container.full-height(fluid)
                v-row(align="center" justify="center")
                    v-col(cols="12" class="column")
                        nuxt
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                isAuthenticated: false,
            }
        },

        mounted() {
            this.isAuthenticated = !!this.$apolloHelpers.getToken()
        },
    })
</script>

<style lang="sass" scoped>

    .container
        &.full-height
            height: 100%
            display: flex

    .column
        max-width: 360px
</style>
