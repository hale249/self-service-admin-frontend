import apis from "../../utils/api";
import http from "~/utils/http";

const initState = () => ({
  users: [],
});

const state = initState;

const getters = {
  getUsers(state) {
    return state.users;
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  fetchUsers(vuex, params) {
    return new Promise((resolve, reject) => {
      return http.get(apis.user.list, {params: params})
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

