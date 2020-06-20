import * as types from './mutation-type'

const mutations = {
  // modify user id
  [types.SET_UID](state, uid) {
    state.uid = uid
  },
  // modify user name
  [types.SET_UNAME](state, uname) {
    state.uname = uname
  },
  // modify user aid
  [types.SET_AID](state, aid) {
    state.aid = aid
  }
}

export default mutations
