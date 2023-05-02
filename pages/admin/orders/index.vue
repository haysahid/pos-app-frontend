<template>
  <!-- Main -->
  <main
    class="ml-[220px] max-lg:ml-[88px] max-md:ml-0 max-w-[100%] flex justify-center my-[60px] p-[24px] ease-in-out duration-200 max-md:flex-col max-md:mb-[88px]"
  >
    <!-- Content -->
    <section
      class="flex flex-row justify-between gap-6 flex-grow max-md:max-w-none items-start overflow-y-auto max-w-[600px]"
    >
      <div class="flex flex-col flex-grow gap-8">
        <!-- Headline -->
        <div class="flex justify-between">
          <h1 class="text-[24px] font-bold text-dark self-center">
            Order List
          </h1>
          <NuxtLink
            :to="{ name: 'admin-createorder' }"
            class="btn btn-primary self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p class="max-sm:hidden">Add Order</p>
          </NuxtLink>
        </div>

        <form @submit.prevent="$fetch" class="flex flex-col gap-4">
          <!-- Data Filter -->
          <DataFilter :date="true" :limiter="true" @change="setFilter" />

          <!-- Page Control -->
          <div
            class="flex flex-row justify-between gap-8 max-md:flex-col max-md:justify-center max-md:gap-0 items-center"
          >
            <!-- Pagination -->
            <div class="">
              <p v-if="$fetchState.pending">Loading...</p>
              <vs-pagination
                class=""
                :total-pages="orders.data.result.last_page"
                :current-page="show.page"
                @change="changePage"
                v-else
              ></vs-pagination>
            </div>

            <!-- Showed Items -->
            <p class="py-[10px]" v-if="$fetchState.pending">Loading...</p>
            <p class="text-[12px] text-grey-80 py-[10px]" v-else>
              {{
                orders.data.result.data != 0
                  ? orders.data.result.to + 1 - orders.data.result.from
                  : '0'
              }}
              from {{ orders.data.result.total }} items
            </p>
          </div>

          <!-- Show -->
          <div
            class="flex items-center gap-8 justify-between max-sm:flex-col max-sm:gap-4"
          >
            <!-- Order Statuses -->
            <div class="flex gap-4 items-center">
              <select
                name=""
                id=""
                class="input-field bg-white border-white"
                v-model="show.status"
                @input="showByStatus"
              >
                <option value="">All</option>
                <option value="Success">Success</option>
                <option value="Pending Availability">
                  Pending Availability
                </option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="To be Refund">To be Refund</option>
                <option value="Refund">Refund</option>
              </select>

              <div class="text-[12px] text-grey-80" v-if="show.status != ''">
                {{ list_order.length }} items found
              </div>
            </div>

            <!-- Order Type -->
            <div class="flex gap-8 py-2">
              <div class="flex">
                <input
                  type="checkbox"
                  id="pre-order"
                  v-model="show.pre_order"
                  @input="showPreOrder"
                />
                <label for="pre-order" class="pl-2">Pre-Order</label>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  id="ready-stock"
                  v-model="show.ready_stock"
                  @input="showReadyStock"
                />
                <label for="ready-stock" class="pl-2">Ready Stock</label>
              </div>
            </div>
          </div>

          <!-- Order List -->
          <div class="flex flex-col flex-grow justify-between gap-4">
            <p v-if="$fetchState.pending">Fetching orders...</p>
            <div
              v-else
              v-for="order in list_order"
              class="cursor-pointer"
              @click="openOrderDetails(order)"
            >
              <CardOrder
                v-bind="order"
                :key="order.id"
                :status="getStatus(order)"
              />
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
                :total-pages="orders.data.result.last_page"
                :current-page="show.page"
                @change="changePage"
                v-else
              ></vs-pagination>
            </div>

            <!-- Showed Items -->
            <p class="self-center py-[10px]" v-if="$fetchState.pending">
              Loading...
            </p>
            <p class="self-center text-[12px] text-grey-80 py-[10px]" v-else>
              {{
                orders.data.result.data != 0
                  ? orders.data.result.to + 1 - orders.data.result.from
                  : '0'
              }}
              from {{ orders.data.result.total }} items
            </p>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  layout: 'LayoutDashboard',
  middleware: 'auth',
  data() {
    return {
      orders: [],
      list_order: [],
      edit: {
        order_id: null,
      },
      show: {
        search: null,
        date_start: null,
        date_end: null,
        limit: 25,
        page: null,
        status: '',
        pre_order: true,
        ready_stock: true,
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
      if (key != 'status') {
        if (value) {
          query_params[key] = value
        }
      }
    }

    // Get orders
    this.orders = await this.$axios.get('/order', {
      params: query_params,
    })

    // If page is null then set page to current_page
    if (!this.show.page) {
      this.show.page = this.orders.data.result.current_page
    }

    // Show by Status
    this.list_order = this.orders.data.result.data

    this.list_order = this.list_order.filter((item) =>
      this.getStatus(item).includes(this.show.status)
    )

    // Set url
    this.$router.push({
      name: 'admin-orders',
      query: {
        page: this.show.page,
      },
    })
  },
  methods: {
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
      this.show.limit = show.limit

      this.$fetch()
    },

    // Open Order Details
    openOrderDetails(order) {
      this.$router.push({
        name: 'admin-orders-id',
        params: {
          id: order.id,
        },
      })
    },

    // Status
    getStatus(order) {
      // Count Total Price
      let total_price = 0

      for (let item of order.order_items) {
        total_price += parseInt(item.quantity * item.price)
      }

      total_price = parseInt(total_price + order.shipping_costs)

      // Count Paid
      let total_paid = 0

      for (let payment of order.payments) {
        total_paid += parseInt(payment.amount)
      }

      // To Pay
      let to_pay = 0

      to_pay = total_price - total_paid

      // Status

      // Is order success? Yes
      if (order.availability == 1 && total_paid == total_price) {
        return 'Success'
      }

      // Is product availability known? Nope
      else if (order.availability == null) {
        return 'Pending Availability'
      }

      // Product available, but it is paid off? Not yet
      else if (order.availability == 1 && total_paid < total_price) {
        return 'Pending Payment'
      }

      // Product not available, but is there any payment? Yes
      else if (
        order.availability == 0 &&
        total_paid > 0 &&
        total_paid <= total_price
      ) {
        return 'To be refund'
      }

      // Product not available, but is there any payment? Nope
      else if (order.availability == 0 && total_paid == 0) {
        return 'Refund'
      }

      // Unknown
      else {
        return 'Unknown'
      }
    },

    // Show by Status
    showByStatus(event) {
      this.show.status = event.target.value
      if (this.show.status == '') {
        this.show.limit = 10
      } else {
        this.show.limit = 1000
      }
      this.$fetch()
    },

    // Show Pre-Order
    showPreOrder() {
      this.show.pre_order = !this.show.pre_order
      this.$fetch()
    },

    // Show Ready Stock
    showReadyStock() {
      this.show.ready_stock = !this.show.ready_stock
      this.$fetch()
    },
  },
}
</script>
