<template>
  <main
    class="max-w-[100%] flex justify-center my-[60px] print:my-0 p-[24px] print:p-0 ease-in-out duration-200"
  >
    <section
      class="flex flex-row justify-center print:self-start gap-6 flex-grow max-md:max-w-none items-start overflow-y-auto"
    >
      <div class="flex flex-col flex-grow gap-8 max-w-[700px] max-sm:min-w-0">
        <!-- Headline -->
        <div class="flex justify-between print:hidden">
          <div class="flex flex-row gap-4 items-center">
            <button type="button" @click="$router.back()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-6 h-6 stroke-grey-60 hover:stroke-grey-80 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </button>

            <h1
              class="text-[24px] font-bold text-dark self-center line-clamp-1"
            >
              Invoice
            </h1>
          </div>

          <!-- Print Button -->
          <button
            class="btn btn-primary self-center flex flex-row gap-2 items-center max-sm:p-[10px]"
            @click="printInvoice"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0118 8.653v4.097A2.25 2.25 0 0115.75 15h-.241l.305 1.984A1.75 1.75 0 0114.084 19H5.915a1.75 1.75 0 01-1.73-2.016L4.492 15H4.25A2.25 2.25 0 012 12.75V8.653c0-1.082.775-2.034 1.874-2.198.374-.056.75-.107 1.127-.153L5 6.25v-3.5zm8.5 3.397a41.533 41.533 0 00-7 0V2.75a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v3.397zM6.608 12.5a.25.25 0 00-.247.212l-.693 4.5a.25.25 0 00.247.288h8.17a.25.25 0 00.246-.288l-.692-4.5a.25.25 0 00-.247-.212H6.608z"
                clip-rule="evenodd"
              />
            </svg>

            <p class="max-sm:hidden">Print Invoice</p>
          </button>
        </div>

        <!-- Content -->
        <div
          class="flex flex-row gap-[24px] max-md:flex-col max-md:mb-[88px] print:my-0"
        >
          <div class="flex flex-col w-full gap-4">
            <div class="flex flex-col mb-[40px] print:my-0 gap-2">
              <!-- Order Details -->
              <CardInvoice class="" v-bind="details" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-[999] print:hidden"
      v-if="modal"
      @click="closeModal"
    >
      <!-- Add Payment Modal -->
      <aside
        class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-white overflow-y-auto shadow-lg"
        v-if="modal_type == 'addPayment'"
      >
        <FormPayment @close-form="closeModal" @get-payment="refresh" />
      </aside>

      <!-- Refund Modal -->
      <aside
        class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-white overflow-y-auto shadow-lg"
        v-if="modal_type == 'refund'"
      >
        <FormRefund
          :total_paid="details.total_paid"
          @close-form="closeModal"
          @get-payment="refresh"
        />
      </aside>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'LayoutDetails',
  middleware: 'auth',
  data() {
    return {
      modal: false,
      modal_type: null,
      order_id: null,
      details: {
        order: [],
        total_price: 0,
        total_paid: 0,
        to_pay: 0,
        status: null,
      },

      // Update
      product: [],
      edit_order: {
        order: {
          notes: null,
          availability: '',
          arrival: null,
          total_weight: null,
          shipping_costs: null,
        },
        order_items: [
          {
            product_id: null,
            product_code: null,
            color: null,
            price: null,
            quantity: null,
          },
        ],
      },
    }
  },
  async fetch() {
    this.order_id = this.$route.params.id

    const response = await this.$axios.get(`/order/${this.order_id}`)

    this.details.order = response.data.result.order

    // Update Details Order
    this.edit_order.order.notes = this.details.order.notes

    this.edit_order.order.availability = this.details.order.availability

    this.edit_order.order.arrival = this.details.order.arrival
    this.edit_order.order.total_weight = this.details.order.total_weight

    this.edit_order.order.shipping_costs = parseInt(
      this.details.order.shipping_costs
    ).toLocaleString('id')

    // Update Order Items
    this.edit_order.order_items[0].product_id =
      this.details.order.order_items[0].product.id
    this.edit_order.order_items[0].product_code =
      this.details.order.order_items[0].product_code
    this.edit_order.order_items[0].color =
      this.details.order.order_items[0].color

    this.edit_order.order_items[0].price = parseInt(
      this.details.order.order_items[0].price
    ).toLocaleString('id')

    this.edit_order.order_items[0].quantity =
      this.details.order.order_items[0].quantity

    this.product = await this.$axios.get(
      `/product/${this.edit_order.order_items[0].product_id}`
    )

    // Count Total Price
    this.details.total_price = 0

    for (let item of this.details.order.order_items) {
      this.details.total_price += parseInt(item.quantity * item.price)
    }

    this.details.total_price = parseInt(
      this.details.total_price + this.details.order.shipping_costs
    )

    // Count Paid
    this.details.total_paid = 0

    for (let payment of this.details.order.payments) {
      this.details.total_paid += parseInt(payment.amount)
    }

    // To Pay
    this.details.to_pay = 0

    this.details.to_pay = this.details.total_price - this.details.total_paid

    // Status

    // Is order success? Yes
    if (
      this.details.order.availability == 1 &&
      this.details.total_paid == this.details.total_price
    ) {
      this.details.status = 'Success'
    }

    // Is product availability known? Nope
    else if (this.details.order.availability == null) {
      this.details.status = 'Waiting for Availability'
    }

    // Product available, but it is paid off? Not yet
    else if (
      this.details.order.availability == 1 &&
      this.details.total_paid < this.details.total_price
    ) {
      this.details.status = 'Waiting for Payment'
    }

    // Product not available, but is there any payment? Yes
    else if (
      this.details.order.availability == 0 &&
      this.details.total_paid > 0 &&
      this.details.total_paid <= this.details.total_price
    ) {
      this.details.status = 'To be refund'
    }

    // Product not available, but is there any payment? Nope
    else if (
      this.details.order.availability == 0 &&
      this.details.total_paid == 0
    ) {
      this.details.status = 'Refund'
    }
  },
  methods: {
    // Update Order
    async updateOrder() {
      // Replace '.' at price
      this.edit_order.order_items[0].price =
        this.edit_order.order_items[0].price.replaceAll('.', '')

      // Replace '.' at shipping costs
      this.edit_order.order.shipping_costs =
        this.edit_order.order.shipping_costs.replaceAll('.', '')

      try {
        const updateOrder = await this.$axios.put(
          `/order/${this.order_id}`,
          this.edit_order
        )
      } catch (error) {
        console.log(error.message)
      }

      this.$nuxt.refresh()
    },
    // Show Modal
    showModal(modal_type) {
      this.closeModal()
      this.modal_type = modal_type
      this.modal = true
    },

    // Close Modal
    closeModal() {
      this.modal_type = null
      this.modal = false
    },

    // Price to Currency
    priceToCurreny(event) {
      // If empty then do nothing
      if (event.target.value == '') {
        return
      }

      // Cast value to string
      let value = event.target.value.toString()

      // Replace '.'
      value = value.replaceAll('.', '')

      // Set price value
      this.edit_order.order_items[0].price =
        parseInt(value).toLocaleString('id')
    },

    // Shipping Costs to Currency
    shippingCostsToCurreny(event) {
      // If empty then do nothing
      if (event.target.value == '') {
        return
      }

      // Cast value to string
      let value = event.target.value.toString()

      // Replace '.'
      value = value.replaceAll('.', '')

      // Set price value
      this.edit_order.order.shipping_costs =
        parseInt(value).toLocaleString('id')
    },

    // Print Invoice
    printInvoice() {
      window.print()
    },

    // Refresh Data
    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>
