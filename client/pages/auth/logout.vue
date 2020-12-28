<template lang="pug">
    div
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({

        layout: 'centered',

        async mounted() {
            await this.$apolloHelpers.onLogout()
            await this.$router.push({ path: '/' })
        }
    })
</script>
