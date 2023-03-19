import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import CategoryPhoto from "@/models/categoryPhoto";

export const useCategoriePhotoStore = defineStore("categoriePhoto", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      categories: [],
      categorie: null,
      categorieTotal: 0,
      categorieTotalPages: 0,
      categorieLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_categorie(payload) {
      this.categorieLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/subjects", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.categories = response.data.data.data.map((item) =>
          CategoryPhoto.create(item)
        );
        this.categorieTotal = response.data.data.meta.total;
        this.categorieTotalPages = response.data.data.meta.last_page;
        this.categorieLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.categorieLoader = false;
        return false;
      }
    },
    async store_categorie(payload) {
      try {
        const response = await axios.post(domain + `/subjects`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.categories.push(CategoryPhoto.create(response.data.data));
        this.categorieTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_categorie(payload) {
      try {
        await axios.delete(domain + `/subjects/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.categories.length; index++) {
          if (this.categories[index].id == payload.id) {
            this.categories.splice(index, 1);
            this.categorieTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_categorie(payload) {
      const params = {
        id: payload.id,
        title: payload.title,
      };
      try {
        const response = await axios.put(
          domain + `/subjects/` + payload.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.categories.length; index++) {
          if (this.categories[index].id == response.data.data.id) {
            this.categories[index].update(response.data.data);
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
