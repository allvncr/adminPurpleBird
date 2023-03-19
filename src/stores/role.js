import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Role from "@/models/role";

export const useRoleStore = defineStore("Role", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      roles: [],
      roleTotal: 0,
      roleTotalPages: 0,
      roleLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_role(payload) {
      this.roleLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
      };
      try {
        const response = await axios.get(domain + "/roles", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.roles = response.data.data.data.map((item) => Role.create(item));
        this.roleTotal = response.data.data.meta.total;
        this.roleTotalPages = response.data.data.meta.last_page;
        this.roleLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.roleLoader = false;
        return false;
      }
    },
    async store_role(payload) {
      const params = {
        name: payload.name,
        "permission_ids[]": payload.permissions,
      };
      try {
        const response = await axios.post(domain + `/roles`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.roles.push(Role.create(response.data.data));
        this.roleTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_role(payload) {
      try {
        await axios.delete(domain + `/roles/` + payload.id, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        for (let index = 0; index < this.roles.length; index++) {
          if (this.roles[index].id == payload.id) {
            this.roles.splice(index, 1);
            this.roleTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_role(payload) {
      const params = {
        id: payload.id,
        name: payload.name,
        "permission_ids[]": payload.permissions,
      };
      try {
        const response = await axios.put(
          domain + `/roles/` + payload.id,
          null,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.roles.length; index++) {
          if (this.roles[index].id == response.data.data.id) {
            this.roles[index].update(response.data.data);
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
