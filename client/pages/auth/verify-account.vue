<template lang="pug">
    verify-account-form
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({

        layout: 'centered',

        data() {
            return {
                meta: {
                    title: 'Validate account form',
                    description: 'Validate account form page meta description',
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
