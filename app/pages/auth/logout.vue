<template lang="pug">
    div
</template>

<script>
    export default {
        layout: 'centered',

        async mounted() {
            await this.$store.dispatch('auth/logout')
            this.$router.push({ path: '/' })
        }
    }
</script>
