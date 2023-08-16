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
      produitList: [],
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
        this.produitList = response.data;
        this.produits = this.produitList.slice(
          payload.per_page * (payload.page - 1),
          payload.per_page * payload.page
        );
        this.produitTotal = response.data.length;
        this.produitTotalPages = Math.ceil(
          this.produitTotal / payload.per_page
        );
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
        await axios.delete(domain + `/products/` + payload.reference);
        return true;
      } catch ({ response }) {
        return false;
      }
    },
    async edit_produit(payload) {
      try {
        await axios.put(domain + `/products/` + payload.get("id"), payload, {
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
  },
});
