<template>
  <!-- Main -->
  <main
    class="ml-[250px] max-lg:ml-[88px] max-md:ml-0 max-w-[100%] flex justify-center my-[60px] p-[24px] ease-in-out duration-200 max-md:flex-col"
  >
    <!-- Content -->
    <section
      class="flex flex-row justify-between gap-6 flex-grow min-w-[360px] max-md:max-w-none items-start overflow-y-auto max-w-[600px]"
    >
      <div class="flex flex-col flex-grow gap-8">

        <!-- Headline -->
        <div class="flex justify-between">
          <h1 class="text-[24px] font-bold text-dark self-center">
            Product List
          </h1>
          <button class="btn btn-primary self-center" @click="showForm(null)">
            + Add Product
          </button>
        </div>

        <form @submit.prevent="$fetch" class="flex flex-col gap-4">
          <!-- Data Filter -->
          <DataFilter :date="false" @change="setFilter" />

          <!-- Page Control -->
          <div
            class="flex flex-row justify-between gap-8 max-md:flex-col max-md:justify-center max-md:gap-0"
          >
            <!-- Pagination -->
            <div class="">
              <p v-if="$fetchState.pending">Loading...</p>
              <vs-pagination
                class=""
                :total-pages="products.data.result.last_page"
                :current-page="show.page"
                @change="changePage"
                v-else
              ></vs-pagination>
            </div>

            <!-- Showed Items -->
            <p class="self-center py-[10px]" v-if="$fetchState.pending">
              Loading...
            </p>
            <p class="self-center text-grey-80 py-[10px]" v-else>
              {{
                products.data.result.data != 0
                  ? products.data.result.to + 1 - products.data.result.from
                  : '0'
              }}
              from {{ products.data.result.total }} items
            </p>
          </div>

          <!-- Product List -->
          <div
            class="flex flex-col flex-grow justify-between gap-4"
            :key="refreshData"
          >
            <p v-if="$fetchState.pending">Fetching products...</p>
            <div
              v-else
              v-for="product in products.data.result.data"
              @click="showForm(product.id)"
              class="cursor-pointer"
            >
              <ProductCard v-bind="product" :key="product.id" />
            </div>
          </div>

          <!-- Page Control -->
          <div
            class="flex flex-row justify-between gap-8 max-md:flex-col max-md:justify-center max-md:gap-0"
          >
            <!-- Pagination -->
            <div class="">
              <p v-if="$fetchState.pending">Loading...</p>
              <vs-pagination
                class=""
                :total-pages="products.data.result.last_page"
                :current-page="show.page"
                @change="changePage"
                v-else
              ></vs-pagination>
            </div>

            <!-- Showed Items -->
            <p class="self-center py-[10px]" v-if="$fetchState.pending">
              Loading...
            </p>
            <p class="self-center text-grey-80 py-[10px]" v-else>
              {{
                products.data.result.data != 0
                  ? products.data.result.to + 1 - products.data.result.from
                  : '0'
              }}
              from {{ products.data.result.total }} items
            </p>
          </div>
        </form>
      </div>
    </section>

    <!-- Product Form -->
    <aside class="w-[450px] max-md:w-full h-full bg-white" v-if="form"></aside>
    <aside
      class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-white overflow-y-auto z-[899] shadow-lg pt-[56px]"
      v-if="form"
    >
      <FormProduct class="" v-bind="edit" @close-form="closeForm" />
    </aside>
  </main>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      form: false,
      products: [],
      edit: {
        product_id: null,
      },
      refresh: 0,
      show: {
        search: null,
        date_start: null,
        date_end: null,
        limit: 10,
        page: null,
      },
    }
  },
  async fetch() {
    // If searching then set page to 1
    if (this.show.search) {
      this.show.page = 1
    }

    // Add query params
    let query_params = {}
    for (const [key, value] of Object.entries(this.show)) {
      if (value) {
        query_params[key] = value
      }
    }

    // Get products
    this.products = await this.$axios.get('/product', {
      params: query_params,
    })

    // If page is null then set page to current_page
    if (!this.show.page) {
      this.show.page = this.products.data.result.current_page
    }

    // Set url
    this.$router.push({
      name: 'admin-products',
      query: {
        page: this.show.page,
      },
    })
  },
  computed: {
    // Refresh Data
    refreshData() {
      this.refresh = this.$store.state.refresh
      return this.refresh
    },
  },
  watch: {
    // Re-Fetch Data
    refresh() {
      this.$fetch()
    },
  },
  methods: {
    // Show Form
    showForm(product_id = null) {
      this.closeForm()

      if (product_id) {
        this.edit.product_id = product_id
      }

      this.form = true
    },

    // Close Form
    closeForm() {
      this.edit.product_id = null
      this.form = false
    },

    // Change Page
    changePage(page) {
      this.show.page = page
      this.$fetch()
    },

    // Set Filter
    setFilter(show) {
      this.show.search = show.search
      this.show.date_start = show.date_start
      this.show.date_end = show.date_end

      this.$fetch()
    },
  },
}
</script>
