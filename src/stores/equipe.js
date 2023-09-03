import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Equipe from "@/models/equipe";

export const useEquipeStore = defineStore("Equipe", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      equipes: [],
      equipeTotal: 0,
      equipeTotalPages: 0,
      equipeLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_equipe(payload) {
      this.equipeLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/team", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.equipes = response.data.map((item) => Equipe.create(item));
        this.equipeTotal = response.data.length;
        this.equipeTotalPages = 1;
        this.equipeLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.equipeLoader = false;
        return false;
      }
    },
    async store_equipe(payload) {
      try {
        const response = await axios.post(domain + `/team/create`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.equipes.push(Equipe.create(payload));
        this.equipeTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_equipe(payload) {
      try {
        await axios.delete(domain + `/team/delete/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.equipes.length; index++) {
          if (this.equipes[index].id == payload.id) {
            this.equipes.splice(index, 1);
            this.equipeTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_equipe(payload) {
      try {
        const response = await axios.put(
          domain + `/team/` + payload.get("id"),
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            payload,
          }
        );
        for (let index = 0; index < this.equipes.length; index++) {
          if (this.equipes[index].id == response.data.data.id) {
            this.equipes[index].update(response.data.data);
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
