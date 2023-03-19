import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Photographe from "@/models/photographe";

export const usePhotographeStore = defineStore("Photographe", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      photographes: [],
      photographeTotal: 0,
      photographeTotalPages: 0,
      photographeLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_photographe(payload) {
      this.photographeLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/photographers", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        console.log(response.data.data.data);
        this.photographes = response.data.data.data.map((item) =>
          Photographe.create(item)
        );
        this.photographeTotal = response.data.data.meta.total;
        this.photographeTotalPages = response.data.data.meta.last_page;
        this.photographeLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.photographeLoader = false;
        return false;
      }
    },
    async store_photographe(payload) {
      try {
        const response = await axios.post(domain + `/photographers`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.photographes.push(response.data.data);
        this.photographeTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_photographe(payload) {
      try {
        await axios.delete(domain + `/photographers/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.photographes.length; index++) {
          if (this.photographes[index].id == payload.id) {
            this.photographes.splice(index, 1);
            this.photographeTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_photographe(payload) {
      var params = {
        id: payload.id,
        bio: payload.bio,
        resume: payload.resume,
        facebook_url: payload.facebook_url,
        linkedin_url: payload.linkedin_url,
        google_url: payload.google_url,
        "specialities_ids[]": payload.specialities,
        video: payload.video,
      };
      if (payload.video) {
        payload = new FormData();
        payload.append("video", params.video);
      }
      try {
        const response = await axios.put(
          domain + `/photographers/` + params.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.photographes.length; index++) {
          if (this.photographes[index].id == response.data.data.id) {
            this.photographes[index].update(response.data.data);
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
