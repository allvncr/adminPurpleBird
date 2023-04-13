<template>
  <div class="produit">
    <h1>Ajouter produit</h1>
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
          v-model="new_produit.name"
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
          <span class="required">Reference</span>
        </label>
        <input
          v-model="new_produit.reference"
          type="text"
          name="reference"
          class="form-control form-control-solid"
          placeholder=""
          required
        />
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Prix</span>
        </label>
        <input
          v-model="new_produit.price"
          type="number"
          name="price"
          class="form-control form-control-solid"
          placeholder=""
          step="any"
          required
        />
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Tableau Prix</span>
        </label>
        <el-select
          v-model="new_produit.prices"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Ajouter quantité"
        >
          <el-option
            v-for="item in prices"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Quantité Minimal</span>
        </label>
        <input
          v-model="new_produit.minimalQuantity"
          type="number"
          name="minimalQuantity"
          class="form-control form-control-solid"
          placeholder=""
          required
        />
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Tableau Quantité</span>
        </label>
        <el-select
          v-model="new_produit.quantities"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Ajouter quantité"
        >
          <el-option
            v-for="item in quantities"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Description</span>
        </label>
        <textarea
          v-model="new_produit.description"
          class="form-control form-control-solid"
          aria-label="With textarea"
          rows="6"
          required
        ></textarea>
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Couleur</span>
        </label>
        <input
          v-model="new_produit.color"
          type="text"
          name="color"
          class="form-control form-control-solid"
          placeholder=""
          required
        />
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span>Hexcode Couleur</span>
        </label>
        <el-select
          v-model="new_produit.hexCodeColors"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Ajouter hexcode"
        >
          <el-option
            v-for="item in hexCodeColors"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span>Tailles</span>
        </label>
        <el-select
          v-model="new_produit.sizes"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Ajouter tailles"
        >
          <el-option
            v-for="item in sizes"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Categorie</span>
        </label>
        <el-select
          v-model="new_produit.categories_fk"
          filterable
          default-first-option
          placeholder="Ajouter Categorie"
          @change="getSubCategorie"
        >
          <el-option
            v-for="item in categorieStore.categories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>

      <div
        class="d-flex flex-column mb-7 fv-row"
        v-if="new_produit.categories_fk && subCategorieStore.categorie"
      >
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Sous Categorie</span>
        </label>
        <el-select
          v-model="new_produit.subCategory_fk"
          filterable
          default-first-option
          placeholder="Ajouter Sous Categorie"
          @change="getInfoSubCategorie"
        >
          <el-option
            v-for="item in subCategorieStore.categorie.subCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div
        class="d-flex flex-column mb-7 fv-row"
        v-if="new_produit.subCategory_fk"
      >
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span>Info Sous Categorie</span>
        </label>
        <el-select
          v-model="new_produit.infoSubCategory_fk"
          filterable
          default-first-option
          placeholder="Ajouter Info Sous Categorie"
        >
          <el-option
            v-for="item in listeInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Liste des images</span>
        </label>
        <input
          required
          type="file"
          multiple
          name="image"
          class="form-control form-control-solid"
          accept="image/*"
          drop-placeholder="Déposer le fichier ici..."
          @change="onFileChange"
        />
      </div>

      <div class="footer">
        <button type="button" class="btn btn-light" @click="resetModal">
          Annuler
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
    </form>
  </div>
</template>

<script>
import { useProduitStore } from "../../stores/produit";
import { useColorStore } from "../../stores/color";
import { useCategorieStore } from "../../stores/categorieArticle";
import { useSubCategorieStore } from "../../stores/subCategorie";
import { useInfoSubCategorieStore } from "../../stores/infoSubCategorie";
import Editor from "@tinymce/tinymce-vue";
import { ElNotification } from "element-plus";

export default {
  components: { editor: Editor },
  data() {
    return {
      new_produit: {
        name: "",
        reference: "",
        price: "",
        minimalQuantity: "",
        description: "",
        color: "",
        hexCodeColors: [],
        sizes: [],
        quantities: [],
        prices: [],
        images: [],
        categories_fk: null,
        subCategory_fk: null,
        infoSubCategory_fk: null,
      },
      tinyMCE: {
        mobile: {
          menubar: true,
        },
        image_class_list: [
          { title: "Full width", value: "full-width" },
          { title: "Half width", value: "half-width" },
        ],
        object_resizing: true,
        paste_data_images: true,
        automatic_uploads: true,
        file_picker_types: "image media",
        file_picker_callback: this.imagePicker,
        height: 400,
        content_style:
          "body { background: #1b1b29; color: #ececec; font-size: 14pt; font-family: Arial; }",
        menubar: "file edit view insert format tools table help",
        plugins:
          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save | insertfile image media template link anchor codesample | ltr rtl",
      },
      produitStore: useProduitStore(),
      colorStore: useColorStore(),
      categorieStore: useCategorieStore(),
      subCategorieStore: useSubCategorieStore(),
      infoSubCategorieStore: useInfoSubCategorieStore(),
      current_edit: false,
      update_content: false,
      sizes: ["S", "M", "L", "XL", "XXL"],
      hexCodeColors: [],
      quantities: [],
      prices: [],
      listeInfo: [],
    };
  },
  methods: {
    convertToSlug(event) {
      if (event?.target?.value) {
        this.new_produit.slug = event?.target?.value
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(/[^\w\-]+/g, "") // Remove all non-word chars
          .replace(/\-\-+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, ""); // Trim - from end of text
      }
    },
    onFileChange(event) {
      const files = event.target.files;
      this.new_produit.images = files;
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

      // creation
      const formData = new FormData();
      formData.append("name", this.new_produit.name);
      formData.append("price", this.new_produit.price);
      formData.append("reference", this.new_produit.reference);
      formData.append("description", this.new_produit.description);
      formData.append("minimalQuantity", this.new_produit.minimalQuantity);
      formData.append("color", this.new_produit.color);
      formData.append("hexCodeColors", this.new_produit.hexCodeColors);
      formData.append("quantities", this.new_produit.quantities);
      formData.append("prices", this.new_produit.prices);

      for (let i = 0; i < this.new_produit.images.length; i++) {
        formData.append("images[]", this.new_produit.images[i]);
      }

      var categories_fk = [];
      categories_fk.push(this.new_produit.categories_fk);
      formData.append("categories_fk", categories_fk);

      if (this.new_produit.sizes.length)
        formData.append("sizes", this.new_produit.sizes);

      formData.append("subCategory_fk", this.new_produit.subCategory_fk);

      if (this.new_produit.infoSubCategory_fk)
        formData.append(
          "infoSubCategory_fk",
          this.new_produit.infoSubCategory_fk
        );
      this.produitStore.store_produit(formData).then((valid) => {
        submitButtonRef.disabled = false;
        submitButtonRef?.removeAttribute("data-kt-indicator");
        if (valid) {
          ElNotification({
            title: "Succès",
            message: "Article ajouté avec succès",
            position: "bottom-left",
            type: "success",
            customClass: "alert-success",
          });
          this.resetModal();
        } else {
          ElNotification({
            title: "Erreur",
            message: "Une erreur est survenue !",
            position: "bottom-left",
            type: "error",
            customClass: "alert-danger",
          });
        }
      });

      // else {
      //   const formData = new FormData();
      //   const content = this.new_produit.content;
      //   const doc = new DOMParser().parseFromString(content, "text/html");
      //   const imgElements = doc.querySelectorAll("img");
      //   for (let i = 0; i < imgElements.length; i++) {
      //     if (imgElements[i].alt === "") {
      //       imgElements[i].setAttribute("alt", this.new_produit.title);
      //     }
      //   }
      //   this.new_produit.content = doc.body.innerHTML;
      //   formData.append("id", this.new_produit.id);

      //   if (this.new_produit.title != this.produitStore.produit.title)
      //     formData.append("title", this.new_produit.title);

      //   if (this.new_produit.slug != this.produitStore.produit.slug)
      //     formData.append("slug", this.new_produit.slug);

      //   if (this.new_produit.meta_title != this.produitStore.produit.meta_title)
      //     formData.append("meta_title", this.new_produit.meta_title);

      //   if (
      //     this.new_produit.meta_description !=
      //     this.produitStore.produit.meta_description
      //   )
      //     formData.append(
      //       "meta_description",
      //       this.new_produit.meta_description
      //     );

      //   if (this.update_content)
      //     formData.append("content", this.new_produit.content);

      //   if (this.new_produit.file)
      //     formData.append("image", this.new_produit.file);

      //   if (
      //     this.new_produit.description != this.produitStore.produit.description
      //   )
      //     formData.append("description", this.new_produit.description);

      //   if (this.new_produit.visible != this.produitStore.produit.visible)
      //     formData.append("visible", this.new_produit.visible ? 1 : 0);

      //   if (
      //     !this.tableauxSontEgaux(
      //       this.new_produit.categories,
      //       this.produitStore.produit.categories
      //     )
      //   ) {
      //     var cat = [];
      //     this.new_produit.categories.forEach((element) => {
      //       if (element.id) cat.push(element.id);
      //       else cat.push(element);
      //     });
      //   }
      //   this.produitStore.edit_article(formData, cat).then((valid) => {
      //     submitButtonRef.disabled = false;
      //     submitButtonRef?.removeAttribute("data-kt-indicator");
      //     if (valid) {
      //       this.update_content = false;
      //       ElNotification({
      //         title: "Succès",
      //         message: "Article modifié avec succès",
      //         position: "bottom-left",
      //         type: "success",
      //         customClass: "alert-success",
      //       });
      //     } else {
      //       const error = Object.values(this.produitStore.errors);
      //       ElNotification({
      //         title: "Erreur",
      //         message: error[0][0],
      //         position: "bottom-left",
      //         type: "error",
      //         customClass: "alert-danger",
      //       });
      //     }
      //   });
      // }
    },

    edit_content(content) {
      if (content) this.update_content = true;
    },

    resetModal() {
      this.new_produit = {
        name: "",
        reference: "",
        price: "",
        minimalQuantity: "",
        description: "",
        color: "",
        hexCodeColors: [],
        sizes: [],
        quantities: [],
        prices: [],
        images: [],
        categories_fk: null,
        subCategory_fk: null,
        infoSubCategory_fk: null,
      };

      this.$router.push("/produits");
    },
    getSubCategorie(cat) {
      this.listeInfo = [];
      this.subCategorieStore.get_subcategorie(cat);
    },
    getInfoSubCategorie(cat) {
      this.listeInfo = [];
      var categorie = { ...this.subCategorieStore.categorie };
      var subCategories = categorie.subCategories;
      var infosubCategories = subCategories.find((item) => item.id == cat);

      this.listeInfo = { ...infosubCategories.infoSubCategories };
    },
  },
  computed: {
    imageUrl() {
      return import.meta.env.VITE_URL_IMAGES + "/";
    },
    listSubCategories() {
      var list = [];

      return list;
    },
  },
  mounted() {
    if (!isNaN(this.$route.query.id)) {
      this.produitStore.get_produit(this.$route.query.id).then(() => {
        this.new_produit = { ...this.produitStore.produit };
        this.current_edit = true;
      });
    }
    this.categorieStore.all_categorie();
    this.colorStore.all_color();
  },
};
</script>

<style lang="scss" scoped>
.produit {
  padding: 36px 0;
}
h1 {
  margin-bottom: 24px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.couverture {
  max-height: 300px;
  max-height: 300px;
}
</style>
