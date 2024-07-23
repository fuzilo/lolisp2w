import { createStore } from 'vuex'

export default createStore({
 state: {
  skins: []
 },
 mutations: {
  setSkins(state, skins) {
   state.skins = skins
  }
 },
 actions: {
  // ...
 },
 getters: {}
})
