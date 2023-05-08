<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full pb-[100px]"
      @submit.prevent="addOrEditProduct"
      enctype="multipart/form-data"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ product_id ? 'Edit' : 'Add' }} Product
        </h1>
      </div>

      <!-- Brand -->
      <div class="form-group">
        <label for="" class="input-label required">Brand</label>
        <InputOptions
          v-model="product.brand_name"
          :items="brands"
          items_title="Brand Name"
          :validation="validation.errors?.brand_name"
        />

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="validation.errors?.brand_name"
        >
          {{ validation.errors?.brand_name[0] }}
        </p>
      </div>

      <!-- Product Name -->
      <div class="form-group">
        <label for="" class="input-label required">Product Name</label>
        <input
          type="text"
          class="input-field"
          placeholder="Product Name"
          v-model="product.name"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.name">
          {{ validation.errors?.name[0] }}
        </p>
      </div>

      <!-- Image -->
      <div class="form-group">
        <label for="" class="input-label">Image</label>

        <!-- Image Preview -->
        <div
          class="flex justify-center w-full input-field bg-gray-50 gap-4 p-5"
          v-if="product.image && !change_image"
        >
          <img
            :src="preview_image ? preview_image : imgUrl + product.image"
            alt=""
            class="w-[100px] rounded-[6px] object-cover aspect-square self-center"
          />
          <div class="self-center">
            <button
              type="button"
              class="btn btn-secondary"
              @click="
                change_image = true
                preview_image = false
              "
            >
              Change Image
            </button>
          </div>
        </div>

        <!-- Drop Image -->
        <div
          class="flex items-center justify-center w-full"
          v-if="
            (!product_id || change_image || product.image == '') &&
            !preview_image
          "
        >
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-36 border-[1.45px] border-grey-60 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              v-on:change="updateImage"
            />
          </label>
        </div>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="" class="input-label">Description</label>
        <textarea
          class="input-field"
          placeholder="Description"
          v-model="product.description"
        ></textarea>
      </div>

      <!-- Warehouse -->
      <div class="form-group">
        <label for="" class="input-label required">Warehouse</label>
        <InputOptions
          v-model="product.warehouse_name"
          :items="warehouses"
          items_title="Warehouse Name"
          :validation="validation.errors?.name"
        />

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="validation.errors?.warehouse_name"
        >
          {{ validation.errors?.warehouse_name[0] }}
        </p>
      </div>

      <!-- Category -->
      <div class="form-group">
        <label for="" class="input-label required">Category</label>
        <InputOptions
          v-model="product.category_name"
          :items="categories"
          items_title="Category"
          :validation="validation.errors?.category_name"
        />

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="validation.errors?.category_name"
        >
          {{ validation.errors?.category_name[0] }}
        </p>
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ product_id ? 'Save Changes' : 'Add Product' }}
          </button>
          <button
            class="btn btn-secondary self-start"
            type="button"
            @click="$emit('close-form')"
          >
            Cancel
          </button>
        </div>
        <button
          class="btn btn-danger self-end"
          type="button"
          @click="deleteProduct"
          v-if="product_id"
        >
          Delete
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    product_id: null,
  },
  data() {
    return {
      imgUrl: process.env.imgUrl,
      brands: [],
      warehouses: [],
      categories: [],
      product_edit: [],
      product: {
        brand_name: null,
        name: null,
        description: null,
        image: null,
        warehouse_name: null,
        category_name: null,
      },
      change_image: false,
      preview_image: null,

      // Validation
      validation: [],
    }
  },
  async fetch() {
    this.change_image = false

    // Get Brands
    const resBrands = await this.$axios.get('/api/brand')
    this.brands = resBrands.data.result

    // Get Warehouses
    const resWarehouses = await this.$axios.get('/api/warehouse')
    this.warehouses = resWarehouses.data.result

    // Get Categories
    const resCategories = await this.$axios.get('/api/category')
    this.categories = resCategories.data.result

    if (this.product_id) {
      // For Edit
      this.product_edit = await this.$axios.get(
        `/api/product/${this.product_id}`
      )

      const data = this.product_edit.data.result.product

      this.product.brand_name = data.brand.name
      this.product.name = data.name
      this.product.description = data.description
      this.product.image = data.image
      this.product.warehouse_name = data.warehouse.name
      this.product.category_name = data.category.name
    } else {
      // For Add
      this.product.brand_name = null
      this.product.name = null
      this.product.description = null
      this.product.image = null
      this.product.warehouse_name = null
      this.product.category_name = null
    }
  },
  watch: {
    // Re-Fetch Data
    product_id() {
      this.$fetch()
    },
  },
  methods: {
    async addOrEditProduct() {
      let data = new FormData()

      // Add Product
      if (!this.product_id) {
        for (const [key, value] of Object.entries(this.product)) {
          if (value) {
            data.append(key, value)
          }
        }

        try {
          let response = await this.$axios.post('/api/product', data, {
            'content-type': 'multipart/form-data',
          })

          this.product_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          this.validation = error.response.data
        }
      }

      // Edit Product
      if (this.product_id) {
        for (const [key, value] of Object.entries(this.product)) {
          if (value) {
            data.append(key, value)
          }
        }

        data.append('_method', 'PUT')

        try {
          let response = await this.$axios.post(
            `/api/product/${this.product_id}`,
            data,
            {
              'content-type': 'multipart/form-data',
            }
          )

          this.product_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          this.validation = error.response.data
        }
      }
    },

    // Delete Product
    async deleteProduct() {
      await this.$axios.delete(`/api/product/${this.product_id}`)

      this.product_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Update Image
    updateImage(event) {
      this.product.image = event.target.files[0]

      // Preview image
      let reader = new FileReader()
      reader.onload = (event) => {
        this.preview_image = event.target.result
      }

      reader.readAsDataURL(event.target.files[0])

      this.preview_image = true
      this.change_image = false
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },
  },
}
</script>
