<template lang="pug">
    div
        h1.mb-5 Account
        p id: {{ $store.state.auth.user.id }}
        p name: {{ $store.state.auth.user.first_name }} {{ $store.state.auth.user.last_name }}
        p email: {{ $store.state.auth.user.email }}
</template>

<script>
    export default {
        middleware: ['auth'],
    }
</script>
