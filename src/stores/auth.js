import { defineStore } from "pinia";
import JwtService from "@/core/services/JwtService";
import User from "@/models/user";

// export const useAuthStore = defineStore("auth", () => {
//   const errors = ref({});
//   const user = ref<User>({} as User);
//   const isAuthenticated = ref(!!JwtService.getToken());

//   function setAuth(authUser: User) {
//     isAuthenticated.value = true;
//     user.value = authUser;
//     errors.value = {};
//     JwtService.saveToken(user.value.api_token);
//   }

//   function setError(error: any) {
//     errors.value = { ...error };
//   }

//   function purgeAuth() {
//     isAuthenticated.value = false;
//     user.value = {} as User;
//     errors.value = [];
//     JwtService.destroyToken();
//   }

//   function login(credentials: User) {
//     return ApiService.post("login", credentials)
//       .then(({ data }) => {
//         setAuth(data);
//       })
//       .catch(({ response }) => {
//         setError(response.data.errors);
//       });
//   }

//   function logout() {
//     purgeAuth();
//   }

//   function register(credentials: User) {
//     return ApiService.post("register", credentials)
//       .then(({ data }) => {
//         setAuth(data);
//       })
//       .catch(({ response }) => {
//         setError(response.data.errors);
//       });
//   }
//   function verifyAuth() {
//     if (JwtService.getToken()) {
//       ApiService.setHeader();
//       ApiService.post("verify_token", { api_token: JwtService.getToken() })
//         .then(({ data }) => {
//           setAuth(data);
//         })
//         .catch(({ response }) => {
//           setError(response.data.errors);
//           purgeAuth();
//         });
//     } else {
//       purgeAuth();
//     }
//   }

//   return {
//     errors,
//     user,
//     isAuthenticated,
//     login,
//     logout,
//     register,
//     forgotPassword,
//     verifyAuth,
//   };
// });

import axios from "axios";
import domain from "@/environment";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      errors: [],
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
      this.errors = { ...errors };
    },
    async login(payload) {
      this.userLoader = true;
      try {
        const response = await axios.post(domain + "/login", {
          email: payload.email,
          password: payload.password,
        });
        JwtService.saveToken(response.data.data.token);
        window.localStorage.setItem(
          "user",
          JSON.stringify(User.create(response.data.data.user))
        );
        this.user = User.create(response.data.data.user);

        // this.user = response.data.data.user;

        this.userLoader = false;
        return true;
      } catch ({ response }) {
        if (response.data.errors) this.setError(response.data.errors);
        else {
          const error = response.data;
          error.status = error.message;
          this.setError(error);
        }
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
      try {
        await axios.post(
          domain + `/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
          }
        );
        JwtService.destroyToken();
        window.localStorage.removeItem("user");
        this.user = null;
        this.userLoader = false;
        return true;
      } catch (error) {
        JwtService.destroyToken();
        this.user = {};
        this.userLoader = false;
        return false;
      }
    },
    async forgotPassword(email) {
      consolelog(email);
    },
  },
});
