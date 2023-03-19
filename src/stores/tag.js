import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Tag from "@/models/tag";

export const useTagStore = defineStore("Tag", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      tags: [],
      tagTotal: 0,
      tagTotalPages: 0,
      tagLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_tag(payload) {
      this.tagLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/tags", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.tags = response.data.data.data.map((item) => Tag.create(item));
        this.tagTotal = response.data.data.meta.total;
        this.tagTotalPages = response.data.data.meta.last_page;
        this.tagLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.tagLoader = false;
        return false;
      }
    },
    async store_tag(payload) {
      try {
        const response = await axios.post(domain + `/tags`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.tags.push(Tag.create(response.data.data));
        this.tagTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_tag(payload) {
      try {
        await axios.delete(domain + `/tags/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.tags.length; index++) {
          if (this.tags[index].id == payload.id) {
            this.tags.splice(index, 1);
            this.tagTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_tag(payload) {
      const params = {
        id: payload.id,
        name: payload.name,
      };
      try {
        const response = await axios.put(
          domain + `/tags/` + payload.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.tags.length; index++) {
          if (this.tags[index].id == response.data.data.id) {
            this.tags[index].update(response.data.data);
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
