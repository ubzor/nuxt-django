<template lang="pug">
    reset-password-form
</template>

<script>
    export default {
        layout: 'centered',
        middleware: ['guest',],
    }
</script>
