<template>
  <div
    class="overflow-y-auto flex flex-col min-w-[40%] h-full mr-[24px] mt-[24px]"
  >
    <form
      class="w-full card pt-[24px] flex-grow px-[40px]"
      @submit.prevent="editProduct"
      enctype="multipart/form-data"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">Edit Product</h1>
      </div>

      <!-- Brand -->
      <div class="form-group">
        <label for="" class="input-label">Brand</label>
        <p v-if="$fetchState.pending">Fetching brands...</p>
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
        <div class="flex items-center justify-center w-full">
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
        <p v-if="$fetchState.pending">Fetching warehouses...</p>
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
        <p v-if="$fetchState.pending">Fetching categories...</p>
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
      <div class="flex flex-row gap-4">
        <button type="submit" class="btn btn-primary mt-[14px] self-start">
          Save Changes
        </button>
        <button
          class="btn btn-danger mt-[14px] self-start"
          @click="setEdit(false)"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  props: {
    product_id: Number,
  },
  data() {
    return {
      image_path: 'http://localhost:8000/storage/',
      product_edit: [],
      brands: [],
      warehouses: [],
      categories: [],
      product: {
        brand_id: null,
        name: null,
        description: null,
        image: null,
        warehouse_id: null,
        category_id: null,
        _method: 'PUT',
      },
    }
  },
  async fetch() {
    if (this.product_id) {
      this.product_edit = await this.$axios.get(`/product/${this.product_id}`)

      this.product.brand_id = this.product_edit.data.result.product.brand_id
      this.product.name = this.product_edit.data.result.product.name
      this.product.description =
        this.product_edit.data.result.product.description
      this.product.warehouse_id =
        this.product_edit.data.result.product.warehouse_id
      this.product.category_id =
        this.product_edit.data.result.product.category_id

      this.brands = await this.$axios.get('/brand')
      this.warehouses = await this.$axios.get('/warehouse')
      this.categories = await this.$axios.get('/category')
    } else {
      this.setEdit(false)
    }
  },
  methods: {
    async editProduct() {
      let data = new FormData()

      for (const [key, value] of Object.entries(this.product)) {
        if (value) {
          data.append(key, value)
        }
      }

      try {
        let response = await this.$axios.post(
          `/product/${this.product_id}`,
          data,
          {
            'content-type': 'multipart/form-data',
          }
        )
        this.refreshData()
        this.setEdit(false)
      } catch (error) {
        console.log(error.message)
      }
    },
    updateImage(event) {
      this.product.image = event.target.files[0]
    },
    setEdit(status) {
      this.$store.commit('setEdit', status)
    },
    refreshData() {
      this.$store.commit('refreshData')
    },
  },
}
</script>
