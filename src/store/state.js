import { getUserId, getUserName, getUserAid } from "../utils/storage"

const state = {
  // user id
  uid: getUserId() || null,
  // user name
  uname: getUserName() || null,
  // user aid
  aid: getUserAid() || null
}

export default state
