<template lang="pug">
    div
        v-app-bar(flat dense app)
            v-toolbar-title(@click.stop="$router.push({path: '/'})") {{ projectTitle }}
            v-spacer
            v-app-bar-nav-icon.hidden-sm-and-up(@click.stop="drawerOpened = !drawerOpened")
            v-toolbar-items.hidden-xs-only
                v-btn(
                    v-for="(item, i) in menuItems"
                    :key="i"
                    :to="item.link"
                    text
                )
                    v-icon(v-text="item.icon" left)
                    | {{ item.text }}

        v-navigation-drawer(
            v-model="drawerOpened"
            fixed
            temporary
            app
        )
            v-list
                v-list-item-group(v-model="drawerModel")
                    v-list-item(
                        v-for="(item, i) in menuItems" 
                        :key="i" 
                        @click.stop="$router.push({path: item.link})"
                    )
                        v-list-item-icon
                            v-icon(v-text="item.icon")
                        v-list-item-content
                            v-list-item-title(v-text="item.text")
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        props: [
            'projectTitle',
            'menuItems',
        ],

        data() {
            return {
                drawerOpened: false,
                drawerModel: null,
            }
        },
    })
</script>

<style lang="sass" scoped>
    .v

        &-toolbar

            &__title
                cursor: pointer
</style>
