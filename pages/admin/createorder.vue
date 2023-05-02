<template>
  <main
    class="ml-[220px] max-lg:ml-[88px] max-md:ml-0 max-w-[100%] flex justify-center my-[60px] p-[24px] ease-in-out duration-200 max-md:mb-[88px]"
  >
    <form
      class="w-full flex justify-center gap-[24px] max-w-[1000px] max-lg:max-w-[600px] max-lg:flex-col max-md:pb-[40px]"
      @submit.prevent="createOrder"
    >
      <section
        class="flex flex-col gap-6 flex-grow items-start overflow-y-auto"
      >
        <!-- Title -->
        <div class="flex justify-between">
          <h1 class="text-[24px] font-bold text-dark py-1">Create Order</h1>
        </div>

        <!-- Order Form -->
        <div
          class="flex flex-col flex-grow card form-container w-full pt-[40px]"
        >
          <h2 class="text-[20px] font-bold text-dark">Customer</h2>

          <!-- Customer -->
          <div class="form-group">
            <label for="" class="input-label required">Customer</label>

            <!-- Empty Customer -->
            <div
              class="flex justify-center w-full input-field p-8 bg-gray-50 gap-4 max-sm:flex-col"
              v-if="!new_order.order.customer_id"
            >
              <button
                type="button"
                class="btn btn-secondary self-center"
                @click="showModal('selectCustomer')"
              >
                Select Customer
              </button>
              <p class="self-center text-grey-80">or</p>
              <button
                type="button"
                class="btn btn-secondary self-center"
                @click="showModal('addCustomer')"
              >
                Add New Customer
              </button>
            </div>

            <!-- Selected Customer -->
            <div
              class="card p-0 bg-white input-field border-grey-60 hover:border-grey-60"
              v-else
            >
              <div class="flex flex-row gap-4">
                <CardCustomer class="" v-bind="customer" />
                <button
                  type="button"
                  class="btn btn-secondary p-2.5 self-center m-4"
                  @click="changeCustomer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                    />
                    <path
                      d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Customer Type -->
          <div class="form-group">
            <label for="" class="input-label required">Customer Type</label>
            <div class="flex flex-row gap-8 px-2">
              <div class="flex flex-row">
                <input
                  type="radio"
                  id="customer-type-1"
                  name="customer_type"
                  class="cursor-pointer"
                  value="Regular"
                  v-model="new_order.order.customer_type"
                />
                <label
                  for="customer-type-1"
                  class="text-dark cursor-pointer pl-2"
                  >Regular</label
                >
              </div>
              <div class="flex flex-row">
                <input
                  type="radio"
                  id="customer-type-2"
                  name="customer_type"
                  class="cursor-pointer"
                  value="Reseller"
                  v-model="new_order.order.customer_type"
                />
                <label
                  for="customer-type-2"
                  class="text-dark cursor-pointer pl-2"
                  >Reseller</label
                >
              </div>
            </div>
          </div>

          <h2 class="text-[20px] font-bold text-dark pt-4">Delivery</h2>

          <!-- Delivery Address -->
          <div class="form-group">
            <label for="" class="input-label required">Delivery Address</label>
            <textarea
              class="input-field"
              placeholder="Delivery Address"
              v-model="new_order.order.address"
            ></textarea>
          </div>

          <!-- Province -->
          <div class="form-group">
            <label for="" class="input-label required">Province</label>
            <input
              type="text"
              class="input-field"
              placeholder="Province"
              v-model="new_order.order.province"
            />
          </div>

          <!-- City -->
          <div class="form-group">
            <label for="" class="input-label required">City</label>
            <input
              type="text"
              class="input-field"
              placeholder="City"
              v-model="new_order.order.city"
            />
          </div>

          <h2 class="text-[20px] font-bold text-dark pt-4">Order</h2>

          <!-- Order Type -->
          <div class="form-group">
            <label for="" class="input-label required">Order Type</label>
            <div class="flex flex-row gap-8 px-2">
              <div class="flex flex-row">
                <input
                  type="radio"
                  id="order-type-1"
                  name="order_type"
                  class="cursor-pointer"
                  value="Pre-Order"
                  v-model="new_order.order.order_type"
                />
                <label for="order-type-1" class="text-dark cursor-pointer pl-2"
                  >Pre-Order</label
                >
              </div>
              <div class="flex flex-row">
                <input
                  type="radio"
                  id="order-type-2"
                  name="order_type"
                  class="cursor-pointer"
                  value="Ready Stock"
                  v-model="new_order.order.order_type"
                />
                <label for="order-type-2" class="text-dark cursor-pointer pl-2"
                  >Ready Stock</label
                >
              </div>
            </div>
          </div>

          <!-- Order Item -->
          <div class="form-group">
            <label for="" class="input-label required">Order Item</label>

            <!-- Empty Order Item -->
            <div
              class="flex justify-center w-full input-field p-8 bg-gray-50 gap-4"
              v-if="!new_order.order_items[0].product_id"
            >
              <button
                type="button"
                class="btn btn-secondary self-center"
                @click="showModal('selectProduct')"
              >
                Add Order Item
              </button>
            </div>

            <!-- Selected Order Item -->
            <div
              class="card p-0 bg-grey-40 input-field border-grey-60 hover:border-grey-60"
              v-else
            >
              <div class="flex flex-col bg-white rounded-md gap-4 p-4">
                <div class="flex flex-row gap-4">
                  <CardProduct class="" v-bind="product" :date="false" />
                  <button
                    type="button"
                    class="btn btn-secondary p-2.5 self-center m-4"
                    @click="changeProduct"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                      />
                      <path
                        d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                      />
                    </svg>
                  </button>
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
                      v-model="new_order.order_items[0].product_code"
                    />
                  </div>

                  <!-- Color -->
                  <div class="form-group">
                    <label for="" class="input-label required">Color</label>
                    <input
                      type="text"
                      class="input-field flex-grow"
                      placeholder="Color"
                      v-model="new_order.order_items[0].color"
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
                        class="input-field rounded-l-none flex-grow min-w-0"
                        placeholder="-"
                        @input="toCurreny"
                        v-model="new_order.order_items[0].price"
                      />
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="form-group">
                    <label for="" class="input-label required">Quantity</label>
                    <input
                      type="text"
                      class="input-field flex-grow"
                      placeholder="-"
                      v-model="new_order.order_items[0].quantity"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 class="text-[20px] font-bold text-dark pt-4">Details</h2>

          <!-- Total Weight -->
          <div class="form-group">
            <label for="" class="input-label">Total Weight</label>
            <div class="flex flex-row p-0">
              <input
                type="text"
                class="input-field rounded-r-none flex-grow min-w-0"
                placeholder="-"
                v-model="new_order.order.total_weight"
              />
              <div
                class="rounded-r-[6px] border-[1.5px] border-grey-40 bg-grey-40 text-white py-[10px] px-[11px]"
              >
                Kg
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="form-group">
            <label for="" class="input-label">Notes</label>
            <textarea
              class="input-field"
              placeholder="Notes"
              v-model="new_order.order.notes"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Create Order Details -->
      <aside class="min-w-[400px] max-sm:min-w-0 mt-[45.5px] max-lg:mt-0">
        <div class="sticky top-[84px] right-0 overflow-y-auto flex flex-col">
          <CreateOrderDetails
            :product="product"
            :order_item="new_order.order_items[0]"
          />

          <!-- Button -->
          <div class="flex flex-row-reverse gap-4 mt-2">
            <button type="submit" class="btn btn-primary mt-[14px] self-start">
              Create Order
            </button>
            <button
              type="button"
              class="btn btn-danger mt-[14px] self-start"
              @click="setEmpty"
            >
              Cancel
            </button>
          </div>
        </div>
      </aside>
    </form>

    <!-- Modal -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-[999]"
      v-if="modal"
      @click="closeModal"
    >
      <!-- Select Customer Modal -->
      <aside
        class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-page overflow-y-auto shadow-lg"
        v-if="modal_type == 'selectCustomer'"
        @click.stop
      >
        <SelectCustomer @close-modal="closeModal" @get-customer="getCustomer" />
      </aside>

      <!-- Add Customer Modal -->
      <aside
        class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-white overflow-y-auto shadow-lg"
        v-if="modal_type == 'addCustomer'"
        @click.stop
      >
        <FormCustomer @close-form="closeModal" @get-customer="getCustomer" />
      </aside>

      <!-- Select Product Modal -->
      <aside
        class="w-[450px] max-md:w-full max-md:pb-[100px] h-full fixed right-0 top-0 bg-page overflow-y-auto shadow-lg"
        v-if="modal_type == 'selectProduct'"
        @click.stop
      >
        <SelectProduct @close-modal="closeModal" @get-product="getProduct" />
      </aside>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'LayoutDashboard',
  middleware: 'auth',
  data() {
    return {
      modal: false,
      modal_type: null,
      customer: [],
      product: [],
      new_order: {
        order: {
          customer_id: null,
          customer_type: null,
          phone: null,
          address: null,
          province: null,
          city: null,
          order_type: null,
          notes: null,
          availability: null,
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
  methods: {
    // Create Order
    async createOrder() {
      // Replace '.' at price
      this.new_order.order_items[0].price =
        this.new_order.order_items[0].price.replaceAll('.', '')

      try {
        let response = await this.$axios.post('/order', this.new_order)

        this.$router.push({ name: 'admin-orders' })
      } catch (error) {
        console.log(error.message)
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

    // Get Customer
    getCustomer(customer) {
      this.customer = customer
      this.new_order.order.customer_id = customer.id
      this.new_order.order.phone = customer.phone
      this.new_order.order.address = customer.address
    },

    // Get Product
    getProduct(product) {
      this.product = product
      this.new_order.order_items[0].product_id = product.id
    },

    // Change Customer
    changeCustomer() {
      this.customer = null
      this.new_order.order.customer_id = null
    },

    // Change Product
    changeProduct() {
      this.product = null
      this.new_order.order_items[0].product_id = null
    },

    // To Currency
    toCurreny(event) {
      // If empty then do nothing
      if (event.target.value == '') {
        return
      }

      // Cast value to string
      let value = event.target.value.toString()

      // Replace '.'
      value = value.replaceAll('.', '')

      // Set payment value
      this.new_order.order_items[0].price = parseInt(value).toLocaleString('id')
    },

    // Set empty
    setEmpty() {
      Object.keys(this.new_order.order).forEach(
        (i) => (this.new_order.order[i] = null)
      )
      Object.keys(this.new_order.order_items[0]).forEach(
        (i) => (this.new_order.order_items[0][i] = null)
      )
    },
  },
}
</script>
