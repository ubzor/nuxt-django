<template lang="pug">
    div
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({

        layout: 'centered',

        async mounted() {
            this.$apolloHelpers.onLogout()
            this.$store.commit('auth/logout')
            this.$router.push({ path: '/' })
        }
    })
</script>
