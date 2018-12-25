import * as types from './mutation-types.js'
import {
  setToken,
  removeToken
} from '@/utils/cache'

export const saveToken = ({
  commit
}, token) => {
  commit(types.SET_TOKEN, setToken(token))
}

export const deleteToken = ({
  commit
}, token) => {
  commit(types.SET_TOKEN, removeToken())
}
