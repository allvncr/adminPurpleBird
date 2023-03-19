<template>
  <div class="article">
    <h1>Ajouter article</h1>
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
          <span class="required">Titre</span>
        </label>
        <input
          v-model="new_article.title"
          type="text"
          name="title"
          class="form-control form-control-solid"
          placeholder=""
          required
          @input="(event) => convertToSlug(event)"
        />
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Slug</span>
        </label>
        <input
          v-model="new_article.slug"
          type="text"
          name="slug"
          class="form-control form-control-solid"
          placeholder=""
          required
        />
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Meta title</span>
        </label>
        <input
          v-model="new_article.meta_title"
          type="text"
          name="slug"
          class="form-control form-control-solid"
          placeholder=""
          required
        />
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Meta description</span>
        </label>
        <textarea
          v-model="new_article.meta_description"
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
          <span>Categorie</span>
        </label>
        <el-select
          multiple
          placeholder="Selectionner categories"
          class="form-control form-control-solid"
          v-model="new_article.categories"
          filterable
        >
          <el-option
            v-for="cat in categorieStore.categories"
            :key="cat.name"
            :value="cat.id"
            :label="cat.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span>Couverture de l’article</span>
        </label>
        <input
          v-if="!current_edit"
          type="file"
          name="image"
          class="form-control form-control-solid"
          accept="image/*"
          drop-placeholder="Déposer le fichier ici..."
          @change="onFileChange"
        />
        <input
          v-else
          type="file"
          name="image"
          class="form-control form-control-solid"
          accept="image/*"
          drop-placeholder="Déposer le fichier ici..."
          @change="onFileChange"
        />
      </div>
      <div class="d-flex flex-column mb-7 fv-row" v-if="!current_edit">
        <img
          class="couverture"
          :src="new_article.preview"
          v-if="new_article.image"
          alt="couverture"
        />
      </div>
      <div class="d-flex flex-column mb-7 fv-row" v-else>
        <img
          class="couverture"
          :src="new_article.preview"
          v-if="new_article.file"
          alt="couverture"
        />
        <img
          class="couverture"
          :src="imageUrl + new_article.image"
          v-else-if="new_article.image"
          alt="couverture"
        />
      </div>
      <div class="d-flex flex-column mb-7 fv-row">
        <label
          class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
        >
          <span class="required">Description</span>
        </label>
        <textarea
          v-model="new_article.description"
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
          <span class="required">Corps de l’article</span>
        </label>
        <editor
          v-model="new_article.content"
          api-key="6itu2h8db7a0nwt6vjq1pvdc14jlwq1a3kyhw3yur24rsjm2"
          :init="tinyMCE"
          @change="edit_content"
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
import { useArticleStore } from "../../stores/article";
import { useCategorieArticleStore } from "../../stores/categorieArticle";
import Editor from "@tinymce/tinymce-vue";
import { ElNotification } from "element-plus";

export default {
  components: { editor: Editor },
  data() {
    return {
      new_article: {
        title: "",
        slug: "",
        meta_title: "",
        meta_description: "",
        categories: [],
        description: "",
        content: "",
        image: null,
        preview: null,
        file: null,
        visible: true,
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
      articleStore: useArticleStore(),
      categorieStore: useCategorieArticleStore(),
      current_edit: false,
      update_content: false,
    };
  },
  methods: {
    convertToSlug(event) {
      if (event?.target?.value) {
        this.new_article.slug = event?.target?.value
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
      const file = event.target.files[0];
      if (!this.current_edit) this.new_article.image = file;
      else this.new_article.file = file;

      if (file) this.new_article.preview = URL.createObjectURL(file);
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
        // creation
        const content = this.new_article.content;
        const doc = new DOMParser().parseFromString(content, "text/html");
        const imgElements = doc.querySelectorAll("img");
        for (let i = 0; i < imgElements.length; i++) {
          if (imgElements[i].alt === "") {
            imgElements[i].setAttribute("alt", this.new_article.title);
          }
        }
        this.new_article.content = doc.body.innerHTML;

        const formData = new FormData();
        formData.append("id", this.new_article.id);
        formData.append("title", this.new_article.title);
        formData.append("slug", this.new_article.slug);
        formData.append("meta_title", this.new_article.meta_title);
        formData.append("meta_description", this.new_article.meta_description);
        formData.append("content", this.new_article.content);
        if (this.new_article.image)
          formData.append("image", this.new_article.image);
        formData.append("description", this.new_article.description);
        formData.append("visible", this.new_article.visible ? 1 : 0);
        var cat = [];
        this.new_article.categories.forEach((element) => {
          if (element.id) cat.push(element.id);
          else cat.push(element);
        });
        formData.append("categorie_ids[]", cat);
        this.articleStore.store_article(formData).then((valid) => {
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
            const error = Object.values(this.articleStore.errors);
            ElNotification({
              title: "Erreur",
              message: error[0][0],
              position: "bottom-left",
              type: "error",
              customClass: "alert-danger",
            });
          }
        });
      } else {
        // modification
        const formData = new FormData();
        const content = this.new_article.content;
        const doc = new DOMParser().parseFromString(content, "text/html");
        const imgElements = doc.querySelectorAll("img");
        for (let i = 0; i < imgElements.length; i++) {
          if (imgElements[i].alt === "") {
            imgElements[i].setAttribute("alt", this.new_article.title);
          }
        }
        this.new_article.content = doc.body.innerHTML;
        formData.append("id", this.new_article.id);

        if (this.new_article.title != this.articleStore.article.title)
          formData.append("title", this.new_article.title);

        if (this.new_article.slug != this.articleStore.article.slug)
          formData.append("slug", this.new_article.slug);

        if (this.new_article.meta_title != this.articleStore.article.meta_title)
          formData.append("meta_title", this.new_article.meta_title);

        if (
          this.new_article.meta_description !=
          this.articleStore.article.meta_description
        )
          formData.append(
            "meta_description",
            this.new_article.meta_description
          );

        if (this.update_content)
          formData.append("content", this.new_article.content);

        if (this.new_article.file)
          formData.append("image", this.new_article.file);

        if (
          this.new_article.description != this.articleStore.article.description
        )
          formData.append("description", this.new_article.description);

        if (this.new_article.visible != this.articleStore.article.visible)
          formData.append("visible", this.new_article.visible ? 1 : 0);

        if (
          !this.tableauxSontEgaux(
            this.new_article.categories,
            this.articleStore.article.categories
          )
        ) {
          var cat = [];
          this.new_article.categories.forEach((element) => {
            if (element.id) cat.push(element.id);
            else cat.push(element);
          });
        }
        this.articleStore.edit_article(formData, cat).then((valid) => {
          submitButtonRef.disabled = false;
          submitButtonRef?.removeAttribute("data-kt-indicator");
          if (valid) {
            this.update_content = false;
            ElNotification({
              title: "Succès",
              message: "Article modifié avec succès",
              position: "bottom-left",
              type: "success",
              customClass: "alert-success",
            });
          } else {
            const error = Object.values(this.articleStore.errors);
            ElNotification({
              title: "Erreur",
              message: error[0][0],
              position: "bottom-left",
              type: "error",
              customClass: "alert-danger",
            });
          }
        });
      }
    },

    edit_content(content) {
      if (content) this.update_content = true;
    },

    resetModal() {
      this.new_article = {
        title: "",
        slug: "",
        meta_title: "",
        meta_description: "",
        categories: [],
        description: "",
        content: "",
        image: null,
        file: null,
        preview: null,
        visible: true,
      };

      this.$router.push("/articles");
    },
    // fonction pour convertir fichier local pour tinyMCE
    imagePicker(callback, value, meta) {
      if (meta.filetype == "image") {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.onchange = function () {
          var file = this.files[0];
          var reader = new FileReader();
          reader.onload = function () {
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(",")[1];
            var blobInfo = blobCache.create(file.name, file, base64);
            callback(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };
        input.click();
      }
      if (meta.filetype == "media") {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "video/*");
        input.onchange = function () {
          var file = this.files[0];
          var reader = new FileReader();
          reader.onload = function () {
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(",")[1];
            var blobInfo = blobCache.create(file.name, file, base64);
            callback(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };
        input.click();
      }
    },
    // Fonction qui verifie si le tableau de categorie à été modifier
    tableauxSontEgaux(tableau1, tableau2) {
      if (tableau1.length !== tableau2.length) {
        return false;
      }

      for (let i = 0; i < tableau1.length; i++) {
        if (tableau1[i] !== tableau2[i]) {
          return false;
        }
      }

      return true;
    },
  },
  computed: {
    imageUrl() {
      return import.meta.env.VITE_URL_IMAGES + "/";
    },
  },
  mounted() {
    if (!isNaN(this.$route.query.id)) {
      this.articleStore.get_article(this.$route.query.id).then(() => {
        this.new_article = { ...this.articleStore.article };
        this.current_edit = true;
      });
    }
    this.categorieStore.all_categorie({
      page: 1,
      per_page: -1,
    });
  },
};
</script>

<style lang="scss" scoped>
.article {
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
