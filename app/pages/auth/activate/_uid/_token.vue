<template lang="pug">
    activate-account-form(:uidString="uid" :tokenString="token")
</template>

<script>
    export default {
        layout: 'centered',
        middleware: ['guest',],

        async asyncData({ params }) {
            const uid = params.uid
            const token = params.token
            return { uid, token }
        },
    }
</script>
