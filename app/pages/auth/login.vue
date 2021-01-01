<template lang="pug">
    login-form
</template>

<script>
    export default {
        layout: 'centered',
        middleware: ['guest',],
    }
</script>
