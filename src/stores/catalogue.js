import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Catalogue from "@/models/catalogue";

export const useCatalogueStore = defineStore("Catalogue", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      catalogues: [],
      catalogueTotal: 0,
      catalogueTotalPages: 0,
      catalogueLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_catalogue(payload) {
      this.catalogueLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/catalogs", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.catalogues = response.data.map((item) => Catalogue.create(item));
        this.catalogueTotal = response.data.length;
        this.catalogueTotalPages = 1;
        this.catalogueLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.catalogueLoader = false;
        return false;
      }
    },
    async store_catalogue(payload) {
      try {
        const response = await axios.post(
          domain + `/catalogs/create`,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
          }
        );
        this.catalogues.push(Catalogue.create(payload));
        this.catalogueTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_catalogue(payload) {
      try {
        await axios.delete(domain + `/catalogs/delete/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.catalogues.length; index++) {
          if (this.catalogues[index].id == payload.id) {
            this.catalogues.splice(index, 1);
            this.catalogueTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_catalogue(payload) {
      const params = {
        id: payload.id,
        name: payload.name,
      };
      try {
        const response = await axios.put(
          domain + `/catalogs/` + payload.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.catalogues.length; index++) {
          if (this.catalogues[index].id == response.data.data.id) {
            this.catalogues[index].update(response.data.data);
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
