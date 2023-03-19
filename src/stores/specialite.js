import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Specialite from "@/models/specialite";

export const useSpecialiteStore = defineStore("Specialite", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      specialites: [],
      specialiteTotal: 0,
      specialiteTotalPages: 0,
      specialiteLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_specialite(payload) {
      this.specialiteLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/specialities", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.specialites = response.data.data.data.map((item) =>
          Specialite.create(item)
        );
        this.specialiteTotal = response.data.data.meta.total;
        this.specialiteTotalPages = response.data.data.meta.last_page;
        this.specialiteLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.specialiteLoader = false;
        return false;
      }
    },
    async store_specialite(payload) {
      try {
        const response = await axios.post(domain + `/specialities`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.specialites.push(response.data.data);
        this.specialiteTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_specialite(payload) {
      try {
        await axios.delete(domain + `/specialities/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.specialites.length; index++) {
          if (this.specialites[index].id == payload.id) {
            this.specialites.splice(index, 1);
            this.specialiteTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_specialite(payload) {
      const params = {
        id: payload.id,
        name: payload.name,
      };
      try {
        const response = await axios.put(
          domain + `/specialities/` + payload.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.specialites.length; index++) {
          if (this.specialites[index].id == response.data.data.id) {
            this.specialites[index].update(response.data.data);
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
  },
});
