<template lang="pug">
    div
        h1.text-h1 {{ pageTitle }}
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                meta: {
                    title: 'Main page meta title',
                    description: 'Main page meta description',
                },
                pageTitle: 'Main page'
            }
        },

        // todo: somehow simplify meta for pages

        head() {
            return {
                title: this.meta.title,
                meta: [
                    { hid: 'description', name: 'description', content: this.meta.description},
                ]
            }
        },
    })
</script>
