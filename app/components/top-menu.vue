<template lang="pug">
    div
        v-app-bar(flat dense app)
            v-toolbar-title(@click.stop="$router.push({path: '/'})") {{ projectTitle }}
            v-spacer
            v-app-bar-nav-icon.hidden-sm-and-up(@click.stop="drawerOpened = !drawerOpened")
            v-toolbar-items.hidden-xs-only
                v-btn(v-for="(item, i) in getMenuItems" :key="i" :to="item.link" text)
                    v-icon(v-text="item.icon" left)
                    | {{ item.text }}

        v-navigation-drawer(v-model="drawerOpened" fixed temporary app)
            v-list
                v-list-item-group(v-model="drawerModel")
                    v-list-item(
                        v-for="(item, i) in getMenuItems" 
                        :key="i" 
                        @click.stop="$router.push({ path: item.link })"
                    )
                        v-list-item-icon
                            v-icon(v-text="item.icon")
                        v-list-item-content
                            v-list-item-title(v-text="item.text")
</template>

<script>
    export default {
        data() {
            return {
                drawerOpened: false,
                drawerModel: null,
                drawer2Model: null,

                projectTitle: 'Django + Nuxt',

                menuItems: [
                    {
                        icon: 'mdi-home',
                        text: 'Home',
                        link: '/',
                    },
                    {
                        icon: 'mdi-bookmark-check-outline',
                        text: 'Todo',
                        link: '/todo',
                    },
                ],

                authItems: [
                    {
                        icon: 'mdi-account',
                        text: 'Account',
                        link: '/auth/account',
                    },
                    {
                        icon: 'mdi-location-exit',
                        text: 'Log Out',
                        link: '/auth/logout',
                    },
                ],

                guestItems: [
                    {
                        icon: 'mdi-lock',
                        text: 'Log In',
                        link: '/auth/login',
                    },
                    {
                        icon: 'mdi-account-plus',
                        text: 'Register',
                        link: '/auth/register',
                    },
                ]
            }
        },

        computed: {
            getMenuItems() {
                if (!this.$store.getters['auth/isAuthenticated']) {
                    return [...this.menuItems, ...this.guestItems]
                } else {
                    return [...this.menuItems, ...this.authItems]
                }
            },
        }
    }
</script>

<style lang="sass" scoped>
    .v

        &-toolbar

            &__title
                cursor: pointer
</style>
