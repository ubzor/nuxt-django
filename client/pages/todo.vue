<template lang="pug">
    div
        // h1.text-h1 {{ pageTitle }}

        v-layout.mt-0(row wrap justify-center)
            v-flex.pb-1(xs8)
                todo-form
            v-flex(
                v-for="todo of todoList"
                :key="todo.id"
                xs8
            )
                todo-item(:todo="todo")
</template>

<script>
    import Vue from 'vue'

    import { TODO_GET_TODO_LIST } from '../plugins/graphql'

    export default Vue.extend({
        data() {
            return {
                meta: {
                    title: 'Todo page meta title',
                    description: 'Todo page meta description'
                },

                pageTitle: 'Todo page',

                todoList: [],
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

        apollo: {
            todoList: { query: TODO_GET_TODO_LIST }
        }
    })
</script>
