import { setUserId, setUserName, setUserAid } from "../utils/storage"
import * as types from './mutation-type'

// set user id
export const setUid = function ({ commit }, uid) {
  commit(types.SET_UID, setUserId(uid))
}

// set user name
export const setUname = function({ commit }, uname) {
  commit(types.SET_UNAME, setUserName(uname))
}

// set user aid
export const setAid = function ({ commit }, aid) {
  commit(types.SET_AID, setUserAid(aid))
}
