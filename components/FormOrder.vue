<template>
  <div class="overflow-y-auto flex flex-col min-w-[60%] h-full w-full">
    <div class="w-full card pt-[24px] flex-grow px-[40px] mb-[40px]">
      <div class="flex justify-between">
        <h1 class="text-[24px] font-bold text-dark pt-4 pb-2">Create Order</h1>
      </div>

      <!-- Customer -->
      <div class="form-group">
        <label for="" class="input-label">Customer*</label>

        <!-- Empty Customer -->
        <div
          class="flex justify-center w-full h-24 border-[1.45px] border-grey-60 rounded-lg bg-gray-50 gap-4"
          v-if="!new_order.order.customer_id"
        >
          <button class="btn btn-secondary self-center" @click="selectCustomer">
            Select Customer
          </button>
          <p class="self-center">or</p>
          <button
            data-modal-target="add-customer-modal"
            type="button"
            class="btn btn-secondary self-center"
          >
            Add New Customer
          </button>
        </div>

        <!-- Selected Customer -->
        <div class="card px-4 py-6 bg-secondary" v-else>
          <div class="card p-0 bg-white">
            <ProductCard class="bg-none" />
            <div class="flex flex-col px-4 pb-4 gap-4">
              <button class="btn btn-secondary self-center">
                Change Customer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Type -->
      <div class="form-group">
        <label for="" class="input-label">Customer Type*</label>
        <div class="flex flex-row gap-8 px-2">
          <div class="flex flex-row">
            <input
              type="radio"
              id="customer-type-1"
              name="customer_type"
              value=""
              class="cursor-pointer"
            />
            <label for="customer-type-1" class="text-dark cursor-pointer pl-2"
              >Regular</label
            >
          </div>
          <div class="flex flex-row">
            <input
              type="radio"
              id="customer-type-2"
              name="customer_type"
              value=""
              class="cursor-pointer"
            />
            <label for="customer-type-2" class="text-dark cursor-pointer pl-2"
              >Reseller</label
            >
          </div>
        </div>
      </div>

      <!-- Delivery Address -->
      <div class="form-group">
        <label for="" class="input-label">Delivery Address*</label>
        <textarea class="input-field" placeholder="Delivery Address"></textarea>
      </div>

      <!-- Province -->
      <div class="form-group">
        <label for="" class="input-label">Province*</label>
        <input type="text" class="input-field" placeholder="Province" />
      </div>

      <!-- City -->
      <div class="form-group">
        <label for="" class="input-label">City*</label>
        <input type="text" class="input-field" placeholder="City" />
      </div>

      <!-- Order Type -->
      <div class="form-group">
        <label for="" class="input-label">Order Type*</label>
        <div class="flex flex-row gap-8 px-2">
          <div class="flex flex-row">
            <input
              type="radio"
              id="order-type-1"
              name="order_type"
              value=""
              class="cursor-pointer"
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
              value=""
              class="cursor-pointer"
            />
            <label for="order-type-2" class="text-dark cursor-pointer pl-2"
              >Ready Stock</label
            >
          </div>
        </div>
      </div>

      <!-- Order Item -->
      <div class="form-group">
        <label for="" class="input-label">Order Item*</label>
        <div
          class="flex justify-center w-full h-36 border-[1.45px] border-grey-60 rounded-lg bg-gray-50"
        >
          <button
            class="btn btn-secondary self-center"
            @click="showModal = true"
            @close-modal="showModal = false"
          >
            Add Order Item
          </button>
        </div>
      </div>

      <!-- Total Weight -->
      <div class="form-group">
        <label for="" class="input-label">Total Weight</label>
        <div class="flex flex-row p-0">
          <input
            type="text"
            class="input-field rounded-r-none flex-grow"
            placeholder="Total Weight"
          />
          <div
            class="rounded-r-[6px] outline outline-[1.45px] outline-grey-60 bg-grey-60 text-white py-[10px] px-[11px]"
          >
            Kg
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="form-group">
        <label for="" class="input-label">Notes</label>
        <textarea class="input-field" placeholder="Notes"></textarea>
      </div>
    </div>
    <AddProductModal v-show="showModal" />
  </div>
</template>

<script>
export default {
  name: 'OrderForm',
  data() {
    return {
      showModal: false,
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
        payment: {
          information: null,
          amount: null,
          payment_account_id: null,
        },
      },
    }
  },
  async fetch() {
    this.customers = await this.$axios.get('/api/customer')
    this.products = await this.$axios.get('/api/product')
  },
  methods: {
    async selectCustomer(event) {
      event.preventDefault()

      var form = document.createElement('div')
      form.innerHTML = `
      <form
      class="w-full card pt-[14px] flex-grow px-[40px]"
      @submit.prevent="addOrEditCustomer"
    >
      <div class="flex justify-between">
        <h1 class="text-[24px] font-bold text-dark pt-4 pb-4 text-center">
          Add Customer
        </h1>
      </div>
      <div class="form-group">
        <label for="" class="input-label">Full Name*</label>
        <input
          type="text"
          class="input-field"
          placeholder="Full Name"
          v-model="customer.name"
        />
      </div>
      <div class="form-group">
        <label for="" class="input-label">Address</label>
        <textarea
          class="input-field"
          placeholder="Address"
          v-model="customer.address"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="" class="input-label">Phone*</label>
        <input
          type="text"
          class="input-field"
          placeholder="Phone"
          v-model="customer.phone"
        />
      </div>
      <div class="flex flex-row gap-4">
        <button type="submit" class="btn btn-primary mt-[14px] self-start">
          Add Customer
        </button>
        <button
          class="btn btn-danger mt-[14px] self-start"
          @click="
            setAdd(false)
            setEdit(false)
          "
        >
          Cancel
        </button>
      </div>
    </form>`

      this.$swal({
        html: form,
        showConfirmButton: false,
      }).then((value) => {
        //console.log(value);
      })
    },
  },
}
</script>
