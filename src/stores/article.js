import axios from "axios";
import { defineStore } from "pinia";
import domain from "@/environment";
import JwtService from "@/core/services/JwtService";
import Article from "@/models/article";

export const useArticleStore = defineStore("Article", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      articles: [],
      article: null,
      articleTotal: 0,
      articleTotalPages: 0,
      articleLoader: false,
      errors: [],
    };
  },
  getters: {},
  actions: {
    setError(errors) {
      this.errors = { ...errors };
    },
    async all_article(payload) {
      this.articleLoader = true;
      const params = {
        search: payload.search,
        page: payload.page,
        per_page: payload.per_page,
        start_date: payload.start_date,
        end_date: payload.end_date,
        visible: payload.visible,
      };
      try {
        const response = await axios.get(domain + "/articles", {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
          params,
        });
        this.articles = response.data.data.data.map((item) =>
          Article.create(item)
        );
        this.articleTotal = response.data.data.meta.total;
        this.articleTotalPages = response.data.data.meta.last_page;
        this.articleLoader = false;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        this.articleLoader = false;
        return false;
      }
    },
    async store_article(payload) {
      try {
        const response = await axios.post(domain + `/articles`, payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.articles.push(Article.create(response.data.data));
        this.articleTotal++;
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async delete_article(payload) {
      try {
        await axios.delete(domain + `/articles/` + payload.id);
        for (let index = 0; index < this.articles.length; index++) {
          if (this.articles[index].id == payload.id) {
            this.articles.splice(index, 1);
            this.articleTotal--;
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async edit_article(payload, categories) {
      var params = {
        "categorie_ids[]": categories,
      };
      try {
        const response = await axios.post(
          domain + `/articles/` + payload.get("id") + "?_method=PUT",
          payload,
          {
            headers: {
              Authorization: `Bearer ` + JwtService.getToken(),
            },
            params,
          }
        );
        for (let index = 0; index < this.articles.length; index++) {
          if (this.articles[index].id == response.data.data.id) {
            this.articles[index].update(response.data.data);
            break;
          }
        }
        return true;
      } catch ({ response }) {
        this.setError(response.data.errors);
        return false;
      }
    },
    async get_article(payload) {
      try {
        const response = await axios.get(domain + `/articles/` + payload, {
          headers: {
            Authorization: `Bearer ` + JwtService.getToken(),
          },
        });
        this.article = Article.create(response.data.data);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
