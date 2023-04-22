import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Banner from "@/models/banner";

export const useBannerStore = defineStore("Banner", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      banners: [],
      bannerTotal: 0,
      bannerTotalPages: 0,
      bannerLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_banner(payload) {
      this.bannerLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/banners/all", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.banners = response.data.map((item) => Banner.create(item));
        this.bannerTotal = response.data.length;
        this.bannerTotalPages = 1;
        this.bannerLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.bannerLoader = false;
        return false;
      }
    },
    async store_banner(payload) {
      try {
        const response = await axios.post(domain + `/banners`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        // this.banners.push(Banner.create(payload));
        this.bannerTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_banner(payload) {
      try {
        await axios.delete(domain + `/banners/delete/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.banners.length; index++) {
          if (this.banners[index].id == payload.id) {
            this.banners.splice(index, 1);
            this.bannerTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_banner(payload) {
      const params = {
        id: payload.id,
        name: payload.name,
      };
      try {
        const response = await axios.put(
          domain + `/banners/` + payload.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.banners.length; index++) {
          if (this.banners[index].id == response.data.data.id) {
            this.banners[index].update(response.data.data);
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
