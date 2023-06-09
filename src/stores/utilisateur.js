import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import User from "@/models/user";

export const useUserStore = defineStore("User", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      utilisateurs: [],
      utilisateurTotal: 0,
      utilisateurTotalPages: 0,
      utilisateurLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = errors;
    },
    async all_utilisateur(payload) {
      this.utilisateurLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/auth/all", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.utilisateurs = response.data.map((item) => User.create(item));
        this.utilisateurTotal = response.data.length;
        this.utilisateurTotalPages = 1;
        this.setError(false);
        this.utilisateurLoader = false;
        return true;
      } catch ({ response }) {
        this.utilisateurLoader = false;
        this.setError(true);
        return false;
      }
    },
    async store_utilisateur(payload) {
      try {
        const response = await axios.post(domain + `/auth/signup`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.utilisateurs.push(User.create(payload));
        this.utilisateurTotal++;
        this.setError(false);
        return true;
      } catch ({ response }) {
        this.setError(true);
        return false;
      }
    },
    async delete_utilisateur(payload) {
      try {
        await axios.delete(domain + `/users/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.utilisateurs.length; index++) {
          if (this.utilisateurs[index].id == payload.id) {
            this.utilisateurs.splice(index, 1);
            this.utilisateurTotal--;
            break;
          }
        }
        this.utilisateurLoader = false;
        this.setError(false);
        return true;
      } catch ({ response }) {
        this.setError(true);
        return false;
      }
    },
    async edit_utilisateur(payload) {
      const params = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      };
      try {
        const response = await axios.put(
          domain + `/users/` + payload.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.utilisateurs.length; index++) {
          if (this.utilisateurs[index].id == response.data.id) {
            this.utilisateurs[index].update(response.data);
            break;
          }
        }
        this.setError(false);
        return true;
      } catch ({ response }) {
        this.setError(true);
        return false;
      }
    },
  },
});
