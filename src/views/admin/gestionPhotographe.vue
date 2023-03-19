<template>
  <div>
    <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
      <!--begin::Toolbar container-->
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
            Photographes
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
            <li class="breadcrumb-item text-muted">Photographes</li>
            <!--end::Item-->
          </ul>
          <!--end::Breadcrumb-->
        </div>
      </div>

      <!--end::Toolbar container-->
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
              placeholder="Rechercher photographe"
              @keyup="debounceInput"
            />
          </div>
          <!--end::Search-->
        </div>
      </div>
      <div class="card-body py-4">
        <div class="table-responsive">
          <table class="table table-row-dashed table-row-gray-300 gy-7">
            <thead>
              <tr class="fw-bolder fs-5 text-gray-800">
                <th>ID</th>
                <th>Avatar</th>
                <th>Nom</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-loading="photographeStore.photographeLoader"
              element-loading-background="#151521"
            >
              <tr
                v-for="(photographe, index) in photographeStore.photographes"
                :key="index"
              >
                <td>{{ photographe.id }}</td>
                <td>
                  <img
                    class="couverture"
                    :src="imageUrl + photographe.user.avatar"
                    v-if="photographe.user.avatar"
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
                <td>{{ photographe.user.name }}</td>
                <td>
                  <div class="d-flex justify-content-end flex-shrink-0">
                    <a
                      @click="editItem(photographe)"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_1"
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
                      @click="deleteItem(photographe)"
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
                  <option :value="5">5</option>
                  <option :value="8">8</option>
                  <option :value="10">10</option>
                  <option :value="15">15</option>
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
              :totalPages="photographeStore.photographeTotalPages"
              :total="photographeStore.photographeTotal"
              @page-change="pagination"
              v-model="page"
            ></table-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--begin::Close-->
    <div class="modal fade" tabindex="-1" id="kt_modal_1" ref="newCardModalRef">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier photographe</h5>

            <!--begin::Close-->
            <div
              class="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span class="svg-icon svg-icon-2x"></span>
            </div>
            <!--end::Close-->
          </div>

          <div class="modal-body scroll-y">
            <form
              class="form w-100"
              id="create_cat_form"
              ref="create_cat_form"
              @submit.prevent="validateForm"
            >
              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Bio</span>
                </label>
                <textarea
                  v-model="new_photographe.bio"
                  class="form-control form-control-solid"
                  aria-label="With textarea"
                  rows="3"
                ></textarea>
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Resume</span>
                </label>
                <textarea
                  v-model="new_photographe.resume"
                  class="form-control form-control-solid"
                  aria-label="With textarea"
                  rows="3"
                ></textarea>
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Specialités</span>
                </label>
                <el-select
                  multiple
                  placeholder="Selectionner specialités"
                  class="form-control form-control-solid"
                  v-model="new_photographe.specialities"
                  filterable
                  no-data-text="Aucune specialité"
                  collapse-tags
                  collapse-tags-tooltip
                >
                  <el-option
                    v-for="spe in specialiteStore.specialites"
                    :key="spe.title"
                    :value="spe.id"
                    :label="spe.title"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Facebook Url</span>
                </label>
                <input
                  v-model="new_photographe.facebook_url"
                  type="text"
                  name="facebook_url"
                  class="form-control form-control-solid"
                />
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Google Url</span>
                </label>
                <input
                  v-model="new_photographe.google_url"
                  type="text"
                  name="google_url"
                  class="form-control form-control-solid"
                />
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Linkedin Url</span>
                </label>
                <input
                  v-model="new_photographe.linkedin_url"
                  type="text"
                  name="linkedin_url"
                  class="form-control form-control-solid"
                />
              </div>
              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Linkedin Url</span>
                </label>
                <input
                  v-model="new_photographe.linkedin_url"
                  type="text"
                  name="linkedin_url"
                  class="form-control form-control-solid"
                />
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span>Video</span>
                </label>
                <input
                  type="file"
                  name="linkedin_url"
                  class="form-control form-control-solid"
                  accept="video/*"
                  drop-placeholder="Déposer le fichier ici..."
                  @change="onFileChange"
                />
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Fermer
            </button>
            <button
              ref="submitButtonRef"
              @click="validateForm"
              class="btn btn-primary"
            >
              <span class="indicator-label">Valider</span>
              <span class="indicator-progress">
                Veuillez patienter...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePhotographeStore } from "../../stores/photographe";
import { useSpecialiteStore } from "../../stores/specialite";
import TablePagination from "@/components/kt-datatable/table-partials/table-content/table-footer/TablePagination.vue";
import Swal from "sweetalert2";
import _ from "lodash";
import { hideModal } from "@/core/helpers/dom";
import { ElNotification } from "element-plus";

export default {
  components: { TablePagination },
  data() {
    return {
      page: 1,
      perPage: 8,
      new_photographe: {
        file: null,
      },
      search: "",
      photographeStore: usePhotographeStore(),
      specialiteStore: useSpecialiteStore(),
      showConfirmationModal: false,
      itemToDeleteIndex: null,
    };
  },
  methods: {
    // Fonction de recherche
    debounceInput: _.debounce(function () {
      this.setup();
    }, 500),

    onFileChange(event) {
      const file = event.target.files[0];
      this.new_photographe.file = file;
    },

    setup(reset = false) {
      if (reset) this.page = 1;
      this.photographeStore.all_photographe({
        page: reset ? 1 : this.page,
        per_page: this.perPage,
        search: this.search,
      });
    },

    pagination(page) {
      this.page = page;
      this.photographeStore.all_photographe({
        page: this.page,
        per_page: this.perPage,
      });
    },
    editItem(item) {
      this.new_photographe = { ...item };
      this.new_photographe.specialities = this.new_photographe.specialities.map(
        (el) => el.id
      );
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
          this.photographeStore.delete_photographe(item).then((response) => {
            if (response) {
              this.setup();
              ElNotification({
                title: "Succès",
                message: "La photographe a été supprimée.",
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
    validateForm() {
      const form = this.$refs.create_cat_form;
      if (form.reportValidity()) {
        // Le formulaire est valide, vous pouvez maintenant soumettre les données
        this.handleStore();
      }
    },
    handleStore() {
      const submitButtonRef = this.$refs.submitButtonRef;
      if (!submitButtonRef) {
        return;
      }
      //Disable button
      submitButtonRef.disabled = true;
      // Activate indicator
      submitButtonRef.setAttribute("data-kt-indicator", "on");
      // Modification ou Creation

      var data = {
        id: this.new_photographe.id,
        bio: this.new_photographe.bio,
        resume: this.new_photographe.resume,
        facebook_url: this.new_photographe.facebook_url,
        google_url: this.new_photographe.google_url,
        linkedin_url: this.new_photographe.linkedin_url,
        specialities: this.new_photographe.specialities,
        video: this.new_photographe.file,
      };

      this.photographeStore.edit_photographe(data).then((valid) => {
        submitButtonRef.disabled = false;
        submitButtonRef?.removeAttribute("data-kt-indicator");
        if (valid) {
          this.setup();

          ElNotification({
            title: "Succès",
            message: "Photographe modifié avec succès",
            position: "bottom-left",
            type: "success",
            customClass: "alert-success",
          });
          hideModal(this.$refs.newCardModalRef);
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
    },
  },
  computed: {
    imageUrl() {
      return import.meta.env.VITE_URL_IMAGES + "/";
    },
  },
  mounted() {
    this.photographeStore.all_photographe({
      page: this.page,
      per_page: this.perPage,
    });
    this.specialiteStore.all_specialite({
      page: 1,
      per_page: 1000,
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
</style>
