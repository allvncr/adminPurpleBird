import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";

export const useColorStore = defineStore("Color", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      colors: [],
      colorLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_color(payload) {
      this.colorLoader = true;
      try {
        const response = await axios.get(domain + "/products/colors", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.colors = response.data;
        this.colorLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.colorLoader = false;
        return false;
      }
    },
  },
});
