<template>
  <div
    class="flex flex-col flex-grow gap-8 form-container px-[24px]"
    @click.stop
  >
    <!-- Headline -->
    <div class="flex gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-grey-60 hover:stroke-grey-80 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>

      <h1 class="text-[24px] font-bold text-dark self-center">
        Select Product
      </h1>
    </div>

    <form @submit.prevent="$fetch" class="flex flex-col gap-4">
      <!-- Data Filter -->
      <DataFilter :date="false" :limiter="false" @change="setFilter" />

      <!-- Product List -->
      <div class="flex flex-col flex-grow justify-between gap-4">
        <p v-if="$fetchState.pending">Fetching products...</p>
        <div
          v-else
          v-for="product in products.data.result.data"
          @click="
            $emit('get-product', product)
            $emit('close-modal')
          "
          class="cursor-pointer"
        >
          <CardProduct v-bind="product" :key="product.id" :date="true" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
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
  },
  methods: {
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
