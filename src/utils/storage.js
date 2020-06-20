const _storage = window.localStorage
const storage = {
  // get func
  get(key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    }
  },
  // set func
  set(key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  //clear func
  clear(key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}

/**
 * User Id
 * @type UID_KEY: String
 */
const UID_KEY = '_uid_'
// get user id
export function getUserId() {
  return String(storage.get(UID_KEY, null))
}
// set user id
export function setUserId(uid) {
  storage.set(UID_KEY, uid)
  return uid
}

/**
 * User Name
 * @type UNAME_KEY: String
 */
const UNAME_KEY = '_uname_'
// get user name
export function getUserName() {
  return String(storage.get(UNAME_KEY, null))
}
// set user name
export function setUserName(uname) {
  storage.set(UNAME_KEY, uname)
  return uname
}

/**
 * User Aid
 * @type AID_KEY: String
 */
const AID_KEY = '_aid_'
// get user aid
export function getUserAid() {
  return String(storage.get(AID_KEY, null))
}
// set user aid
export function setUserAid(aid) {
  storage.set(AID_KEY, aid)
  return aid
}
