import { defineStore } from "pinia";
import JwtService from "@/core/services/JwtService";
import User from "@/models/user";
import axios from "axios";
import domain from "@/environment";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      errors: null,
      user: JSON.parse(window.localStorage.getItem("user")),
      userLoader: false,
      isAuthenticated: JwtService.getToken(),
    };
  },
  getters: {
    getOnlineUser: (state) => state.user,
    getUserLoader: (state) => state.userLoader,
  },
  actions: {
    setError(errors) {
      this.errors = errors;
    },
    async login(payload) {
      this.userLoader = true;
      try {
        const response = await axios.post(domain + "/auth/signin", {
          username: payload.username,
          password: payload.password,
        });
        JwtService.saveToken(response.data.token);
        window.localStorage.setItem(
          "user",
          JSON.stringify(User.create(response.data))
        );
        this.user = User.create(response.data);

        // this.user = response.data.data.user;

        this.setError(false);
        this.userLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(true);
        this.userLoader = false;
        return false;
      }
    },
    verifyAuth() {
      if (!JwtService.getToken()) {
        this.user = {};
        JwtService.destroyToken();
        return false;
      } else return true;
    },
    async logout() {
      this.userLoader = true;
      JwtService.destroyToken();
      window.localStorage.removeItem("user");
      this.user = null;
      this.userLoader = false;
      return true;
    },
    async forgotPassword(email) {
      consolelog(email);
    },
  },
});
