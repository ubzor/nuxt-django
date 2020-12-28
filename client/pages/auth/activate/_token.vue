<template lang="pug">
    div
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({

        layout: 'centered',

        async asyncData({ params }) {
            const token = params.token

            // todo: verification

            return { token }
        }
    })
</script>
