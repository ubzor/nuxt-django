<template lang="pug">
    v-footer(padless)
        v-row.pt-3(justify="center" no-gutters)

            v-btn(
                v-for='(item, i) in menuItems'
                :key='i'
                :to='item.link'
                text
            ) {{ item.text }}

            v-col.py-4.text-center(
                cols="12"
            ) 
                | {{ new Date().getFullYear() }}
                | — 
                strong
                    a.bottom-footer__copyright(:href='"mailto:" + contactEmail') Ubzor
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        props: [
            'menuItems',
            'contactEmail',
        ],
    })
</script>

<style lang="sass" scoped>
    .theme--light
        &.v-btn--active:hover, &.v-btn--active
            &::before
                opacity: 0

    .bottom-footer

        &__copyright
            transition: color 0.2s ease-in-out

            &:hover
                color: #000 
</style>
