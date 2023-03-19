import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Permission from "@/models/permission";

export const usePermissionStore = defineStore("Permission", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      permissions: [],
      permissionTotal: 0,
      permissionTotalPages: 0,
      permissionLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_permission(payload) {
      this.permissionLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/permissions", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.permissions = response.data.data.data.map((item) =>
          Permission.create(item)
        );
        this.permissionTotal = response.data.data.meta.total;
        this.permissionTotalPages = response.data.data.meta.last_page;
        this.permissionLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.permissionLoader = false;
        return false;
      }
    },
    async store_permission(payload) {
      try {
        const response = await axios.post(domain + `/permissions`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.permissions.push(Permission.create(response.data.data));
        this.permissionTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_permission(payload) {
      try {
        await axios.delete(domain + `/permissions/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.permissions.length; index++) {
          if (this.permissions[index].id == payload.id) {
            this.permissions.splice(index, 1);
            this.permissionTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_permission(payload) {
      const params = {
        id: payload.id,
        name: payload.name,
      };
      try {
        const response = await axios.put(
          domain + `/permissions/` + payload.id,
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.permissions.length; index++) {
          if (this.permissions[index].id == response.data.data.id) {
            this.permissions[index].update(response.data.data);
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
