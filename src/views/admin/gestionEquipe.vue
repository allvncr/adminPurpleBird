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
            Equipes
          </h1>
          <!--end::Title-->

          <!--begin::Breadcrumb-->
          <ul
            class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
          >
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">Gestion</li>

            <li class="breadcrumb-item">
              <span class="bullet bg-gray-400 w-5px h-2px"></span>
            </li>

            <li class="breadcrumb-item text-muted">Equipes</li>
            <!--end::Item-->
          </ul>
          <!--end::Breadcrumb-->
        </div>
        <div class="d-flex align-items-center gap-2 gap-lg-3">
          <a
            class="btn btn-sm fw-bold btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_1"
          >
            Ajouter
          </a>
          <!--end::Primary button-->
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
              placeholder="Rechercher equipe"
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
                <th>Nom</th>
                <th>Email</th>
                <th>Job</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-loading="equipeStore.equipeLoader"
              element-loading-background="#151521"
            >
              <tr v-for="(equipe, index) in equipeStore.equipes" :key="index">
                <td>{{ equipe.id }}</td>
                <td>{{ equipe.name }}</td>
                <td>{{ equipe.email }}</td>
                <td>{{ equipe.job }}</td>
                <td>
                  <div class="d-flex justify-content-end flex-shrink-0">
                    <a
                      @click="deleteItem(equipe)"
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
              :totalPages="equipeStore.equipeTotalPages"
              :total="equipeStore.equipeTotal"
              @page-change="pagination"
              v-model="page"
            ></table-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--begin::Close-->
    <div class="modal fade" tabindex="-1" id="kt_modal_1" ref="newCardModalRef">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="!current_edit">Nouveau equipe</h5>
            <h5 class="modal-title" v-else>Modifier equipe</h5>

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
                  <span class="required">Nom</span>
                </label>
                <input
                  v-model="new_equipe.name"
                  type="text"
                  name="name"
                  class="form-control form-control-solid"
                  placeholder=""
                  required
                />
              </div>
              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span class="required">Email</span>
                </label>
                <input
                  v-model="new_equipe.email"
                  type="email"
                  name="email"
                  class="form-control form-control-solid"
                  placeholder=""
                  required
                />
              </div>
              <div class="d-flex flex-column mb-7 fv-row">
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span class="required">Job</span>
                </label>
                <input
                  v-model="new_equipe.job"
                  type="text"
                  name="job"
                  class="form-control form-control-solid"
                  placeholder=""
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
import { useEquipeStore } from "../../stores/equipe";
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
      new_equipe: {
        name: "",
        email: "",
        job: "",
      },
      search: "",
      equipeStore: useEquipeStore(),
      showConfirmationModal: false,
      itemToDeleteIndex: null,
      current_edit: false,
    };
  },
  methods: {
    // Fonction de recherche
    debounceInput: _.debounce(function () {
      this.setup();
    }, 500),

    setup(reset = false) {
      if (reset) this.page = 1;
      this.equipeStore.all_equipe({
        page: reset ? 1 : this.page,
        per_page: this.perPage,
        search: this.search,
      });
    },

    pagination(page) {
      this.page = page;
      this.equipeStore.all_equipe({
        page: this.page,
        per_page: this.perPage,
      });
    },
    editItem(item) {
      this.current_edit = true;
      this.new_equipe = { ...item };
    },
    deleteItem(item) {
      Swal.fire({
        background: "#1e1e2d",
        text: "Êtes-vous sûr de vouloir supprimer " + item.name + " ?",
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
          this.equipeStore.delete_equipe(item).then((response) => {
            if (response) {
              this.setup();
              ElNotification({
                title: "Succès",
                message: "Le Equipe a été supprimé.",
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
      if (!this.current_edit) {
        this.equipeStore.store_equipe(this.new_equipe).then((valid) => {
          submitButtonRef.disabled = false;
          submitButtonRef?.removeAttribute("data-kt-indicator");
          if (valid) {
            this.setup();
            ElNotification({
              title: "Succès",
              message: "Equipe ajouté avec succès",
              position: "bottom-left",
              type: "success",
              customClass: "alert-success",
            });
            this.resetModal();
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
      } else {
        this.equipeStore.edit_equipe(this.new_equipe).then((valid) => {
          submitButtonRef.disabled = false;
          submitButtonRef?.removeAttribute("data-kt-indicator");
          if (valid) {
            this.setup();

            ElNotification({
              title: "Succès",
              message: "Equipe modifié avec succès",
              position: "bottom-left",
              type: "success",
              customClass: "alert-success",
            });
            this.resetModal();
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
    },
    resetModal() {
      this.new_equipe = {
        name: null,
        email: null,
        job: null,
      };
      this.current_edit = false;
      hideModal(this.$refs.newCardModalRef);
    },
  },
  computed: {},
  mounted() {
    this.equipeStore.all_equipe({
      page: this.page,
      per_page: this.perPage,
    });
    this.$el.addEventListener("hidden.bs.modal", this.resetModal);
  },
  destroyed() {
    this.$el.removeEventListener("hidden.bs.modal", this.resetModal);
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 72px;
}
</style>
