<template lang="pug">
    register-form
</template>

<script>
    export default {
        layout: 'centered',
        middleware: ['guest',],
    }
</script>
