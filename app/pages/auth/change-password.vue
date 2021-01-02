<template lang="pug">
    change-password-form
</template>

<script>
    export default {
        layout: 'centered',
        middleware: ['auth',],
    }
</script>
