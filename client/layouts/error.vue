<template lang="pug">
    div
        h1(v-if="error.statusCode === 404") Page not found
        h1(v-else) An error occurred
        nuxt-link(to="/") Home page
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        props: ['error'],
    })
</script>
