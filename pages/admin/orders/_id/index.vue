<template>
  <main
    class="max-w-[100%] flex justify-center my-[60px] p-[24px] ease-in-out duration-200"
  >
    <section
      class="flex flex-row justify-center gap-6 flex-grow max-md:max-w-none items-start overflow-y-auto"
    >
      <div class="flex flex-col flex-grow gap-8 max-w-[1200px] max-sm:min-w-0">
        <!-- Headline -->
        <div class="flex justify-between">
          <div class="flex flex-row gap-4">
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
              class="text-[24px] font-bold text-dark self-center py-1 line-clamp-1"
            >
              Order Details
            </h1>
          </div>
        </div>

        <!-- Content -->
        <div class="flex flex-row gap-[24px] max-md:flex-col max-md:mb-[88px]">
          <div class="flex flex-col w-full gap-4">
            <div class="flex flex-col mb-[40px] gap-2">
              <!-- Order Details -->
              <OrderDetails v-bind="details" />

              <!-- Action Button -->
              <div
                class="flex flex-row w-full justify-between gap-4 mt-[14px] max-sm:flex-col"
              >
                <div class="flex flex-row w-full gap-4">
                  <button
                    type="button"
                    class="btn btn-primary max-sm:w-full"
                    @click="showModal('addPayment')"
                  >
                    + Add Payment
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger max-sm:w-full"
                    @click="showModal('refund')"
                  >
                    Refund
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary shrink-0"
                  @click="$router.push({ name: 'admin-orders-id-invoice' })"
                >
                  Create Invoice
                </button>
              </div>
            </div>
          </div>

          <!-- Update Order Detail Form -->
          <div class="overflow-y-auto flex flex-col h-full w-full">
            <div
              class="flex flex-col flex-grow card form-container w-full pt-[40px]"
            >
              <div class="flex justify-between">
                <h1 class="text-[20px] font-bold text-dark pb-2">
                  Update Order Details
                </h1>
              </div>

              <!-- Order Item -->
              <div class="form-group">
                <label for="" class="input-label required">Order Item</label>

                <!-- Selected Order Item -->
                <div
                  class="card p-0 bg-grey-40 input-field border-grey-60 hover:border-grey-60"
                >
                  <div class="flex flex-col bg-white rounded-md gap-4 p-4">
                    <div class="flex flex-row gap-4">
                      <p v-if="$fetchState.pending">Loading...</p>
                      <CardProduct
                        class=""
                        v-bind="product.data.result.product"
                        :date="false"
                        v-else
                      />
                    </div>
                    <div class="flex flex-col gap-y-5 px-4 pb-6">
                      <!-- Product Code -->
                      <div class="form-group">
                        <label for="" class="input-label required"
                          >Product Code</label
                        >
                        <input
                          type="text"
                          class="input-field flex-grow"
                          placeholder="Product Code"
                          v-model="edit_order.order_items[0].product_code"
                        />
                      </div>

                      <!-- Color -->
                      <div class="form-group">
                        <label for="" class="input-label required">Color</label>
                        <input
                          type="text"
                          class="input-field flex-grow"
                          placeholder="Color"
                          v-model="edit_order.order_items[0].color"
                        />
                      </div>

                      <!-- Price -->
                      <div class="form-group">
                        <label for="" class="input-label required">Price</label>
                        <div class="flex flex-row p-0">
                          <div
                            class="rounded-l-[6px] border-[1.5px] border-grey-40 bg-grey-40 text-white py-[10px] px-[11px]"
                          >
                            Rp
                          </div>
                          <input
                            type="text"
                            class="input-field rounded-l-none flex-grow min-w-0 text-right"
                            placeholder="-"
                            @input="priceToCurreny"
                            v-model="edit_order.order_items[0].price"
                          />
                        </div>
                      </div>

                      <!-- Quantity -->
                      <div class="form-group">
                        <label for="" class="input-label required"
                          >Quantity</label
                        >
                        <input
                          type="text"
                          class="input-field flex-grow"
                          placeholder="-"
                          v-model="edit_order.order_items[0].quantity"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Availability -->
              <div class="form-group">
                <label for="" class="input-label">Product Availability</label>
                <select
                  name=""
                  id=""
                  class="input-field"
                  v-model="edit_order.order.availability"
                >
                  <option value="null">?</option>
                  <option value="1">Available</option>
                  <option value="0">Not Available</option>
                </select>
              </div>

              <!-- Product Arrival -->
              <div class="form-group">
                <label for="" class="input-label">Product Arrival</label>
                <input
                  type="date"
                  class="input-field"
                  v-model="edit_order.order.arrival"
                />
              </div>

              <!-- Total Weight -->
              <div class="form-group">
                <label for="" class="input-label">Total Weight</label>
                <div class="flex flex-row p-0">
                  <input
                    type="text"
                    class="input-field rounded-r-none flex-grow min-w-0"
                    placeholder="-"
                    v-model="edit_order.order.total_weight"
                  />
                  <div
                    class="rounded-r-[6px] border-[1.5px] border-grey-40 bg-grey-40 text-white py-[10px] px-[11px]"
                  >
                    Kg
                  </div>
                </div>
              </div>

              <!-- Shipping Costs -->
              <div class="form-group">
                <label for="" class="input-label">Shipping Costs</label>
                <div class="flex flex-row p-0">
                  <div
                    class="rounded-l-[6px] border-[1.5px] border-grey-40 bg-grey-40 text-white py-[10px] px-[11px]"
                  >
                    Rp
                  </div>
                  <input
                    type="text"
                    class="input-field rounded-l-none flex-grow min-w-0 text-right"
                    placeholder="-"
                    @input="shippingCostsToCurreny"
                    v-model="edit_order.order.shipping_costs"
                  />
                </div>
              </div>

              <!-- Notes -->
              <div class="form-group">
                <label for="" class="input-label">Notes</label>
                <textarea
                  class="input-field"
                  placeholder="Notes"
                  v-model="edit_order.order.notes"
                ></textarea>
              </div>

              <!-- Button -->
              <div class="flex flex-row gap-4">
                <button
                  type="button"
                  class="btn btn-primary mt-[14px] self-start"
                  @click="updateOrder"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  class="btn btn-danger mt-[14px] self-start"
                  @click="$nuxt.refresh()"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-[999]"
      v-if="modal"
      @click="closeModal"
    >
      <!-- Add Payment Modal -->
      <aside
        class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-white overflow-y-auto shadow-lg"
        v-if="modal_type == 'addPayment'"
        @click.stop
      >
        <FormPayment
          @close-form="closeModal"
          @get-payment="refresh"
          :total_price="details.total_price"
          :total_paid="details.total_paid"
          :to_pay="details.to_pay"
        />
      </aside>

      <!-- Refund Modal -->
      <aside
        class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-white overflow-y-auto shadow-lg"
        v-if="modal_type == 'refund'"
        @click.stop
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

    const response = await this.$axios.get(`/api/order/${this.order_id}`)

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
      `/api/product/${this.edit_order.order_items[0].product_id}`
    )

    // Get Details
    this.getDetails(this.details.order)

    // Get Status
    this.details.status = this.getStatus(this.details.order)
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
          `/api/order/${this.order_id}`,
          this.edit_order
        )
      } catch (error) {
        console.log(error.message)
      }

      this.$nuxt.refresh()
    },

    // Details
    getDetails(order) {
      // Count Total Price
      let total_price = 0

      for (let item of order.order_items) {
        total_price += parseInt(item.quantity * item.price)
      }

      total_price = parseInt(total_price + order.shipping_costs)

      this.details.total_price = total_price

      // Count Paid
      let total_paid = 0

      for (let payment of order.payments) {
        total_paid += parseInt(payment.amount)
      }

      this.details.total_paid = total_paid

      // To Pay
      let to_pay = 0

      to_pay = total_price - total_paid

      this.details.to_pay = to_pay
    },

    // Status
    getStatus(order) {
      // Status

      // Is order success? Yes
      if (
        order.availability == 1 &&
        this.details.total_paid == this.details.total_price
      ) {
        return 'Success'
      }

      // Is product availability known? Nope
      else if (order.availability == null) {
        return 'Pending Availability'
      }

      // Product available, but it is paid off? Not yet
      else if (
        order.availability == 1 &&
        this.details.total_paid < this.details.total_price
      ) {
        return 'Pending Payment'
      }

      // Product not available, but is there any payment? Yes
      else if (
        order.availability == 0 &&
        this.details.total_paid > 0 &&
        this.details.total_paid <= this.details.total_price
      ) {
        return 'To be refund'
      }

      // Product not available, but is there any payment? Nope
      else if (order.availability == 0 && this.details.total_paid == 0) {
        return 'Refund'
      }

      // Unknown
      else {
        return 'Unknown'
      }
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

    // Refresh Data
    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>
