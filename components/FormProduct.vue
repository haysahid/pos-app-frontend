<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full"
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
        <label for="" class="input-label">Brand</label>
        <select v-if="$fetchState.pending" class="input-field text-grey-40">
          <option value="">Loading...</option>
        </select>
        <select
          name=""
          id=""
          class="input-field"
          v-else
          v-model="product.brand_id"
        >
          <option :value="brand.id" v-for="brand in brands.data.result">
            {{ brand.name }}
          </option>
        </select>
      </div>

      <!-- Product Name -->
      <div class="form-group">
        <label for="" class="input-label">Product Name*</label>
        <input
          type="text"
          class="input-field"
          placeholder="Product Name"
          v-model="product.name"
        />
      </div>

      <!-- Image -->
      <div class="form-group">
        <label for="" class="input-label">Image</label>

        <!-- Image Preview -->
        <div
          class="flex justify-center w-full border-[1.45px] border-grey-60 rounded-lg bg-gray-50 gap-4 p-5"
          v-if="product.image && !change_image"
        >
          <img
            :src="preview_image ? preview_image : image_path + product.image"
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
        <label for="" class="input-label">Warehouse*</label>
        <select v-if="$fetchState.pending" class="input-field text-grey-40">
          <option value="">Loading...</option>
        </select>
        <select
          name=""
          id=""
          class="input-field"
          v-else
          v-model="product.warehouse_id"
        >
          <option
            :value="warehouse.id"
            v-for="warehouse in warehouses.data.result"
          >
            {{ warehouse.name }}
          </option>
        </select>
      </div>

      <!-- Category -->
      <div class="form-group">
        <label for="" class="input-label">Category</label>
        <select v-if="$fetchState.pending" class="input-field text-grey-40">
          <option value="">Loading...</option>
        </select>
        <select
          name=""
          id=""
          class="input-field"
          v-else
          v-model="product.category_id"
        >
          <option
            :value="category.id"
            v-for="category in categories.data.result"
          >
            {{ category.name }}
          </option>
        </select>
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
      image_path: 'http://localhost:8000/storage/',
      brands: [],
      warehouses: [],
      categories: [],
      product_edit: [],
      product: {
        brand_id: null,
        name: null,
        description: null,
        image: null,
        warehouse_id: null,
        category_id: null,
      },
      change_image: false,
      preview_image: null,
    }
  },
  async fetch() {
    this.change_image = false

    this.brands = await this.$axios.get('/brand')
    this.warehouses = await this.$axios.get('/warehouse')
    this.categories = await this.$axios.get('/category')

    if (this.product_id) {
      // For Edit
      this.product_edit = await this.$axios.get(`/product/${this.product_id}`)

      const data = this.product_edit.data.result.product

      this.product.brand_id = data.brand_id
      this.product.name = data.name
      this.product.description = data.description
      this.product.image = data.image
      this.product.warehouse_id = data.warehouse_id
      this.product.category_id = data.category_id
    } else {
      // For Add
      this.product.brand_id = null
      this.product.name = null
      this.product.description = null
      this.product.image = null
      this.product.warehouse_id = null
      this.product.category_id = null
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
          let response = await this.$axios.post('/product', data, {
            'content-type': 'multipart/form-data',
          })
        } catch (error) {
          console.log(error.message)
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
            `/product/${this.product_id}`,
            data,
            {
              'content-type': 'multipart/form-data',
            }
          )
        } catch (error) {
          console.log(error.message)
        }
      }

      this.product_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Delete Product
    async deleteProduct() {
      await this.$axios.delete(`/product/${this.product_id}`)

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
      this.$store.commit('refreshData')
    },
  },
}
</script>
