import gql from 'graphql-tag'

import TODO_ADD from '~/queries/todo/add-todo.graphql'
import TODO_TOGGLE from '~/queries/todo/toggle-todo.graphql'
import TODO_GET_CATEGORIES from '~/queries/todo/get-categories.graphql'
import TODO_GET_TODO_LIST from '~/queries/todo/get-todo-list.graphql'
import TODO_REMOVE from '~/queries/todo/remove-todo.graphql'

import AUTH_REGISTER from '~/queries/auth/register.graphql'
import AUTH_VERIFY_ACCOUNT from '~/queries/auth/verify-account.graphql'
import AUTH_TOKEN_AUTH from '~/queries/auth/token-auth.graphql'
import AUTH_ME from '~/queries/auth/me.graphql'
import AUTH_USER from '~/queries/auth/user.graphql'
import AUTH_UPDATE_ACCOUNT from '~/queries/auth/update-account.graphql'

export { 
    TODO_ADD, 
    TODO_TOGGLE, 
    TODO_GET_CATEGORIES, 
    TODO_GET_TODO_LIST, 
    TODO_REMOVE,

    AUTH_REGISTER,
    AUTH_VERIFY_ACCOUNT,
    AUTH_TOKEN_AUTH,
    AUTH_ME,
    AUTH_USER,
    AUTH_UPDATE_ACCOUNT,
 }
