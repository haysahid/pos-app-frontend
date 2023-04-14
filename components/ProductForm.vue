<template>
  <div
    class="overflow-y-auto flex flex-col min-w-[40%] h-full mr-[24px] mt-[24px]"
  >
    <form class="w-full card pt-[24px] flex-grow px-[40px]">
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ isEdit ? 'Edit Product' : 'Add Product' }}
        </h1>
      </div>
      <div class="form-group">
        <label for="" class="input-label">Brand Name*</label>
        <input
          type="text"
          class="input-field"
          placeholder="Brand Name"
          :value="isEdit ? product.brand.name : ''"
        />
      </div>
      <div class="form-group">
        <label for="" class="input-label">Product Name*</label>
        <input
          type="text"
          class="input-field"
          placeholder="Product Name"
          :value="isEdit ? product.name : ''"
        />
      </div>
      <div class="form-group">
        <label for="" class="input-label">Image</label>
        <img
          :src="'http://localhost:8000/' + product.image"
          alt=""
          v-if="product.image != null"
        />
        <div class="flex items-center justify-center w-full" v-else>
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
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="" class="input-label">Description</label>
        <textarea class="input-field" placeholder="Description"
          >{{ isEdit ? product.description : '' }} </textarea
        >
      </div>
      <div class="form-group">
        <label for="" class="input-label">Warehouse*</label>
        <select name="" id="" class="input-field">
          <option
            :value="warehouse.id"
            v-for="warehouse in warehouses.data.result"
          >
            {{ warehouse.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="" class="input-label">Category</label>
        <select name="" id="" class="input-field">
          <option
            :value="categories.id"
            v-for="category in categories.data.result"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-row gap-4">
        <a href="index.html" class="btn btn-primary mt-[14px] self-start">
          Add Product
        </a>
        <a href="index.html" class="btn btn-danger mt-[14px] self-start">
          Cancel
        </a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: Boolean,
    product: [],
    warehouses: [],
    categories: [],
  },
}
</script>
