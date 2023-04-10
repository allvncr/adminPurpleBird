import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
// import Produit from "@/models/produit";

export const useProduitStore = defineStore("Produit", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      produits: [],
      produit: null,
      produitTotal: 0,
      produitTotalPages: 0,
      produitLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_produit(payload) {
      this.produitLoader = true;
      const params = {
        name: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/products", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.produits = response.data;
        this.produitTotal = response.data.length;
        this.produitTotalPages = 1;
        this.produitLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.produitLoader = false;
        return false;
      }
    },
    async get_produit(payload) {
      try {
        const response = await axios.get(
          domain + `/products/single-product/` + payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
          }
        );
        this.produit = response.data;
        return true;
      } catch (error) {
        return false;
      }
    },
    async store_produit(payload) {
      try {
        await axios.post(domain + `/products`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_produit(payload) {
      try {
        await axios.delete(domain + `/products/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.produits.length; index++) {
          if (this.produits[index].id == payload.id) {
            this.produits.splice(index, 1);
            this.produitTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_produit(payload) {
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
          domain + `/products/` + params.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.produits.length; index++) {
          if (this.produits[index].id == response.data.data.id) {
            this.produits[index].update(response.data.data);
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
