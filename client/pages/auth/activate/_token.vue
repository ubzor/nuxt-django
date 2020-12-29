<template lang="pug">
    verify-account-form(:token-string="this.token")
    //- div {{ this.token }}
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
        },

        async asyncData({ params }) {
            const token = params.token

            // todo: verification

            return { token }
        }
    })
</script>
