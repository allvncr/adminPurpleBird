<template>
  <div>
    <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
      <div
        id="kt_app_toolbar_container"
        class="container-xxl d-flex flex-stack"
      >
        <div
          class="page-title d-flex flex-column justify-content-center flex-wrap me-3"
        >
          <!--begin::Title-->
          <h1
            class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"
          >
            Articles
          </h1>
          <!--end::Title-->

          <!--begin::Breadcrumb-->
          <ul
            class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
          >
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">Gestion</li>
            <!--end::Item-->
            <!--begin::Item-->
            <li class="breadcrumb-item">
              <span class="bullet bg-gray-400 w-5px h-2px"></span>
            </li>
            <!--end::Item-->

            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">Articles</li>
            <!--end::Item-->
          </ul>
          <!--end::Breadcrumb-->
        </div>
        <div class="d-flex align-items-center gap-2 gap-lg-3">
          <!--begin::Filter menu-->
          <!-- <div class="m-0">
            <a
              class="btn btn-sm btn-flex bg-body btn-color-gray-700 btn-active-color-primary fw-bold"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
            >
              <span class="svg-icon svg-icon-6 svg-icon-muted me-1"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              Filter
            </a>

            <div
              class="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
              data-kt-menu="true"
              id="kt_menu_63f48a35dc26f"
            >
              <div class="px-7 py-5">
                <div class="fs-5 text-dark fw-bold">Filter Options</div>
              </div>

              <div class="separator border-gray-200"></div>

              <div class="px-7 py-5">
                <div class="mb-10">
                  <label class="form-label fw-semibold">Status:</label>
                  <div>
                    <select
                      class="form-select form-select-solid select2-hidden-accessible"
                      data-kt-select2="true"
                      data-placeholder="Select option"
                      data-dropdown-parent="#kt_menu_63f48a35dc26f"
                      data-allow-clear="true"
                      data-select2-id="select2-data-7-4mnl"
                      tabindex="-1"
                      aria-hidden="true"
                      data-kt-initialized="1"
                    >
                      <option data-select2-id="select2-data-9-nvmn"></option>
                      <option value="1">Approved</option>
                      <option value="2">Pending</option>
                      <option value="2">In Process</option>
                      <option value="2">Rejected</option></select
                    ><span
                      class="select2 select2-container select2-container--bootstrap5"
                      dir="ltr"
                      data-select2-id="select2-data-8-sy4a"
                      style="width: 100%"
                      ><span class="selection"
                        ><span
                          class="select2-selection select2-selection--single form-select form-select-solid"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabindex="0"
                          aria-disabled="false"
                          aria-labelledby="select2-74q8-container"
                          aria-controls="select2-74q8-container"
                          ><span
                            class="select2-selection__rendered"
                            id="select2-74q8-container"
                            role="textbox"
                            aria-readonly="true"
                            title="Select option"
                            ><span class="select2-selection__placeholder"
                              >Select option</span
                            ></span
                          ><span
                            class="select2-selection__arrow"
                            role="presentation"
                            ><b role="presentation"></b></span></span></span
                      ><span class="dropdown-wrapper" aria-hidden="true"></span
                    ></span>
                  </div>
                </div>

                <div class="mb-10">
                  <label class="form-label fw-semibold">Member Type:</label>
                  <div class="d-flex">
                    <label
                      class="form-check form-check-sm form-check-custom form-check-solid me-5"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="1"
                      />
                      <span class="form-check-label"> Author </span>
                    </label>
                    <label
                      class="form-check form-check-sm form-check-custom form-check-solid"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="2"
                        checked="checked"
                      />
                      <span class="form-check-label"> Customer </span>
                    </label>
                  </div>
                </div>

                <div class="mb-10">
                  <label class="form-label fw-semibold">Notifications:</label>
                  <div
                    class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      name="notifications"
                      checked=""
                    />
                    <label class="form-check-label"> Enabled </label>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button
                    type="reset"
                    class="btn btn-sm btn-light btn-active-light-primary me-2"
                    data-kt-menu-dismiss="true"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    class="btn btn-sm btn-primary"
                    data-kt-menu-dismiss="true"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div> -->
          <!--end::Filter menu-->
          <router-link
            to="/ajout-article"
            class="btn btn-sm fw-bold btn-primary"
          >
            Ajouter
          </router-link>
          <!--end::Primary button-->
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header border-0 pt-6">
        <div class="card-title w-100">
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1 w-100">
            <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
            <span class="svg-icon svg-icon-1 position-absolute ms-6"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.5"
                  x="17.0365"
                  y="15.1223"
                  width="8.15546"
                  height="2"
                  rx="1"
                  transform="rotate(45 17.0365 15.1223)"
                  fill="currentColor"
                ></rect>
                <path
                  d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <!--end::Svg Icon-->
            <input
              type="text"
              v-model="search"
              data-kt-customer-table-filter="search"
              class="form-control form-control-solid w-100 ps-15"
              placeholder="Rechercher article"
              @keyup="debounceInput"
              @keyup.esc="
                () => {
                  search = '';
                  debounceInput;
                }
              "
            />
          </div>
          <!--end::Search-->
        </div>
      </div>
      <div class="card-body py-4">
        <div class="table-responsive">
          <table
            class="table align-middle table-row-dashed fs-6 gy-5 dataTable"
          >
            <thead>
              <tr class="fw-bolder fs-5 text-gray-800">
                <th>Couverture</th>
                <th style="min-width: 220px">Titre</th>
                <th class="min-w-100px">Auteur</th>
                <th class="min-w-125px">Categories</th>
                <!-- <th class="min-w-150px">Date de création</th> -->
                <th class="min-w-150px">Date de modification</th>
                <th class="min-w-75px">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-loading="articleStore.articleLoader"
              element-loading-background="#151521"
            >
              <tr
                v-for="(article, index) in articleStore.articles"
                :key="index"
              >
                <td>
                  <img
                    class="couverture"
                    :src="imageUrl + article.image"
                    v-if="article.image"
                    alt="couverture"
                  />
                  <i class="el-icon" style="width: 42px; height: 42px" v-else>
                    <svg
                      style="width: 42px; height: 42px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"
                      ></path>
                    </svg>
                  </i>
                </td>
                <td>{{ article.title }}</td>
                <td>{{ article.author?.name }}</td>
                <td>
                  <div
                    v-for="(cat, j) in article.categories.slice(0, 6)"
                    :key="j"
                  >
                    <span v-if="j == 5"
                      >et {{ article.categories.length - 5 }} de plus...</span
                    >
                    <span v-else>{{ cat.name }}</span>
                  </div>
                </td>
                <!-- <td>
                  {{ moment(article.created_at).format("DD-MM-YYYY, hh:mm") }}
                </td> -->
                <td>
                  {{ moment(article.updated_at).format("DD-MM-YYYY HH:mm") }}
                </td>
                <td>
                  <el-switch
                    v-model="article.visible"
                    style="
                      --el-switch-on-color: #13ce66;
                      --el-switch-off-color: #ff4949;
                    "
                    @change="switchVisible(article)"
                  />
                  <!-- <div class="badge badge-light-success" v-if="article.visible">
                    Actif
                  </div>
                  <div class="badge badge-light-danger" v-else>Inactif</div> -->
                </td>

                <td>
                  <div class="d-flex justify-content-end flex-shrink-0">
                    <a
                      @click="handleUpdate(article.id)"
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/art/art005.svg-->
                      <span class="svg-icon svg-icon-3"
                        ><svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.3"
                            d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </a>

                    <a
                      @click="deleteItem(article)"
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
                      <span class="svg-icon svg-icon-3"
                        ><svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                            fill="currentColor"
                          ></path>
                          <path
                            opacity="0.5"
                            d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                            fill="currentColor"
                          ></path>
                          <path
                            opacity="0.5"
                            d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row">
          <div
            class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"
          >
            <div
              class="dataTables_length"
              id="kt_ecommerce_products_table_length"
            >
              <label
                ><select
                  name="kt_ecommerce_products_table_length"
                  aria-controls="kt_ecommerce_products_table"
                  class="form-select form-select-sm form-select-solid"
                  v-model="perPage"
                  @change="setup(true)"
                >
                  <option value="5">5</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select></label
              >
            </div>
          </div>
          <div
            class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"
          >
            <table-pagination
              :currentPage="page"
              :perPage="perPage"
              :totalPages="articleStore.articleTotalPages"
              :total="articleStore.articleTotal"
              @page-change="pagination"
              v-model="page"
            ></table-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useArticleStore } from "../../stores/article";
import { useCategorieArticleStore } from "../../stores/categorieArticle";
import TablePagination from "@/components/kt-datatable/table-partials/table-content/table-footer/TablePagination.vue";
import Swal from "sweetalert2";
import _ from "lodash";
import { hideModal } from "@/core/helpers/dom";
import moment from "moment";
import Editor from "@tinymce/tinymce-vue";
import { ElNotification } from "element-plus";

export default {
  components: { TablePagination, editor: Editor },
  data() {
    return {
      page: 1,
      perPage: 5,
      search: "",
      articleStore: useArticleStore(),
    };
  },
  methods: {
    // Fonction de recherche
    debounceInput: _.debounce(function () {
      this.setup();
    }, 500),

    moment: function (date) {
      return moment(new Date(date)).locale("fr");
    },

    switchVisible(article) {
      const formData = new FormData();
      formData.append("id", article.id);
      formData.append("visible", article.visible ? 1 : 0);
      this.articleStore.edit_article(formData).then((valid) => {
        if (valid) {
          ElNotification({
            title: "Succès",
            message: "Article modifié avec succès",
            position: "bottom-left",
            type: "success",
            customClass: "alert-success",
          });
        }
      });
    },

    setup(reset = false) {
      if (reset) this.page = 1;
      this.articleStore.all_article({
        page: reset ? 1 : this.page,
        per_page: this.perPage,
        search: this.search,
      });
    },

    pagination(page) {
      this.page = page;
      this.articleStore.all_article({
        page: this.page,
        per_page: this.perPage,
      });
    },
    deleteItem(item) {
      Swal.fire({
        background: "#1e1e2d",
        text: "Êtes-vous sûr de vouloir supprimer " + item.title + " ?",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "Oui, Supprimer !",
        showDenyButton: true,
        denyButtonText: "Non, annuler",
        heightAuto: false,
        iconColor: "#ffc700",
        customClass: {
          confirmButton: "btn fw-semobold btn-danger",
          denyButton: "btn fw-semobold btn-white",
        },
      }).then((response) => {
        if (response.value) {
          this.articleStore.delete_article(item).then((response) => {
            if (response) {
              this.setup();
              ElNotification({
                title: "Succès",
                message: "Article a été supprimée.",
                position: "bottom-left",
                type: "success",
                customClass: "alert-success",
              });
            } else {
              ElNotification({
                title: "Erreur",
                message:
                  "Désolé, il semble que des erreurs aient été détectées, veuillez réessayer.",
                position: "bottom-left",
                type: "error",
                customClass: "alert-danger",
              });
            }
          });
        }
      });
    },

    handleUpdate(key) {
      this.$router.push({ name: "add article", query: { id: key } });
    },
  },
  computed: {
    imageUrl() {
      return import.meta.env.VITE_URL_IMAGES + "/";
    },
  },
  mounted() {
    this.articleStore.all_article({
      page: this.page,
      per_page: this.perPage,
    });
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 72px;
}

.couverture {
  max-width: 64px;
  max-height: 64px;
}

.full {
  max-width: 240px;
  max-height: 240px;
}
</style>
