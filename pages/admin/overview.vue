<template>
  <main
    class="ml-[220px] max-lg:ml-[88px] max-md:ml-0 max-w-[100%] flex justify-center my-[60px] p-[24px] ease-in-out duration-200 max-md:flex-col max-md:mb-[88px]"
  >
    <section
      class="flex flex-row justify-between gap-6 flex-grow max-md:max-w-none items-start"
    >
      <div class="flex flex-col flex-grow gap-6">
        <!-- Title -->
        <div class="flex flex-start gap-6 items-center">
          <!-- Title -->
          <h1 class="text-[24px] font-bold text-dark py-2">Overview</h1>

          <!-- Range -->
          <div class="flex gap-4 items-center">
            <div class="text-grey-80">Show</div>
            <select
              name=""
              id=""
              class="input-field bg-white border-white text-dark"
              v-model="range"
              @input="showByRange"
            >
              <option value="">All</option>
              <option value="1">Today</option>
              <option value="7">Last 1 Week</option>
              <option value="30">Last 1 Month</option>
              <option value="365">Last 1 Year</option>
            </select>
          </div>
        </div>

        <!-- Summary -->
        <div class="flex flex-col gap-4">
          <!-- Cards -->
          <div class="flex flex-wrap flex-grow justify-between gap-4">
            <!-- Product -->
            <NuxtLink :to="{ name: 'admin-products' }" class="flex-grow">
              <CardOverview
                headline="Count Product"
                :value="reports.count_product"
                type="product"
              />
            </NuxtLink>

            <!-- Customer -->
            <NuxtLink :to="{ name: 'admin-customers' }" class="flex-grow">
              <CardOverview
                headline="Count Customer"
                :value="reports.count_customer"
                type="customer"
              />
            </NuxtLink>

            <!-- Order -->
            <NuxtLink :to="{ name: 'admin-orders' }" class="flex-grow">
              <CardOverview
                headline="Count Order"
                :value="reports.count_order"
                type="order"
              />
            </NuxtLink>

            <!-- Revenue -->
            <NuxtLink :to="{ name: 'admin-orders' }" class="flex-grow">
              <CardOverview
                headline="Count Revenue"
                :value="$toCurrencyString(parseInt(this.reports.count_revenue))"
                type="revenue"
              />
            </NuxtLink>
          </div>
        </div>

        <div class="flex flex-row gap-6 max-lg:flex-col">
          <!-- Payment Transaction -->
          <div
            class="card py-6 px-0 flex-grow flex-row gap-8 justify-between max-h-[600px]"
          >
            <div class="relative flex flex-col gap-6 flex-grow">
              <!-- Headline -->
              <h2 class="text-dark text-[16px] font-bold px-6">
                Today Transactions
              </h2>

              <!-- Content -->
              <div
                class="overflow-y-auto px-6 pb-[60px] h-full"
                v-if="payments"
              >
                <!-- Show Content -->
                <table class="w-full" v-if="payments.length > 0">
                  <tbody class="divide-y divide-gray-200">
                    <tr
                      class="hover:bg-secondary cursor-pointer"
                      v-for="transaction in payments"
                      @click="
                        $router.push({
                          name: 'admin-orders-id',
                          params: {
                            id: transaction.order_id,
                          },
                        })
                      "
                    >
                      <td class="flex flex-col gap-y-2 py-4">
                        <div class="text-dark font-semibold">
                          {{ transaction.order.customer.name }}
                        </div>
                        <div class="flex flex-col gap-2">
                          <div class="text-grey-80">
                            {{
                              transaction.order.order_items[0].quantity +
                              ' x ' +
                              transaction.order.order_items[0].product.name
                            }}
                          </div>
                          <div class="text-grey-80">
                            {{ transaction.order.order_items[0].color }}
                          </div>
                        </div>
                      </td>
                      <td class="">
                        <div class="text-dark mb-2">
                          {{ transaction.information }}
                        </div>
                        <div class="flex flex-wrap gap-2 text-grey-80">
                          <div class="">
                            {{ transaction.created_at.split(' ')[0] }}
                          </div>
                          <div class="">
                            {{ transaction.created_at.split(' ')[1] }}
                          </div>
                        </div>
                      </td>

                      <!-- Positive Revenue -->
                      <td
                        class="text-right text-green-600"
                        v-if="transaction.amount > 0"
                      >
                        +{{ $toCurrencyString(parseInt(transaction.amount)) }}
                      </td>

                      <!-- Negative Revenue -->
                      <td class="text-right text-red-600" v-else>
                        {{ $toCurrencyString(parseInt(transaction.amount)) }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Show Empty -->
                <ShowEmpty
                  v-else
                  message="Oops! There are no transactions today :)"
                />
              </div>

              <!-- Fade -->
              <div
                class="absolute -bottom-2 bg-gradient-to-t from-white to-transparent w-full h-[60px]"
              ></div>
            </div>
          </div>

          <!-- Best Seller -->
          <div
            class="card py-6 px-0 flex-grow flex-row gap-8 justify-between max-w-[450px] max-lg:max-w-none max-sm:max-w-none max-h-[600px]"
          >
            <div class="relative flex flex-col gap-6 flex-grow">
              <!-- Headline -->
              <h2 class="text-dark text-[16px] font-bold px-6">
                Top 10 Best Seller Product
              </h2>

              <!-- Content -->
              <div
                class="flex flex-col divide-y divide-gray-200 overflow-y-auto px-6 pb-[60px]"
              >
                <div
                  v-if="products"
                  v-for="product in products"
                  class="flex gap-2 items-center cursor-pointer"
                >
                  <CardProduct
                    v-bind="product"
                    :key="product.id"
                    :date="true"
                    class=""
                  />
                  <div class="py-2 px-4 bg-primary text-white rounded-full">
                    {{ product.sold }}
                  </div>
                </div>
              </div>

              <!-- Fade -->
              <div
                class="absolute -bottom-2 bg-gradient-to-t from-white to-transparent w-full h-[60px]"
              ></div>
            </div>
          </div>
        </div>
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
      reports: [],
      payments: [],
      products: [],
      range: '',
    }
  },
  async fetch() {
    // Get Reports
    let resReports = []

    if (this.range == '') {
      resReports = await this.$axios.get('/api/report')
    } else {
      resReports = await this.$axios.get('/api/report', {
        params: {
          range: this.range,
        },
      })
    }

    this.reports = resReports.data.result

    // Get Payments
    const resPayments = await this.$axios.get('/api/order/all/payment', {
      params: {
        range: 1,
      },
    })
    this.payments = resPayments.data.result.data

    // Get Best Seller Product
    const resProducts = await this.$axios.get('/api/product', {
      params: {
        top: 10,
      },
    })

    this.products = resProducts.data.result
  },
  methods: {
    // Show by Range
    showByRange(event) {
      this.range = event.target.value

      this.$fetch()
    },
  },
}
</script>
