import gql from 'graphql-tag'

import ADD_TODO from '~/queries/todo/add-todo.graphql'
import TOGGLE_TODO from '~/queries/todo/toggle-todo.graphql'
import GET_CATEGORIES from '~/queries/todo/get-categories.graphql'
import GET_TODO_LIST from '~/queries/todo/get-todo-list.graphql'
import REMOVE_TODO from '~/queries/todo/remove-todo.graphql'

export { ADD_TODO, TOGGLE_TODO, GET_CATEGORIES, GET_TODO_LIST, REMOVE_TODO }
