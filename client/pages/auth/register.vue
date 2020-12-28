<template lang="pug">
    register-form
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({

        layout: 'centered',

        data() {
            return {
                meta: {
                    title: 'Register form',
                    description: 'Register form page meta description',
                },
            }
        },

        head() {
            return {
                title: this.meta.title,
                meta: [
                    { hid: 'description', name: 'description', content: this.meta.description},
                ]
            }
        }
    })
</script>
