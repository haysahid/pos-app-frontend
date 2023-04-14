<template>
  <main class="ml-[250px] max-w-[100%] flex justify-start mt-[72px]">
    <section
      class="flex felx-row justify-between gap-6 px-[24px] pt-[24px] flex-grow max-w-[60%] items-start overflow-y-auto"
    >
      <div class="flex flex-col flex-grow">
        <div class="flex justify-between mb-4">
          <h1 class="text-[24px] font-bold text-dark self-center">
            Product List
          </h1>
          <button
            class="btn btn-primary self-center"
            @click="addProduct = true"
          >
            + Add Product
          </button>
        </div>
        <div class="flex flex-col flex-grow justify-between gap-4">
          <p v-if="$fetchState.pending">Fetching products...</p>
          <div
            v-else
            v-for="product in products.data.result.data"
            @click="
              editProduct = true
              formProps.isEdit = true
              formProps.product = product
            "
            class="cursor-pointer"
          >
            <ProductCard v-bind="product" :key="product.id" />
          </div>
        </div>
      </div>
    </section>
    <ProductForm class="" v-if="addProduct" />
    <ProductForm v-bind="formProps" class="" v-if="editProduct" />
  </main>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      products: [],
      addProduct: false,
      editProduct: false,
      formProps: {
        isEdit: false,
        product: [],
        warehouses: [],
        categories: [],
      },
    }
  },
  async fetch() {
    this.products = await this.$axios.get('/product', {
      params: {
        limit: 100,
      },
    })

    this.formProps.warehouses = await this.$axios.get('/warehouse')

    this.formProps.categories = await this.$axios.get('/category')
  },
}
</script>
