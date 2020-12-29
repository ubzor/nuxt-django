import gql from 'graphql-tag'

import TODO_ADD from '~/queries/todo/add-todo.gql'
import TODO_TOGGLE from '~/queries/todo/toggle-todo.gql'
import TODO_GET_CATEGORIES from '~/queries/todo/get-categories.gql'
import TODO_GET_TODO_LIST from '~/queries/todo/get-todo-list.gql'
import TODO_REMOVE from '~/queries/todo/remove-todo.gql'

import AUTH_REGISTER from '~/queries/auth/register.gql'
import AUTH_VERIFY_ACCOUNT from '~/queries/auth/verify-account.gql'
import AUTH_TOKEN_AUTH from '~/queries/auth/token-auth.gql'
import AUTH_ME from '~/queries/auth/me.gql'
import AUTH_USER from '~/queries/auth/user.gql'
import AUTH_UPDATE_ACCOUNT from '~/queries/auth/update-account.gql'

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
